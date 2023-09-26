// src/CSVReader.js
import React, { useState } from 'react';
import Papa from 'papaparse';

function CSVReader({ onCsvDataChange }) {
    const [csvFile, setCsvFile] = useState(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setCsvFile(file);

        Papa.parse(file, {
            header: true,
            dynamicTyping: true,
            complete: (result) => {
                onCsvDataChange(result.data); // Pass the parsed CSV data to the parent component
            },
        });
    };

    return (
        <div>
            <input type="file" accept=".csv" onChange={handleFileChange} />
        </div>
    );
}

export default CSVReader;
