import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const About = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <main className="flex-1 w-full max-w-5xl mx-auto px-4 py-10">
        <h1 className="text-4xl md:text-5xl font-extrabold text-orange-600 mb-6 text-center font-serif">About Our Restaurant</h1>
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
          <p className="text-gray-700 leading-relaxed mb-4">
            Welcome to AR Bistro — where great taste meets modern experience. We craft delicious dishes with
            fresh ingredients and bring them to life with interactive 3D viewing so you can explore your meal
            before you order.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            From classic pizzas and juicy burgers to sushi, salads, pasta, and tacos, our menu balances
            comfort and creativity. Our chefs focus on quality, consistency, and bold flavors.
          </p>
          <p className="text-gray-700 leading-relaxed mb-6">
            Our mission is simple: tasty food, a delightful ordering experience, and friendly service. Thank you
            for visiting — were excited to serve you!
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
            <div className="p-4 bg-orange-50 rounded-xl">
              <div className="text-2xl font-extrabold text-orange-600">1000+</div>
              <div className="text-gray-600">Happy Customers</div>
            </div>
            <div className="p-4 bg-orange-50 rounded-xl">
              <div className="text-2xl font-extrabold text-orange-600">50+</div>
              <div className="text-gray-600">Menu Items</div>
            </div>
            <div className="p-4 bg-orange-50 rounded-xl">
              <div className="text-2xl font-extrabold text-orange-600">5⭐</div>
              <div className="text-gray-600">Top Ratings</div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default About;


