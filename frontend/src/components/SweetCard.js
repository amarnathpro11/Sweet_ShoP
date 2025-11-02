import React from "react";

export default function SweetCard({ sweet, onBuy, isLoggedIn }) {
  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition transform hover:-translate-y-1 p-4 text-center border">
      <h3 className="text-lg font-bold text-gray-800">{sweet.name}</h3>
      <p className="text-sm text-gray-500">{sweet.category}</p>
      <p className="text-pink-600 font-semibold mt-2">₹{sweet.price}</p>
      <p className="text-gray-600 text-sm">Stock: {sweet.quantity}</p>
      {isLoggedIn && (
        <button
          onClick={() => onBuy(sweet.id)}
          className="mt-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white px-4 py-2 rounded-md hover:opacity-90 transition"
        >
          Buy
        </button>
      )}
    </div>
  );
}
