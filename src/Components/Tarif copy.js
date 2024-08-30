import React, { useState, useEffect } from "react";
import { Input } from "./ui/input";
import { Select } from "./ui/select";
import { Button } from "./ui/Button";

export const Tariff = ({ stations, setStations }) => {
  const [destinations, setDestinations] = useState([]);
  const [tariffs, setTariffs] = useState([]);
  const [selectedDestination, setSelectedDestination] = useState("");
  const [selectedStation, setSelectedStation] = useState("");
  const [distance, setDistance] = useState("");
  const [level1Tariff, setLevel1Tariff] = useState("");
  const [level2Tariff, setLevel2Tariff] = useState("");
  const [level3Tariff, setLevel3Tariff] = useState("");
  const [errorMessage, setErrorMessage] = useState({});
  const [editTariffId, setEditTariffId] = useState(null);

  const apiEndpoint = `${process.env.REACT_APP_API_ENDPOINT}/v1/Tarrifs`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_ENDPOINT}/v1/Destinations`
        );
        const destinationData = await response.json();
        setDestinations(destinationData);

        const tariffResponse = await fetch(apiEndpoint);
        const tariffData = await tariffResponse.json();

        // Sort tariffs by most recent based on `created_at` or `updated_at`
        const sortedTariffs = tariffData.sort(
          (a, b) => new Date(b.updated_at) - new Date(a.updated_at)
        );

        setTariffs(sortedTariffs);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [setStations, apiEndpoint]);

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

  const handleAddOrUpdate = async () => {
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
      let response;
      if (editTariffId) {
        // Update existing tariff
        response = await fetch(`${apiEndpoint}/${editTariffId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(tariffData),
        });
      } else {
        // Add new tariff
        response = await fetch(apiEndpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(tariffData),
        });
      }

      if (!response.ok) {
        throw new Error("Failed to save the tariff information.");
      }

      const updatedTariff = await response.json();

      if (editTariffId) {
        // Update the tariff list with the updated tariff data
        setTariffs((prevTariffs) =>
          prevTariffs.map((tariff) =>
            tariff.id === editTariffId ? updatedTariff : tariff
          )
        );
      } else {
        // Add the new tariff to the list
        setTariffs((prevTariffs) => [updatedTariff, ...prevTariffs]);
      }

      // Reset form fields after successful save
      resetForm();
      alert("Tariff information saved successfully!");
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to save the tariff information.");
    }
  };

  const handleEdit = (tariff) => {
    // Populate the form with the tariff's current data for editing
    setSelectedStation(tariff.station_id);
    setSelectedDestination(tariff.destination_id);
    setDistance(tariff.distance);
    setLevel1Tariff(tariff.level1_tariff);
    setLevel2Tariff(tariff.level2_tariff);
    setLevel3Tariff(tariff.level3_tariff);
    setEditTariffId(tariff.id); // Set the ID of the tariff being edited
  };

  const handleDelete = async (tariffId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this tariff?"
    );
    if (!confirmDelete) return;

    try {
      const response = await fetch(`${apiEndpoint}/${tariffId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete the tariff.");
      }

      // Remove the deleted tariff from the state
      setTariffs((prevTariffs) =>
        prevTariffs.filter((tariff) => tariff.id !== tariffId)
      );

      alert("Tariff deleted successfully!");
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to delete the tariff.");
    }
  };

  const resetForm = () => {
    setSelectedStation("");
    setSelectedDestination("");
    setDistance("");
    setLevel1Tariff("");
    setLevel2Tariff("");
    setLevel3Tariff("");
    setErrorMessage({});
    setEditTariffId(null); // Reset the edit mode
  };

  const handleCancel = () => {
    resetForm();
  };

  return (
    <div className="mx-32 mt-4">
      <h2 className="text-2xl font-bold mb-6 text-gray-700">
        {editTariffId ? "Update Tariff" : "Add New Tariff"}
      </h2>
      <div className="space-y-4">
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
          <Button type="button" onClick={handleAddOrUpdate}>
            {editTariffId ? "Update" : "Add"}
          </Button>
          <Button type="button" onClick={handleCancel}>
            Cancel
          </Button>
        </div>
      </div>

      <div>
        {tariffs.length > 0 ? (
          tariffs.map((tariff) => (
            <div
              key={tariff.id}
              className="flex justify-between items-center mt-4 p-4 border border-gray-300 rounded"
            >
              <div>
                <p>
                  <strong>Station:</strong>{" "}
                  {stations.find((s) => s.id === tariff.station_id)?.name}
                </p>
                <p>
                  <strong>Destination:</strong>{" "}
                  {
                    destinations.find((d) => d.id === tariff.destination_id)
                      ?.name
                  }
                </p>
                <p>
                  <strong>Distance:</strong> {tariff.distance} km
                </p>
                <p>
                  <strong>Level 1 Tariff:</strong> {tariff.level1_tariff}
                </p>
                <p>
                  <strong>Level 2 Tariff:</strong> {tariff.level2_tariff}
                </p>
                <p>
                  <strong>Level 3 Tariff:</strong> {tariff.level3_tariff}
                </p>
                <p>
                  <strong>Last Updated:</strong>{" "}
                  {new Date(tariff.updated_at).toLocaleString()}
                </p>
              </div>
              <div className="flex space-x-2">
                <Button type="button" onClick={() => handleEdit(tariff)}>
                  Edit
                </Button>
                <Button type="button" onClick={() => handleDelete(tariff.id)}>
                  Delete
                </Button>
              </div>
            </div>
          ))
        ) : (
          <p>No tariffs found.</p>
        )}
      </div>
    </div>
  );
};
