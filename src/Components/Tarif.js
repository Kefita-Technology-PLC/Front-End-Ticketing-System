import React, { useState, useEffect } from "react";
import { Input } from "./ui/input";
import { Select } from "./ui/select";
import { Button } from "./ui/Button";

export const Tariff = ({ stations, setStations }) => {
  const [destinations, setDestinations] = useState([]);
  const [selectedDestination, setSelectedDestination] = useState("");
  const [selectedStation, setSelectedStation] = useState("");
  const [distance, setDistance] = useState("");
  const [level1Tariff, setLevel1Tariff] = useState("");
  const [level2Tariff, setLevel2Tariff] = useState("");
  const [level3Tariff, setLevel3Tariff] = useState("");
  const [errorMessage, setErrorMessage] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/destinations");
        const destinationData = await response.json();
        setDestinations(destinationData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [setStations]);

  const validateForm = () => {
    let formErrors = {};

    if (!selectedStation) formErrors.selectedStation = "Station is required.";
    if (!selectedDestination)
      formErrors.selectedDestination = "Destination is required.";
    if (!distance) formErrors.distance = "Distance is required.";
    if (!level1Tariff) formErrors.level1Tariff = "Level 1 Tariff is required.";
    if (!level2Tariff) formErrors.level2Tariff = "Level 2 Tariff is required.";
    if (!level3Tariff) formErrors.level3Tariff = "Level 3 Tariff is required.";

    setErrorMessage(formErrors);

    return Object.keys(formErrors).length === 0;
  };

  const handleAdd = async () => {
    if (!validateForm()) {
      return;
    }
    const tariffData = {
      station_id: selectedStation,
      destination_id: selectedDestination,
      distance: parseFloat(distance),
      level1_tariff: parseFloat(level1Tariff),
      level2_tariff: parseFloat(level2Tariff),
      level3_tariff: parseFloat(level3Tariff),
    };

    try {
      const response = await fetch("http://localhost:3000/tariffs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(tariffData),
      });

      if (!response.ok) {
        throw new Error("Failed to save the tariff information.");
      }

      // Reset form fields after successful save
      setSelectedStation("");
      setSelectedDestination("");
      setDistance("");
      setLevel1Tariff("");
      setLevel2Tariff("");
      setLevel3Tariff("");
      setErrorMessage({});
      alert("Tariff information saved successfully!");
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to save the tariff information.");
    }
  };

  const handleCancel = () => {
    setSelectedStation("");
    setSelectedDestination("");
    setDistance("");
    setLevel1Tariff("");
    setLevel2Tariff("");
    setLevel3Tariff("");
    setErrorMessage({});
  };

  return (
    <div className="  mx-32 mt-4 ">
      <h2 className="text-2xl font-bold mb-6 text-gray-700 ">Add New Tariff</h2>
      <div className="space-y-4">
        {/* Station Selection */}
        <div>
          <label
            htmlFor="station-select"
            className="block text-gray-700 text-sm font-medium mb-2"
          >
            Choose a Station:
          </label>
          <Select
            id="station-select"
            value={selectedStation}
            onChange={(e) => setSelectedStation(e.target.value)}
            options={stations.map((station) => ({
              value: station.id,
              label: station.name,
            }))}
            placeholder="Select a station"
            required
          />
          {errorMessage.selectedStation && (
            <p className="text-red-500 text-sm mt-1">
              {errorMessage.selectedStation}
            </p>
          )}
        </div>

        {/* Destination Selection */}
        <div>
          <label
            htmlFor="destination-select"
            className="block text-gray-700 text-sm font-medium mb-2"
          >
            Destination:
          </label>
          <Select
            id="destination-select"
            value={selectedDestination}
            onChange={(e) => setSelectedDestination(e.target.value)}
            options={destinations.map((destination) => ({
              value: destination.id,
              label: destination.name,
            }))}
            placeholder="Select a destination"
            required
          />
          {errorMessage.selectedDestination && (
            <p className="text-red-500 text-sm mt-1">
              {errorMessage.selectedDestination}
            </p>
          )}
        </div>

        {/* Distance Input */}
        <div>
          <label
            htmlFor="distance-input"
            className="block text-gray-700 text-sm font-medium mb-2"
          >
            Distance (km):
          </label>
          <Input
            type="number"
            id="distance-input"
            value={distance}
            onChange={(e) => setDistance(e.target.value)}
            placeholder="Enter distance"
            min="0"
            step="0.01"
            required
          />
          {errorMessage.distance && (
            <p className="text-red-500 text-sm mt-1">{errorMessage.distance}</p>
          )}
        </div>

        {/* Level 1 Tariff Input */}
        <div>
          <label
            htmlFor="level1-tariff-input"
            className="block text-gray-700 text-sm font-medium mb-2"
          >
            Level 1 Tariff:
          </label>
          <Input
            type="number"
            id="level1-tariff-input"
            value={level1Tariff}
            onChange={(e) => setLevel1Tariff(e.target.value)}
            placeholder="Enter tariff for level 1"
            min="0"
            step="0.01"
            required
          />
          {errorMessage.level1Tariff && (
            <p className="text-red-500 text-sm mt-1">
              {errorMessage.level1Tariff}
            </p>
          )}
        </div>

        {/* Level 2 Tariff Input */}
        <div>
          <label
            htmlFor="level2-tariff-input"
            className="block text-gray-700 text-sm font-medium mb-2"
          >
            Level 2 Tariff:
          </label>
          <Input
            type="number"
            id="level2-tariff-input"
            value={level2Tariff}
            onChange={(e) => setLevel2Tariff(e.target.value)}
            placeholder="Enter tariff for level 2"
            min="0"
            step="0.01"
            required
          />
          {errorMessage.level2Tariff && (
            <p className="text-red-500 text-sm mt-1">
              {errorMessage.level2Tariff}
            </p>
          )}
        </div>

        {/* Level 3 Tariff Input */}
        <div>
          <label
            htmlFor="level3-tariff-input"
            className="block text-gray-700 text-sm font-medium mb-2"
          >
            Level 3 Tariff:
          </label>
          <Input
            type="number"
            id="level3-tariff-input"
            value={level3Tariff}
            onChange={(e) => setLevel3Tariff(e.target.value)}
            placeholder="Enter tariff for level 3"
            min="0"
            step="0.01"
            required
          />
          {errorMessage.level3Tariff && (
            <p className="text-red-500 text-sm mt-1">
              {errorMessage.level3Tariff}
            </p>
          )}
        </div>

        <div className="flex justify-end space-x-4 mt-6">
          <Button type="button" onClick={handleAdd}>
            Add
          </Button>
          <Button type="button" onClick={handleCancel}>
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
};
