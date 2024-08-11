import React from "react";
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
function App() {
  const [stations, setStations] = useState([]);
  const [selectedStation, setSelectedStation] = useState("asela");

  return (
    <div className=" font-roboto">
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route
              path="Vehicle"
              element={
                <PrivateRoute>
                  <Vehicle
                    station={stations}
                    setStations={setStations}
                    selectedStation={selectedStation}
                    setSelectedStation={setSelectedStation}
                  />
                </PrivateRoute>
              }
            />

            <Route
              path="Association"
              element={
                <Association
                  stations={stations}
                  setStations={setStations}
                  selectedStation={selectedStation}
                  setSelectedStation={setSelectedStation}
                />
              }
            />
            <Route path="Destination" element={<Destination />} />
            <Route
              path="Tarif"
              element={
                <Tariff
                  stations={stations}
                  setStations={setStations}
                  selectedStation={selectedStation}
                  setSelectedStation={setSelectedStation}
                />
              }
            />
            <Route
              path="Employee"
              element={
                <Employee
                  stations={stations}
                  setStations={setStations}
                  selectedStation={selectedStation}
                  setSelectedStation={setSelectedStation}
                />
              }
            />

            <Route path="TicketReport" element={<TicketReport />} />
            <Route path="TotalReport" element={<TotalReport />} />
          </Route>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<RegisterForm />} />
          <Route path="forget-password" element={<ForgotPassword />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
