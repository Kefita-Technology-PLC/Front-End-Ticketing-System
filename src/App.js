import React, { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoute from "./auth/PrivateRoute";
import Login from "./auth/Login";
import RegisterForm from "./auth/Register";
import ForgotPassword from "./auth/components/ForgetPassword";
import ResetPassword from "./auth/ResetPassword";
import { Layout } from "./Components/shared/Layout";
import Dashboard from "./Components/Dashboard";
import Tariff from "./Components/Tarif";
import { Employee } from "./Components/Employee";
import { Eadd } from "./Components/Eadd";
import { TicketReport } from "./Components/TicketReport";
import { TarifAdd } from "./Components/TarifAdd";
import { Tarifupdate } from "./Components/Tarifupdate";
import { Eupdate } from "./Components/Eupdate";
import mainImage from "./assets/background-image.png";
import {AddVehicle, ShowVehicle, DeleteOrUpdateVehicle, Vehicle} from"./imports/vehicleImport"
import { apiEndpoint, headers } from "./data/AuthenticationData";
import PageNotFound from "./pages/PageNotFound";
import {PrimeReactProvider} from 'primereact/api'
import "primereact/resources/primereact.min.css"
import "primeicons/primeicons.css"
import "primeflex/primeflex.css"
import 'primereact/resources/themes/tailwind-light/theme.css'
import { TotalReport } from "./Components/TotalReport";
import { ShowDeploymentLine, AddDeploymentLine, UpdateOrDeleteDL, DeploymentLine } from "./imports/deploymentImport";
import { ShowAssociations, AddAssociation, UpdateOrDelete, Association } from "./imports/associationImport";
import ItemList from "./vehicles-subcomponents/ItemList";


function App() {

  const [stations, setStations] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const fetchData=async ()=>{
    try{
      const vehiclesData = await axios.get(`${apiEndpoint}/v1/vehicles`, {headers})
      setVehicles(vehiclesData.data.data || [])
      // console.log(vehiclesData.data.data)
    } catch (error){
      console.error('Error fetching data:', error)
    }
   }

   useEffect(()=>{
    fetchData()
  },[])

// 04512247
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchStations = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${apiEndpoint}/v1/stations-all`, {headers}
      );
      setStations(response.data);
      setError(null);
    } catch (error) {
      setError("Error fetching stations");
      console.error("Error fetching stations:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchVehicles = async () => {
    try {

      const vehiclesData = await axios.get(
        `${apiEndpoint}/v1/vehicles`,
        { headers }
      );

      setVehicles(vehiclesData.data.data || []);
    } catch (error) {
      console.error("Error fetching vehicles:", error);
    }
  };

  useEffect(() => {
    fetchStations();
    fetchVehicles();
  }, []);


  return (

    <PrimeReactProvider >
      <div className={`bg-cover bg-no-repeat `} style={{backgroundImage:  `url(${mainImage})`}} >
        <div className=" font-roboto max-w-[1600px] mx-auto bg-[#ffffffcc] scroll-auto">
          <Router>
            <Routes>
              
              <Route path="/" element={
                <PrivateRoute>
                  <Layout />
                </PrivateRoute>
                }>
              
                <Route index element={<Dashboard />} />

                <Route path="/Vehicle" element={<Vehicle/>}>
                  <Route index element={<ShowVehicle />}/>
                  <Route path='add' element={<AddVehicle/>} />
                  <Route path="change" element={
                  // <DeleteOrUpdateVehicle vehicleData={vehicles} />
                  <ItemList />
                  }/>
                </Route>


                <Route path="Association" element={<Association />}>
                  <Route index  element={<ShowAssociations />}/>
                  <Route path="add" element={<AddAssociation/>} />
                  <Route path="change" element={<UpdateOrDelete/>} />
                </Route>

                <Route path="deployment-lines" element={<DeploymentLine />} >
                  <Route index  element={<ShowDeploymentLine/>} />
                  <Route path="add" element={<AddDeploymentLine/>} />
                  <Route path="change" element={<UpdateOrDeleteDL/>} />
                </Route>

                <Route
                  path="Tarif"
                  element={
                    <Tariff stations={stations} setStations={setStations} />
                  }
                />
                <Route
                  path="create-tarif"
                  element={<TarifAdd stations={stations} />}
                />
                <Route
                  path="update-tarif/:id"
                  element={<Tarifupdate stations={stations} />}
                />

                <Route
                  path="Employee"
                  element={
                    <Employee stations={stations} setStations={setStations} />
                  }
                />
                <Route
                  path="create-employee"
                  element={<Eadd stations={stations} />}
                />
                <Route
                  path="update-employee/:id"
                  element={<Eupdate stations={stations} />}
                />

                <Route path="TicketReport" element={<TicketReport />} />
                <Route path="TotalReport" element={<TotalReport/>} />
              </Route>

              <Route path="login" element={<Login />} />
              <Route path="register" element={<RegisterForm />} />
              <Route path="forget-password" element={<ForgotPassword />} />
              <Route path="reset-password" element={<ResetPassword />} />

              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </Router>
        </div>
      </div>
    </PrimeReactProvider>
  );
}

export default App;
