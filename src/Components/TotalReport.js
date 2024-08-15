import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";

export const TotalReport = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const columns = [
    {
      name: "Station ID",
      selector: (row) => row.station_id,
      sortable: true,
    },
    {
      name: "Station Name",
      selector: (row) => row.station_name,
      sortable: true,
    },
    {
      name: "Association Name",
      selector: (row) => row.association_name,
      sortable: true,
    },
    {
      name: "Number of Employees",
      selector: (row) => row.number_of_employees,
      sortable: true,
    },
    {
      name: "Number of Vehicles",
      selector: (row) => row.number_of_vehicles,
      sortable: true,
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch data from the provided API endpoints
        const [
          stationsResponse,
          associationsResponse,
          vehiclesResponse,
          employeesResponse,
        ] = await Promise.all([
          fetch("http://localhost:3000/stations"),
          fetch("http://localhost:3000/associations"),
          fetch("http://localhost:3000/vehicles"),
          fetch("http://localhost:3000/employees"),
        ]);

        const stations = await stationsResponse.json();
        const associations = await associationsResponse.json();
        const vehicles = await vehiclesResponse.json();
        const employees = await employeesResponse.json();

        // Process data to match the required format
        const processedData = stations
          .map((station) => {
            const stationAssociations = associations.filter(
              (association) => association.station_id === station.id
            );

            return stationAssociations.map((association) => {
              const vehiclesForAssociation = vehicles.filter(
                (vehicle) =>
                  vehicle.station_id === station.id &&
                  vehicle.association_id === association.id
              );

              const employeesForStation = employees.filter(
                (employee) => employee.station_id === station.id
              );

              return {
                station_id: station.id,
                station_name: station.name,
                association_name: association.name,
                number_of_employees: employeesForStation.length,
                number_of_vehicles: vehiclesForAssociation.length,
              };
            });
          })
          .flat();

        setData(processedData);
      } catch (error) {
        console.error("Error fetching the data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <DataTable columns={columns} data={data} />
      )}
    </div>
  );
};
