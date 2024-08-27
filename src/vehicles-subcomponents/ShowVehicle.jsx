import React, { useEffect, useState } from 'react'
import TableShow from "../Components/shared/TableShow";
import axios from 'axios';

function ShowVehicle() {

  const [vehicles, setVehicles] = useState([])
  const [loading, setLoading] = useState(false)

  const fetchData = async ()=>{

    try{
      const token = localStorage.getItem('token')
      const headers = {Authorization: `Bearer ${token}`}
      setLoading(true)
      const vehiclesData = await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/v1/vehicles`, {headers})

      setLoading(false)
      setVehicles(vehiclesData.data.data || [])

    }catch (error){
      console.error('Error Fetching Data: ', error)
      setLoading(false);
    }
  }

  useEffect(()=>{
    fetchData()
  }, [])

  return (
    <div className="mt-10">
    {loading && <p>Loading...</p>}
    {!loading && <TableShow
      caption="Vehicles"
      tableHeads={['No', 'Station', 'Plate Number', 'Association', 'Deployment Line', 'Code', 'Level', 'Number of Passengers', 'Car Type', 'Registered Date']}
      vehicles={vehicles}
    /> }
  </div>
  )
}

export default ShowVehicle
