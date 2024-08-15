// src/Components/UI/Button.js
import React from "react";

export const Button = ({
  type = "button",
  onClick,
  children,
  variant = "primary",
  className,
}) => {
  const baseStyles =
    "px-4 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2";
  const variants = {
    primary:
      "bg-neutral-500 hover:bg-neutral-400 text-white focus:ring-neutral-400",
    secondary:
      "bg-neutral-400 hover:bg-neutral-300 text-white focus:ring-neutral-300",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
};
