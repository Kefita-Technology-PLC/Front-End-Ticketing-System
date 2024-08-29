import Search from '../Components/shared/Search'
import React from 'react'
import { useOutletContext } from 'react-router-dom'
import 'react-loading-skeleton/dist/skeleton.css';  // Import Skeleton styles

function DeleteOrUpdateVehicle() {
  const { vehicles} = useOutletContext();

  return (
    <div>
         <Search vehiclesData={vehicles} />
    </div>
  );
}

export default DeleteOrUpdateVehicle;
