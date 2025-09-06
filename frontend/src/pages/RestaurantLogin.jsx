import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const COOKIE_KEY = "restaurant_uid";

const generateUID = () => {
  return "rest_" + Math.random().toString(36).substr(2, 16);
};

const RestaurantLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const uid = Cookies.get(COOKIE_KEY);
    if (uid) {
      // Already logged in, redirect
      navigate("/restaurant");
    }
  }, [navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }
    // Simulate authentication
    const uid = generateUID();
    Cookies.set(COOKIE_KEY, uid, { expires: 7 }); // Store for 7 days
    navigate("/restaurant");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form
        className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold mb-6 text-orange-600 text-center">
          Restaurant Login
        </h2>
        {error && (
          <div className="mb-4 text-red-500 text-center">{error}</div>
        )}
        <div className="mb-4">
          <label className="block mb-2 font-medium">Email</label>
          <input
            type="email"
            className="w-full px-4 py-2 border rounded-lg"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoFocus
          />
        </div>
        <div className="mb-6">
          <label className="block mb-2 font-medium">Password</label>
          <input
            type="password"
            className="w-full px-4 py-2 border rounded-lg"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-orange-500 text-white font-bold py-3 rounded-lg hover:bg-orange-600 transition"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default RestaurantLogin;
