import React, { useState, useEffect } from 'react';
import './FillingCircle.css';
import CSVReader from '../CSVReader';

function FillingCircle() {
    const [csvData, setCsvData] = useState([]);
    const [selectedColumn, setSelectedColumn] = useState('');
    const [selectedColumn2, setSelectedColumn2] = useState('');
    const [sizes, setSizes] = useState([]);
    const [sizeMean, setSizeMean] = useState(0);
    const [normalizedSizes, setNormalizedSizes] = useState([]);
    const [sizes2, setSizes2] = useState([]);
    const [sizeMean2, setSizeMean2] = useState(0);
    const [normalizedSizes2, setNormalizedSizes2] = useState([]);
    const [objectIndex, setObjectIndex] = useState(0);
    const averageRotation = 360;

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
        let extractedSizes1 = csvData.map((row) => parseFloat(row[selectedColumn]));
        let extractedSizes2 = csvData.map((row) => parseFloat(row[selectedColumn2]));

        // Convert any Falsey to 0
        extractedSizes1 = extractedSizes1.map((value) => value = value || 0);
        setSizes(extractedSizes1);
        extractedSizes2 = extractedSizes2.map((value) => value = value || 0);
        setSizes2(extractedSizes2);

        console.log(extractedSizes1, extractedSizes2);

        // Calculate the mean of the sizes
        const newSizeMean = extractedSizes1.reduce((a, b) => a + b, 0) / extractedSizes1.length;
        setSizeMean(newSizeMean);
        const newSizeMean2 = extractedSizes2.reduce((a, b) => a + b, 0) / extractedSizes2.length;
        setSizeMean2(newSizeMean2);

        console.log(newSizeMean, newSizeMean2);
        // Calculate the normalized sizes
        setNormalizedSizes(extractedSizes1.map((value) => value / newSizeMean));
        setNormalizedSizes2(extractedSizes2.map((value) => value / newSizeMean2));
    }, [csvData, selectedColumn, selectedColumn2]);

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
                    <select value={selectedColumn} onChange={handleColumn1Select}>
                        {csvData[0] &&
                            Object.keys(csvData[0]).map((header) => (
                                <option key={header} value={header}>
                                    {header}
                                </option>
                            ))}
                    </select>
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
            <div className='centeredHeader'>{objectIndex + 1}</div>
            <div style={{ display: 'inline-block', height: '150px' }}></div>
            <div className='circleContainer'>
                <div
                    className='circleOutline1'
                    style={{
                        WebkitMaskImage: 'conic-gradient(rgba(0, 0, 0, 1) 0deg, rgb(0, 0, 0, 1) ' + Math.max((normalizedSizes[objectIndex] * averageRotation) - 5, 0) +
                            'deg, rgb(255, 255, 255, 0)' + normalizedSizes[objectIndex] * averageRotation + 'deg)',
                        maskImage: 'conic-gradient(rgba(0, 0, 0, 1) 0deg, rgb(0, 0, 0, 1) ' + Math.max((normalizedSizes[objectIndex] * averageRotation) - 5, 0) +
                            'deg, rgb(255, 255, 255, 0) ' + normalizedSizes[objectIndex] * averageRotation + 'deg)',
                    }}>
                </div>
                <div
                    className='circleOutline2'
                    style={{
                        WebkitMaskImage: 'conic-gradient(rgba(0, 0, 0, 1) 0deg, rgb(0, 0, 0, 1) ' + Math.max((normalizedSizes2[objectIndex] * averageRotation) - 5, 0) +
                            'deg, rgb(255, 255, 255, 0)' + normalizedSizes2[objectIndex] * averageRotation + 'deg)',
                        maskImage: 'conic-gradient(rgba(0, 0, 0, 1) 0deg, rgb(0, 0, 0, 1) ' + Math.max((normalizedSizes2[objectIndex] * averageRotation) - 5, 0) +
                            'deg, rgb(255, 255, 255, 0) ' + normalizedSizes2[objectIndex] * averageRotation + 'deg)',
                    }}>
                </div>
                <div className='circleText'>{Math.round(sizes[objectIndex])}</div>
                <div className='circleText2'>{Math.round(sizes2[objectIndex])}</div>
            </div>
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