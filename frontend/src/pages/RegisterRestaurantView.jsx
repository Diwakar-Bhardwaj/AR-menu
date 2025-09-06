import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const RegisterRestaurantView = () => {
  const { slug } = useParams();
  const [data, setData] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    const fetchData = async () => {
      try {
        const res = await fetch(`http://localhost:4000/api/restaurants/${slug}`);
        if (!res.ok) throw new Error('Not found');
        const json = await res.json();
        if (mounted) setData(json);
      } catch (e) {
        if (mounted) setError('Restaurant not found');
      } finally {
        if (mounted) setLoading(false);
      }
    };
    fetchData();
    return () => { mounted = false; };
  }, [slug]);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <main className="flex-1 w-full max-w-3xl mx-auto px-4 py-10">
        {loading && <div className="text-center text-gray-500">Loading...</div>}
        {!loading && error && <div className="text-center text-red-500">{error}</div>}
        {!loading && data && (
          <div className="bg-white rounded-2xl shadow p-6">
            <h1 className="text-3xl font-extrabold text-orange-600 mb-4 text-center font-serif">{data.name}</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700">
              <div><span className="font-semibold">Owner:</span> {data.owner}</div>
              <div><span className="font-semibold">Email:</span> {data.email}</div>
              <div><span className="font-semibold">Phone:</span> {data.phone}</div>
              <div><span className="font-semibold">Cuisine:</span> {data.cuisine}</div>
              <div className="sm:col-span-2"><span className="font-semibold">Address:</span> {data.address}, {data.city}</div>
              {data.website && <div className="sm:col-span-2"><span className="font-semibold">Website:</span> <a className="text-blue-600 underline" href={data.website} target="_blank" rel="noreferrer">{data.website}</a></div>}
              <div className="sm:col-span-2"><span className="font-semibold">Slug URL:</span> /register-restaurant/{data.slug}</div>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default RegisterRestaurantView;








