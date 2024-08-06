import React from "react";

export const Association = ({
  stations,
  selectedStation,
  setSelectedStation,
}) => {
  return (
    <div>
      <label htmlFor="station-select">Choose a station:</label>
      <select
        id="station-select"
        value={selectedStation}
        onChange={(e) => setSelectedStation(e.target.value)}
        className="form-select mt-1 block w-full"
      >
        <option value="">station</option>
        {stations.map((station) => (
          <option key={station.id} value={station.id}>
            {station.name}
          </option>
        ))}
      </select>
      <label>Association name</label>
      <input type="text" placeholder="enter name" />
    </div>
  );
};
