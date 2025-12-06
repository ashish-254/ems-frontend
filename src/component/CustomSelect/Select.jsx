import React from 'react'
import '../../styles/SelectStyle.css';
export default function Select({className, name, placeholder, options, handleChange }) {
  const formatOptionValue = (value) => {
    const words = value.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase());
    return words.join(' ');
  };
  return (
    <select
      className={className}
      name={name}
      placeholder={placeholder}
      onChange={handleChange}
    >
      <option className={'default_option'} value="">{placeholder}</option>
      {options.map((item) => (
        <option key={item} value={item}>
          {formatOptionValue(item)}
        </option>
      ))}
    </select>
  )
}
