import DeleteCard from "../Components/shared/DeleteCard"

function DeleteDeploymentLine({
  handleX,
  formData,
  changeFlag
}) {
  return (
    <DeleteCard
      handleX={handleX}
      formData={formData}
      changeFlag={changeFlag}
      requestField={'deployment-lines'}
      feildName={'Deployment Lines'}
      children={
        <>
          <div className='flex text-xs justify-between uppercase p-3 font-semibold pl-1'>
            <span>Origin</span>
            <span>Destination</span>
          </div>

          <div className='flex p-3 bg-[#f7f7f7] justify-between rounded-sm'>
              <span>{formData.origin}</span>
              <span>{formData.destination}</span>
          </div>
        </>
      }
    />
  )
}

export default DeleteDeploymentLine
