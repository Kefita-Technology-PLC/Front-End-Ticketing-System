import EditForm from '../../vehicles-subcomponents/EditForm';
import { useBlur } from '../../contexts/BlurContext';
import FormInputSelect from '../../inputs/FormInputSelect';
import { faDeleteLeft, faEdit, faTrash, faX } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

function Search({ vehiclesData }) {
  const [vehicles, setVehicles] = useState(vehiclesData || []);
  const [filteredVehicles, setFilteredVehicles] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [stations, setStations] = useState([]);
  const [associations, setAssociations] = useState([]);
  const [carTypes, setCarTypes] = useState([]);
  const [deploymentLines, setDeploymentLines] = useState([]);

  const [editVehicleId, setEditVehicleId] = useState(null);
  const [errors, setErrors] = useState({});
  const apiEndpoint = process.env.REACT_APP_API_ENDPOINT;

    // State for editing vehicle
  const [isEditing, setIsEditing] = useState(false);
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

  const { isFormVisible, toggleFormVisibility } = useBlur();

  const handleX = ()=>{
    toggleFormVisibility()
  }

  // Function to handle input change
  const handleInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  // Handle form input changes
  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };


  // Handle form submission for editing
  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission
    const token = localStorage.getItem('token');
    const headers = { Authorization: `Bearer ${token}` };
    setLoading(true);
    axios
      .patch(`${apiEndpoint}/v1/vehicles/${formData.id}`, formData, { headers })
      .then((response) => {
        setLoading(false);
        setVehicles((prevVehicles) =>
          prevVehicles.map((vehicle) =>
            vehicle.id === formData.id ? response.data.data : vehicle
          )
        );
        console.log(response.data);
        setEditVehicleId(null);
        setIsEditing(false); // Exit editing mode
        setFormData({});
      })
      .catch((err) => {
        setError('Failed to update vehicle.');
        setLoading(false);
      });
  };
  

  // Handle cancel edit
  const cancelEdit = () => {
    setEditVehicleId(null);
    setFormData({});
  };

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
    const token = localStorage.getItem('token');
    const headers = { Authorization: `Bearer ${token}` };
  
    if (editVehicleId) {
      setLoading(true);
      axios
        .get(`${apiEndpoint}/v1/vehicles/${editVehicleId}`, { headers })
        .then((response) => {
          
          setFormData({
            id: response.data.data.id,
            station_name: response.data.data.station.name,
            association_name: response.data.data.association.name,
            plate_number: response.data.data.plate_number,
            code: response.data.data.code,
            level: response.data.data.level,
            number_of_passengers: response.data.data.number_of_passengers,
            car_type: response.data.data.car_type,
            deployment_line_id: response.data.data.deployment_line_id,
          });
          
          console.log(formData)
          setLoading(false);
        })
        .catch((err) => {
          setError('Failed to fetch vehicle data.');
          setLoading(false);
        });
    }
  }, [editVehicleId]);
  

  const levels = [
    { id: 1, name: 'level_1' },
    { id: 2, name: 'level_2' },
    { id: 3, name: 'level_3' },
  ];

  const codes =  [
    { id: 1, name: '1' },
    { id: 2, name: '2' },
    { id: 3, name: '3' },
    { id: 4, name: '4' },
    { id: 5, name: '5' },
  ];

  const passengers = [
    { id: 1, name: '4' },
    { id: 2, name: '6' },
    { id: 3, name: '12' },
    { id: 4, name: '24' },
    { id: 5, name: '64' },
    { id: 6, name: '70' },
  ];

  const handleEditClick = (vehicleId) => {
    setEditVehicleId(vehicleId); // Set the vehicle ID to edit
    setError(null);
    setIsEditing(true); // Set editing mode to true
    toggleFormVisibility()
  };
  

  return (
    <div>
      <div className={`${isFormVisible ? 'blur-sm': ''}`}>
        <div className='flex items-center m-4'>
          <form onSubmit={(e) => e.preventDefault()}>
            <input 
              className='p-2 rounded-lg ring-1'
              type="search"
              placeholder="Enter plate number"
              value={searchInput}
              onChange={handleInputChange}
            />
          </form>
        </div>

        {/* Display loading message */}
        {loading && <p>Loading...</p>}

        {/* Display error message */}
        {error && <p style={{ color: 'red' }}>{error}</p>}

        {/* Display filtered vehicle data */}
        <table className='w-full border-collapse'>
          <thead className='bg-gray-200'>
            <tr className='uppercase font-semibold'>
              <th >#No</th>
              <th className='px-4 py-2 text-left'>Plate Number</th>
              <th className='px-4 py-2 text-left'>Station</th>
              <th className='px-4 py-2 text-left'>Association</th>
              <th className='px-4 py-2 text-left'>Car Type</th>
              <th className='px-4 py-2 text-left'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredVehicles.length > 0 ? (
              filteredVehicles.map((vehicle,index) => (
                <tr key={vehicle.id} className='bg-white border-b'>
                  <td className='px-4 py-2'>{index+1}</td>
                  <td className='px-4 py-2'>{vehicle.plate_number}</td>
                  <td className='px-4 py-2'>{vehicle.station.name}</td>
                  <td className='px-4 py-2'>{vehicle.association.name}</td>
                  <td className='px-4 py-2 capitalize'>{vehicle.car_type.replace('_', ' ')}</td>
                  <td className='px-4 py-2 text-xs'>
                    <button onClick={() => handleEditClick(vehicle.id)}className='text-blue-500'><FontAwesomeIcon icon={faEdit} /> Edit</button>
                    <button className='text-red-500 ml-2'><FontAwesomeIcon icon={faTrash} />Delete</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className='px-4 py-2 text-center'>No vehicle found with the given plate number.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Conditional rendering of the edit form */}
      {isEditing && (
          <EditForm  
          handleSubmit={handleSubmit}
          handleX={handleX}
          formData={formData}
          handleChange={handleChange}
          errors={errors}
          stations={stations}
          associations={associations}
          codes={codes}
          levels={levels}
          passengers={passengers}
          carTypes={carTypes}
          deploymentLines={deploymentLines}
          cancelEdit={cancelEdit}
          />
        )}
    </div>
  );
}

export default Search;
