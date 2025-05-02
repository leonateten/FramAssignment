const annualGeneration = 1400; //kWH/kW annual generation
const electricityPriceGrowth = 0.025; //growth rate of electricity costs
const oAndM = 15; //operations and maintenance cost per kW/year
const taxCredit = 0.3; //ITC tax credit 
const installCost = 2.5; //installation cost per watt
const electricityCosts = '.electricityPrices.csv' //file name for csv containing electricty prices per state

// returns cost to install the roof
function upfrontPrice(roofSize) {
    return (1 - taxCredit)*(roofSize * installCost * 1000);
}
function annualElectricityGeneration(roofSize) {
    return annualGeneration * roofSize;
}

function getPriceForState(stateName) {
    // Fetch the CSV file from the public directory (or any valid URL)
    fetch(electricityCosts)
      .then(response => response.text())  // Read the CSV file as text
      .then(csvText => {
        // Parse the CSV content
        const rows = csvText.split('\n');
    
        // Loop through the rows and search for the state
        let price = null;
        for (let i = 0; i < rows.length; i++) {
          const cells = rows[i].split(',');  // Split each row into columns (state, price)
          if (cells[0].toLowerCase() === stateName.toLowerCase()) {
            price = cells[1];  // Get the price for the matching state
            break;
          }
        }
  
        // Display the result
        if (price !== null) {
          console.log(`Price for ${stateName}: ${price}`);
        } else {
          console.log(`${stateName} not found in the CSV file.`);
        }
      })
      .catch(error => console.error('Error fetching the CSV file:', error));
  }

function costTable(state, roofSize) {
    let price = getPriceForState(state);
    const costs = new Array(26).fill(oAndM * roofSize);
    costs[0] = upfrontPrice(roofSize);
    const profits = new Array(26);
    profits[0] = 0;
    for (let i = 1; i < 26; i++) {
        profits[i] = price * annualElectricityGeneration(roofSize);
        price = price * (1 + electricityPriceGrowth);
    }
    const net = profits.map((value, index) => value - costs[index]);
    return [costs, profits, net];
}

function paybackPeriod(state, roofSize) {
    const [costs, profits, net] = costTable(state, roofSize);
    for (let i = 0; i < net.length; i++) {
        if (net >= 0) return i;
    }
    return 25;
}

function internalRateofReturn(state, roofSize) {
    const [costs, profits, net] = costTable(state, roofSize);
    let guess = 0.1; // Initial guess for IRR
    let maxIterations = 1000;
    let tolerance = 0.00001;

    for (let i = 0; i < maxIterations; i++) {
    // Calculate NPV using the guess (current IRR estimate)
        let npv = net.reduce((acc, net, t) => {
        return acc + net / Math.pow(1 + guess, t);
        }, 0);

        // Calculate the derivative of NPV (NPV prime)
        let npvPrime = net.reduce((acc, net, t) => {
        return acc - t * net / Math.pow(1 + guess, t + 1);
        }, 0);

        // Update guess using the Newton-Raphson method
        let newGuess = guess - npv / npvPrime;

        // If the change is small enough, return the new guess (IRR)
        if (Math.abs(newGuess - guess) < tolerance) {
        return newGuess;
        }

        // Otherwise, continue with the new guess
        guess = newGuess;
    }

    // Return the last guess if the loop ends
    return guess;
}

export {upfrontPrice, annualElectricityGeneration, internalRateofReturn, paybackPeriod, costTable};