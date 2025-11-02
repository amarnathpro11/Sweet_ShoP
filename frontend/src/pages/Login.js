import React, { useState } from "react";
import client from "../api";
import { useNavigate } from "react-router-dom";

export default function Login({ setToken, setUser }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const nav = useNavigate();

  async function submit(e) {
    e.preventDefault();
    try {
      const form = new URLSearchParams();
      form.append("username", username);
      form.append("password", password);
      const res = await client.post("/api/auth/login", form);
      const token = res.data.access_token;
      setToken(token);
      localStorage.setItem("token", token);
      // fetch user details (quick method: token contains username but backend doesn't give user info on login)
      // here we call protected endpoint /api/sweets to verify token - to get user, backend could offer /me
      // For demo, store simple user
      const user = { username };
      setUser(user);
      localStorage.setItem("user", JSON.stringify(user));
      nav("/");
    } catch (err) {
      alert("Login failed");
    }
  }

  return (
    <form onSubmit={submit}>
      <h2>Login</h2>
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
      <button>Login</button>
    </form>
  );
}
