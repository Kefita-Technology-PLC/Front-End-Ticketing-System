import EditCard from '../Components/shared/EditCard'
import ErrorMessage from '../Components/shared/ErrorMessage'
import { InputText } from 'primereact/inputtext'

function EditDeploymentLine({
  handleSubmit, 
  handleX, 
  formData, 
  errors, 
  handleChange}) {

  return (
    <EditCard 
      handleSubmit={handleSubmit}
      handleX={handleX}
      fieldName={'Deployment Line'}
      children={
        
        <div className="flex m-7 justify-around gap-7">

          <div className="flex flex-col gap-2 w-full">
            <div className="flex flex-column gap-2">
                <label htmlFor="origin">Deployment Origin</label>
                <InputText id="origin" name='origin' value={formData.origin} onChange={handleChange} className=' text-xs ' />

                <small id="username-help">
                    Enter the Deployment Line's Origin.
                </small>
            </div>
            <ErrorMessage error={errors.origin} />

            <div className="flex flex-column gap-2">
                <label htmlFor="destination">Deployment Origin</label>
                <InputText id="destination" name='destination' value={formData.destination} onChange={handleChange} className=' text-xs ' />

                <small id="username-help">
                    Enter the Deployment Line's destination.
                </small>
            </div>
            <ErrorMessage 
              error={errors.destination}
            />
          </div>

        </div>
      }
    />
  )
}

export default EditDeploymentLine
