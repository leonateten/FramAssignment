import { useState, useEffect } from 'react'
import framLogo from './framenergyLogo.avif'
import './App.css'
import DropdownStates from './DropdownStates.jsx';
import NumericInputBox from './NumericInputBox.jsx';
import Table from './Table.jsx';
import {upfrontPrice, annualElectricityGeneration, internalRateofReturn, paybackPeriod, costTable} from './energyForecasting.js';

function App()  {
  const [selectedState, setSelectedState] = useState("");
  const[roofSize, setRoofSize] = useState(0);
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    if (selectedState || roofSize) {
    const irr = internalRateofReturn(selectedState, roofSize);
    const paybackperiod = paybackPeriod( selectedState, roofSize);
    const [cost, profit, net] = costTable(selectedState, roofSize);
    setTableData([cost, profit, net]);
    let outputLine = 'IRR = ${irr}%. Payback period is approximately ${paybackperiod} years.';
    console.log(outputLine);
    }
  }, [selectedState, roofSize]);

  const handleStateSelect = (state) => {
    setSelectedState(state);
    // You can now use `selectedState` in any logic or computation
    console.log("User selected:", state);
  };

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
      <div>
        <h2>Select your state</h2>
            < DropdownStates onSelect={handleStateSelect} />
            {selectedState && 
            <p>You selected: <strong>{selectedState}</strong></p>
            }
      </div>
        <h2> What is the kW DC system size of your solar roof?</h2>
             <h3> The system size in kilowatts (kW) DC is calculated by multiplying the number of panels 
             by the wattage of each panel and then dividing by 1,000 to convert watts to kilowatts.</h3>
          < NumericInputBox onSelect={handleSizeSelect} />
            {roofSize && 
            <p>Your roof size is: <strong>{roofSize}</strong></p>
            }
      <div>
        <h2>Cost Table</h2>
        <Table tableData />
      </div>
      </div>
  );
}

export default App
