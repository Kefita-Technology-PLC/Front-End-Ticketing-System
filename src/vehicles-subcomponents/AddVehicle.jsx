import React, { useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import axios from 'axios';
import FormInputSelect from '../inputs/FormInputSelect';
import { levels, codes, passengers } from '../data/VehicleData';
 import SuccessMessage from '../Components/shared/SuccessMessage'; // Import the SuccessMessage component
import { apiEndpoint, headers } from '../data/AuthenticationData';
import PrimeSelection from '../inputs/PrimeSelection';

function AddVehicle() {
  const {stations, associations, carTypes, deploymentLines, handleRefresh} = useOutletContext()
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false); // Loading state
  const [showSuccess, setShowSuccess] = useState(false); // Success message state
  const [formData, setFormData] = useState({
    plate_number: '',
    code: '',
    level: '',
    number_of_passengers: '',
    car_type: '',
    station_name: '',
    association_name: '',
    deployment_line_id: '',
  });
  const navigate = useNavigate(); // Hook to navigate programmatically

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => {
      // Check if value is an object and handle accordinglya
      if (typeof value === 'object' && value !== null) {
        // Handle specific fields separately
        switch (name) {
          case 'deployment_line_id':
            return {
              ...prevData,
              deployment_line_id: value.id, // Assuming value.id contains the correct ID
            };
          case 'station_name':
            return {
              ...prevData,
              station_name: value.name, // Assuming value.name contains the station name
            };
          case 'association_name':
            return {
              ...prevData,
              association_name: value.name, // Assuming value.name contains the association name
            };
          default:
            return {
              ...prevData,
              ...value, // Spread other object attributes if they match formData structure
            };
        }
      }
  
      // If value is not an object, handle as usual
      return {
        ...prevData,
        [name]: value,
      };
    });
  };



  // console.log(formData)


  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setLoading(true); // Set loading to true
    
    try {
      await axios.post(`${apiEndpoint}/v1/vehicles`, formData, { headers });
      setLoading(false); // Set loading to false
      setShowSuccess(true); // Show success message
      setTimeout(() => {
        setShowSuccess(false); // Hide success message after 3 seconds
      }, 3000);
      handleRefresh()
      navigate('/Vehicle'); // Redirect to 
  
    } catch (error) {
      setLoading(false); // Set loading to false
      if (error.response && error.response.data.errors) {
        setErrors(error.response.data.errors);
      }
    }
  };
  // console.log(stations)

  return (
    <form onSubmit={handleSubmit} className="md:p-3 p-2 rounded-md">

      <h2 className='text-xl font-semibold'>Add Vehicles</h2>
      <div className="flex md:m-7 flex-col md:flex-row justify-around gap-7 p-2">
        <div className="flex flex-col gap-2 w-full md:border-r-[2px] md:pr-5">

          <PrimeSelection 
            data={stations} 
            handle={handleChange} 
            startValue={'Select a Station'}
            label={'Choose a Station'}
            name={'station_name'} 
            error={errors.station_name}
          />

          <PrimeSelection 
            data={associations} 
            handle={handleChange} 
            startValue={'Select an Association'}
            label={'Choose an Association'}
            name={'association_name'} 
            error={errors.association_name}
          />

          

          <hr />

          <label>Plate number:</label>
          <input
            type="text"
            value={formData.plate_number}
            name="plate_number"
            onChange={handleChange}
            className="form-input text-[15px] border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
          {errors.plate_number && (
            <p className="mt-1 text-sm text-red-500 dark:text-red-400">{errors.plate_number}</p>
          )}

          <FormInputSelect
            name="code"
            value={formData.code}
            handle={handleChange}
            error={errors.code}
            optionValue={codes}
            label="Plate Number Code"
            startValue="Select a plate no code"
            isName={true}
          />

          

          

          <FormInputSelect
            name="level"
            value={formData.level}
            handle={handleChange}
            error={errors.level}
            optionValue={levels}
            label="Choose a level"
            startValue="Select a level"
            isName={true}
            isUnderscore={true}
          />

          {/* <PrimeSelection 
            data={levels} 
            handle={handleChange} 
            startValue={'Select a Level'}
            label={'Choose a Level'}
            name={'level'} 
            error={errors.level}
          /> */}
        </div>

        <div className="flex flex-col gap-2 w-full">
          <FormInputSelect
            name="number_of_passengers"
            value={formData.number_of_passengers}
            handle={handleChange}
            error={errors.number_of_passengers}
            optionValue={passengers}
            label="Passenger number"
            startValue="Select a number"
            isName={true}
            isUnderscore={false}
            optionalWord="People"
          />


          <label htmlFor="car-type-select">Choose a car type:</label>
          <select
            id="car-type-select"
            value={formData.car_type}
            name="car_type"
            onChange={handleChange}
            className="form-select text-[15px] border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          >
            <option value="">Select a car type</option>
            {carTypes.map((carType) => (
              <option key={carType} value={carType} className="capitalize">
                {carType.replace('_', ' ')}
              </option>
            ))}
          </select>
          {errors.car_type && (
            <p className="mt-1 text-sm text-red-500 dark:text-red-400">{errors.car_type}</p>
          )}

          <label htmlFor="deployment-line-select">Choose a deployment line:</label>
          <select
            id="deployment-line-select"
            value={formData.deployment_line_id}
            name="deployment_line_id"
            onChange={handleChange}
            className="form-select text-[15px] border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          >
            <option value="">Select a deployment line</option>
            {deploymentLines.map((deploymentLine) => (
              <option key={deploymentLine.id} value={deploymentLine.id} className="capitalize">
                {deploymentLine.origin} - {deploymentLine.destination}
              </option>
            ))}
          </select>
          {errors.car_type && (
            <p className="mt-1 text-sm text-red-500 dark:text-red-400">{errors.car_type}</p>
          )}
        </div>
      </div>

      <div className="p-3 pl-8">
        <button
          type="submit"
          className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
          disabled={loading}
        >
          {loading ? 'Adding...' : 'Add Vehicle'}
        </button>
      </div>

      {showSuccess && <SuccessMessage slot={'Vehicle Added Successfully'} />} {/* Display SuccessMessage component */}
    </form>
  );
}

export default AddVehicle;


