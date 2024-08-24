import React, { createContext, useContext, useState } from 'react';

// Create the context
const BlurContext = createContext();

// Create a provider component
export const BlurProvider = ({ children }) => {
  const [isFormVisible, setIsFormVisible] = useState(false);

  const toggleFormVisibility = () => {
    setIsFormVisible((prev) => !prev);
  };

  return (
    <BlurContext.Provider value={{ isFormVisible, toggleFormVisibility }}>
      {children}
    </BlurContext.Provider>
  );
};

// Create a custom hook for easy context consumption
export const useBlur = () => useContext(BlurContext);
