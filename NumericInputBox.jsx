import React, { useState } from 'react';

function NumericInputBox({onSelect}) {
  const [value, setValue] = useState(0);

  const handleChange = (e) => {
    const newValue = e.target.value;
    if (!isNaN(newValue) && newValue.trim() !== "") {
      setValue(newValue);
    }
    onSelect(value); // Send selected value back to App.js
  };

  return (
    <div>
      <label htmlFor="numeric-input">Enter a number: </label>
      <input
        id="numeric-input"
        type="number"
        value={value}
        onChange={handleChange}
        min="0"    // Minimum value
      />
      <p>You entered: {value}</p>
    </div>
  );
}

export default NumericInputBox;