"use client";

import { useState, useContext } from "react";
import { useRouter } from "next/navigation";
import { apiRequest } from "../../services/api.js";
import { AuthContext } from "../../context/authContext.js";
import {
  Container,
  Section,
  Label,
  Input,
  Button,
} from "../../components/forms/BookingStyles";

export default function BookingPage() {
  const { user } = useContext(AuthContext);
  const router = useRouter();

  const [items, setItems] = useState([
    { name: "", quantity: 1, fragile: false },
  ]);

  const [pickup, setPickup] = useState({ address: "", city: "" });
  const [delivery, setDelivery] = useState({ address: "", city: "" });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Add item field
  const addItem = () => {
    setItems([...items, { name: "", quantity: 1 }]);
  };

  // Handle item change
  const updateItem = (index, field, value) => {
    const updated = [...items];
    updated[index][field] = value;
    setItems(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!user) {
      setError("Please login first");
      return;
    }

    try {
      setLoading(true);

      await apiRequest(
        "/bookings",
        "POST",
        {
          items,
          pickupLocation: pickup,
          deliveryLocation: delivery,
        },
        user.token
      );

      router.push("/dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <h2>Create Booking</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        {/* Items */}
        <Section>
          <Label>Items</Label>

          {items.map((item, index) => (
            <div key={index}>
              <Input
                placeholder="Item name"
                onChange={(e) =>
                  updateItem(index, "name", e.target.value)
                }
              />
              <Input
                type="number"
                placeholder="Quantity"
                onChange={(e) =>
                  updateItem(index, "quantity", e.target.value)
                }
              />
            </div>
          ))}

          <Button type="button" onClick={addItem}>
            + Add Item
          </Button>
        </Section>

        {/* Pickup */}
        <Section>
          <Label>Pickup Location</Label>
          <Input
            placeholder="Address"
            onChange={(e) =>
              setPickup({ ...pickup, address: e.target.value })
            }
          />
          <Input
            placeholder="City"
            onChange={(e) =>
              setPickup({ ...pickup, city: e.target.value })
            }
          />
        </Section>

        {/* Delivery */}
        <Section>
          <Label>Delivery Location</Label>
          <Input
            placeholder="Address"
            onChange={(e) =>
              setDelivery({ ...delivery, address: e.target.value })
            }
          />
          <Input
            placeholder="City"
            onChange={(e) =>
              setDelivery({ ...delivery, city: e.target.value })
            }
          />
        </Section>

        <Button type="submit">
          {loading ? "Creating..." : "Create Booking"}
        </Button>
      </form>
    </Container>
  );
}