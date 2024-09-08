import React, { createContext, useContext, useState } from 'react'

const LanguageContext = createContext()

export const EthiopianOrGregorian = ({children}) => {
  const [isEthiopianOrGregorian, setIsEthiopianOrGregorian] = useState(false)
  return (
    <LanguageContext.Provider value={{isEthiopianOrGregorian, setIsEthiopianOrGregorian}}>
      {children}
    </LanguageContext.Provider>
  )

}

export const useEthiopianGregorian = () => useContext(LanguageContext)