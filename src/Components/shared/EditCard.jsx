import { faX } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from 'primereact/button';
import React, { useRef, useState } from 'react'
import { ClipLoader } from 'react-spinners';
import { useBlur } from '../../contexts/BlurContext';
// import { Button } from '../ui/Button';

function EditCard({handleSubmit, handleX, formData, handleChange, errors, loading=false, fieldName, children}) {
  let [color] = useState("#ffffff")
  const { isFormVisible } = useBlur();
  // const {loadingEdit, stations, associations, numPassengers, carTypes, deploymentLines } = useOutletContext()
  
  const formRef = useRef(null)
  // console.log(errors)
  // const [errors, setErrors] = useState({});
  const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
  };

  return (
    <div className={`p-3 rounded-md fixed top-[30px] shadow-lg bg-white z-[100] left-1/2 transform -translate-x-1/2 blur-0 ${isFormVisible? '': 'hidden '}`}>

        { loading &&       
        <ClipLoader
          color={color}
          loading={loading}
          cssOverride={override}
          size={150}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
        }

        {!loading && 
        <form onSubmit={handleSubmit}   ref={formRef} id='edit-form'>
          <div className='flex justify-between p-3'>
            <h2 className='text-xl font-semibold'>Edit {fieldName}</h2>
            <span onClick={handleX}><FontAwesomeIcon icon={faX} className=' hover:cursor-pointer' /></span>
          </div>

          <div className='border-1'>
            {
              children
            }
          </div>

          <div className="p-3 pl-8">
            {/* <Toast ref={refValue} /> */}
            <Button
              type="submit"
              form='edit-form'
              severity='success'
              onClick={handleSubmit}
              className="btn text-white bg-blue-500 text-[15px] btn-primary mr-2 rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500 text-xs"
            >
              Update {fieldName}
            </Button>
          </div> 
        </form>}
    </div>
  )
}

export default EditCard
