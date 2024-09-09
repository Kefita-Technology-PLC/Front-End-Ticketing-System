import React, { useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import { InputText } from 'primereact/inputtext'
import { InputMask } from "primereact/inputmask"
import { useEthiopianGregorian } from '../contexts/LanguageContext'

function AddAssociation() {
  const {stations} = useOutletContext()
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const {isEthiopianOrGregorian} = useEthiopianGregorian()

  const [formData, setFormData] = useState({
    name: '',
    establishment_date: '',
    amharic: isEthiopianOrGregorian || false,
  })

  const handleSubmit = () =>{
    
  }

  const handleChange = (e) => {
    setFormData((prevData) => {

      const {name, value} = e.target

      return {
        ...prevData,
        [name] : value
      }
    });
  }
  console.log(formData)

  return (
    <form onSubmit={handleSubmit} className='p-5 bg-white outline-1 outline-gray-900 rounded-xl max-w-[500px] mx-auto'>
      {/* <h2>Add Associations</h2> */}
      <div className='flex flex-col gap-y-6'>
        <div className="flex flex-column gap-2">
              <label htmlFor="association_name">Association Name</label>
              <InputText id="association_name" name='name' value={formData.name} onChange={handleChange} className=' text-xs ' />

              <small id="username-help">
                  Enter the association name.
              </small>
  
        </div>

            {
              isEthiopianOrGregorian ? (
                <div className="flex flex-column gap-2">
                  <label htmlFor="establishment_date">Establishment Date</label>
                  <InputMask id="establishment_date" name='establishment_date' value={formData.establishment_date} onChange={handleChange} className=' text-xs ' mask='12-03-1995' />
    
                  <small id="username-help">
                      Enter the establishment Date.
                  </small>
    
              </div>
              ):(
                <div className='flex flex-col gap-2'>
                  <label htmlFor="establishment_date">Establishment Date</label>
                  <input type="date" />
                  <small>
                    Pick a date
                  </small>
                </div>
              )
            }
            





      </div>

    </form>
  )
}

export default AddAssociation
