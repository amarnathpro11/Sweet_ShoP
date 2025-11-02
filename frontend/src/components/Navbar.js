import React from "react";

export default function Navbar({ username, onLogout }) {
  return (
    <nav className="flex justify-between items-center bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-4 shadow-md">
      <h1 className="text-2xl font-bold tracking-wide flex items-center gap-2">
        🍭 Sweet Shop
      </h1>

      {username && (
        <div className="flex items-center gap-4">
          <span className="font-medium">Welcome, {username}!</span>
          <button
            onClick={onLogout}
            className="bg-white text-pink-600 font-semibold px-4 py-1 rounded hover:bg-pink-100 transition"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}
