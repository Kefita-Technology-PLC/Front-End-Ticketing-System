import axios from 'axios'
import React from 'react'
import { apiEndpoint } from '../../data/AuthenticationData'

function DeleteCard({handleX, formData, changeFlag, requestField, children}) {
  const {isFormVisible, toggleFormVisibility} = useBlur()

  const handleSubmit = (event) =>{
    event.preventDefault()
    const token = localStorage.getItem('token')
    const headers = {
      Authorization: `Bearer ${token}`
    }
    axios
    .delete(`${apiEndpoint}/v1/${requestField}/${formData.id}`, {headers})
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
        <h2 className='text-xl font-semibold'>Delete Association</h2>
        <span onClick={handleX}><FontAwesomeIcon icon={faX} className=' hover:cursor-pointer' /></span>
      </div>

      <p className='text-xs text-red-500 py-3'>Are you sure you want to delete this association from the system?</p>

      <div className='border-1'>
        {
          children
        }
      </div>
      <button type='submit' className='text-xs text-red-500 p-3 outline ouline-red-500 outline-1 rounded-sm mt-4 hover:bg-red-500 hover:text-white'><FontAwesomeIcon icon={faTrash} /> Delete</button>
    </form>
  )
}

export default DeleteCard
