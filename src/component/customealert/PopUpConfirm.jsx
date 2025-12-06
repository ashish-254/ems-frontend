import React from 'react';
import '../../styles/popup.css';
const PopUpConfirm = ({message, onConfirm, onClose}) => {
  return (
    <div className="custom-alert">
      <div className="custom-alert-content">
        <p>{message}</p>
        <div className="close-alert-div">
          <button className='confirm-alert' onClick={onConfirm}>Confirm</button>
          <button className='close-alert' onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
  
};

export default PopUpConfirm;
