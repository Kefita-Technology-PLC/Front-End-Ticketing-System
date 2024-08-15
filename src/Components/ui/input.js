// src/Components/UI/Input.js
import React from "react";

export const Input = ({
  id,
  type = "text",
  value,
  onChange,
  placeholder,
  required = false,
  className,
}) => {
  return (
    <input
      id={id}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      className={`block w-full px-4 py-4  rounded-md shadow-sm border-2  border-gray-700 text-gray-500  ${className}`}
    />
  );
};
