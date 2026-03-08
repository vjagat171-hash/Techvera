// frontend/src/components/Navbar.jsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();
  
  // Admin pages par navbar nahi dikhana hai
  if (location.pathname.startsWith('/admin')) {
    return null; 
  }

  return (
    <nav className="bg-gray-900 text-white p-4 sticky top-0 z-50 shadow-2xl">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-3xl font-extrabold text-blue-400 tracking-wider">
          TECHVERA
        </Link>
        
        <div className="space-x-8 hidden md:flex font-medium text-gray-300">
         <Link to="/" className="hover:text-blue-400 transition duration-300">Home</Link>
         <Link to="/about" className="hover:text-blue-400 transition duration-300">About</Link>
         <Link to="/services" className="hover:text-blue-400 transition duration-300">Services</Link>
         <Link to="/projects" className="hover:text-blue-400 transition duration-300">Live Projects</Link>
         <Link to="/blog" className="hover:text-blue-400 transition duration-300">Blog</Link>
        </div>

        <Link to="/contact" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full font-bold transition duration-300 hidden md:block shadow-lg">
          Get in Touch
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;