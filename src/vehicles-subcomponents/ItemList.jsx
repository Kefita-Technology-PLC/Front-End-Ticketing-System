import React, { useEffect, useState } from 'react';
import { apiEndpoint } from '../data/AuthenticationData';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import ModernTable from '../Components/shared/ModernTable';
import EllipsisDropdown from '../Components/shared/EllipsisDropdown';
import { useBlur } from '../contexts/BlurContext';
import axios from 'axios';
import { codes, levels } from '../data/VehicleData';
import EditForm from './EditForm';
import DeleteFrom from './DeleteFrom';

const ItemList = () => {

    const [vehicles, setVehicles] = useState([]);
    const [search, setSearch] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [isLoading, setIsLoading] = useState(false)
    const { isFormVisible, toggleFormVisibility } = useBlur();
    const [editVehicleId, setEditVehicleId] = useState(null)
    const [deleteVehicleId, setDeleteVehicleId] = useState(null)
    const [errors, setErrors] = useState({})
    const [error, setError] = useState()
    const [isEditing, setIsEditing] = useState(false)
    const [isDeleting, setIsDeleting] = useState(false)
    const [refreshFlag, setRefreshFlag] = useState(false)

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

    const handleSubmit = async (event) => {
        event.preventDefault(); // Prevent default form submission
        // toast.current.show({severity:'success', summary: 'Success', detail:'Message Content', life: 3000})
    
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

    const cancelEditOrDelte = ()=>{
        toggleFormVisibility()
    }

    const handleEditClick = (vehicleId)=>{
        setEditVehicleId(vehicleId)
        setError(null)
        setIsEditing(true)
        setIsDeleting(false)
        toggleFormVisibility()
    }

    const handleDeleteClick = (vehicleId)=>{
        setDeleteVehicleId(vehicleId)
        setError(null)
        setIsEditing(false)
        setIsDeleting(true)
        toggleFormVisibility()
    }


    useEffect(() => {
        if (editVehicleId || deleteVehicleId) {
            const token = localStorage.getItem('token');
            const headers = { Authorization: `Bearer ${token}` };
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

    const fetchItems = async (query, page = 1) => {
        if(isLoading) return
        setIsLoading(true)
        try {
            const token = localStorage.getItem('token');
            const headers = {
                Authorization: `Bearer ${token}`
            };
            const response = await fetch(`${apiEndpoint}/v1/vehicles-search?q=${query}&paginate=${1}&page=${page}`, {
                headers: {
                    ...headers,
                    'Accept': 'application/json',
                },
            });
            const data = await response.json();
            setVehicles(data.data.map((item, idx )=> ({ 
                plate_number: item.plate_number,
                car_type: item.car_type,
                station: item.station ? item.station.name : 'N/A',
                association: item.association ? item.association.name : 'N/A',
                edited: item.updated_at === item.created_at ? 'No':
                <><FontAwesomeIcon icon={faCheck} />{new Date(item.updated_at).toLocaleDateString()}</>,
                actions: <><EllipsisDropdown 
                            onEdit={handleEditClick}
                            onUpdate={handleDeleteClick}
                            id={item.id}/></>
            }))); // Format to show only relevant fields
            setTotalPages(data.last_page);
            setCurrentPage(data.current_page);
        } catch (error) {
            console.error('Error fetching items:', error);
        }finally{
            setIsLoading(false)
        }
    };

    const handleRefresh = () => {
        setRefreshFlag((prev) => !prev);
    };


    useEffect(() => {
    
        fetchItems(search, currentPage)
    }, [search, currentPage, refreshFlag]);

    const handleChange = (event) => {
        // console.log(event)
        setFormData({ ...formData, [event.target.name]: event.target.value });
        // console.log(formData)
    };


    const headers = ['Plate Number', 'Car Type', 'Station', 'Association', 'Edited', 'Actions'];

    // Logic to show only 5 pagination buttons and dynamically shift them
    const paginationWindow = 5; // Number of pagination buttons to show
    const startPage = Math.max(1, currentPage - Math.floor(paginationWindow / 2));
    const endPage = Math.min(totalPages, startPage + paginationWindow - 1);
    const paginationRange = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);

    return (
        <div>
            <div className={`p-5 max-w-[1200px] mx-auto ${isFormVisible ? 'blur-sm': ''}`}>
                {/* Search Input */}
                <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search vehicles..."
                    className="mb-5 p-3 w-full border border-gray-300 rounded-lg"
                />

                {/* Table */}
                <ModernTable headers={headers} data={vehicles} />

                {/* Pagination */}
                <div className="mt-5 flex justify-center space-x-3">
                    <button
                        onClick={() => setCurrentPage(currentPage - 1)}
                        disabled={currentPage === 1}
                        className={`px-4 py-2 rounded-md ${currentPage === 1 ? 'bg-gray-200 cursor-not-allowed' : 'bg-blue-500 text-white'}`}
                    >
                        &laquo; Previous
                    </button>

                    {/* Dynamically generated pagination buttons */}
                    {paginationRange.map((page) => (
                        <button
                            key={page}
                            onClick={() => setCurrentPage(page)}
                            className={`px-3 py-2  ${currentPage === page ? 'bg-blue-500 text-white' : 'outline-1 outline-black'}`}
                        >
                            {page}
                        </button>
                    ))}

                    <button
                        onClick={() => setCurrentPage(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className={`px-4 py-2 rounded-md ${currentPage === totalPages ? 'bg-gray-200 cursor-not-allowed' : 'bg-blue-500 text-white'}`}
                    >
                        Next &raquo;
                    </button>
                </div>
                {/* <StationSearchSelect /> */}
            </div>



        {isEditing && (
          <EditForm  
          handleSubmit={handleSubmit}
          handleX={cancelEditOrDelte}
          errors={errors}
          formData={formData}
          handleChange={handleChange}
          codes={codes}
          levels={levels}
          setFormData={setFormData}
          />
        )}
        {isDeleting && (
          <DeleteFrom 
            handleX={cancelEditOrDelte}
            formData={formData}
            changeFlag={handleRefresh}
          />
        )}
        </div>
    );
};

export default ItemList;




