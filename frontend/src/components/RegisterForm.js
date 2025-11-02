import React, { useState } from "react";

export default function RegisterForm({ onRegister, switchToLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-2xl p-8 mt-10 border-t-4 border-purple-500">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">
        🍰 Register New Account
      </h2>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          onRegister(username, password);
        }}
        className="space-y-4"
      >
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
          required
        />

        <button
          type="submit"
          className="w-full bg-purple-500 text-white py-2 rounded-md hover:bg-purple-600 transition font-semibold"
        >
          Register
        </button>
      </form>

      <p className="mt-4 text-center text-gray-600">
        Already have an account?{" "}
        <button
          onClick={switchToLogin}
          className="text-purple-600 font-semibold hover:underline"
        >
          Login here
        </button>
      </p>
    </div>
  );
}
