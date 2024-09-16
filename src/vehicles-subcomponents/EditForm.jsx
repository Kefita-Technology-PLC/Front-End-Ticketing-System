import React, { useEffect, useState } from 'react'
import FormInputSelect from '../inputs/FormInputSelect';
import { useOutletContext } from 'react-router-dom';
import EditCard from '../Components/shared/EditCard';
import ErrorMessage from '../Components/shared/ErrorMessage';
import StationSearchSelect from './StationSearchSelect';
import AssociationSearchSelect from './AssociationSearchSelect';

function EditForm({handleSubmit, handleX, formData, handleChange, codes, levels, errors, setFormData}) {

  const {numPassengers, carTypes} = useOutletContext()
  const [selectedStation, setSelectedStation] = useState('')
  const [selectedAssociation, setSelectedAssociation] = useState('')
  const [selectedPlateNumber, setSelectedPlateNumber] = useState('')
  const [selectedCode, setSelectedCode] = useState('')
  const [selectedLevel, setSelectedLevel] = useState('')
  const [selectedNumberOfPassengers, setSelectedNumberOfPassengers] = useState('')
  const [selectedCarType, setSelectedCarType] = useState('')
  const [selectedDeploymentLineId, setSelectedDeploymentLineId] = useState('')


  useEffect(()=>{
    setFormData({ 
      ...formData, 
      station_name: selectedStation,
    });
  },[selectedStation])

  useEffect(()=>{
    setFormData({ 
      ...formData, 
      association_name: selectedAssociation,
    });
  },[selectedAssociation])
  
  return (
    <EditCard 
      handleSubmit={handleSubmit}
      handleX={handleX}
      formData={formData}
      errors={errors}
      // loading={true}
      children={
        <div className="flex m-7 justify-around gap-7">
          <div className="flex flex-col gap-2 w-full border-r-[2px] pr-5">
            {/* <FormInputSelect
              name="station_name"
              value={formData.station_name}
              handle={handleChange}
              error={errors.station_name}
              optionValue={stations}
              label="Choose a Station"
              startValue="Select a station"
              isName={true}
            /> */}

            {/* <FormInputSelect
              name="association_name"
              value={formData.association_name}
              handle={handleChange}
              error={errors.association_name}
              optionValue={associations}
              label="Association name"
              startValue="Select an association"
              isName={true}
            /> */}
            <StationSearchSelect 
              onStationSelect={setSelectedStation}
              value={formData}
              handle={handleChange}
            />
            <ErrorMessage error={errors.station_name} />

            <AssociationSearchSelect 
              setSelectedAssociation={setSelectedAssociation}
              value={formData}
              handle={handleChange}
            />
            <ErrorMessage error={errors.association_name} />

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
            <ErrorMessage error={errors.plate_number} />

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
            <label htmlFor="number_of_passengers">Passenger's number</label>
            <select
              id="number_of_passengers"
              value={formData.number_of_passengers}
              name="number_of_passengers"
              onChange={handleChange}
              className="form-select text-[15px] border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            >
              <option value="">Select a car type</option>
              {numPassengers.map((passenger) => (
                <option key={passenger.id} value={passenger.number} className="capitalize">
                  {passenger.number} People
                </option>
              ))}
            </select>
            {errors.number_of_passengers && (
              <ErrorMessage error={errors.number_of_passengers} />
            )}

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
              {carTypes.map((carType, index) => (
                <option key={index} value={carType} className="capitalize">
                  {carType.replace('_', ' ')}
                </option>
              ))}
            </select>
            {errors.car_type && (
              <ErrorMessage error={errors.car_type} />
            )}


            {/* <label htmlFor="deployment-line-select">Choose a deployment line:</label>
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
            {errors.deployment_line_id && (
              <ErrorMessage error={errors.deployment_line_id} />
            )} */}
          </div>
        </div>
      }
    />

  )
}

export default EditForm

