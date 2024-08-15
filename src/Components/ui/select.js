// src/Components/UI/Select.js
import React from "react";

export const Select = ({
  id,
  value,
  onChange,
  options = [],
  className,
  required = false,
}) => {
  return (
    <select
      id={id}
      value={value}
      onChange={onChange}
      className={`block w-full  px-3 py-4 border-2  border-gray-700  text-gray-500 font-medium rounded-md shadow-sm focus:outline-none  text-sm focus:border-neutral-400 sm:text-sm ${className}`}
      required={required}
    >
      <option value="" disabled hidden>
        Select an option
      </option>
      {options.map((option, index) => (
        <option key={index} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};
