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
// import { TarifUpdate } from "./Components/TarifUpdate";
import { Tarifupdate } from "./Components/Tarifupdate";
import { Eupdate } from "./Components/Eupdate";

function App() {
  const [stations, setStations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
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

    fetchStations();
  }, []);

  return (
    <div className="font-roboto">
      {loading ? (
        <p>Loading...</p>
      ) : (
        // ) : error ? (
        //   <p className="text-red-500">{error}</p>
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
              <Route index element={<Dashboard />} />
              <Route path="Vehicle" element={<Vehicle stations={stations} />} />
              <Route
                path="Association"
                element={<Association stations={stations} />}
              />
              <Route path="Destination" element={<Destination />} />
              <Route path="Tarif" element={<Tariff stations={stations} />} />
              <Route
                path="create tarif"
                element={<TarifAdd stations={stations} />}
              />
              <Route
                path="update tarif/:id"
                element={<Tarifupdate stations={stations} />}
              />
              <Route
                path="Employee"
                element={<Employee stations={stations} />}
              />
              <Route
                path="update employee/:id"
                element={<Eupdate stations={stations} />}
              />
              <Route path="create employee" element={<Eadd />} />
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
  );
}

export default App;
