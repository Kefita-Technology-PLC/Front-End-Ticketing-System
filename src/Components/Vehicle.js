import axios from "axios";
import React, { useState, useEffect, useCallback } from "react";
import TableShow from "./shared/TableShow";
import FormInputSelect from "../inputs/FormInputSelect";
import TopHeaders from "../headers/TopHeaders";

const Vehicle = () => {
  const [vehicles, setVehicles] = useState([]);
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
  const [stations, setStations] = useState([]);
  const [associations, setAssociations] = useState([]);
  const [carTypes, setCarTypes] = useState([]);
  const [errors, setErrors] = useState({});
  const [deploymentLines, setDeploymentLines] = useState([]);

  const handleChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const fetchData = useCallback(async () => {
    try {
      const token = localStorage.getItem('token');
      const headers = { Authorization: `Bearer ${token}` };
      const [
        vehiclesData,
        stationData,
        associationData,
        carTypeData,
        deploymentLineData,
      ] = await Promise.all([
        axios.get(`${process.env.REACT_APP_API_ENDPOINT}/v1/vehicles`, { headers }),
        axios.get(`${process.env.REACT_APP_API_ENDPOINT}/v1/get-stations`, { headers }),
        axios.get(`${process.env.REACT_APP_API_ENDPOINT}/v1/associations`, { headers }),
        axios.get(`${process.env.REACT_APP_API_ENDPOINT}/v1/car-types`),
        axios.get(`${process.env.REACT_APP_API_ENDPOINT}/v1/deployment-lines`, { headers }),
      ]);

      setVehicles(vehiclesData.data.data || []);
      setStations(stationData.data.data || []);
      setAssociations(associationData.data.data || []);
      setCarTypes(carTypeData.data.data.car_type || []);
      setDeploymentLines(deploymentLineData.data.data || []);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    try {
      console.log(formData)
      const token = localStorage.getItem('token');
      const headers = { Authorization: `Bearer ${token}` };
      const response = await axios.post(`${process.env.REACT_APP_API_ENDPOINT}/v1/vehicles` ,formData, {headers},);
    } catch (error) {
      if (error.response && error.response.data.errors) {
        setErrors(error.response.data.errors);
      }
    }
  };

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

  return (
    <div>
      <TopHeaders topTitle={'Vehicles'} />
      <form onSubmit={handleSubmit} className=" p-3 rounded-md">
        <h2 >Add Vehicles</h2>
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
              className="form-input text-[15px]  border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
              startValue="Select an plate no code"
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
              className="form-select text-[15px]  border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
              className="form-select text-[15px]  border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
            onClick={handleSubmit}
            className="btn text-white bg-blue-500  text-[15px] btn-primary mr-2  rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5  dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              Submit
            </button>
        </div>
      </form>

      <div className="mt-10">
        <TableShow
          caption="Vehicles"
          tableHeads={['No', 'Station', 'Plate Number', 'Association', 'Deployment Line', 'Code', 'Level', 'Number of Passengers', 'Car Type', 'Registered Date']}
          vehicles={vehicles}
        />
      </div>
    </div>
  );
};

export default Vehicle;
