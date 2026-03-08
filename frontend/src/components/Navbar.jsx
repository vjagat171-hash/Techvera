// frontend/src/components/Navbar.jsx
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Scroll event listener for changing navbar style on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Admin pages par navbar nahi dikhana hai
  if (location.pathname.startsWith('/admin')) {
    return null; 
  }

  // Navigation Links Array for dynamic rendering
  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Live Projects', path: '/projects' },
    { name: 'Blog', path: '/blog' },
  ];

  // Toggle handlers for mobile menu
  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <nav className={`fixed w-full top-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-gray-950/90 backdrop-blur-md shadow-2xl py-3' : 'bg-gray-950 py-5 shadow-lg'
    }`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        
        {/* Logo */}
        <Link to="/" onClick={closeMenu} className="text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 tracking-wider z-50">
          TECHVERA
        </Link>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8 font-semibold text-sm tracking-wide">
          {navLinks.map((link) => {
            // Dynamic Active State Logic
            const isActive = location.pathname === link.path || (link.path !== '/' && location.pathname.startsWith(link.path));
            return (
              <Link 
                key={link.name} 
                to={link.path} 
                className={`transition duration-300 hover:text-blue-400 ${
                  isActive ? 'text-blue-400' : 'text-gray-300'
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </div>

        {/* Desktop CTA Button */}
        <Link to="/contact" className="hidden md:inline-flex bg-blue-600 hover:bg-blue-500 text-white px-7 py-2.5 rounded-full font-bold transition duration-300 shadow-[0_0_15px_rgba(37,99,235,0.4)] hover:shadow-[0_0_25px_rgba(37,99,235,0.6)]">
          Get in Touch
        </Link>

        {/* Mobile Hamburger Icon */}
        <button 
          className="md:hidden text-gray-300 hover:text-white focus:outline-none z-50 p-2" 
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown (Animated) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden absolute top-full left-0 w-full bg-gray-900 border-b border-gray-800 shadow-2xl overflow-hidden origin-top"
          >
            <div className="flex flex-col px-6 py-6 space-y-4">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path || (link.path !== '/' && location.pathname.startsWith(link.path));
                return (
                  <Link 
                    key={link.name} 
                    to={link.path} 
                    onClick={closeMenu}
                    className={`block text-lg font-bold transition duration-300 ${
                      isActive ? 'text-blue-400' : 'text-gray-300 hover:text-white hover:translate-x-2'
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
              
              <div className="pt-6 mt-2 border-t border-gray-800">
                <Link 
                  to="/contact" 
                  onClick={closeMenu}
                  className="block w-full text-center bg-blue-600 hover:bg-blue-500 text-white px-6 py-3.5 rounded-xl font-bold transition duration-300 shadow-lg"
                >
                  Get in Touch
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;