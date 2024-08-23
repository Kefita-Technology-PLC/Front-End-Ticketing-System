import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Layout } from "./Components/shared/Layout";
import Dashboard from "./Components/Dashboard";
import Vehicle from "./Components/Vehicle";
import { Association } from "./Components/Association";
import { Destination } from "./Components/Destination";
import { Tariff } from "./Components/Tarif";
import { Employee } from "./Components/Employee";
import { TotalReport } from "./Components/TotalReport";
import { TicketReport } from "./Components/TicketReport";

import { useState } from "react";
import PrivateRoute from "./auth/PrivateRoute";
import Login from "./auth/Login";
import RegisterForm from "./auth/Register";
import ForgotPassword from "./auth/components/ForgetPassword";
import ResetPassword from "./auth/ResetPassword";
function App() {
  const [stations, setStations] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/stations");
        const data = await response.json();
        console.log("Fetched data:", data);
        setStations(data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setStations([]);
      }
    };

    fetchData();
  }, [setStations]);
// 04512247
  return (
    <div className=" font-roboto max-w-[1450px] mx-auto">
      <Router>
        <Routes>
          <Route path="/" element={
            <PrivateRoute>
               <Layout />
            </PrivateRoute>
          }>
            <Route index element={<Dashboard />} />
            <Route
              path="Vehicle"
              element={
                <Vehicle
                  station={stations}
                  setStations={setStations}
                 
/>
              }
            />

            <Route
              path="Association"
              element={
                <Association stations={stations} setStations={setStations} />
              }
            />
            <Route path="Destination" element={<Destination />} />
            <Route
              path="Tarif"
              element={<Tariff stations={stations} setStations={setStations} />}
            />
            <Route
              path="Employee"
              element={
                <Employee stations={stations} setStations={setStations} />
              }
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
    </div>
  );
}

export default App;
