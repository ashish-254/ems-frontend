import React from 'react';
export default function Button({className, type, onClick, buttonText, disabled}) {
  return (
      <button className={className} type={type} onClick={onClick} disabled={disabled}>
        {buttonText}
      </button>
  )
} 
