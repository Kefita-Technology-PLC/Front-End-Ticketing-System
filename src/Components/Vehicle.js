import React, { useState, useEffect, useCallback } from "react";

import TopHeaders from "../headers/TopHeaders";
import { Outlet } from "react-router-dom";
import axios from "axios";
import { navigation } from "../data/VehicleData";
import { headers, apiEndpoint } from "../data/AuthenticationData";

const Vehicle = () => {

  const [vehicles, setVehicles] = useState([])
  const [vehiclesPaginated, setVehiclesPaginated] = useState([])
  const [loading, setLoading] = useState(false)
  const [refreshFlag, setRefreshFlag] = useState(false)
  const [vehicleLinks, setVehiclesLink] = useState([])
  const [vehicleMetas, setVehiclesMeta] = useState([])

  const [stations, setStations] = useState([]);
  const [associations, setAssociations] = useState([]);
  const [carTypes, setCarTypes] = useState([]);
  const [deploymentLines, setDeploymentLines] = useState([]);
  const [numPassengers, setNumPassengers] = useState([])
  const [loadingEdit, setLoadingEdit] = useState(false)
  const [errors, setErrors] = useState({})

  const fetchDataOthers = async ()=>{
    setLoadingEdit(true)

    try {
      // Fetch data for stations
      const [stationsResponse, associationsResponse, carTypesResponse, deploymentLinesResponse, passengersResponse] = await Promise.all([
        axios.get(`${apiEndpoint}/v1/stations-all`, { headers }),
        axios.get(`${apiEndpoint}/v1/associations-all`, { headers }),
        axios.get(`${apiEndpoint}/v1/car-types`,),
        axios.get(`${apiEndpoint}/v1/deployment-lines-all`, { headers }) ,      
        axios.get(`${apiEndpoint}/v1/passengers`, { headers })
      ]);

      // Set the state with the fetched data-all
      setLoadingEdit(false)
      setStations(stationsResponse.data.data || []);
      setAssociations(associationsResponse.data.data || []);
      setCarTypes(carTypesResponse.data.data.car_type || []);
      setDeploymentLines(deploymentLinesResponse.data.data || []);
      setNumPassengers(passengersResponse.data.data || [])

    } catch (error) {

      // Handle errors here
      setErrors({ general: 'Failed to fetch data.' });
      console.error('Error fetching data:', error);
      setLoadingEdit(false)
    }
  }

  const fetchData = useCallback(
    async ()=>{

      try{
        const token = localStorage.getItem('token')
        const headers = {Authorization: `Bearer ${token}`}
        setLoading(true)
        const vehiclesData = await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/v1/vehicles-all`, {headers})
        const vehiclesDataPaginated = await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/v1/vehicles`, {headers})

        setLoading(false)
        setVehicles(vehiclesData.data.data || [])
        setVehiclesPaginated(vehiclesDataPaginated.data.data || [])
        setVehiclesLink(vehiclesDataPaginated.data.links || [])
        setVehiclesMeta(vehiclesDataPaginated.data.meta || [])
      }catch (error){
        console.error('Error Fetching Data: ', error)
        setLoading(false);
      }
    }, []) 


  useEffect(()=>{
    fetchData()
  }, [fetchData, refreshFlag])

  useEffect(()=>{
    fetchDataOthers()
  },[])

  const handleRefresh= ()=>{
    setRefreshFlag(prev => !prev)
  }


  return (

    <div>
      <div className={`relative  `}>
        <TopHeaders topTitle={'Vehicles'} navigation={navigation} />
      </div>

      <Outlet context={{vehicles, loading, setLoading, setVehicles, fetchData, handleRefresh, vehiclesPaginated, loadingEdit, stations, associations, numPassengers, carTypes, deploymentLines, carTypes, vehicleLinks, vehicleMetas}}/>
    </div>

  );
};

export default Vehicle;
