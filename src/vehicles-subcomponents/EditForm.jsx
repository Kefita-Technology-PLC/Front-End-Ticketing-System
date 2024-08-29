import { faX } from '@fortawesome/free-solid-svg-icons';
import { useBlur } from '../contexts/BlurContext';
import React, { useRef, useState  } from 'react'
import FormInputSelect from '../inputs/FormInputSelect';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useOutletContext } from 'react-router-dom';
import ClipLoader from "react-spinners/ClipLoader";

function EditForm({handleSubmit, handleX, formData, handleChange, codes, levels, errors}) {

  let [color] = useState("#ffffff")
  const { isFormVisible } = useBlur();
  const {loadingEdit, stations, associations, numPassengers, carTypes, deploymentLines } = useOutletContext()
  const formRef = useRef(null)
  console.log(errors)
  // const [errors, setErrors] = useState({});
  const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
  };


  return (
    <div className={`p-3 rounded-md fixed top-[30px] shadow-lg bg-white z-[100] left-1/2 transform -translate-x-1/2 blur-0 ${isFormVisible? '': 'hidden '}`}>

        {loadingEdit &&       
        <ClipLoader
        color={color}
        loading={loadingEdit}
        cssOverride={override}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      />}

        {!loadingEdit && 
        <form onSubmit={handleSubmit}   ref={formRef} id='edit-form'>
          <div className='flex justify-between p-3'>
            <h2 className='text-xl font-semibold'>Edit Vehicle</h2>
            <span onClick={handleX}><FontAwesomeIcon icon={faX} className=' hover:cursor-pointer' /></span>
          </div>
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
                <p className="mt-1 text-sm text-red-500 dark:text-red-400">
                  {errors.plate_number}
                </p>
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
              {errors.car_type && (
                <p className="mt-1 text-sm text-red-500 dark:text-red-400">
                  {errors.number_of_passengers}
                </p>
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
                <p className="mt-1 text-sm text-red-500 dark:text-red-400">
                  {errors.car_type}
                </p>
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
              {errors.deployment_line_id && (
                <p className="mt-1 text-sm text-red-500 dark:text-red-400">
                  {errors.deployment_line_id}
                </p>
              )}
            </div>
          </div>

          <div className="p-3 pl-8">
            <button
              type="submit"
              form='edit-form'
              onClick={handleSubmit}
              className="btn text-white bg-blue-500 text-[15px] btn-primary mr-2 rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500 text-xs"
            >
              Update Vehicle
            </button>
          </div>
        </form>}
    </div>

  )
}

export default EditForm
