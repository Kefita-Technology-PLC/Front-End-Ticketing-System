import React, { useState, useEffect } from "react";
import { Input } from "./ui/input";
import { Select } from "./ui/select";
import { Button } from "./ui/Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const TarifAdd = ({ stations }) => {
  const [errorMessage, setErrorMessage] = useState({});
  const [inputData, setInputData] = useState({
    stations: "",
    destinations: "",
    distance: "",
    level1Tariff: "",
    level2Tariff: "",
    level3Tariff: "",
  });
  // const [destinationsOptions, setDestinationsOptions] = useState([]);
  const apiEndpoint = `${process.env.REACT_APP_API_ENDPOINT}/v1/Tariffs`;
  const navigate = useNavigate();

  // useEffect(() => {
  //   axios
  //     .get(`${process.env.REACT_APP_API_ENDPOINT}/v1/Destinations`)
  //     .then((response) => {
  //       setDestinationsOptions(response.data);
  //     })
  //     .catch((error) => console.error("Error fetching destinations:", error));
  // }, []);

  const validateForm = () => {
    let errors = {};
    if (!inputData.stations) errors.stations = "Station is required.";
    if (!inputData.destinations)
      errors.destinations = "Destination is required.";
    if (!inputData.distance) errors.distance = "Distance is required.";
    if (!inputData.level1Tariff)
      errors.level1Tariff = "Level 1 Tariff is required.";
    if (!inputData.level2Tariff)
      errors.level2Tariff = "Level 2 Tariff is required.";
    if (!inputData.level3Tariff)
      errors.level3Tariff = "Level 3 Tariff is required.";
    setErrorMessage(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!validateForm()) {
      return;
    }
    axios
      .post(apiEndpoint, inputData)
      .then(() => {
        alert("Data submitted successfully");
        navigate("/Tarif");
      })
      .catch((error) => {
        console.error("Error submitting data:", error);
        alert("Failed to submit data");
      });
  };

  return (
    <div className="mx-32 mt-4">
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <label
            htmlFor="distance-input"
            className="block text-gray-700 text-sm font-medium mb-2"
          >
            Station
          </label>
          <Select
            id="station-select"
            value={stations}
            onChange={(e) =>
              setInputData({ ...inputData, stations: e.target.value })
            }
            options={
              stations
                ? stations.map((station) => ({
                    value: station.id,
                    label: station.name,
                  }))
                : []
            }
            placeholder="Select a station"
            required
            errorMessage={errorMessage.stations}
          />
          <label
            htmlFor="distance-input"
            className="block text-gray-700 text-sm font-medium mb-2"
          >
            Destination
          </label>
          {/* <Select
            id="destination-select"
            value={inputData.destinations}
            onChange={(e) =>
              setInputData({ ...inputData, destinations: e.target.value })
            }
            options={
              destinationsOptions
                ? destinationsOptions.map((destination) => ({
                    value: destination.id,
                    label: destination.name,
                  }))
                : []
            }
            placeholder="Select a destination"
            required
            errorMessage={errorMessage.destinations}
          /> */}
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
              onChange={(e) =>
                setInputData({ ...inputData, distance: e.target.value })
              }
              placeholder="Enter distance"
              min="0"
              step="0.01"
              required
            />
            {errorMessage.distance && (
              <p className="text-red-500 text-sm mt-1">
                {errorMessage.distance}
              </p>
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
              onChange={(e) =>
                setInputData({ ...inputData, level1Tariff: e.target.value })
              }
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
              onChange={(e) =>
                setInputData({ ...inputData, level2Tariff: e.target.value })
              }
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
              onChange={(e) =>
                setInputData({ ...inputData, level3Tariff: e.target.value })
              }
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
        </div>
        <Button type="submit" className="mt-6">
          Submit
        </Button>
      </form>
    </div>
  );
};
