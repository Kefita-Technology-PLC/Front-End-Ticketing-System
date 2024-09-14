import React, { useState } from 'react'
import {  useNavigate, useOutletContext } from 'react-router-dom'
import { InputText } from 'primereact/inputtext'
import { InputMask } from "primereact/inputmask"
import { useEthiopianGregorian } from '../contexts/LanguageContext'
import { Button } from "../Components/ui/Button"
import { Input } from "../Components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "../Components/ui/popover"
import { CalendarIcon } from 'lucide-react'
import axios from 'axios'
import { apiEndpoint, headers } from '../data/AuthenticationData'
import ErrorMessage from '../Components/shared/ErrorMessage'
// import { CalenderIcon } from 'lucide-react'

function AddAssociation() {

  const {handleRefresh} = useOutletContext()
  const [errors, setErrors] = useState({})
  const [showSuccess, setShowSuccess] = useState(false)
  const [loading, setLoading] = useState(false)
  const {isEthiopianOrGregorian} = useEthiopianGregorian()

  const [formData, setFormData] = useState({
    name: '',
    establishment_date: '',
    amharic: isEthiopianOrGregorian || false,
  })

  const navigate = useNavigate()

  const handleSubmit = async(e) =>{
    e.preventDefault()
    setErrors({})
    setLoading(true)

    try {
      await axios.post(`${apiEndpoint}/v1/associations`, formData, {headers})
      setLoading(false)
      setShowSuccess(true)

      setTimeout(()=>{
        setShowSuccess(false)
      }, 3000)
      handleRefresh()
      navigate('/Association')
    } catch (error) {
      setLoading(false)
      if (error.response && error.response.data.errors) {
        setErrors(error.response.data.errors);
      }  
    }
  }

  const handleChange = (e) => {
  
    setFormData((prevData) => {
      const {name, value} = e.target
      return {
        ...prevData,
        [name] : value
      }
    });
    console.log(formData)
  }

  // console.log(formData)

  return (
    <form onSubmit={handleSubmit} className='p-5 bg-white outline-1 outline-gray-900 rounded-xl max-w-[500px] mx-auto'>
      {/* <h2>Add Associations</h2> */}

      <div className='flex flex-col gap-y-6'>
        <div className="flex flex-column gap-2">
            <label htmlFor="association_name">Association Name</label>
            <InputText id="association_name" name='name' value={formData.name} onChange={handleChange} className=' text-xs ' />

            <small id="username-help">
                Enter the association name.
            </small>
            <ErrorMessage 
              error={errors.origin}
            />
        </div>

          {
            isEthiopianOrGregorian ? (
              <div className="flex flex-column gap-2">
                <label htmlFor="establishment_date">Establishment Date</label>
                <InputMask id="establishment_date" name='establishment_date' value={formData.establishment_date} onChange={handleChange} className=' text-xs ' mask='99/99/9999' />
  
                <small id="username-help">
                    Enter the establishment Date.
                </small>
              <ErrorMessage error={errors.establishment_date} />
            </div>
            ):(
              <div className='flex flex-col gap-2'>
                <label htmlFor="establishment_date">Establishment Date</label>
                <input type="date" name='establishment_date' value={formData.establishment_date} onChange={handleChange} className='p-2 outline outline-1 rounded-sm outline-gray-700' />
                <small>
                  Pick a date
                </small>
                {/* <SimpleDatePicker /> */}
                <ErrorMessage error={errors.establishment_date} />
              </div>
            )
          }
      </div>

      <div className="p-3 pl-8">
        <button
          type="submit"
          className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
          disabled={loading}
        >
          {loading ? 'Adding...' : 'Add Association'}
        </button>
      </div>

    </form>
  )
}

export default AddAssociation

function SimpleDatePicker() {
  const [date, setDate] = useState('')

  const handleDateChange = (e) => {
    setDate(e.target.value)
  }

  const formatDate = (dateString) => {
    if (!dateString) return 'Select date'
    const [year, month, day] = dateString.split('-')
    return `${month}/${day}/${year}`
  }

  return (
    <div className="w-full max-w-sm">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-full justify-start text-left font-normal">
            <CalendarIcon className="mr-2 h-4 w-4" />
            {formatDate(date)}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Input
            type="date"
            value={date}
            onChange={handleDateChange}
            className="border-none focus:ring-0"
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
