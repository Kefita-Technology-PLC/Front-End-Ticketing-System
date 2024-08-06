import React, { useState, useEffect } from "react";

const Vehicle = ({
  stations = [],
  setStations,
  selectedStation,
  setSelectedStation,
}) => {
  const [vehicles, setVehicles] = useState([]);
  const [associations, setAssociations] = useState([]);
  const [carTypes, setCarTypes] = useState([]);
  const [levels, setLevels] = useState([]);
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
        const response = await fetch("https://api.example.com/data");
        const data = await response.json();

        setStations(data.stations || []);
        setAssociations(data.associations || []);
        setCarTypes(data.carTypes || []);
        setLevels(data.levels || []);
        setVehicles(data.vehicles || []);
      } catch (error) {
        console.error("Error fetching data:", error);
        setStations([]);
        setAssociations([]);
        setCarTypes([]);
        setLevels([]);
        setVehicles([]);
      }
    };

    fetchData();
  }, [setStations, setAssociations, setCarTypes, setLevels]);

  const handleSelectChange = (event) => {
    setSelectedNumber(event.target.value);
  };

  const handleAddOrUpdateVehicle = () => {
    const newVehicle = {
      id: isEditing ? editVehicleId : Date.now(),
      station_id: selectedStation,
      association_id: selectedAssociation,
      plate_number: plate,
      level: selectedLevel,
      registration_date: registration,
      number_of_passengers: selectedNumber,
      car_type: selectedCarType,
    };

    if (isEditing) {
      setVehicles((prevVehicles) =>
        prevVehicles.map((vehicle) =>
          vehicle.id === editVehicleId ? newVehicle : vehicle
        )
      );
      setIsEditing(false);
      setEditVehicleId(null);
    } else {
      setVehicles([...vehicles, newVehicle]);
    }

    // Reset the form fields
    setSelectedStation("");
    setSelectedAssociation("");
    setPlate("");
    setSelectedLevel("");
    setRegistration("");
    setSelectedNumber("");
    setSelectedCarType("");
  };

  const handleEditVehicle = (vehicle) => {
    setSelectedStation(vehicle.station_id);
    setSelectedAssociation(vehicle.association_id);
    setPlate(vehicle.plate_number);
    setSelectedLevel(vehicle.level);
    setRegistration(vehicle.registration_date);
    setSelectedNumber(vehicle.number_of_passengers);
    setSelectedCarType(vehicle.car_type);
    setIsEditing(true);
    setEditVehicleId(vehicle.id);
  };

  const handleDeleteVehicle = (vehicleId) => {
    setVehicles((prevVehicles) =>
      prevVehicles.filter((vehicle) => vehicle.id !== vehicleId)
    );
  };

  return (
    <div>
      <div className="flex m-7 justify-around gap-7">
        <div className="flex flex-col gap-2 w-full">
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

          <label htmlFor="association-select">Association name:</label>
          <select
            id="association-select"
            value={selectedAssociation}
            onChange={(e) => setSelectedAssociation(e.target.value)}
            className="form-select mt-1 block w-full"
          >
            <option value="">Select an association</option>
            {associations.map((association) => (
              <option key={association.id} value={association.id}>
                {association.name}
              </option>
            ))}
          </select>

          <label>Plate number:</label>
          <input
            type="text"
            value={plate}
            onChange={(e) => setPlate(e.target.value)}
            className="form-input mt-1 block w-full"
          />

          <label htmlFor="level-select">Choose a level:</label>
          <select
            id="level-select"
            value={selectedLevel}
            onChange={(e) => setSelectedLevel(e.target.value)}
            className="form-select mt-1 block w-full"
          >
            <option value="">Select a level</option>
            {levels.map((level) => (
              <option key={level.id} value={level.id}>
                {level.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-2 w-full">
          <label>Passenger number:</label>
          <select
            id="number-select"
            value={selectedNumber}
            onChange={handleSelectChange}
            className="form-select mt-1 block w-full"
          >
            <option value="">Select a number</option>
            {numbers.map((number) => (
              <option key={number} value={number}>
                {number}
              </option>
            ))}
          </select>

          <label htmlFor="car-type-select">Choose a car type:</label>
          <select
            id="car-type-select"
            value={selectedCarType}
            onChange={(e) => setSelectedCarType(e.target.value)}
            className="form-select mt-1 block w-full"
          >
            <option value="">Select a car type</option>
            {carTypes.map((carType) => (
              <option key={carType.id} value={carType.id}>
                {carType.name}
              </option>
            ))}
          </select>

          <label>Registration:</label>
          <input
            type="date"
            value={registration}
            onChange={(e) => setRegistration(e.target.value)}
            className="form-input mt-1 block w-full"
          />
        </div>
      </div>

      <div className="mt-4">
        <button
          type="button"
          onClick={handleAddOrUpdateVehicle}
          className="btn btn-primary mr-2"
        >
          {isEditing ? "Update" : "Add"}
        </button>
        <button
          type="button"
          onClick={() => {
            // Reset the form fields
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
          className="btn btn-secondary"
        >
          Cancel
        </button>
      </div>

      <div className="mt-10">
        <h2>Vehicle List</h2>
        <table className="table-auto w-full mt-2">
          <thead>
            <tr>
              <th>Station</th>
              <th>Association</th>
              <th>Plate Number</th>
              <th>Level</th>
              <th>Registration Date</th>
              <th>Number of Passengers</th>
              <th>Car Type</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {vehicles.map((vehicle) => (
              <tr key={vehicle.id}>
                <td>
                  {stations.find((s) => s.id === vehicle.station_id)?.name}
                </td>
                <td>
                  {
                    associations.find((a) => a.id === vehicle.association_id)
                      ?.name
                  }
                </td>
                <td>{vehicle.plate_number}</td>
                <td>{levels.find((l) => l.id === vehicle.level)?.name}</td>
                <td>{vehicle.registration_date}</td>
                <td>{vehicle.number_of_passengers}</td>
                <td>{carTypes.find((c) => c.id === vehicle.car_type)?.name}</td>
                <td>
                  <button
                    onClick={() => handleEditVehicle(vehicle)}
                    className="btn btn-sm btn-warning mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteVehicle(vehicle.id)}
                    className="btn btn-sm btn-danger"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Vehicle;
