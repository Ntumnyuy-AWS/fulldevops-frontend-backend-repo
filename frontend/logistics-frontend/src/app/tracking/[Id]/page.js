// src/app/tracking/[id]/page.js
"use client";

import { useEffect, useState, useContext } from "react";
import { useParams } from "next/navigation";
import { apiRequest } from "../../../services/api";
import { AuthContext } from "../../../context/authContext.js";
import { socket } from "../../../services/socket.js";

export default function TrackingPage() {
  const { id } = useParams();
  const { user } = useContext(AuthContext);

  const [logs, setLogs] = useState([]);

  useEffect(() => {

    if (!user) return;

    // connect socket
    socket.connect();

    // join booking room 
    socket.emit("joinBooking", id)

    // listen for updates
    socket.on("bookingUpdated", (data) => {
      if (data.bookingId === id) {
        fetchTracking();
      }
    });

    fetchTracking();
    return () => {
      socket.disconnect();
    }
  }, [id, user]);

      const fetchTracking = async () => {
      const data = await apiRequest(
        `/bookings/${id}/tracking`,
        "GET",
        null,
        user?.token
      );
      setLogs(data);
    };
  return (
    <div style={{ padding: "20px" }}>
      <h2>Tracking</h2>

      {logs.map((log) => (
        <div key={log._id} style={{ marginBottom: "10px" }}>
          <strong>{log.status}</strong>
          <p>Updated by: {log.updatedBy?.name}</p>
          <small>{new Date(log.createdAt).toLocaleString()}</small>
        </div>
      ))}
    </div>
  );
}