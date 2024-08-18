import React, { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/Button";
import { Select } from "./ui/select";

export const Association = ({ stations, setStations }) => {
  const [selectedStation, setSelectedStation] = useState("");
  const [associationName, setAssociationName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSave = async () => {
    if (!selectedStation) {
      setErrorMessage("Please select a station.");
      return;
    }

    if (!associationName) {
      setErrorMessage("Please enter an association name.");
      return;
    }

    setErrorMessage("");

    const newAssociation = {
      stationId: selectedStation,
      name: associationName,
    };

    try {
      const response = await fetch("http://localhost:3000/associations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newAssociation),
      });

      if (!response.ok) {
        throw new Error("Failed to save the association");
      }

      // Reset form fields after successful save
      setSelectedStation("");
      setAssociationName("");
      alert("Association saved successfully!");
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to save the association.");
    }
  };

  return (
    <div className="mx-32 my  p-6 rounded-lg ">
      <div className="space-y-6">
        <div className="grid grid-cols-1 gap-6">
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
              required
            />
          </div>

          <div>
            <label
              htmlFor="association-name"
              className="block text-gray-700 text-sm font-medium mb-2"
            >
              Association Name:
            </label>
            <Input
              id="association-name"
              value={associationName}
              onChange={(e) => setAssociationName(e.target.value)}
              placeholder="Enter name"
              required
            />
          </div>
        </div>

        {errorMessage && (
          <div className="text-red-500 text-sm mb-4">{errorMessage}</div>
        )}

        <div className="flex justify-end">
          <Button type="submit" onClick={handleSave} variant="primary">
            Save
          </Button>
        </div>
      </div>
    </div>
  );
};
