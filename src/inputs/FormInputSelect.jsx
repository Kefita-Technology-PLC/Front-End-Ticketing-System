import React from 'react'
function FormInputSelect({
  name, 
  value, 
  handle, 
  error, 
  optionValue, 
  label, 
  startValue, 
  isName,
  isUnderscore,
  optionalWord
}) {
  return (
    <div>
      <label htmlFor={name} className="">{label}</label>

      <select
        id={name}
        value={value}
        name={name}
        onChange={handle}
        className="form-selectbg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:focus:ring-blue-500 dark:focus:border-blue-500"
        required
      >
        <option value="" className="">{startValue}</option>
        {optionValue.map((option, index) => (
          <option key={option.id} value={isName ? option.name : option.id} className="capitalize" >
            {!isUnderscore ? option.name.replace('-', ' '): option.name.replace('_', ' ')} {optionalWord?optionalWord:''}
          </option>
        ))}

      </select>
      { error && (
        <p className="mt-1 text-sm text-red-500 dark:text-red-400">{error[0]}</p>
      )}
    </div>
  )
}

export default FormInputSelect
