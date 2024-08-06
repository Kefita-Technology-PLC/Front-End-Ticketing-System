import React, { useState, useEffect } from "react";

export const Employee = ({
  stations,
  setStations,
  selectedStation,
  setSelectedStation,
}) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [hireDate, setHireDate] = useState("");
  const [salary, setSalary] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://api.example.com/data");
        const data = await response.json();
        setStations(data.stations || []);
      } catch (error) {
        console.error("Error fetching data:", error);
        setStations([]);
      }
    };

    fetchData();
  }, [setStations]);

  const handleAdd = () => {
    console.log("Adding staff member:", {
      selectedStation,
      name,
      phone,
      gender,
      hireDate,
      salary,
    });
  };

  return (
    <div>
      <label htmlFor="station-select">Station:</label>
      <select
        id="station-select"
        value={selectedStation}
        onChange={(e) => setSelectedStation(e.target.value)}
        className="form-select mt-1 block w-full"
      >
        <option value="">Select a station</option>
        {stations &&
          stations.map((station) => (
            <option key={station.id} value={station.id}>
              {station.name}
            </option>
          ))}
      </select>

      <label htmlFor="name-input">Name:</label>
      <input
        type="text"
        id="name-input"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter Name"
        className="form-input mt-1 block w-full"
      />

      <label htmlFor="phone-input">Phone Number:</label>
      <input
        type="text"
        id="phone-input"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        placeholder="+251XXXXXXXXXX"
        className="form-input mt-1 block w-full"
      />

      <label htmlFor="gender-select">Gender:</label>
      <select
        id="gender-select"
        value={gender}
        onChange={(e) => setGender(e.target.value)}
        className="form-select mt-1 block w-full"
      >
        <option value="">Select Gender</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
        <option value="Other">Other</option>
      </select>

      <label htmlFor="hire-date-input">Hire Date:</label>
      <input
        type="date"
        id="hire-date-input"
        value={hireDate}
        onChange={(e) => setHireDate(e.target.value)}
        className="form-input mt-1 block w-full"
      />

      <label htmlFor="salary-input">Salary:</label>
      <input
        type="text"
        id="salary-input"
        value={salary}
        onChange={(e) => setSalary(e.target.value)}
        placeholder="Enter Salary"
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
