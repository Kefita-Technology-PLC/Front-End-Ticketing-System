import React, { useEffect, useState } from 'react'
import TableShow from "../Components/shared/TableShow";

function ShowVehicle({vehiclesData}) {
  return (
    <div className="mt-10">
    <TableShow
      caption="Vehicles"
      tableHeads={['No', 'Station', 'Plate Number', 'Association', 'Deployment Line', 'Code', 'Level', 'Number of Passengers', 'Car Type', 'Registered Date']}
      vehicles={vehiclesData}
    />
  </div>
  )
}

export default ShowVehicle
