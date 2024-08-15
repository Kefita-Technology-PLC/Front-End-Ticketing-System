import React, { useState, useEffect } from "react";
import { Input } from "./ui/input";
import { Select } from "./ui/select";
import { Button } from "./ui/Button";

export const Employee = ({ stations, setStations }) => {
  const [employees, setEmployees] = useState([]);
  const [selectedStation, setSelectedStation] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [hireDate, setHireDate] = useState("");
  const [salary, setSalary] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/employees");
        const data = await response.json();
        setEmployees(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [setStations]);

  const validateForm = () => {
    let formErrors = {};

    if (!selectedStation) formErrors.selectedStation = "Station is required.";
    if (!name) formErrors.name = "Name is required.";
    if (!phone) formErrors.phone = "Phone number is required.";
    if (!gender) formErrors.gender = "Gender is required.";
    if (!hireDate) formErrors.hireDate = "Hire date is required.";
    if (!salary) formErrors.salary = "Salary is required.";

    setErrors(formErrors);

    return Object.keys(formErrors).length === 0;
  };

  const handleAdd = async () => {
    if (!validateForm()) {
      return;
    }

    const employeeData = {
      station_id: selectedStation,
      name,
      phone,
      gender,
      hire_date: hireDate,
      salary,
    };

    try {
      const response = await fetch("http://localhost:3000/employees", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(employeeData),
      });

      if (!response.ok) {
        throw new Error("Failed to save the employee data.");
      }

      const newEmployee = await response.json();
      setEmployees((prevEmployees) => [...prevEmployees, newEmployee]);

      // Reset form fields after successful save
      setSelectedStation("");
      setName("");
      setPhone("");
      setGender("");
      setHireDate("");
      setSalary("");
      setErrors({}); // Clear errors
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to save the employee data.");
    }
  };

  const handleCancel = () => {
    setSelectedStation("");
    setName("");
    setPhone("");
    setGender("");
    setHireDate("");
    setSalary("");
    setErrors({});
  };

  return (
    <div className="p-6 rounded-lg  mx-32 mt-4 ">
      <h2 className="text-2xl font-bold mb-6 text-gray-700">
        Add New Employee
      </h2>
      <div className="space-y-4">
        {/* Station Selection */}
        <div>
          <label
            htmlFor="station-select"
            className="block text-gray-700 text-sm font-medium mb-2"
          >
            Station:
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
          {errors.selectedStation && (
            <p className="text-red-500 text-sm mt-1">
              {errors.selectedStation}
            </p>
          )}
        </div>

        {/* Name Input */}
        <div>
          <label
            htmlFor="name-input"
            className="block text-gray-700 text-sm font-medium mb-2"
          >
            Name:
          </label>
          <Input
            id="name-input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter Name"
            required
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name}</p>
          )}
        </div>

        {/* Phone Input */}
        <div>
          <label
            htmlFor="phone-input"
            className="block text-gray-700 text-sm font-medium mb-2"
          >
            Phone Number:
          </label>
          <Input
            id="phone-input"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+251XXXXXXXXXX"
            required
          />
          {errors.phone && (
            <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
          )}
        </div>

        {/* Gender Selection */}
        <div>
          <label
            htmlFor="gender-select"
            className="block text-gray-700 text-sm font-medium mb-2"
          >
            Gender:
          </label>
          <Select
            id="gender-select"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            options={[
              { value: "Male", label: "Male" },
              { value: "Female", label: "Female" },
              { value: "Other", label: "Other" },
            ]}
            placeholder="Select Gender"
            required
          />
          {errors.gender && (
            <p className="text-red-500 text-sm mt-1">{errors.gender}</p>
          )}
        </div>

        {/* Hire Date Input */}
        <div>
          <label
            htmlFor="hire-date-input"
            className="block text-gray-700 text-sm font-medium mb-2"
          >
            Hire Date:
          </label>
          <Input
            type="date"
            id="hire-date-input"
            value={hireDate}
            onChange={(e) => setHireDate(e.target.value)}
            required
          />
          {errors.hireDate && (
            <p className="text-red-500 text-sm mt-1">{errors.hireDate}</p>
          )}
        </div>

        {/* Salary Input */}
        <div>
          <label
            htmlFor="salary-input"
            className="block text-gray-700 text-sm font-medium mb-2"
          >
            Salary:
          </label>
          <Input
            type="number"
            id="salary-input"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
            placeholder="Enter Salary"
            min="0"
            step="0.01"
            required
          />
          {errors.salary && (
            <p className="text-red-500 text-sm mt-1">{errors.salary}</p>
          )}
        </div>

        {/* Action Buttons */}
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
