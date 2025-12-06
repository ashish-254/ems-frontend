import React from 'react';
import '../../styles/popup.css';
const PopUpReadMore = ({ message, onClose}) => {
  return (
    <div className="custom-alert-readmore">
      <div className="custom-alert-content-readmore">
        <p>{message}</p>
        <div className="close-alert-div-readmore">
          <button className='close-alert-readmore' onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
  
};

export default PopUpReadMore;
