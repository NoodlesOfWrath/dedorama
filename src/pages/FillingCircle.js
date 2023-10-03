import React, { useState, useEffect } from 'react';
import './FillingCircle.css';
import CSVReader from '../CSVReader';

function FillingCircle() {
    const [csvData, setCsvData] = useState([]);
    const [selectedColumn, setSelectedColumn] = useState('');
    const [sizes, setSizes] = useState([]);
    const [dates, setDates] = useState([]);
    const [usedDate, setUsedDate] = useState(new Date());
    // get the start day of the month as an int (0 - 6)
    const [usedFirstDayofMonth, setusedFirstDayofMonth] = useState(0);
    const [dateSizeDict, setdateSizeDict] = useState({}); // dict of dates and sizes
    const [objectIndex, setObjectIndex] = useState(0);

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

        usedDate.setMonth(usedDate.getMonth() - 1);
    }, [csvData, selectedColumn]);

    const nextObject = () => {
        setObjectIndex(objectIndex + 1);
    }
    const previousObject = () => {
        setObjectIndex(objectIndex - 1);
    }

    return (
        <div className="FillingCircle">
            <div className='center'>
                <CSVReader onCsvDataChange={handleCsvDataChange} />
            </div>
            <div>
                <div className='centeredHeader'>Select a Column:</div>
                <div className='center'>
                    <select value={selectedColumn} onChange={handleColumnSelect}>
                        {csvData[0] &&
                            Object.keys(csvData[0]).map((header) => (
                                <option key={header} value={header}>
                                    {header}
                                </option>
                            ))}
                    </select>
                </div>
            </div>
            <div className='circleOutline'> </div>
            <div className='masked-border'></div>
            <div>
                <div className='center'>
                    <div className="previousButton" onClick={previousObject}>previous</div>
                    <div className="nextButton" onClick={nextObject}>next</div>
                </div>
            </div>
        </div >
    );
}

export default FillingCircle;