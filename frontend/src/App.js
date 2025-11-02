import React, { useState, useEffect } from "react";
import axios from "axios";

export default function App() {
  const [sweets, setSweets] = useState([]);
  const [token, setToken] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
  });

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const params = new URLSearchParams();
      params.append("username", username);
      params.append("password", password);

      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/auth/login`,
        params,
        { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
      );

      setToken(res.data.access_token);
      setLoggedIn(true);
      alert("✅ Login successful!");
    } catch (err) {
      alert("❌ Invalid credentials");
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/auth/register`,
        {
          username,
          password,
          is_admin: false,
        },
        { headers: { "Content-Type": "application/json" } }
      );
      alert("🎉 Registration successful! Please log in.");
      setIsRegistering(false);
    } catch (err) {
      alert("⚠️ Username already exists or invalid data.");
    }
  };

  const fetchSweets = async () => {
    try {
      const res = await api.get("/api/sweets");
      setSweets(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const purchaseSweet = async (id) => {
    try {
      await api.post(`/api/sweets/${id}/purchase?qty=1`, null, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Sweet purchased!");
      fetchSweets();
    } catch (err) {
      alert("Error purchasing sweet.");
    }
  };

  useEffect(() => {
    fetchSweets();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-200 via-purple-200 to-yellow-100 font-[Poppins] p-6">
      <div className="bg-white shadow-2xl rounded-2xl w-full max-w-3xl p-8 text-center border-t-4 border-pink-500">
        <h1 className="text-3xl font-bold text-pink-600 flex justify-center items-center gap-2 mb-4">
          🍭 Sweet Shop
        </h1>

        {!loggedIn ? (
          <>
            {!isRegistering ? (
              <>
                <p className="text-gray-600 mb-4">
                  Please login to purchase sweets
                </p>

                <form onSubmit={handleLogin} className="flex flex-col gap-4">
                  <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-pink-400 bg-pink-50"
                    required
                  />

                  <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-pink-400 bg-pink-50"
                    required
                  />

                  <button
                    type="submit"
                    className="bg-gradient-to-r from-pink-500 to-purple-500 text-white py-2 rounded-lg hover:opacity-90 transition font-semibold"
                  >
                    Login
                  </button>
                </form>

                <p className="mt-4 text-sm text-gray-600">
                  Don’t have an account?{" "}
                  <button
                    onClick={() => setIsRegistering(true)}
                    className="text-pink-600 font-semibold hover:underline"
                  >
                    Register here
                  </button>
                </p>
              </>
            ) : (
              <>
                <h2 className="text-lg font-semibold text-gray-700 mb-2">
                  Register
                </h2>
                <form onSubmit={handleRegister} className="flex flex-col gap-4">
                  <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-purple-400 bg-purple-50"
                    required
                  />

                  <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-purple-400 bg-purple-50"
                    required
                  />

                  <button
                    type="submit"
                    className="bg-gradient-to-r from-purple-500 to-pink-500 text-white py-2 rounded-lg hover:opacity-90 transition font-semibold"
                  >
                    Register
                  </button>
                </form>

                <p className="mt-4 text-sm text-gray-600">
                  Already have an account?{" "}
                  <button
                    onClick={() => setIsRegistering(false)}
                    className="text-purple-600 font-semibold hover:underline"
                  >
                    Login here
                  </button>
                </p>
              </>
            )}
          </>
        ) : (
          <>
            <p className="text-gray-700 mb-4 font-medium">
              Welcome, <span className="text-pink-600">{username}</span>!
            </p>

            <button
              onClick={() => setLoggedIn(false)}
              className="bg-gray-200 px-5 py-2 rounded-lg hover:bg-gray-300 transition mb-6 font-medium"
            >
              Logout
            </button>

            <div className="mt-4 bg-gradient-to-br from-pink-50 to-purple-50 rounded-xl p-6 shadow-inner">
              <h2 className="text-2xl font-bold text-pink-600 mb-6">
                🍬 Available Sweets
              </h2>

              {sweets.length === 0 ? (
                <p className="text-gray-500 italic">
                  No sweets available right now.
                </p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {sweets.map((s) => (
                    <div
                      key={s.id}
                      className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition transform hover:-translate-y-1"
                    >
                      <h3 className="text-lg font-bold text-gray-800">
                        {s.name}
                      </h3>
                      <p className="text-sm text-gray-500">{s.category}</p>
                      <p className="text-pink-600 font-semibold mt-2">
                        ₹{s.price}
                      </p>
                      <p className="text-gray-600 text-sm">
                        Stock: {s.quantity}
                      </p>
                      <button
                        onClick={() => purchaseSweet(s.id)}
                        className="mt-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white px-4 py-2 rounded-lg hover:opacity-90 transition w-full"
                      >
                        Buy
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
