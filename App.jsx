import { useState, useEffect } from 'react'
import framLogo from './framenergyLogo.avif'
import './App.css'
import DropdownStates from './DropdownStates.jsx'; //module for dropdown menu of states
import NumericInputBox from './NumericInputBox.jsx'; //module for taking numeric input
import Table from './Table.jsx'; //Table display module
import {upfrontPrice, annualElectricityGeneration, internalRateofReturn, paybackPeriod, costTable} from './energyForecasting.js';

function App()  {
  // state of building
  const [selectedState, setSelectedState] = useState("");
  // size of roof
  const[roofSize, setRoofSize] = useState(0);
  const [tableData, setTableData] = useState([]);

  // when selected state or roof size change, update irr, paybackperiod, cost table
  useEffect(() => {
    if (selectedState || roofSize) {
    const irr = internalRateofReturn(selectedState, roofSize);
    const paybackperiod = paybackPeriod( selectedState, roofSize);
    const [cost, profit, net] = costTable(selectedState, roofSize);
    const newTableData = cost.map((costValue, index) => ({
      year: index,
      cost: costValue,
      profit: profit[index],
      net: net[index]
    }));
    setTableData(newTableData)
    let outputLine = "IRR = " + irr + "%. Payback period is approximately" + paybackperiod + "years.";
    console.log(outputLine);
    }
  }, [selectedState, roofSize]);

  // update state selected
  const handleStateSelect = (state) => {
    setSelectedState(state);
    console.log("User selected:", state);
  };

// update roof size
  const handleSizeSelect = (state) => {
    setRoofSize(state);
  };


  return (
    <div> className="App"
      <div>
        <a href="https://www.framenergy.com" target="_blank">
          <img src={framLogo} className="logo fram" alt="Fram logo" />
        </a>
      </div>
        <h1>Solar Financial Forecasting </h1>
        <h5> Leona Teten</h5>
      <div>
        <h2>Select your state</h2>
            < DropdownStates onSelect={handleStateSelect} />
            {selectedState && 
            <p>You selected: <strong>{selectedState}</strong></p>
            }
      </div>
        <h2> What is the kW DC system size of your solar roof?</h2>
             <h5> The system size in kilowatts (kW) DC is calculated by multiplying the number of panels 
             by the wattage of each panel and then dividing by 1,000 to convert watts to kilowatts.</h5>
          < NumericInputBox onSelect={handleSizeSelect} />
            {roofSize && 
            <p>Your roof size is: <strong>{roofSize}</strong></p>
            }
      <div>
        <h2>Cost Table</h2>
        <Table tableData={tableData} />
      </div>
      </div>
  );
}

export default App
