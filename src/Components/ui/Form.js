// src/Components/UI/Form.js
import React from "react";

export const Form = ({ children, onSubmit, className }) => {
  return (
    <form onSubmit={onSubmit} className={`space-y-6 ${className}`}>
      {children}
    </form>
  );
};

export const FormItem = ({ label, htmlFor, children }) => {
  return (
    <div className="flex flex-col space-y-2">
      {label && (
        <label
          htmlFor={htmlFor}
          className="block text-sm font-medium text-gray-700 "
        >
          {label}
        </label>
      )}
      {children}
    </div>
  );
};
