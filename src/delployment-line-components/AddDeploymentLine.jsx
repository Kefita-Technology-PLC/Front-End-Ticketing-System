import React, { useState } from 'react'
import { useEthiopianGregorian } from '../contexts/LanguageContext'
import { InputText } from 'primereact/inputtext'
import axios from 'axios'
import { apiEndpoint, headers } from '../data/AuthenticationData'
import { Navigate, useNavigate, useOutletContext } from 'react-router-dom'
import ErrorMessage from '../Components/shared/ErrorMessage'

function AddDeploymentLine() {

  const {handleRefresh} = useOutletContext()
  const {isEthiopianOrGregorian} = useEthiopianGregorian()
  const [errors, setErrors] = useState({})
  const [showSuccess, setShowSuccess] = useState(false)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    origin: '',
    destination: '',
  })
  const navigate = useNavigate()


  const handleChange = (e) =>{
    setFormData((prevData) => {
      const {name, value} = e.target
      return{
        ...prevData,
        [name] : value
      }
    })
  }

  const handleSubmit = async(e)=>{
    e.preventDefault()
    setErrors({})

    try{
      await axios.post(`${apiEndpoint}/v1/deployment-lines`, formData, {headers})
      setLoading(false)
      setLoading(false)
      setShowSuccess(true)

      setTimeout(()=>{
        setShowSuccess(false)
      }, 3000)
      handleRefresh()
      navigate('/deployment-lines')
    }catch(error){
      setLoading(false)
      if (error.response && error.response.data.errors) {
        setErrors(error.response.data.errors);
      } 
    }
  }


  return (
    <form onSubmit={handleSubmit} className='p-5 bg-white outline-1 outline-gray-900 rounded-xl max-w-[500px] mx-auto'>
      <div className='flex flex-col gap-y-6'>

        <div className="flex flex-column gap-2">
            <label htmlFor="origin">Deployment Origin</label>
            <InputText id="origin" name='origin' value={formData.origin} onChange={handleChange} className=' text-xs ' />

            <small id="username-help">
                Enter the deployment origin name.
            </small>

            <ErrorMessage 
              error={errors.origin}
            />
        </div>

        <div className="flex flex-column gap-2">
          <label htmlFor="destination">Deployment Destination</label>
          <InputText id="destination" name='destination' value={formData.destination} onChange={handleChange} className=' text-xs ' />

          <small id="username-help">
              Enter the deployment destination name.
          </small>
          <ErrorMessage 
            error={errors.destination}
          />
        </div>

        <div className="p-3 pl-8">
          <button
            type="submit"
            className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
            disabled={loading}
          >
            {loading ? 'Adding...' : 'Add Deployment'}
          </button>
        </div>

      </div>
    
    </form>
  )
}

export default AddDeploymentLine
