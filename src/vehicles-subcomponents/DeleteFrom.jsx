import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useBlur } from '../contexts/BlurContext'
import React from 'react'
import { faTrash, faX } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import DeleteCard from '../Components/shared/DeleteCard'

function DeleteFrom({handleX, formData, changeFlag}) {

  return (
    <DeleteCard 
      handleX={handleX}
      formData={formData}
      changeFlag={changeFlag}
      requestField={'vehicles'}
      feildName={'vehicles'}
      children={
        <>
          <div className='flex text-xs justify-between uppercase p-3 font-semibold pl-1'>
            <span>Code</span><span>Plate No</span><span>Type</span>
          </div>
          <div className='flex p-3 bg-[#f7f7f7] justify-between rounded-sm'>
              <span>{formData.code}</span>
              <span>{formData.plate_number}</span>
              <span className=' capitalize'>{formData.car_type.replace('_', ' ')}</span>
            </div>
          </>
      }
    />
  )
}

export default DeleteFrom
