import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import DataTable from "react-data-table-component";
import { Button } from "./ui/Button";

export const Employee = () => {
  const apiEndpoint = process.env.REACT_APP_API_ENDPOINT + "/v1/Employee";
  const [records, setRecords] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(apiEndpoint)
      .then((res) => setRecords(res.data))
      .catch((error) => console.error("Error fetching data:", error));
  }, [apiEndpoint]);

  const handleDelete = (id) => {
    axios
      .delete(`${process.env.REACT_APP_API_ENDPOINT}/v1/Employee/${id}`)
      .then(() => navigate("/Employee"))
      .catch((error) => console.error("Error deleting record:", error));
  };

  const columns = [
    {
      name: "Station",
      selector: (row) => row.station_id,
      sortable: true,
    },
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Phone",
      selector: (row) => row.phone,
    },
    {
      name: "Gender",
      selector: (row) => row.gender,
    },
    {
      name: "Salary",
      selector: (row) => row.salary,
    },
    {
      name: "Action",
      cell: (row) => (
        <div className="flex justify-center">
          <Link to={`/update employee/${row.id}`}>
            <button className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-1 px-3 rounded shadow">
              Update
            </button>
          </Link>
          <Button onClick={() => handleDelete(row.id)} className="ml-2">
            Delete
          </Button>
        </div>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  return (
    <div className="container mx-auto mt-8 p-4">
      <div className="flex justify-end mb-4">
        <Link to="/create employee">
          <Button className="bg-customBrown hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded shadow">
            Add +
          </Button>
        </Link>
      </div>
      <DataTable
        columns={columns}
        data={records}
        pagination
        highlightOnHover
        responsive
        customStyles={{
          rows: {
            style: {
              minHeight: "72px",
            },
          },
          headCells: {
            style: {
              backgroundColor: "#eee",
            },
          },
          cells: {
            style: {
              fontSize: "16px", // change the font size for body cells
            },
          },
        }}
      />
    </div>
  );
};
