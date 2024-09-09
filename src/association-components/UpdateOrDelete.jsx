import { useBlur } from '@/contexts/BlurContext'
import { useEthiopianGregorian } from '@/contexts/LanguageContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useRef, useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import { ClipLoader } from 'react-spinners'

function UpdateOrDelete() {



  return (

    <div>
      <EditAssociation  />
    </div>
  )
}

export default UpdateOrDelete

function EditAssociation({formData}){

  const {isEthiopianOrGregorian} = useEthiopianGregorian()
  const {isFormVisible} = useBlur()
  const {loading} = useOutletContext()
  const formRef = useRef(null)
  const [formData, setFormData] = useState({
    id: null,
    name: '',
    establishment_date: '',
    amharic: isEthiopianOrGregorian
  })

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