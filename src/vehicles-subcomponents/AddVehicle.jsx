import React, { useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import axios from 'axios';
import FormInputSelect from '../inputs/FormInputSelect';
import { levels, codes, passengers } from '../data/VehicleData';
 import SuccessMessage from '../Components/shared/SuccessMessage'; // Import the SuccessMessage component
import { apiEndpoint, headers } from '../data/AuthenticationData';

function AddVehicle() {
  const {stations, associations, carTypes, deploymentLines, handleRefresh} = useOutletContext()
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false); // Loading state
  const [showSuccess, setShowSuccess] = useState(false); // Success message state

  const navigate = useNavigate(); // Hook to navigate programmatically

  const handleChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };


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

  return (
    <form onSubmit={handleSubmit} className="p-3 rounded-md">
      <h2>Add Vehicles</h2>
      <div className="flex m-7 justify-around gap-7">
        <div className="flex flex-col gap-2 w-full border-r-[2px] pr-5">
          <FormInputSelect
            name="station_name"
            value={formData.station_name}
            handle={handleChange}
            error={errors.station_name}
            optionValue={stations}
            label="Choose a Station"
            startValue="Select a station"
            isName={true}
          />

          <FormInputSelect
            name="association_name"
            value={formData.association_name}
            handle={handleChange}
            error={errors.association_name}
            optionValue={associations}
            label="Association name"
            startValue="Select an association"
            isName={true}
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


