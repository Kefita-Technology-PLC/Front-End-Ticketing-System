import axios from 'axios'
import { useBlur } from '../contexts/BlurContext'
import React, { useEffect, useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import { apiEndpoint } from '../data/AuthenticationData'
import Skeleton from 'react-loading-skeleton'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'
import ErrorMessage from '../Components/shared/ErrorMessage'
import EditDeploymentLine from './EditDeploymentLine'
import DeleteDeploymentLine from './DeleteDeploymentLine'

function UpdateOrDeleteDL() {
  const {deploymentLines, setDeploymentLines, loading, handleRefresh} = useOutletContext()
  const [error, setError] = useState(null)
  const [errors, setErrors] = useState({})
  const {isFormVisible, toggleFormVisibility} = useBlur()
  const [searchInput, setSearchInput] = useState('')
  const [filteredDeploymentLines, setFilterdDeploymentLines] = useState([])
  const [editDeploymentId, setEditDeploymentId] = useState(null)
  const [deleteDeploymentId, setDeleteDeploymentId] = useState(null)

  const [formData, setFormData] = useState({
    id: null,
    origin: '',
    destination: '',
  })


  const handleChange = (event) =>{
    setFormData({
      ...formData,
      [event.target.name]: event.target.value});
  }

  const [isEditing, setIsEditing] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  const handleInputChange = (e) =>{
    setSearchInput(e.target.value)
  }

  useEffect(()=>{
    if(searchInput.trim() === '' ){
      setFilterdDeploymentLines(deploymentLines)
    }else{
      setFilterdDeploymentLines(
        deploymentLines.filter((deploymentLine)=> 
        deploymentLine.origin.toLowerCase().includes(searchInput.toLowerCase()))
      )
    }
  },[searchInput, deploymentLines])

  const handleEditClick = (deploymentId) =>{
    setEditDeploymentId(deploymentId)
    setError(null)
    setIsEditing(true)
    setIsDeleting(false)
    toggleFormVisibility()
  }

  const handleDeleteClick = (deploymentId) =>{
    setDeleteDeploymentId(deploymentId)
    setIsDeleting(true)
    setIsEditing(false)
    toggleFormVisibility()
  }

  useEffect(()=>{
    if(editDeploymentId || deleteDeploymentId){
      const token = localStorage.getItem('token')
      const headers = {
        Authorization: `Bearer ${token}`
      }
      axios
        .get(`${apiEndpoint}/v1/deployment-lines/${editDeploymentId || deleteDeploymentId}`, {headers})
        .then((reponse) =>{
          setFormData({
            id: reponse.data.data.id,
            origin: reponse.data.data.origin,
            destination: reponse.data.data.destination,
          })

        })
        .catch((error) =>{
          setError('Failed to fetch deployment line data', error)
        })
    }
  },[editDeploymentId, deleteDeploymentId])

  const handleX= ()=>{
    toggleFormVisibility()
    setErrors({})
  }



  // Handle form submission for editing
  const handleSubmit = async (event) =>{
    event.preventDefault()

    try{
      const token = localStorage.getItem('token')
      const headers = {
        Authorization: `Bearer ${token}`
      }
      const response = await axios.patch(`${apiEndpoint}/v1/deployment-lines/${formData.id}`, formData, {headers},)

      console.log('response',response)

      setDeploymentLines((prevDeploymentLines) => 
      prevDeploymentLines.map((deploymentLine)=>
          deploymentLine.id === formData.id ? response.data.data : deploymentLine
        )
      )
      setEditDeploymentId(null)
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
              placeholder="Enter a Deployment Line name"
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
              <th className='px-4 py-2 text-left'>Origin</th>
              <th className='px-4 py-2 text-left'>Destination</th>
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
              filteredDeploymentLines.length > 0 ? (
                filteredDeploymentLines.slice(0,15).map((deploymentLine, index) => {
                  // console.log(association)
                  return(
                  <tr key={deploymentLine.id} className='bg-white border-b'>
                    <td className='px-4 py-2'>{index + 1}</td>
                    <td className='px-4 py-2'>{deploymentLine.origin}</td>
                    <td className='px-4 py-2'>{ deploymentLine.destination}</td>
                    <td className='px-4 py-2'>{
                      deploymentLine.created_at === deploymentLine.updated_at ? 'No' : <><FontAwesomeIcon icon={faCheck} /> {deploymentLine.updated_at ? new Date(deploymentLine.updated_at).toLocaleDateString() : ''}</>
                    }</td>

                    <td className='px-4 py-2'>{new Date(deploymentLine.created_at).toLocaleDateString()}</td>

                    <td className='flex items-center space-x-4 px-4 py-2'>
                      <button 
                        className='px-2 py-1 rounded-md text-blue-500 text-xs cursor-pointer'
                        onClick={() => handleEditClick(deploymentLine.id)}
                      >
                        <FontAwesomeIcon icon={faEdit} /> Edit
                      </button>
                      <button 
                        className='px-2 py-1 rounded-md text-red-500 text-xs cursor-pointer'
                        onClick={() => handleDeleteClick(deploymentLine.id)}
                      >
                        <FontAwesomeIcon icon={faTrash} /> Delete
                      </button>
                    </td>
                  </tr>
                )})
              ) : (
                <tr>
                  <td colSpan="6" className='text-center py-4'>No DeploymentLine found.</td>
                </tr>
              )
            )}
          </tbody>
        </table>

      </div>
        {isEditing &&
          <EditDeploymentLine
            handleX={handleX}
            handleSubmit={handleSubmit}
            formData={formData}
            errors={errors}
            handleChange={handleChange}
          
          />
        }{
          isDeleting &&
          <DeleteDeploymentLine 
            handleX={handleX}
            formData={formData}
            changeFlag={handleRefresh}
          />
        }

    </div>
  )
}

export default UpdateOrDeleteDL
