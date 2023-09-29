import React, { useState, useEffect } from 'react';
import './App.css';
import CSVReader from './CSVReader';

function App() {
  const [csvData, setCsvData] = useState([]);
  const [selectedColumn, setSelectedColumn] = useState('Step count');
  const [sizes, setSizes] = useState([]);
  const [dates, setDate] = useState(new Date());
  const [usedDate, setUsedDate] = useState(new Date());
  const [startDateIndex, setstartDateIndex] = useState(0);
  const [endDateIndex, setendDateIndex] = useState(0);
  // get the start day of the month as an int (0 - 6)
  const [usedFirstDayofMonth, setusedFirstDayofMonth] = useState(0);

  const handleCsvDataChange = (data) => {
    setCsvData(data);
  };

  const handleColumnSelect = (e) => {
    setSelectedColumn(e.target.value);
  };

  function setInitialDate() {
    if (dates.length > 0) {
      setUsedDate(new Date(dates[0]));
      setendDateIndex(getDaysInMonth(usedDate.getFullYear(), usedDate.getMonth()));
      console.log("endDateIndex: " + endDateIndex);
      console.log("usedDate:  " + usedDate);
    }
    else {
      console.log("dates len" + dates.length);
    }
  }

  useEffect(() => {
    // Use the map function to extract the selected column values
    const extractedSizes = csvData.map((row) => parseFloat(row[selectedColumn]));
    const extractedDates = csvData.map((row) => row['Date']);

    // Filter out NaN values (non-numeric) and set the sizes array
    setSizes(extractedSizes.filter((value) => !isNaN(value)));
    // Filter out NaN values (non-string) and set the sizes array
    setDate(extractedDates.filter((value) => !isNaN(value)));
    // extract the dates using date.parse
    setDate(extractedDates.map((value) => Date.parse(value)));
    setInitialDate();
  }, [csvData, selectedColumn]);

  function getDaysInMonth(year, month) {
    const lastDayOfMonth = new Date(year, month + 1, 0);
    return lastDayOfMonth.getDate();
  }
  function getFirstDayOfWeek(year, month) {
    const firstDayOfMonth = new Date(year, month, 1);
    return firstDayOfMonth.getDay();
  }

  const nextMonth = () => {
    if (startDateIndex === 0) {
      setInitialDate();
    }
    console.log("next function called");
    setstartDateIndex(startDateIndex + getDaysInMonth(usedDate.getFullYear(), usedDate.getMonth())); // get the length of the previous month
    setUsedDate(new Date(usedDate.getFullYear(), usedDate.getMonth() + 1, 1));
    setendDateIndex(endDateIndex + getDaysInMonth(usedDate.getFullYear(), usedDate.getMonth())); // get the length of the next month and add it to the end index
    setusedFirstDayofMonth(getFirstDayOfWeek(usedDate.getFullYear(), usedDate.getMonth()));
    console.log("startDateIndex: " + startDateIndex + "endDateIndex: " + endDateIndex);
  }

  const previousMonth = () => {
    if (startDateIndex === 0) {
      return;
    }
    console.log("next function called");
    setstartDateIndex(startDateIndex - getDaysInMonth(usedDate.getFullYear(), usedDate.getMonth())); // get the length of the previous month
    setUsedDate(new Date(usedDate.getFullYear(), usedDate.getMonth() - 1, 1));
    setendDateIndex(endDateIndex - getDaysInMonth(usedDate.getFullYear(), usedDate.getMonth())); // get the length of the next month and add it to the end index
    setusedFirstDayofMonth(getFirstDayOfWeek(usedDate.getFullYear(), usedDate.getMonth()));
    console.log("startDateIndex: " + startDateIndex + "endDateIndex: " + endDateIndex);
  }

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
        <h3>{usedDate.toLocaleString('default', { month: 'long' })}</h3>
      </div>
      <div className="grid-container">
        {sizes.slice(startDateIndex, endDateIndex + 1 /*not inclusive*/).map((size, index) => (
          <div className="center">
            <div className="dotText">
              {index + 1}</div>
            <span
              className="dot"
              style={{
                height: (size / Math.max(...sizes)) * 60 + 'px',
                width: (size / Math.max(...sizes)) * 60 + 'px',
                zIndex: -1
              }}
            ></span>
          </div>
        ))}
      </div>
      <div>
        <button onClick={previousMonth}> Previous </button>
        <button onClick={nextMonth}> Next </button>
      </div>
    </div >
  );
}

export default App;