import axios from 'axios'
import Search from '../Components/shared/Search'
import React, { useEffect, useState } from 'react'

function DeleteOrUpdateVehicle({vehicleData}) {
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
    <div>
      {loading && <p>Loading...</p>}
      {!loading && <Search vehiclesData={vehicles} />}
    </div>
  )
}

export default DeleteOrUpdateVehicle
