import React, { useState, useRef, useEffect } from "react";

const Select = ({ id, value, options, placeholder, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Handle selecting an option
  const handleSelect = (option) => {
    // Notify the parent component with the selected value
    onChange(option.value);
    setIsOpen(false); // Close the dropdown after selection
  };

  // Close dropdown if clicked outside
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  // Add event listener for clicks outside of the dropdown
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={dropdownRef}
      onClick={(e) => {
        e.stopPropagation(); // Prevent click from closing dropdown
        setIsOpen(!isOpen); // Toggle dropdown visibility
      }}
      className="relative"
    >
      {/* Display selected value or placeholder */}
      <div
        id={id}
        className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm bg-white text-dark-highlight h-full justify-center items-center flex select-none hover:text-dark-highlight"
      >
        {value
          ? options.find((option) => option.value === value)?.label
          : placeholder}
      </div>

      {/* Dropdown options */}
      {isOpen && (
        <div className="absolute text-center top-full w-full bg-dark border border-dark-selected rounded-lg select-none mt-1 z-50">
          <div className="max-h-40 overflow-y-auto">
            {options.map((option) => (
              <div
                key={option.value}
                onClick={() => handleSelect(option)} // Handle option selection
                className="p-2 cursor-pointer bg-white select-none border border-dark-selected"
              >
                {option.label}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Select;
