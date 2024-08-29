import React from 'react'
import TableShow from "../Components/shared/TableShow";
import { useOutletContext } from 'react-router-dom';

function ShowVehicle() {

  const {loading, vehiclesPaginated} = useOutletContext();

  return (
    <div className="mt-10">
    {loading && <p>Loading...</p>}
    {!loading && <TableShow
      caption="Vehicles"
      tableHeads={['No', 'Station', 'Plate Number', 'Association', 'Deployment Line', 'Code', 'Level', ' Passengers', 'Car Type', 'Registered Date']}
      vehicles={vehiclesPaginated}
    /> }
  </div>
  )
}

export default ShowVehicle
