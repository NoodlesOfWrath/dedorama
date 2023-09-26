import React, { useState, useEffect } from 'react';
import './App.css';
import CSVReader from './CSVReader';

function App() {
  const [csvData, setCsvData] = useState([]);
  const [selectedColumn, setSelectedColumn] = useState('steps');
  const [sizes, setSizes] = useState([]);

  const handleCsvDataChange = (data) => {
    setCsvData(data);
  };

  const handleColumnSelect = (e) => {
    setSelectedColumn(e.target.value);
  };

  useEffect(() => {
    // Use the map function to extract the selected column values
    const extractedSizes = csvData.map((row) => parseFloat(row[selectedColumn]));

    // Filter out NaN values (non-numeric) and set the sizes array
    setSizes(extractedSizes.filter((value) => !isNaN(value)));
  }, [csvData, selectedColumn]);

  return (
    <div className="App">
      <CSVReader onCsvDataChange={handleCsvDataChange} />
      <div>
        <h3>Select a Column:</h3>
        <select value={selectedColumn} onChange={handleColumnSelect}>
          {csvData[0] &&
            Object.keys(csvData[0]).map((header) => (
              <option key={header} value={header}>
                {header}
              </option>
            ))}
        </select>
      </div>
      <div className="grid-container">
        {sizes.map((size, index) => (
          <div key={index} className="center">
            <span
              className="dot"
              style={{ height: (size / 1) + 'px', width: (size / 1) + 'px' }} // todo: make the biggest one 100px and adjust the rest accordingly
            ></span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;