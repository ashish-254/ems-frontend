import React from 'react'
import '../../styles/SelectStyle.css';
export default function CommonSelect({ className, name, placeholder, options, handleChange, showDefaultOption }) {
    return (
            <select
                type="text"
                className={className}
                name={name}
                placeholder={placeholder}
                onChange={handleChange}
            >
                {!showDefaultOption && <option className={'default_option'} value="">{placeholder}</option>}
                {options.map((item, index) => (
                    <option key={index} value={item.value}>
                        {item.label}
                    </option>
                ))}
            </select>
    )
}
