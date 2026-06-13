"use client";

import { useEffect, useState, useContext } from "react";
import { apiRequest } from "../../services/api.js";
import { AuthContext } from "../../context/authContext.js";
import {
  Container,
  Card,
  Status,
  Button,
} from "../../../../src/component/dashboard/DashboardStyles.js";
import { useRouter } from "next/navigation.js";

export default function Dashboard() {
  const { user, logout } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState("");
  const [items, setItems] = useState([])
    const router = useRouter();

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const data = await apiRequest(
          "/bookings",
          "GET",
          null,
          user?.token
        );
        setBookings(data);
      } catch (err) {
        setError(err.message);
      }
    };

    if (user) fetchBookings();
  }, [user]);

  if (!user) return <p>Please login</p>;

  useEffect(() => {
    const fetchData =async () => {
      const data = await getItems()
    }
    fetchData()
  }, []);

  return (
    <Container>
      <h2>Dashboard</h2>
      {items.length === 0 ? (
        <p>No items found</p>
      ): (
        items.map((item) => (
          <div key={item.id}> 
          <h3>{item.name}</h3>
          <p>{item.description}</p>
          </div>
        ))
      )}
      <button onClick={logout}>Logout</button>
      <h1>Welcome{user.name}</h1>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {bookings.length === 0 ? (
        <p>No bookings yet</p>
      ) : (
        bookings.map((booking) => (
          <Card key={booking._id}>
            <h3>Booking ID: {booking._id}</h3>

            <p>
              Pickup: {booking.pickupLocation?.address}
            </p>
            <p>
              Delivery: {booking.deliveryLocation?.address}
            </p>

            <Status status={booking.status}>
              {booking.status}
            </Status>

            <br />

            <Button
              onClick={() =>
                window.location.href = `/tracking/${booking._id}`
              }
            >
              Track
            </Button>
          </Card>
        ))
      )}
    </Container>
  );
}