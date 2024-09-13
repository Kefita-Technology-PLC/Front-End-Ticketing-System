import React from 'react'
import DeleteCard from '../Components/shared/DeleteCard'

function DeleteAssociation({handleX, formData, changeFlag}) {
  return (
    <DeleteCard 
      handleX={handleX}
      formData={formData}
      changeFlag={changeFlag}
      requestField={'associations'}
      feildName={'association'}
      children={
        <>
          <div className='flex text-xs justify-between uppercase p-3 font-semibold pl-1'>
            <span>Name</span>
          </div>

          <div className='flex p-3 bg-[#f7f7f7] justify-between rounded-sm'>
              <span>{formData.name}</span>
          </div>
        </>
      }
    />


  )
}

export default DeleteAssociation
