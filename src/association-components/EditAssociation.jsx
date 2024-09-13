import ErrorMessage from "../Components/shared/ErrorMessage"
import { useEthiopianGregorian } from "../contexts/LanguageContext"
import { InputMask } from "primereact/inputmask"
import { InputText } from "primereact/inputtext"
import EditCard from "../Components/shared/EditCard"

export default function EditAssociation({handleX, handleSubmit, formData, errors, handleChange}){

  const {isEthiopianOrGregorian} = useEthiopianGregorian()

  return (
    <EditCard 
      handleSubmit={handleSubmit}
      handleX={handleX}
      fieldName={'association'}
      children={
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
                  <ErrorMessage error={errors.establishment_date} />
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
      }
    />
  )
}

