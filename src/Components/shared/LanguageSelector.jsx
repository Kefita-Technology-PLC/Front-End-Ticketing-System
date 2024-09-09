
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
    
    <select className="p-2 rounded-lg outline-1 outline-black" name="" id="" onChange={(e) => {
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
      <option value="en"><span>🌐</span> <span>English</span></option>
      <option value="amh"><span>🌐</span> <span>አማርኛ</span> </option>
      <option value="oro"><span>🌐</span> <span>Oromifa</span></option>
    </select>
  )
}

export default LanguageSelector
