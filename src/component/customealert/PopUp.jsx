import React from 'react';
import '../../styles/popup.css';
const CustomAlert = ({ message, onClose}) => {
  return (
    <div className="custom-alert">
      <div className="custom-alert-content">
        <p>{message}</p>
        <div className="close-alert-div">
          <button className='close-alert' onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
  
};

export default CustomAlert;
