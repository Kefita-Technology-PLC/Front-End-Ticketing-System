import React, { useState, useEffect } from "react";
import { Select } from "./ui/select";
import { Form, FormItem } from "./ui/Form";
import { Button } from "./ui/Button";
const Vehicle = ({ station, setStations }) => {
  const [vehicles, setVehicles] = useState([]);
  const [selectedStation, setSelectedStation] = useState("");
  const [associations, setAssociations] = useState([]);
  const [plate, setPlate] = useState("");
  const [registration, setRegistration] = useState("");
  const [selectedAssociation, setSelectedAssociation] = useState("");
  const [selectedCarType, setSelectedCarType] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("");
  const [selectedNumber, setSelectedNumber] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editVehicleId, setEditVehicleId] = useState(null);

  const numbers = Array.from({ length: 20 }, (_, i) => i + 1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const associationResponse = await fetch(
          "http://localhost:3000/associations"
        );
        if (!associationResponse.ok)
          throw new Error(`HTTP error! status: ${associationResponse.status}`);
        const associationData = await associationResponse.json();
        setAssociations(associationData);

        const vehiclesResponse = await fetch("http://localhost:3000/vehicles");
        if (!vehiclesResponse.ok)
          throw new Error(`HTTP error! status: ${vehiclesResponse.status}`);
        const vehiclesData = await vehiclesResponse.json();
        setVehicles(vehiclesData);
      } catch (error) {
        console.error("Error fetching data:", error.message);
        setStations([]);
      }
    };

    fetchData();
  }, [setStations]);

  const handleSelectChange = (event) => {
    setSelectedNumber(event.target.value);
  };

  const handleAddOrUpdateVehicle = async (event) => {
    event.preventDefault();

    const vehicleData = {
      station_id: selectedStation,
      association_id: selectedAssociation,
      plate_number: plate,
      level: selectedLevel,
      registration_date: registration,
      number_of_passengers: parseInt(selectedNumber, 10),
      car_type: selectedCarType,
    };

    const url = isEditing
      ? `http://localhost:3000/vehicles/${editVehicleId}`
      : `http://localhost:3000/vehicles`;
    const method = isEditing ? "PUT" : "POST";

    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(vehicleData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const updatedOrNewVehicle = await response.json();

      if (isEditing) {
        setVehicles((vehicles) =>
          vehicles.map((v) =>
            v.id === editVehicleId ? updatedOrNewVehicle : v
          )
        );
      } else {
        setVehicles((vehicles) => [...vehicles, updatedOrNewVehicle]);
      }

      // Reset form
      setSelectedStation("");
      setSelectedAssociation("");
      setPlate("");
      setSelectedLevel("");
      setRegistration("");
      setSelectedNumber("");
      setSelectedCarType("");
      setIsEditing(false);
      setEditVehicleId(null);
    } catch (error) {
      console.error("Error adding/updating vehicle:", error.message);
    }
  };

  const handleEditVehicle = (vehicle) => {
    if (!vehicle || !vehicle.id) {
      console.error("Invalid vehicle data provided for editing.");
      return;
    }

    setSelectedStation(vehicle.station_id || "");
    setSelectedAssociation(vehicle.association_id || "");
    setPlate(vehicle.plate_number || "");
    setSelectedLevel(vehicle.level || "Level 1");
    setRegistration(vehicle.registration_date || "");
    setSelectedNumber(vehicle.number_of_passengers || 1);
    setSelectedCarType(vehicle.car_type || "");

    setIsEditing(true);
    setEditVehicleId(vehicle.id);
  };

  const handleDeleteVehicle = async (vehicleId) => {
    try {
      const response = await fetch(
        `http://localhost:3000/vehicles/${vehicleId}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      setVehicles((vehicles) => vehicles.filter((v) => v.id !== vehicleId));
    } catch (error) {
      console.error("Error deleting vehicle:", error.message);
    }
  };

  return (
    <div className="mx-8 my">
      <Form onSubmit={handleAddOrUpdateVehicle} className="space-y-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <FormItem label="Select a Station" htmlFor="station-select">
            <Select
              id="station-select"
              value={selectedStation}
              onChange={(e) => setSelectedStation(e.target.value)}
              options={station.map((s) => ({
                value: s.id,
                label: s.name,
              }))}
              required
            />
          </FormItem>

          <FormItem label="Association Name" htmlFor="association-select">
            <Select
              id="association-select"
              value={selectedAssociation}
              onChange={(e) => setSelectedAssociation(e.target.value)}
              options={associations.map((assoc) => ({
                value: assoc.id,
                label: assoc.name,
              }))}
              required
            />
          </FormItem>

          <FormItem label="Plate Number" htmlFor="plate">
            <input
              id="plate"
              type="text"
              value={plate}
              onChange={(e) => setPlate(e.target.value)}
              // className="mt-1 block w-full px-3 py-2 border border-neutral-500 bg-neutral-700 text-white rounded-md shadow-sm focus:outline-none focus:ring-neutral-400 focus:border-neutral-400 sm:text-sm"
              className="px-4 py-4  rounded-md shadow-sm border-2  border-gray-700 text-gray-500 "
              placeholder="Enter plate number"
              required
            />
          </FormItem>

          <FormItem label="Choose a Level" htmlFor="level-select">
            <Select
              id="level-select"
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              options={[
                { value: "Level 1", label: "Level 1" },
                { value: "Level 2", label: "Level 2" },
                { value: "Level 3", label: "Level 3" },
              ]}
              required
            />
          </FormItem>

          <FormItem label="Passenger Number" htmlFor="number-select">
            <Select
              id="number-select"
              value={selectedNumber}
              onChange={handleSelectChange}
              options={numbers.map((number) => ({
                value: number,
                label: number,
              }))}
              required
            />
          </FormItem>

          <FormItem label="Choose a Car Type" htmlFor="car-type-select">
            <Select
              id="car-type-select"
              value={selectedCarType}
              onChange={(e) => setSelectedCarType(e.target.value)}
              options={[
                { value: "minibus", label: "Minibus" },
                { value: "Bus", label: "Bus" },
                { value: "kitkit", label: "Kitkit" },
              ]}
              required
            />
          </FormItem>

          <FormItem label="Registration Date" htmlFor="registration">
            <input
              id="registration"
              type="date"
              value={registration}
              onChange={(e) => setRegistration(e.target.value)}
              className="px-4 py-4  rounded-md shadow-sm border-2  border-gray-700 text-neutral-500 "
              required
            />
          </FormItem>
        </div>

        <div className="flex items-center space-x-4">
          <Button
            type="submit"
            className="bg-neutral-500 text-white px-4 py-2 rounded-md shadow-sm hover:bg-neutral-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-400"
          >
            {isEditing ? "Update" : "Add"}
          </Button>
          <Button
            type="button"
            onClick={() => {
              setSelectedStation("");
              setSelectedAssociation("");
              setPlate("");
              setSelectedLevel("");
              setRegistration("");
              setSelectedNumber("");
              setSelectedCarType("");
              setIsEditing(false);
              setEditVehicleId(null);
            }}
            className="bg-neutral-400 text-white px-4 py-2 rounded-md shadow-sm hover:bg-neutral-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-300"
          >
            Cancel
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default Vehicle;
