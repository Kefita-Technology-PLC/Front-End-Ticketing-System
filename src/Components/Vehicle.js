import React, { useState, useEffect, useCallback, useMemo } from "react";
import TopHeaders from "../headers/TopHeaders";
import { Outlet } from "react-router-dom";
import axios from "axios";
import { vehicleNavigation } from "../data/VehicleData";
import { headers as defaultHeaders, apiEndpoint } from "../data/AuthenticationData";

const Vehicle = () => {
  const [vehicles, setVehicles] = useState([]);
  const [vehiclesPaginated, setVehiclesPaginated] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshFlag, setRefreshFlag] = useState(false);
  const [vehicleLinks, setVehiclesLink] = useState([]);
  const [vehicleMetas, setVehiclesMeta] = useState([]);
  const [stations, setStations] = useState([]);
  const [associations, setAssociations] = useState([]);
  const [carTypes, setCarTypes] = useState([]);
  const [deploymentLines, setDeploymentLines] = useState([]);
  const [numPassengers, setNumPassengers] = useState([]);
  const [loadingEdit, setLoadingEdit] = useState(false);
  const [errors, setErrors] = useState({});

  // Memoized headers to avoid unnecessary recalculations
  const headers = useMemo(() => {
    const token = localStorage.getItem("token");
    return { ...defaultHeaders, Authorization: `Bearer ${token}` };
  }, []);

  // Fetch additional data used across different components
  const fetchDataOthers = useCallback(async () => {
    setLoadingEdit(true);
    try {
      const [stationsResponse, associationsResponse, carTypesResponse, deploymentLinesResponse, passengersResponse] = await Promise.all([
        axios.get(`${apiEndpoint}/v1/stations-all`, { headers }),
        axios.get(`${apiEndpoint}/v1/associations-all`, { headers }),
        axios.get(`${apiEndpoint}/v1/car-types`, { headers }),
        axios.get(`${apiEndpoint}/v1/deployment-lines-all`, { headers }),
        axios.get(`${apiEndpoint}/v1/passengers`, { headers }),
      ]);

      setStations(stationsResponse.data.data || []);
      setAssociations(associationsResponse.data.data || []);
      setCarTypes(carTypesResponse.data.data.car_type || []);
      setDeploymentLines(deploymentLinesResponse.data.data || []);
      setNumPassengers(passengersResponse.data.data || []);
    } catch (error) {
      setErrors({ general: "Failed to fetch data." });
      console.error("Error fetching data:", error);
    } finally {
      setLoadingEdit(false);
    }
  }, [headers]);

  // Fetch vehicles data and paginated vehicles data
  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const [vehiclesData, vehiclesDataPaginated] = await Promise.all([
        axios.get(`${process.env.REACT_APP_API_ENDPOINT}/v1/vehicles-all`, { headers }),
        axios.get(`${process.env.REACT_APP_API_ENDPOINT}/v1/vehicles`, { headers }),
      ]);

      setVehicles(vehiclesData.data.data || []);
      setVehiclesPaginated(vehiclesDataPaginated.data.data || []);
      setVehiclesLink(vehiclesDataPaginated.data.links || []);
      setVehiclesMeta(vehiclesDataPaginated.data.meta || []);
    } catch (error) {
      console.error("Error Fetching Vehicle Data:", error);
    } finally {
      setLoading(false);
    }
  }, [headers]);

  // Fetch data on component mount and refresh flag change
  useEffect(() => {
    fetchData();
  }, [fetchData, refreshFlag]);

  // Fetch additional data on component mount
  useEffect(() => {
    fetchDataOthers();
  }, [fetchDataOthers]);

  // Toggle refresh flag to refresh data
  const handleRefresh = () => {
    setRefreshFlag((prev) => !prev);
  };

  return (
    <div className="p-2 pt-6 md:pt-2 ">
      <div className="relative">
        <TopHeaders 
          topTitle={"Vehicles"} 
          navigation={vehicleNavigation} 
          mainUrl={'Vehicle'}
          firstButton={'Add Vehicle'}
          seccondButton={'Delete or Update'}
        />

      </div>

      <Outlet
        context={{
          vehicles,
          loading,
          setLoading,
          setVehicles,
          fetchData,
          handleRefresh,
          vehiclesPaginated,
          loadingEdit,
          stations,
          associations,
          numPassengers,
          carTypes,
          deploymentLines,
          vehicleLinks,
          vehicleMetas,
        }}
      />
    </div>
  );
};

export default Vehicle;
