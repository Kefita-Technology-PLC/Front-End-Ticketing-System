import { useBlur } from '../contexts/BlurContext'
import { useEthiopianGregorian } from '../contexts/LanguageContext'
import { faCheck, faEdit, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Skeleton from 'react-loading-skeleton'
import { useOutletContext } from 'react-router-dom'
import { apiEndpoint } from '../data/AuthenticationData'
import EditAssociation from './EditAssociation'
import DeleteAssociation from './DeleteAssociation'
import ErrorMessage from '../Components/shared/ErrorMessage'


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

  console.log('loading')
  const [formData, setFormData] = useState({
    id: null,
    name: '',
    establishment_date: '',
    amharic: isEthiopianOrGregorian
  })

  console.log(formData)
    // Handle form input changes
  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
    console.log('handle change', formData)
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

  useEffect(()=>{
    if (editAssociationId || deleteAssociationId){
      const token = localStorage.getItem('token')
      const headers = {
        Authorization: `Bearer ${token}`
      }
      console.log('cooking')
      axios
      .get(`${apiEndpoint}/v1/associations/${editAssociationId || deleteAssociationId}`, {headers})
      .then((response)=>{
        setFormData({
          id: response.data.data.id,
          name: response.data.data.name,
          establishment_date: response.data.data.establishment_date
        })
        console.log(response.data.data)
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



  // Handle form submission for editing
  const handleSubmit = async (event) =>{
    event.preventDefault()
    formData.amharic = isEthiopianOrGregorian
    console.log(formData)

    try{
      const token = localStorage.getItem('token')
      const headers = {
        Authorization: `Bearer ${token}`
      }
      const response = await axios.patch(`${apiEndpoint}/v1/associations/${formData.id}`, formData, {headers},)

      console.log('response',response)

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
    }catch(error){
          // Check if the error response is a validation error
      if (error.response && error.response.status === 422) {
        // Set the validation errors in the state
        setErrors(error.response.data.errors || {});
        // console.log(errors)
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
              placeholder="Enter a association name"
              value={searchInput}
              onChange={handleInputChange}
            />
          </form>
        </div>

        {error && <ErrorMessage error={error} /> }
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
                  // console.log(association)
                  return(
                  <tr key={association.id} className='bg-white border-b'>
                    <td className='px-4 py-2'>{index + 1}</td>
                    <td className='px-4 py-2'>{association.name}</td>
                    <td className='px-4 py-2'>{ association.stations ?
                    association.stations.map((station) =>
                     (<span>{station.name}</span>)) : 'No Stations'
                     }{
                      <>
                        <button title='Add more stations'  className='text-[13px] p-[2px] rounded-md text-white bg-blue-500 px-2 ml-2'>
                          <FontAwesomeIcon icon={faPlus} />
                        </button>
                     
                      </>

                     }</td>
                     
                    <td className='px-4 py-2'>{association.establishment_date ?  new Date(association.establishment_date).toLocaleDateString(): 'N/A' }</td>
                    <td className='px-4 py-2'>{
                      association.created_at === association.updated_at ? 'No' : <><FontAwesomeIcon icon={faCheck} /> {association.updated_at ? new Date(association.updated_at).toLocaleDateString() : ''}</>
                    }</td>

                    <td className='px-4 py-2'>{new Date(association.created_at).toLocaleTimeString()}</td>

                    <td className='flex items-center space-x-4 px-4 py-2'>
                      <button 
                        className='px-2 py-1 rounded-md text-blue-500 text-xs cursor-pointer'
                        onClick={() => handleEditClick(association.id)}
                      >
                        <FontAwesomeIcon icon={faEdit} /> Edit
                      </button>
                      <button 
                        className='px-2 py-1 rounded-md text-red-500 text-xs cursor-pointer'
                        onClick={() => handleDeleteClick(association.id)}
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
        {isEditing &&
          <EditAssociation
            handleX={handleX}
            handleSubmit={handleSubmit}
            formData={formData}
            errors={errors}
            handleChange={handleChange}
          
          />
        }{
          isDeleting &&
          <DeleteAssociation 
            handleX={handleX}
            formData={formData}
            changeFlag={handleRefresh}
          />
        }

    </div>
  )
}

export default UpdateOrDelete