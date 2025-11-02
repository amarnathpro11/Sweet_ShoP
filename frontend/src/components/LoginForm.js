import React, { useState } from "react";

export default function LoginForm({ onLogin, switchToRegister }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-2xl p-8 mt-10 border-t-4 border-pink-500">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">
        🍬 Login to Sweet Shop
      </h2>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          onLogin(username, password);
        }}
        className="space-y-4"
      >
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
          required
        />

        <button
          type="submit"
          className="w-full bg-pink-500 text-white py-2 rounded-md hover:bg-pink-600 transition font-semibold"
        >
          Login
        </button>
      </form>

      <p className="mt-4 text-center text-gray-600">
        Don’t have an account?{" "}
        <button
          onClick={switchToRegister}
          className="text-pink-600 font-semibold hover:underline"
        >
          Register here
        </button>
      </p>
    </div>
  );
}
