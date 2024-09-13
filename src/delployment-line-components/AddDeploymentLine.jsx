import React, { useState } from 'react'
import { useEthiopianGregorian } from '../contexts/LanguageContext'
import { InputText } from 'primereact/inputtext'
import axios from 'axios'
import { apiEndpoint, headers } from '../data/AuthenticationData'
import { Navigate, useOutletContext } from 'react-router-dom'

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
    e.prevetDefault()
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
      Navigate('/Association')
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
            <label htmlFor="association_name">Deployment Origin</label>
            <InputText id="association_name" name='name' value={formData.origin} onChange={handleChange} className=' text-xs ' />

            <small id="username-help">
                Enter the deployment origin name.
            </small>
        </div>

        <div>
          <label htmlFor="association_name">Deployment Destination</label>
          <InputText id="association_name" name='name' value={formData.destina} onChange={handleChange} className=' text-xs ' />

          <small id="username-help">
              Enter the deployment destination name.
          </small>
        </div>

      </div>
    
    </form>
  )
}

export default AddDeploymentLine
