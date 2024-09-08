
import { useEthiopianGregorian } from '../../contexts/LanguageContext'
import React from 'react'
import { useTranslation } from 'react-i18next'

function LanguageSelector() {
  const {i18n} = useTranslation()
  const {isEthiopianOrGregorian, setIsEthiopianOrGregorian} = useEthiopianGregorian()

  const changeLanguage = (code)=>{
    i18n.changeLanguage(code)
  }

  console.log(isEthiopianOrGregorian)
  return (
    <select className="h-5 " name="" id="" onChange={(e) => {
      changeLanguage(e.target.value)
      console.log(e.target.value)

      if(e.target.value === 'amh' || e.target.value === 'oro'){
        setIsEthiopianOrGregorian(true)
        console.log('kelay')
      }else {
        setIsEthiopianOrGregorian(false)
        console.log('ketach')
      }
      
    }}>
      <option value="en">English</option>
      <option value="amh">Amharic</option>
      <option value="oro">Oromifa</option>
    </select>
  )
}

export default LanguageSelector
