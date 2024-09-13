import ErrorMessage from "../Components/shared/ErrorMessage"
import { useBlur } from "../contexts/BlurContext"
import { useEthiopianGregorian } from "../contexts/LanguageContext"
import { faX } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { InputMask } from "primereact/inputmask"
import { useRef, useState } from "react"
import { useOutletContext } from "react-router-dom"
import { ClipLoader } from "react-spinners"
import FormButton from "../Components/shared/FormButton"
import { InputText } from "primereact/inputtext"

export default function EditAssociation({handleX, handleSubmit, formData, errors, handleChange}){

  let [color] = useState("#ffffff")
  const {isEthiopianOrGregorian} = useEthiopianGregorian()
  const {isFormVisible} = useBlur()
  const {loading} = useOutletContext()
  const formRef = useRef(null)

  const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
  };
  // const formRef = useRef(null)

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
            <h2 className='text-xl font-semibold'>Edit Vehicle</h2>
            <span onClick={handleX}><FontAwesomeIcon icon={faX} className=' hover:cursor-pointer' /></span>
          </div>
          <div className="flex m-7 justify-around gap-7">

            {/* <div className="flex flex-col gap-2 w-full border-r-[2px] pr-5">
            

            </div> */}
            <div className="flex flex-col gap-2 w-full">
              <div className="flex flex-column gap-2">
                  <label htmlFor="association_name">Association Name</label>
                  <InputText id="association_name" name='name' value={formData.name} onChange={handleChange} className=' text-xs ' />

                  <small id="username-help">
                      Enter the association name.
                  </small>
              </div>
              <ErrorMessage error={errors.name} />

              {
                isEthiopianOrGregorian ? (
                  <>
                    <div className="flex flex-column gap-2">
                      <label htmlFor="establishment_date">Establishment Date</label>
                      <InputMask id="establishment_date" name='establishment_date' value={formData.establishment_date} onChange={handleChange} className=' text-xs ' mask='99/99/9999' />
        
                      <small id="username-help">
                          Enter the establishment Date.
                      </small>
                    </div>

                    <div className='hidden'>
                      <input type="text" value={isEthiopianOrGregorian} name='amharic' className='hidden' />
                    </div>
                  </>
                ):(
                  <>
                    <div className='flex flex-col gap-2'>
                      <label htmlFor="establishment_date">Establishment Date</label>
                      <input type="date" name='establishment_date' value={formData.establishment_date} onChange={handleChange} className='p-2 outline outline-1 rounded-sm outline-gray-700' />
                      <small>
                        Pick a date
                      </small>
                      {/* <SimpleDatePicker /> */}
                    </div>

                    <div className='hidden'>
                      <input type="text" value={isEthiopianOrGregorian} name='amharic' className='hidden' />
                    </div>
                  </>

                )
              }
              <ErrorMessage 
                error={errors.establishment_date}
              />
            </div>
          </div>

          <div className="p-3 pl-8">
            {/* <Toast ref={refValue} /> */}
            <FormButton
              text={'Update Association'}
              handleSubmit={handleSubmit}
            />
          </div>
        </form>}
    </div>
  )
}