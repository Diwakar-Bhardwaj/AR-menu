import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <nav className="sticky top-0 z-50 bg-orange-500 rounded-b-2xl shadow-md px-4 py-2 w-full">
      <div className="flex items-center justify-between">
        {/* Left: Logo */}
        <div className="flex items-center gap-2">
          <img
            src="https://via.placeholder.com/48x48?text=Logo"
            alt="Logo"
            className="h-12 w-12 rounded-full object-cover shadow"
          />
          <span className="text-white font-bold text-xl tracking-wide">AR Bistro</span>
        </div>
        {/* Hamburger for mobile */}
        <button
          className="lg:hidden flex flex-col justify-center items-center w-10 h-10 rounded hover:bg-orange-400 transition"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Toggle menu"
        >
          <span className={`block w-6 h-0.5 bg-white mb-1 transition-transform ${menuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
          <span className={`block w-6 h-0.5 bg-white mb-1 ${menuOpen ? 'opacity-0' : ''}`}></span>
          <span className={`block w-6 h-0.5 bg-white transition-transform ${menuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
        </button>
        {/* Right: Nav Links (desktop) */}
        <div className="hidden lg:flex items-center gap-4">
          {/* Search Bar */}
          <input
            type="text"
            placeholder="Search..."
            className="px-3 py-1 rounded-lg border-none focus:ring-2 focus:ring-orange-300 outline-none text-gray-700"
          />
          <button className="text-white font-medium hover:bg-orange-400 px-4 py-2 rounded-lg transition" onClick={() => navigate('/')}>
            Home
          </button>
          <button className="text-white font-medium hover:bg-orange-400 px-4 py-2 rounded-lg transition" onClick={() => navigate('/restaurant/68bb45f2225945b6f3e58212')}>
            Restaurant
          </button>
          <button className="bg-white text-orange-500 font-semibold px-4 py-2 rounded-lg shadow hover:bg-orange-100 transition" onClick={() => navigate('/about')}>
            About
          </button>
        </div>
      </div>
      {/* Mobile Menu */}
      {menuOpen && (
        <div className="flex flex-col gap-4 mt-4 lg:hidden animate-fade-in-down">
          <input
            type="text"
            placeholder="Search..."
            className="px-3 py-1 rounded-lg border-none focus:ring-2 focus:ring-orange-300 outline-none text-gray-700"
          />
          <button className="text-white font-medium hover:bg-orange-400 px-4 py-2 rounded-lg transition" onClick={() => { navigate('/'); setMenuOpen(false); }}>Home</button>
          <button className="text-white font-medium hover:bg-orange-400 px-4 py-2 rounded-lg transition" onClick={() => { navigate('/restaurant/68bb45f2225945b6f3e58212'); setMenuOpen(false); }}>Restaurant</button>
          <button className="bg-white text-orange-500 font-semibold px-4 py-2 rounded-lg shadow hover:bg-orange-100 transition" onClick={() => { navigate('/about'); setMenuOpen(false); }}>About</button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
