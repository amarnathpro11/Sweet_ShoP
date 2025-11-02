import React, { useEffect, useState } from "react";
import client from "../api";

export default function AdminPanel() {
  const [sweets, setSweets] = useState([]);
  const [form, setForm] = useState({
    name: "",
    category: "",
    price: 0,
    quantity: 0,
  });

  useEffect(() => {
    fetchSweets();
  }, []);

  async function fetchSweets() {
    try {
      const res = await client.get("/api/sweets");
      setSweets(res.data);
    } catch (err) {
      console.error(err);
    }
  }

  async function addSweet(e) {
    e.preventDefault();
    try {
      await client.post("/api/sweets", form);
      setForm({ name: "", category: "", price: 0, quantity: 0 });
      fetchSweets();
    } catch (err) {
      alert("Add failed");
    }
  }

  async function del(id) {
    if (!window.confirm("Delete?")) return;
    try {
      await client.delete(`/api/sweets/${id}`);
      fetchSweets();
    } catch (err) {
      alert("Delete failed");
    }
  }

  return (
    <div>
      <h2>Admin Panel</h2>
      <form onSubmit={addSweet}>
        <input
          placeholder="name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          placeholder="category"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
        />
        <input
          placeholder="price"
          type="number"
          value={form.price}
          onChange={(e) =>
            setForm({ ...form, price: parseFloat(e.target.value) })
          }
        />
        <input
          placeholder="quantity"
          type="number"
          value={form.quantity}
          onChange={(e) =>
            setForm({ ...form, quantity: parseInt(e.target.value || 0) })
          }
        />
        <button type="submit">Add</button>
      </form>

      <h3>All Sweets</h3>
      <ul>
        {sweets.map((s) => (
          <li key={s.id}>
            {s.name} - {s.quantity} - ₹{s.price}
            <button onClick={() => del(s.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
