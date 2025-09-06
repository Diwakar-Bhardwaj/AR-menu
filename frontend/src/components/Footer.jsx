import React from "react";
import { useNavigate } from "react-router-dom";
import LanguageSwitcher from './LanguageSwitcher';

const Footer = () => {
  const navigate = useNavigate();
  return (
    <footer className="bg-gray-900 text-white rounded-t-2xl px-6 py-8 mt-12">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-8">
        {/* About Us */}
        <div>
          <h3 className="font-bold text-lg mb-2">About Us</h3>
          <p className="text-gray-300 max-w-xs">We serve delicious food with a modern twist. Experience the best dining with us!</p>
        </div>
        {/* Contact */}
        <div>
          <h3 className="font-bold text-lg mb-2">Contact</h3>
          <ul className="text-gray-300">
            <li>Phone: (123) 456-7890</li>
            <li>Email: info@myrestaurant.com</li>
            <li>Location: 123 Main St, City</li>
          </ul>
        </div>
        {/* Follow Us */}
        <div>
          <h3 className="font-bold text-lg mb-2">Follow Us</h3>
          <div className="flex gap-4">
            <a href="#" className="hover:text-orange-400 transition">Instagram</a>
            <a href="#" className="hover:text-orange-400 transition">Facebook</a>
            <a href="#" className="hover:text-orange-400 transition">Twitter</a>
          </div>
        </div>
      </div>
      <LanguageSwitcher />
      <div className="mt-8 text-center">
        <div className="flex flex-wrap justify-center gap-4">
          <button
            className="text-orange-400 font-bold underline hover:text-orange-300 transition text-lg"
            onClick={() => navigate('/restaurant')}
          >
            My Restaurant
          </button>
          <button
            className="text-orange-400 font-bold underline hover:text-orange-300 transition text-lg"
            onClick={() => navigate('/orders')}
          >
            Customer Orders
          </button>
          <button
            className="text-orange-400 font-bold underline hover:text-orange-300 transition text-lg"
            onClick={() => navigate('/login-restaurant')}
          >
            Restaurant Login
          </button>
          <button
            className="text-orange-400 font-bold underline hover:text-orange-300 transition text-lg"
            onClick={() => navigate('/register-restaurant')}
          >
            Register Restaurant
          </button>
          <button
            className="text-orange-400 font-bold underline hover:text-orange-300 transition text-lg"
            onClick={() => navigate('/')}
          >
            Home
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
