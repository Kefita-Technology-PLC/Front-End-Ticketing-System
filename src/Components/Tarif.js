import React, { useState, useEffect } from "react";

export const Tariff = ({
  stations,
  setStations,
  selectedStation,
  setSelectedStation,
}) => {
  const [destinations, setDestinations] = useState([]);
  const [selectedDestination, setSelectedDestination] = useState("");
  const [distance, setDistance] = useState("");
  const [level1Tariff, setLevel1Tariff] = useState("");
  const [level2Tariff, setLevel2Tariff] = useState("");
  const [level3Tariff, setLevel3Tariff] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://api.example.com/data");
        const data = await response.json();
        setDestinations(data.destinations || []); // Ensure destinations is an array
        setStations(data.stations || []); // Ensure stations is an array
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [setStations]);

  const handleAdd = () => {
    // Add the logic to handle adding the tariff information
    console.log("Adding tariff:", {
      selectedStation,
      selectedDestination,
      distance,
      level1Tariff,
      level2Tariff,
      level3Tariff,
    });
  };

  return (
    <div>
      <label htmlFor="station-select">Choose a station:</label>
      <select
        id="station-select"
        value={selectedStation}
        onChange={(e) => setSelectedStation(e.target.value)}
        className="form-select mt-1 block w-full"
      >
        <option value="">Select a station</option>
        {stations.map((station) => (
          <option key={station.id} value={station.id}>
            {station.name}
          </option>
        ))}
      </select>

      <label htmlFor="destination-select">Destination:</label>
      <select
        id="destination-select"
        value={selectedDestination}
        onChange={(e) => setSelectedDestination(e.target.value)}
        className="form-select mt-1 block w-full"
      >
        <option value="">Select a destination</option>
        {destinations.map((destination) => (
          <option key={destination.id} value={destination.id}>
            {destination.name}
          </option>
        ))}
      </select>

      <label htmlFor="distance-input">Distance (km):</label>
      <input
        type="text"
        id="distance-input"
        value={distance}
        onChange={(e) => setDistance(e.target.value)}
        className="form-input mt-1 block w-full"
      />

      <label htmlFor="level1-tariff-input">Level 1 Tariff:</label>
      <input
        type="text"
        id="level1-tariff-input"
        value={level1Tariff}
        onChange={(e) => setLevel1Tariff(e.target.value)}
        className="form-input mt-1 block w-full"
      />

      <label htmlFor="level2-tariff-input">Level 2 Tariff:</label>
      <input
        type="text"
        id="level2-tariff-input"
        value={level2Tariff}
        onChange={(e) => setLevel2Tariff(e.target.value)}
        className="form-input mt-1 block w-full"
      />

      <label htmlFor="level3-tariff-input">Level 3 Tariff:</label>
      <input
        type="text"
        id="level3-tariff-input"
        value={level3Tariff}
        onChange={(e) => setLevel3Tariff(e.target.value)}
        className="form-input mt-1 block w-full"
      />

      <div className="mt-4">
        <button
          type="button"
          onClick={handleAdd}
          className="btn btn-primary mr-2"
        >
          Add
        </button>
        <button type="button" className="btn btn-secondary">
          Cancel
        </button>
      </div>
    </div>
  );
};
