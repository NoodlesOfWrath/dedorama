import React, { useState, useEffect } from 'react';
import './BubbleChart.css';
import CSVReader from '../CSVReader';

function BubbleChart() {
    const [csvData, setCsvData] = useState([]);
    const [selectedColumn, setSelectedColumn] = useState('');
    const [selectedColumn2, setSelectedColumn2] = useState('Name');
    const [sizes, setSizes] = useState([]);
    const [names, setNames] = useState([]);
    const [normalizedSizes, setNormalizedSizes] = useState([]);
    const [sizeMean, setSizeMean] = useState(0);

    const handleCsvDataChange = (data) => {
        setCsvData(data);
    };

    const handleColumn1Select = (e) => {
        setSelectedColumn(e.target.value);
    };

    const handleColumn2Select = (e) => {
        setSelectedColumn2(e.target.value);
    };

    useEffect(() => {
        // Use the map function to extract the selected column values
        let extractedSizes = csvData.map((row) => parseFloat(row[selectedColumn]));
        let extractedNames = csvData.map((row) => row[selectedColumn2]);

        // Convert any Falsey to 0
        extractedSizes = extractedSizes.map((value) => value = value || 0);
        setSizes(extractedSizes);
        setNames(extractedNames);

        // Calculate the mean of the sizes
        const newSizeMean = extractedSizes.reduce((a, b) => a + b, 0) / extractedSizes.length;
        setSizeMean(newSizeMean);

        // Calculate the normalized sizes
        setNormalizedSizes(extractedSizes.map((value) => value / newSizeMean));
    }, [csvData, selectedColumn, selectedColumn2]);

    return (
        <div className="BubbleChart">
            <div className='center'>
                <CSVReader onCsvDataChange={handleCsvDataChange} />
            </div>
            <div>
                <div className='centeredHeader'>Select a Column:</div>
                <div className='center'>
                    <h1>Values</h1>
                    <select value={selectedColumn} onChange={handleColumn1Select}>
                        {csvData[0] &&
                            Object.keys(csvData[0]).map((header) => (
                                <option key={header} value={header}>
                                    {header}
                                </option>
                            ))}
                    </select>
                    <h1>Names</h1>
                    <select value={selectedColumn2} onChange={handleColumn2Select}>
                        {csvData[0] &&
                            Object.keys(csvData[0]).map((header) => (
                                <option key={header} value={header}>
                                    {header}
                                </option>
                            ))}
                    </select>
                </div>
            </div>
            <div>
                <div className='PinContainer'>
                    {normalizedSizes.map((size, index) => (
                        <span>
                            <span
                                className="dot"
                                style={{
                                    height: size * 60 + 'px',
                                    width: size * 60 + 'px',
                                    zIndex: -1
                                }}
                            >
                                <div className='center'>
                                    <div className="dotText"
                                        style={{ fontSize: size * 8 }}>
                                        {names[index]}</div>
                                </div>
                            </span>
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default BubbleChart;