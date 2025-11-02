import React, { useState } from "react";
import client from "../api";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const nav = useNavigate();

  async function submit(e) {
    e.preventDefault();
    try {
      await client.post("/api/auth/register", {
        username,
        password,
        is_admin: isAdmin,
      });
      alert("Registered - please login");
      nav("/login");
    } catch (err) {
      alert("Register failed");
    }
  }

  return (
    <form onSubmit={submit}>
      <h2>Register</h2>
      <div>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="username"
        />
      </div>
      <div>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="password"
        />
      </div>
      <div>
        <label>
          Admin?
          <input
            type="checkbox"
            checked={isAdmin}
            onChange={(e) => setIsAdmin(e.target.checked)}
          />
        </label>
      </div>
      <button>Register</button>
    </form>
  );
}
