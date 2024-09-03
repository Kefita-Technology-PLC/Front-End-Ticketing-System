import React, { useState } from "react";
import axios from "axios";
export const TicketReport = () => {

  const [ticketData, setTicketData] = useState({
    title: "",
    description: "",
    status: "open",
  });
  
  const [latestTicket, setLatestTicket] = useState(null);
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    setTicketData({ ...ticketData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/tickets",
        ticketData
      );
      setLatestTicket(response.data);
      setTicketData({ title: "", description: "", status: "open" }); // Reset form
      setError("");
    } catch (err) {
      setError("Failed to create ticket. Please try again.");
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Create Ticket</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input
            type="text"
            name="title"
            value={ticketData.title}
            onChange={handleInputChange}
            required
          />
        </label>
        <br />
        <label>
          Description:
          <textarea
            name="description"
            value={ticketData.description}
            onChange={handleInputChange}
            required
          />
        </label>
        <br />
        <label>
          Status:
          <select
            name="status"
            value={ticketData.status}
            onChange={handleInputChange}
          >
            <option value="open">Open</option>
            <option value="closed">Closed</option>
            <option value="in_progress">In Progress</option>
          </select>
        </label>
        <br />
        <button type="submit">Create Ticket</button>
      </form>
      {error && <p>{error}</p>}
      {latestTicket && (
        <div>
          <h3>Latest Ticket Created:</h3>
          <p>Title: {latestTicket.title}</p>
          <p>Description: {latestTicket.description}</p>
          <p>Status: {latestTicket.status}</p>
        </div>
      )}
    </div>
  );
};
