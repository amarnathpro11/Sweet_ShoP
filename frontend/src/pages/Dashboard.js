import React, { useEffect, useState } from "react";
import client, { setAuthToken } from "../api";
import SweetCard from "../components/SweetCard";

export default function Dashboard() {
  const [sweets, setSweets] = useState([]);
  const [token] = useState(localStorage.getItem("token") || null);

  useEffect(() => {
    if (token) setAuthToken(token);
    fetchSweets();
  }, [token]);

  async function fetchSweets() {
    try {
      const res = await client.get("/api/sweets");
      setSweets(res.data);
    } catch (err) {
      console.error(err);
      setSweets([]);
    }
  }

  async function purchase(id) {
    try {
      await client.post(`/api/sweets/${id}/purchase`, null, {
        params: { qty: 1 },
      });
      fetchSweets();
    } catch (err) {
      alert("Purchase failed");
    }
  }

  return (
    <div>
      <h2>Available Sweets</h2>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {sweets.map((s) => (
          <SweetCard key={s.id} sweet={s} onPurchase={purchase} />
        ))}
      </div>
    </div>
  );
}
