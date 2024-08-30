import React, { useState, useEffect } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/Button";
import { Select } from "./ui/select";

export const Association = ({ stations }) => {
  const [selectedStation, setSelectedStation] = useState("");
  const [associationName, setAssociationName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [associations, setAssociations] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchAssociations();
  }, []);

  const fetchAssociations = async () => {
    try {
      const response = await fetch("http://localhost:3000/associations");
      const data = await response.json();
      setAssociations(data);
    } catch (error) {
      console.error("Error fetching associations:", error);
    }
  };

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
      station_id: selectedStation,
      name: associationName,
    };

    try {
      const response = await fetch(
        `http://localhost:3000/associations${isEditing ? `/${editingId}` : ""}`,
        {
          method: isEditing ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newAssociation),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to save the association");
      }

      fetchAssociations();
      setSelectedStation("");
      setAssociationName("");
      setIsEditing(false);
      setEditingId(null);
      alert("Association saved successfully!");
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to save the association.");
    }
  };

  const handleEdit = (association) => {
    setSelectedStation(association.station_id);
    setAssociationName(association.name);
    setIsEditing(true);
    setEditingId(association.id);
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/associations/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete the association");
      }

      fetchAssociations(); // Refresh the list after deletion
      alert("Association deleted successfully!");
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to delete the association.");
    }
  };

  const filteredAssociations = associations.filter(
    (association) =>
      !selectedStation || association.station_id === selectedStation
  );

  return (
    <div className="mx-32 my-6 p-6 rounded-lg bg-white shadow-md">
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
            {isEditing ? "Update" : "Save"}
          </Button>
        </div>
      </div>

      <hr className="my-6" />

      <div className="space-y-4">
        <h2 className="text-lg font-medium text-gray-700">Associations</h2>
        <ul className="space-y-2">
          {filteredAssociations.map((association) => (
            <li
              key={association.id}
              className="flex justify-between items-center bg-gray-100 p-4 rounded-lg"
            >
              <span>{association.name}</span>
              <div className="space-x-4">
                <Button
                  variant="secondary"
                  onClick={() => handleEdit(association)}
                >
                  Edit
                </Button>
                <Button
                  variant="danger"
                  onClick={() => handleDelete(association.id)}
                >
                  Delete
                </Button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
