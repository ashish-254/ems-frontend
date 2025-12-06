import React, { useState, useEffect, useRef } from "react";
import "../../styles/CustomMultipleDropdownStyle.css";

function CustomMultipleDropdown({
    options,
    selectedOptions,
    onChange,
    placeholder,
    alreadySelectedSkills
}) {
    const [isOpen, setIsOpen] = useState(false);

    const [selectedValues, setSelectedValues] = useState(selectedOptions || []);
    useEffect(() => {
    }, [alreadySelectedSkills, selectedOptions]);

    const dropdownRef = useRef(null);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleOptionClick = (option) => {
        const updatedValues = [...selectedValues];
        const index = updatedValues.findIndex(
            (value) => value.value === option.value
        );
        if (index !== -1) {
            updatedValues.splice(index, 1);
        } else {
            updatedValues.push(option);
        }
        setSelectedValues(updatedValues);
        onChange(updatedValues);
    };

    const handleDocumentClick = (event) => {

        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsOpen(false);
        }
    };
    useEffect(() => {
        document.addEventListener("click", handleDocumentClick);
        return () => {
            document.removeEventListener("click", handleDocumentClick);
        };
    }, []);

    return (
        <div className="custom-multi-select" ref={dropdownRef}>
            <div
                className={`dropdown ${isOpen ? "open" : ""}`}
                onClick={toggleDropdown}

            >
                <div className="selected-values">
                    {selectedValues.length > 0
                        ? selectedValues.map((value, index) => (
                            <span key={value.value} className="selected-value">
                                {value.label}
                                {index < selectedValues.length - 1 ? ", " : ""}
                            </span>
                        ))
                        : placeholder}
                </div>
                <div className="dropdown-arrow" />
            </div>
            {isOpen && (
                <div className="dropdown-options">
                    {options.map((option) => (
                        <div
                            key={option.value}
                            className={`dropdown-option ${selectedValues.some((value) => value.value === option.value)
                                ? "selected"
                                : ""
                                }`}
                            onClick={() => handleOptionClick(option)}
                        >
                            {option.label}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default CustomMultipleDropdown;