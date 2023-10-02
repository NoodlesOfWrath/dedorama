import React, { useState, useEffect } from 'react';
import './App.css';
import CSVReader from './CSVReader';

function App() {
  const [csvData, setCsvData] = useState([]);
  const [selectedColumn, setSelectedColumn] = useState('');
  const [sizes, setSizes] = useState([]);
  const [dates, setDates] = useState([]);
  const [usedDate, setUsedDate] = useState(new Date());
  // get the start day of the month as an int (0 - 6)
  const [usedFirstDayofMonth, setusedFirstDayofMonth] = useState(0);
  const [dateSizeDict, setdateSizeDict] = useState({}); // dict of dates and sizes

  const handleCsvDataChange = (data) => {
    setCsvData(data);
  };

  const handleColumnSelect = (e) => {
    setSelectedColumn(e.target.value);
  };

  useEffect(() => {
    // Use the map function to extract the selected column values
    const extractedSizes = csvData.map((row) => parseFloat(row[selectedColumn]));
    let extractedDates = csvData.map((row) => row['Date']);

    // Filter out NaN values (non-numeric) and set the sizes array
    setSizes(extractedSizes.filter((value) => !isNaN(value)));
    // extract the dates using date.parse
    extractedDates = extractedDates.map((value) => new Date(Date.parse(value)));
    // Filter out NaN values (non-string) and set the sizes array
    extractedDates = extractedDates.filter((value) => !isNaN(value));
    // make sure the dates are in the correct format
    extractedDates = extractedDates.map((value) => new Date(value.getFullYear(),
      value.getMonth(), value.getDate() + 1 /*appears to be 0 indexed*/));

    setDates(extractedDates);

    let newDict = {};

    for (let i = 0; i < extractedDates.length; i++) {
      newDict[extractedDates[i]] = extractedSizes[i];
    }

    setdateSizeDict(newDict);
    usedDate.setMonth(usedDate.getMonth() - 1);
  }, [csvData, selectedColumn]);

  function getFirstDayOfWeek(year, month) {
    const firstDayOfMonth = new Date(year, month, 1);
    return firstDayOfMonth.getDay();
  }

  const nextMonth = () => {
    setUsedDate(new Date(usedDate.getFullYear(), usedDate.getMonth() + 1, 1));
    setusedFirstDayofMonth(getFirstDayOfWeek(usedDate.getFullYear(), usedDate.getMonth()));
  }

  // function to go to the previous month
  const previousMonth = () => {
    setUsedDate(new Date(usedDate.getFullYear(), usedDate.getMonth() - 1, 1));
    setusedFirstDayofMonth(getFirstDayOfWeek(usedDate.getFullYear(), usedDate.getMonth()));
  }

  const getSizesByMonth = (year, month) => {
    //const datesToBeIncluded = dates.filter((date) => date.getMonth() === month);
    let datesToBeIncluded = [...Array(32).keys()].map((day) => new Date(year, month, day));
    datesToBeIncluded = datesToBeIncluded.filter((date) => date.getMonth() === month);
    const unFiliteredMonthSizes = datesToBeIncluded.map((date) => dateSizeDict[date]);
    // filter out undefined values
    const monthSizes = unFiliteredMonthSizes.filter((value) => value !== undefined);
    return monthSizes;
  }

  const getSizeByDay = (day) => {
    const fullDate = new Date(usedDate.getFullYear(), usedDate.getMonth(), day);
    let size = dateSizeDict[fullDate];
    if (size === undefined || fullDate.getMonth() !== usedDate.getMonth()) {
      return 0;
    }
    return size;
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
        {[...Array(usedFirstDayofMonth).keys()].map((index) => ( // add empty divs to the beginning of the array to make the calendar start on the correct day
          <div className="center">
            <div className="dotText"></div>
            <span
              className="dot"
              style={{
                height: 0,
                width: 60,
                zIndex: -1
              }}
            ></span>
          </div>
        ))}
        {[...Array(32).keys()].map((day) => ( // add empty divs to the beginning of the array to make the calendar start on the correct day
          <div className="center">
            <div className="dotText">
              {(getSizeByDay(day + 1) != 0) ? day + 1 : ''}</div>
            <span
              className="dot"
              style={{
                height: getSizeByDay(day + 1) / Math.max(...getSizesByMonth(usedDate.getFullYear(), usedDate.getMonth())) * 60 + 'px',
                width: getSizeByDay(day + 1) / Math.max(...getSizesByMonth(usedDate.getFullYear(), usedDate.getMonth())) * 60 + 'px',
                zIndex: -1
              }}
            ></span>
          </div>
        ))}
      </div>
      <div>
        <div className="previousButton" onClick={previousMonth}>previous</div>
        <div className="nextButton" onClick={nextMonth}>next</div>
      </div>
    </div >
  );
}

export default App;