import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const RegisterRestaurant = () => {
  const [form, setForm] = useState({
    name: '',
    owner: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    cuisine: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:4000/api/restaurants', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      if (!res.ok) throw new Error('Failed to register');
      const json = await res.json();
      navigate(`/register-restaurant/${json.slug}`);
    } catch (err) {
      alert('Registration failed. Is backend running?');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <main className="flex-1 w-full max-w-3xl mx-auto px-4 py-10">
        <h1 className="text-3xl md:text-4xl font-extrabold text-orange-600 mb-6 text-center font-serif">
          Register Your Restaurant
        </h1>
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-6 md:p-8 grid grid-cols-1 gap-4">
          <div>
            <label className="block text-gray-700 mb-1">Restaurant Name</label>
            <input name="name" value={form.name} onChange={handleChange} required className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-300 outline-none" />
          </div>
          <div>
            <label className="block text-gray-700 mb-1">Owner Name</label>
            <input name="owner" value={form.owner} onChange={handleChange} required className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-300 outline-none" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 mb-1">Email</label>
              <input type="email" name="email" value={form.email} onChange={handleChange} required className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-300 outline-none" />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Phone</label>
              <input name="phone" value={form.phone} onChange={handleChange} required className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-300 outline-none" />
            </div>
          </div>
          <div>
            <label className="block text-gray-700 mb-1">Address</label>
            <input name="address" value={form.address} onChange={handleChange} required className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-300 outline-none" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 mb-1">City</label>
              <input name="city" value={form.city} onChange={handleChange} required className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-300 outline-none" />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Cuisine</label>
              <input name="cuisine" value={form.cuisine} onChange={handleChange} required className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-300 outline-none" />
            </div>
          </div>
          <button type="submit" className="bg-green-500 text-white font-bold py-3 rounded-lg shadow hover:bg-green-600 transition">
            Submit Registration
          </button>
        </form>
      </main>
      <Footer />
    </div>
  );
};

export default RegisterRestaurant;


