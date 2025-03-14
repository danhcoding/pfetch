import React, { useState, useRef, useEffect } from 'react';
import './all.css';
function EditableDropdown({ options, label, onChange, userInput, index }) {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const handleInputChange = (e) => {
    if (onChange) {
      let inputValue = e.target.value;
      if (e.target.value === '')
        inputValue = null;
      onChange(inputValue);
    }
  };

  const handleOptionClick = (option) => {

    setShowDropdown(false);
    if (onChange) {
      onChange(option);
    }
  };

  const handleBlur = () => {
    setTimeout(() => setShowDropdown(false), 100);
  };

  const handleFocus = () => {
    setShowDropdown(true);
  };

  const handleClickOutside = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setShowDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div style={{ position: 'relative', display: 'inline-block' }} ref={dropdownRef}>
      <label style={{ marginRight: '2px' }}>{label}</label>
      <input
        type="text"
        value={userInput[index]}
        onChange={handleInputChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        style={{ marginRight: '3px' }}
      />
      {showDropdown && options && (
        <ul className="dropdown" style={{ position: 'absolute', zIndex: 1, backgroundColor: 'white', border: '1px solid #ccc', listStyleType: 'none', padding: 0, margin: 0, width: '100%' }}>
          {options.map((option, index) => (
            <li
              key={index}
              onMouseDown={(e) => { e.preventDefault(); handleOptionClick(option); }}
              style={{ padding: '5px', cursor: 'pointer' }}
              className="dropdown-item"
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default EditableDropdown;
