import React, { useState, useEffect } from 'react';
import './all.css';

// Function to copy text to clipboard and handle success state
const copyToClipboard = (text, setSuccess, cellId) => {
  navigator.clipboard.writeText(text).then(() => {
    setSuccess(cellId);
    setTimeout(() => setSuccess(null), 1000); // Remove success state after 1 second
  }).catch(err => {
    console.error('Failed to copy: ', err);
  });
};

const DataTable = ({ data }) => {
  const [success, setSuccess] = useState(null);

  // Extract columns dynamically from the data
  const columns = data.length > 0 ? Object.keys(data[0]) : [];

  return (
    <table style={{ borderCollapse: 'collapse', width: '100%' }}>
      <thead>
        <tr>
          {columns.map((col, index) => (
            <th key={index} style={{ border: '1px solid black', padding: '8px' }}>{col}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {columns.map((col, colIndex) => {
              const cellId = `${rowIndex}-${colIndex}`;
              return (
                <td
                  key={colIndex}
                  onClick={() => copyToClipboard(row[col] || '', setSuccess, cellId)}
                  className={`table-cell ${success === cellId ? 'success' : ''}`}
                  style={{ border: '1px solid black', padding: '8px', cursor: 'pointer' }}
                >
                  {row[col] || ''}
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DataTable;
