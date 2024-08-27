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
import Vehicle from "./Components/Vehicle";
import { Association } from "./Components/Association";
import { Destination } from "./Components/Destination";
import Tariff from "./Components/Tarif";
import { Employee } from "./Components/Employee";
import { Eadd } from "./Components/Eadd";
import { TotalReport } from "./Components/TotalReport";
import { TicketReport } from "./Components/TicketReport";
import { TarifAdd } from "./Components/TarifAdd";
import { Tarifupdate } from "./Components/Tarifupdate";
import { Eupdate } from "./Components/Eupdate";
import mainImage from "./assets/background-image.png";
import ShowVehicle from "./vehicles-subcomponents/ShowVehicle";
import AddVehicle from "./vehicles-subcomponents/AddVehicle";
import DeleteOrUpdateVehicle from "./vehicles-subcomponents/DeleteOrUpdateVehicle";
import { BlurProvider, useBlur } from "./contexts/BlurContext";

function App() {
  const { isFormVisible, toggleFormVisibility } = useBlur();
  const [stations, setStations] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchStations = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_ENDPOINT}/v1/stations`
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
      const token = localStorage.getItem("token");
      const headers = { Authorization: `Bearer ${token}` };
      const vehiclesData = await axios.get(
        `${process.env.REACT_APP_API_ENDPOINT}/v1/vehicles`,
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
    <div
      className={`bg-cover bg-no-repeat `}
      style={{ backgroundImage: `url(${mainImage})` }}
    >
      <div className="font-roboto max-w-[1600px] mx-auto bg-[#ffffffcc] scroll-auto">
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <Router>
            <Routes>
              <Route
                path="/"
                element={
                  <PrivateRoute>
                    <Layout />
                  </PrivateRoute>
                }
              >
                <Route path="/Dashboard" element={<Dashboard />} />

                <Route
                  path="/Vehicle"
                  element={
                    <Vehicle station={stations} setStations={setStations} />
                  }
                >
                  <Route
                    index
                    element={<ShowVehicle vehiclesData={vehicles} />}
                  />
                  <Route path="add" element={<AddVehicle />} />
                  <Route
                    path="change"
                    element={<DeleteOrUpdateVehicle vehicleData={vehicles} />}
                  />
                </Route>

                <Route
                  path="Association"
                  element={
                    <Association
                      stations={stations}
                      setStations={setStations}
                    />
                  }
                />

                <Route path="Destination" element={<Destination />} />

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
                <Route path="TotalReport" element={<TotalReport />} />
              </Route>

              <Route path="login" element={<Login />} />
              <Route path="register" element={<RegisterForm />} />
              <Route path="forget-password" element={<ForgotPassword />} />
              <Route path="reset-password" element={<ResetPassword />} />
            </Routes>
          </Router>
        )}
      </div>
    </div>
  );
}

export default App;
