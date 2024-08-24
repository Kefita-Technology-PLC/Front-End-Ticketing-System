import Search from '../Components/shared/Search'
import React from 'react'

function DeleteOrUpdateVehicle({vehicleData}) {
  return (
    <div>
      <Search vehiclesData={vehicleData} />
    </div>
  )
}

export default DeleteOrUpdateVehicle
