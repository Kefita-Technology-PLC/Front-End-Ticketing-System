import EditForm from '../../vehicles-subcomponents/EditForm';
import { useBlur } from '../../contexts/BlurContext';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import DeleteFrom from '../../vehicles-subcomponents/DeleteFrom';
import Skeleton from 'react-loading-skeleton';
import { headers, apiEndpoint } from "../../data/AuthenticationData";
import { levels, codes } from '../../data/VehicleData';

function Search({ vehiclesData }) {
  const {vehicles, setVehicles, handleRefresh, loading, stations} = useOutletContext()
  const { isFormVisible, toggleFormVisibility } = useBlur();

  const [filteredVehicles, setFilteredVehicles] = useState([]);
  const [searchInput, setSearchInput] = useState('');
 
  const [error, setError] = useState(null);
  const [errors, setErrors] = useState({})
  const [selectedStation, setSelectedStation] = useState('');
  const [editVehicleId, setEditVehicleId] = useState(null);
  const [deleteVehicleId, setDeleteVehicleId] = useState(null)

    // State for editing vehicle
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false)
  const [formData, setFormData] = useState({
    id: null,
    station_name: '',
    association_name: '',
    plate_number: '',
    code: '',
    level: '',
    number_of_passengers: '',
    car_type: '',
    deployment_line_id: ''
  });

 

  const handleX = ()=>{
    toggleFormVisibility()
    setErrors({})
  }

  // Function to handle input change
  const handleInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  // Handle changes in station dropdown
  const handleStationChange = (event) => {
    setSelectedStation(event.target.value);
  };

  // Handle form input changes
  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };


  // Handle form submission for editing
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission


    try{
      const token = localStorage.getItem('token');
      const headers = { Authorization: `Bearer ${token}` };
  
      const response = await axios.patch(`${apiEndpoint}/v1/vehicles/${formData.id}`, formData, { headers },)

    
      setVehicles((prevVehicles) =>
        prevVehicles.map((vehicle) =>
          vehicle.id === formData.id ? response.data.data : vehicle
        )
      );

      setEditVehicleId(null);
      setIsEditing(false); // Exit editing mode
      setFormData({});
      toggleFormVisibility()
      handleRefresh();

    }catch (error){
    // Check if the error response is a validation error
    if (error.response && error.response.status === 422) {
      // Set the validation errors in the state
      setErrors(error.response.data.errors || {});
    } else {
      // Set a generic error message if the error is not a validation error
      setError('Failed to update vehicle.');
    }
  }
  };

  // Handle cancel edit
  const cancelEdit = () => {
    setEditVehicleId(null);
    setFormData({});
  };

  // Filter vehicles based on search input and selected station
  useEffect(() => {
    const lowerCasedSearch = selectedStation.toLowerCase();
    if (selectedStation.trim() === ''){
      setFilteredVehicles(vehicles)
    }else{
      setFilteredVehicles( vehicles.filter(vehicle => vehicle.station && vehicle.station.id === lowerCasedSearch))
    }

  }, [searchInput, selectedStation, vehicles]);

  // Filter vehicles whenever the search input changes
  useEffect(() => {
    if (searchInput.trim() === '') {
      setFilteredVehicles(vehicles);
    } else {
      setFilteredVehicles(
        vehicles.filter((vehicle) =>
          vehicle.plate_number.toLowerCase().includes(searchInput.toLowerCase())
        )
      );
    }
  }, [searchInput, vehicles]);

  // Fetch vehicle data when editing starts
  useEffect(() => {
  
    if (editVehicleId || deleteVehicleId) {
      axios
        .get(`${apiEndpoint}/v1/vehicles/${editVehicleId || deleteVehicleId}`, { headers })
        .then((response) => {
          
          setFormData({
            id: response.data.data.id,
            station_name: response.data.data.station ? response.data.data.station.name : '',
            association_name: response.data.data.association ? response.data.data.association.name : '',
            plate_number: response.data.data.plate_number,
            code: response.data.data.code,
            level: response.data.data.level,
            number_of_passengers: response.data.data.number_of_passengers,
            car_type: response.data.data.car_type,
            deployment_line_id: response.data.data.deployment_line_id,
          });
          
        })
        .catch((err) => {
          setError('Failed to fetch vehicle data.', err);
    

        });
    }
  }, [editVehicleId, deleteVehicleId]);
  

  const handleEditClick = (vehicleId) => {
    setEditVehicleId(vehicleId); // Set the vehicle ID to edit
    setError(null);
    setIsEditing(true); // Set editing mode to true
    setIsDeleting(false)
    toggleFormVisibility()
  };

  const handleDeleteClick = (deleteVehicleId) => {
    setDeleteVehicleId(deleteVehicleId)
    setIsDeleting(true)
    setIsEditing(false)
    toggleFormVisibility()
  }


  return (
    <div>
      <div className={`${isFormVisible ? 'blur-sm': ''}`}>
        <div className=''>
          <form onSubmit={(e) => e.preventDefault()} className='flex items-center m-4 gap-x-3' >
            <input 
              className='p-2 rounded-lg ring-1'
              type="search"
              placeholder="Enter plate number"
              value={searchInput}
              onChange={handleInputChange}
            />
          </form>
        </div>

        {/* Display error message */}
        {error && <p style={{ color: 'red' }}>{error}</p>}

        {/* Display filtered vehicle data */}
        <table className='w-full border-collapse'>
          <thead className='bg-gray-200'>
            <tr className='uppercase font-semibold'>
              <th>#No</th>
              <th className='px-4 py-2 text-left'>Plate Number</th>
              <th className='px-4 py-2 text-left'>Station</th>
              <th className='px-4 py-2 text-left'>Association</th>
              <th className='px-4 py-2 text-left'>Car Type</th>
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
              filteredVehicles.length > 0 ? (
                filteredVehicles.slice(0,15).map((vehicle, index) => {
                  return(
                  <tr key={vehicle.id} className='bg-white border-b'>
                    <td className='px-4 py-2'>{index + 1}</td>
                    <td className='px-4 py-2'>{vehicle.plate_number}</td>
                    <td className='px-4 py-2'>{vehicle.station ? vehicle.station.name : 'Null'}</td>
                    <td className='px-4 py-2'>{vehicle.association ? vehicle.association.name : 'Null'}</td>
                    <td className='px-4 py-2'>{vehicle.car_type ? vehicle.car_type : 'Null'}</td>
                    <td className='flex items-center space-x-4 px-4 py-2'>
                      <button 
                        className='px-2 py-1 rounded-md text-blue-500 text-xs'
                        onClick={() => handleEditClick(vehicle.id)}
                      >
                        <FontAwesomeIcon icon={faEdit} /> Edit
                      </button>
                      <button 
                        className='px-2 py-1 rounded-md text-red-500 text-xs'
                        onClick={() => handleDeleteClick(vehicle.id)}
                      >
                        <FontAwesomeIcon icon={faTrash} /> Delete
                      </button>
                    </td>
                  </tr>
                )})
              ) : (
                <tr>
                  <td colSpan="6" className='text-center py-4'>No vehicles found.</td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>

      {/* Conditional rendering of the edit form */}
      {isEditing && (
          <EditForm  
          handleSubmit={handleSubmit}
          handleX={handleX}
          errors={errors}
          formData={formData}
          handleChange={handleChange}
          codes={codes}
          levels={levels}
          cancelEdit={cancelEdit}
          />
        )}
        {isDeleting && (
          <DeleteFrom 
            handleX={handleX}
            formData={formData}
            changeFlag={handleRefresh}
          />
        )}
    </div>
  );
}

export default Search;
