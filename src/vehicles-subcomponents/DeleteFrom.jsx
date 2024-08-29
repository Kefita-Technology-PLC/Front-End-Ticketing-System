import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useBlur } from '../contexts/BlurContext'
import React from 'react'
import { faTrash, faX } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'

function DeleteFrom({handleX, formData, changeFlag}) {
  const {isFormVisible, toggleFormVisibility} = useBlur()
  const apiEndpoint = process.env.REACT_APP_API_ENDPOINT;

  const handleSubmit = (event) =>{
    event.preventDefault()
    const token = localStorage.getItem('token')
    const headers = {
      Authorization: `Bearer ${token}`
    }
    axios
    .delete(`${apiEndpoint}/v1/vehicles/${formData.id}`, {headers})
    .then((response) => {
      console.log(response.data.message)
    })
    .catch((err) => {
      console.error("Error", err)
    })
    toggleFormVisibility()
    changeFlag()
  }

  return (
    <form className={`p-10 rounded-md fixed top-[50px] shadow-lg bg-white z-[100] left-1/2 transform -translate-x-1/2 blur-0 ${isFormVisible? '': 'hidden '}`} onSubmit={handleSubmit}>
      <div className='flex justify-between items-center gap-x-[150px] '>
        <h2 className='text-xl font-semibold'>Delete Vehicle</h2>
        <span onClick={handleX}><FontAwesomeIcon icon={faX} className=' hover:cursor-pointer' /></span>
      </div>

      <p className='text-xs text-red-500 py-3'>Are you sure you want to delete this vehicle?</p>
      <div className='flex text-xs justify-between uppercase p-3 font-semibold pl-1'>
        <span>Code</span><span>Plate No</span><span>Type</span>
      </div>
      <div className='flex p-3 bg-[#f7f7f7] justify-between rounded-sm'>
          <span>{formData.code}</span>
          <span>{formData.plate_number}</span>
          <span className=' capitalize'>{formData.car_type.replace('_', ' ')}</span>
        </div>
      <button type='submit' className='text-xs text-red-500 p-3 outline ouline-red-500 outline-1 rounded-sm mt-4 hover:bg-red-500 hover:text-white'><FontAwesomeIcon icon={faTrash} /> Delete</button>
    </form>
  )
}

export default DeleteFrom
