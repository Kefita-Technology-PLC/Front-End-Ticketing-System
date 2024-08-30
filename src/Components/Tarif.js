import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import DataTable from "react-data-table-component";
import { Button } from "./ui/Button";

function Tarif() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_ENDPOINT}/v1/Tariffs`)
      .then((res) => setData(res.data))
      .catch((error) => console.error("Error fetching tariffs:", error));
  }, []);

  function handleDelete(id) {
    axios
      .delete(`${process.env.REACT_APP_API_ENDPOINT}/v1/Tariffs/${id}`)
      .then(() => navigate("/Tarif"))
      .catch((error) => console.error("Error deleting tariff:", error));
  }

  const columns = [
    {
      name: "Station",
      selector: (row) => row.station,
      sortable: true,
    },
    {
      name: "Destination",
      selector: (row) => row.destination,
      sortable: true,
    },
    {
      name: "Distance",
      selector: (row) => row.distance,
      sortable: true,
    },
    {
      name: "Level 1",
      selector: (row) => row.level1,
    },
    {
      name: "Level 2",
      selector: (row) => row.level2,
    },
    {
      name: "Level 3",
      selector: (row) => row.level3,
    },
    {
      name: "Action",
      cell: (row) => (
        <div className="flex justify-center space-x-2">
          <Link to={`/update tarif/${row.id}`}>
            <button className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-1 px-3 rounded shadow">
              Update
            </button>
          </Link>
          <Button onClick={() => handleDelete(row.id)}>Delete</Button>
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
        <Link to="/create tarif">
          <Button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded shadow">
            Add +
          </Button>
        </Link>
      </div>
      <DataTable
        columns={columns}
        data={data}
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
              fontSize: "16px",
            },
          },
        }}
      />
    </div>
  );
}

export default Tarif;
