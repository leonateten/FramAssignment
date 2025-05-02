import React, { useState } from 'react';

function DropdownStates({onSelect}) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Select your state");
  const [searchTerm, setSearchTerm] = useState("");

  const options = [
    "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut",
    "Delaware", "District of Columbia(DC)", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa",
    "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan",
    "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire",
    "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio",
    "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota",
    "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia",
    "Wisconsin", "Wyoming"
  ];

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
    setSearchTerm(""); // Reset search when selection is made
    onSelect(option); // Send selected value back to App.js
  };


  const filteredOptions = options.filter(option =>
    option.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ width: '200px', margin: '20px', fontFamily: 'Arial' }}>
      <div
        onClick={toggleDropdown}
        style={{
          padding: '10px',
          border: '1px solid #ccc',
          cursor: 'pointer',
          backgroundColor: '#f9f9f9',
        }}
      >
        {selectedOption}
      </div>

      {isOpen && (
        <div style={{
          border: '1px solid #ccc',
          borderTop: 'none',
          backgroundColor: 'black',
        }}>
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '100%',
              padding: '8px',
              boxSizing: 'border-box',
              borderBottom: '1px solid #eee'
            }}
          />
          <ul style={{
            listStyle: 'none',
            margin: 0,
            padding: 0,
            maxHeight: '150px',
            overflowY: 'auto'
          }}>
            {filteredOptions.length > 0 ? (
              filteredOptions.map(option => (
                <li
                  key={option}
                  onClick={() => handleOptionClick(option)}
                  style={{
                    padding: '10px',
                    cursor: 'pointer',
                    borderBottom: '1px solid #eee'
                  }}
                >
                  {option}
                </li>
              ))
            ) : (
              <li style={{ padding: '10px', color: '#888' }}>No matches</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}

export default DropdownStates;