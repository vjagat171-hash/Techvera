// frontend/src/components/Footer.jsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  const location = useLocation();
  
  // Admin pages par footer nahi dikhana hai
  if (location.pathname.startsWith('/admin')) {
    return null;
  }

  return (
    <footer className="bg-gray-900 text-gray-300 py-12 font-sans border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Brand Section */}
        <div>
          <h2 className="text-3xl font-extrabold text-blue-400 mb-4 tracking-wider">TECHVERA</h2>
          <p className="text-gray-400 mb-6">
            Your partner in digital growth. We build modern websites, drive traffic, and maximize your online potential.
          </p>
          <div className="flex space-x-4">
            <a href="#" className="text-gray-400 hover:text-blue-500 transition text-xl"><FaFacebook /></a>
            <a href="#" className="text-gray-400 hover:text-blue-400 transition text-xl"><FaTwitter /></a>
            <a href="#" className="text-gray-400 hover:text-blue-700 transition text-xl"><FaLinkedin /></a>
            <a href="#" className="text-gray-400 hover:text-pink-500 transition text-xl"><FaInstagram /></a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-bold text-white mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li><Link to="/" className="hover:text-blue-400 transition">Home</Link></li>
            <li><Link to="/services" className="hover:text-blue-400 transition">Our Services</Link></li>
            <li><Link to="/projects" className="hover:text-blue-400 transition">Live Projects</Link></li>
            <li><Link to="/blog" className="hover:text-blue-400 transition">Latest Blogs</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-xl font-bold text-white mb-4">Contact Us</h3>
          <ul className="space-y-2 text-gray-400">
            <li>Email: hello@techvera.com</li>
            <li>Phone: +91 98765 43210</li>
            <li>Location: New Delhi, India</li>
          </ul>
          <Link to="/contact" className="inline-block mt-4 border border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white px-6 py-2 rounded-full font-semibold transition">
            Let's Talk
          </Link>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center text-gray-500 mt-12 pt-4 border-t border-gray-800 text-sm">
        &copy; {new Date().getFullYear()} Techvera Digital Agency. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;