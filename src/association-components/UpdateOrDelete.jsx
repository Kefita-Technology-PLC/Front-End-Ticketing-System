import { useBlur } from '../contexts/BlurContext'
import { useEthiopianGregorian } from '../contexts/LanguageContext'
import { faCheck, faEdit, faTrash, faX } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import Skeleton from 'react-loading-skeleton'
import { useOutletContext } from 'react-router-dom'
import  ClipLoader  from 'react-spinners/ClipLoader'
import { apiEndpoint, headers } from '../data/AuthenticationData'
import { Button } from '../Components/ui/Button'
import { Toast } from 'primereact/toast'
import { InputText } from 'primereact/inputtext'
import { InputMask } from 'primereact/inputmask'
import FormButton from '../Components/shared/FormButton'
import ErrorMessage from '@/Components/shared/ErrorMessage'


function UpdateOrDelete() {
  const {associations, setAssociations, loading,handleRefresh} = useOutletContext()
  const {isEthiopianOrGregorian} = useEthiopianGregorian()

  const [error, setError] = useState(null)
  const [errors, setErrors] = useState({})
  const {isFormVisible, toggleFormVisibility} = useBlur()
  const [searchInput, setSearchInput] = useState('')
  const [filteredAssociations, setFilterdAssociations] = useState([])
  const [editAssociationId, setEditAssociationId] = useState(null)
  const [deleteAssociationId, setDeleteAssociationId] = useState(null)



  const [formData, setFormData] = useState({
    id: null,
    name: '',
    establishment_date: '',
    amharic: isEthiopianOrGregorian
  })

    // Handle form input changes
  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  // State for editing vehicle
  const [ isEditing, setIsEditing] = useState(false)
  const [ isDeleting, setIsDeleting] = useState(false)


  const handleInputChange = (e)=>{
    setSearchInput(e.target.value)
  }

  useEffect(()=>{
    if( searchInput.trim() === ''){
      setFilterdAssociations(associations)
    }else {
      setFilterdAssociations(
        associations.filter((association) => 
        association.name.toLowerCase().includes(searchInput.toLowerCase()))
      )
    }
  },[searchInput, associations])

  useEffect(()=>{
    if (editAssociationId || deleteAssociationId){
      axios
      .get(`${apiEndpoint}/v1/vehicles/${editAssociationId || deleteAssociationId}`, {headers})
      .then((response)=>{
        setFormData({
          id: response.data.data.id,
          name: response.data.data.name,
          establishment_date: response.data.data.establishment_date
        })
      })
      .catch((err)=>{
        setError('Failed to fetch vehicle data.', err)
      })
    }
  }, [editAssociationId, deleteAssociationId])

  const handleX = ()=>{
    toggleFormVisibility()
    setErrors({})
  }

  const handleEditClick = (associationId)=>{
    setEditAssociationId(associationId)
    setError(null)
    setIsEditing(true)
    setIsDeleting(false)
    toggleFormVisibility()
  }

  const handleDeleteClick = (associationId) =>{
    setDeleteAssociationId(associationId)
    setIsDeleting(true)
    setIsEditing(false)
    toggleFormVisibility()
  }

  // Handle form submission for editing
  const handleSubmit = async (event) =>{
    event.preventDefault()

    try{
      const response = await axios.patch(`${apiEndpoint}/v1/associations/${formData.id}`, formData, {headers})

      setAssociations((prevAssociations) => 
        prevAssociations.map((association)=>
          association.id === formData.id ? response.data.data : association
        )
      )

      setEditAssociationId(null)
      setIsEditing(false)
      setFormData({})
      toggleFormVisibility()
      handleRefresh()
    }catch(err){
          // Check if the error response is a validation error
      if (error.response && error.response.status === 422) {
        // Set the validation errors in the state
        setErrors(error.response.data.errors || {});
      } else {
        // Set a generic error message if the error is not a validation error
        setError('Failed to update vehicle.');
      }
    }
  }


  return (

    <div>
      <div className={`${isFormVisible ? 'blur-sm': ''}`}>

        <div className=''>
          <form onSubmit={(e)=> e.preventDefault()}>
            <input 
              className='p-2 rounded-lg ring-1'
              type="search"
              placeholder="Enter plate number"
              value={searchInput}
              onChange={handleInputChange}
            />
          </form>
        </div>

        {error && <p style={{ color: 'red' }}>{error}</p> }
        <table className='w-full border-collapse'>
          <thead className='bg-gray-200'>
            <tr className='uppercase font-semibold'>
              <th>#No</th>
              <th className='px-4 py-2 text-left'>Name</th>
              <th className='px-4 py-2 text-left'>Stations</th>
              <th className='px-4 py-2 text-left'>Establishment Date </th>
              <th className='px-4 py-2 text-left'>Edited</th>
              <th className='px-4 py-2 text-left'>Registerd At</th>
              <th className='px-4 py-2 text-left'>Actions</th>
            </tr>
          </thead>
          <tbody>

            {loading ? (
              // Skeleton placeholders for each table row
              Array.from({ length: 15 }).map((_, index) => (
                <tr key={index} className='bg-white border-b'>
                  <td className='px-4 py-2'><Skeleton width={20} /></td>
                  <td className='px-4 py-2'><Skeleton width={'100%'} /></td>
                  <td className='px-4 py-2'><Skeleton width={'100%'} /></td>
                  <td className='px-4 py-2'><Skeleton width={'100%'} /></td>
                  <td className='px-4 py-2'><Skeleton width={'100%'} /></td>
                  <td className='px-4 py-2 '><Skeleton width={'100%'} /></td>
                </tr>
              ))
            ) : (
              filteredAssociations.length > 0 ? (
                filteredAssociations.slice(0,15).map((association, index) => {
                  console.log(association)
                  return(
                  <tr key={association.id} className='bg-white border-b'>
                    <td className='px-4 py-2'>{index + 1}</td>
                    <td className='px-4 py-2'>{association.name}</td>
                    <td className='px-4 py-2'>{ association.stations ?
                    association.stations.map((station) =>
                     (<span>{station.name}</span>)) : 'No Stations'
                     }</td>
                     
                    <td className='px-4 py-2'>{association.establishment_date ?  new Date(association.establishment_date).toLocaleDateString(): 'N/A' }</td>
                    <td className='px-4 py-2'>{
                      association.created_at === association.updated_at ? 'No' : <><FontAwesomeIcon icon={faCheck} /> {new Date(association.updated_at.toLocaleDateString())}</>
                    }</td>

                    <td className='px-4 py-2'>{new Date(association.created_at).toLocaleTimeString()}</td>

                    <td className='flex items-center space-x-4 px-4 py-2'>
                      <button 
                        className='px-2 py-1 rounded-md text-blue-500 text-xs'
                        onClick={() => handleEditClick(association.id)}
                      >
                        <FontAwesomeIcon icon={faEdit} /> Edit
                      </button>
                      <button 
                        className='px-2 py-1 rounded-md text-red-500 text-xs'
                        onClaick={() => handleDeleteClick(association.id)}
                      >
                        <FontAwesomeIcon icon={faTrash} /> Delete
                      </button>
                    </td>
                  </tr>
                )})
              ) : (
                <tr>
                  <td colSpan="6" className='text-center py-4'>No association found.</td>
                </tr>
              )
            )}
          </tbody>
        </table>

      </div>
      {
        <EditAssociation
          handleX={handleX}
          handleSubmit={handleSubmit}
          formData={formData}
          errors={errors}
          handleChange={handleChange}
      />
      }

    </div>
  )
}

export default UpdateOrDelete

function EditAssociation({handleX, handleSubmit, formData, errors, handleChange}){

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
                  <div className="flex flex-column gap-2">
                    <label htmlFor="establishment_date">Establishment Date</label>
                    <InputMask id="establishment_date" name='establishment_date' value={formData.establishment_date} onChange={handleChange} className=' text-xs ' mask='99/99/9999' />
      
                    <small id="username-help">
                        Enter the establishment Date.
                    </small>
                </div>
                ):(
                  <div className='flex flex-col gap-2'>
                    <label htmlFor="establishment_date">Establishment Date</label>
                    <input type="date" name='establishment_data' value={formData.establishment_date} onChange={handleChange} className='p-2 outline outline-1 rounded-sm outline-gray-700' />
                    <small>
                      Pick a date
                    </small>
                    {/* <SimpleDatePicker /> */}
                  </div>
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
              text={'Update Vehicle'}
              handleSubmit={handleSubmit}
            />
          </div>
        </form>}
    </div>
  )
}