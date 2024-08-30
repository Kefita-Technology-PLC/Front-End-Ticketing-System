import React, { useState, useEffect } from "react";
import { Input } from "./ui/input";
import { Select } from "./ui/select";
import { Button } from "./ui/Button";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
export const Eupdate = ({ stations }) => {
  const [records, setRecords] = useState({});
  const { id } = useParams();
  const apiEndpoint = `${process.env.REACT_APP_API_ENDPOINT}/v1/Employee/${id}`;
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get(apiEndpoint)
      .then((res) => {
        setRecords(res.data);
      })
      .catch((error) => {
        console.error("Error submitting data:", error);
        alert("Failed to submit data");
      });
  }, [apiEndpoint, id]);
  function handleSubmit(event) {
    event.preventDefault();
    axios.put(apiEndpoint + id, records).then((res) => navigate("/Employee"));
  }
  return (
    <div className="p-6 rounded-lg mx-32 mt-4">
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <div>
            <label
              htmlFor="station-select"
              className="block text-gray-700 text-sm font-medium mb-2"
            >
              Station:
            </label>
            <Select
              id="station-select"
              value={records.stations}
              onChange={(e) =>
                setRecords({ ...records, stations: e.target.value })
              }
              options={stations.map((station) => ({
                value: station.id,
                label: station.name,
              }))}
              placeholder="Select a station"
              required
            />
          </div>

          <div>
            <label
              htmlFor="name-input"
              className="block text-gray-700 text-sm font-medium mb-2"
            >
              Name:
            </label>
            <Input
              id="name-input"
              value={records.name}
              onChange={(e) => setRecords({ ...records, name: e.target.value })}
              placeholder="Enter Name"
              required
            />
          </div>

          <div>
            <label
              htmlFor="phone-input"
              className="block text-gray-700 text-sm font-medium mb-2"
            >
              Phone Number:
            </label>
            <Input
              id="phone-input"
              value={records.phone}
              onChange={(e) =>
                setRecords({ ...records, phone: e.target.value })
              }
              placeholder="+251XXXXXXXXXX"
              required
            />
          </div>

          <div>
            <label
              htmlFor="gender-select"
              className="block text-gray-700 text-sm font-medium mb-2"
            >
              Gender:
            </label>
            <Select
              id="gender-select"
              value={records.gender}
              onChange={(e) =>
                setRecords({ ...records, gender: e.target.value })
              }
              options={[
                { value: "Male", label: "Male" },
                { value: "Female", label: "Female" },
                { value: "Other", label: "Other" },
              ]}
              placeholder="Select Gender"
              required
            />
          </div>

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
              value={records.salary}
              onChange={(e) =>
                setRecords({ ...records, salary: e.target.value })
              }
              placeholder="Enter Salary"
              min="0"
              step="0.01"
              required
            />
          </div>
          <Button type="submit" className="mt-6">
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};
