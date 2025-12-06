import React from 'react'

export default function PopUpSuccess({message, onClose}) {
    return (
        <div className="custom-alert-success">
          <div className="custom-alert-content-success">
            <p>{message}</p>
            <div className="close-alert-div-success">
              <button className='close-alert-success' onClick={onClose}>Close</button>
            </div>
          </div>
        </div>
      );
}
