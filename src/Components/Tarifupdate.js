import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Input } from "./ui/input";
import { Select } from "./ui/select";
import { Button } from "./ui/Button";

export const Tarifupdate = ({ stations }) => {
  const [inputData, setInputData] = useState([]);
  const { id } = useParams();
  const apiEndpoint = `${process.env.REACT_APP_API_ENDPOINT}/v1/Tariffs/${id}`;
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(apiEndpoint)
      .then((res) => {
        setInputData(res.data);
      })
      .catch((error) => {
        console.error("Error submitting data:", error);
        alert("Failed to submit data");
      });
  }, [apiEndpoint, id]);
  function handleSubmit(event) {
    event.preventDefault();
    axios.put(apiEndpoint + id, inputData).then((res) => navigate("/Tarif"));
  }

  return (
    <div>
      {" "}
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
            value={inputData.stations}
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
              destinations
                ? destinations.map((destination) => ({
                    value: destination.id,
                    label: destination.name,
                  }))
                : []
            }
            placeholder="Select a destination"
            required
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
          </div>
        </div>
        <Button type="submit" className="mt-6">
          Submit
        </Button>
      </form>
    </div>
  );
};
