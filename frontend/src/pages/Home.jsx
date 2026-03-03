// frontend/src/pages/Home.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaRocket, FaChartLine, FaLaptopCode } from 'react-icons/fa';

const Home = () => {
  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      {/* Hero Section */}
      <header className="bg-gradient-to-r from-blue-900 to-indigo-800 text-white py-32 px-6 text-center">
        <motion.div 
          initial={{ opacity: 0, y: -50 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight">
            Accelerate Your Digital Growth with <span className="text-blue-400">Techvera</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-10">
            We deliver cutting-edge Web Development, SEO, and Digital Marketing solutions to scale your business.
          </p>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link to="/contact" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 px-8 rounded-full shadow-lg text-lg transition duration-300">
              Get Your Free Consultation
            </Link>
          </motion.div>
        </motion.div>
      </header>

      {/* Features Section */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800">Why Choose Techvera?</h2>
          <div className="w-24 h-1 bg-blue-500 mx-auto mt-4"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {[
            { icon: <FaLaptopCode className="text-5xl text-blue-500 mb-4" />, title: "Modern Web Dev", desc: "Fast, responsive, and dynamic websites built on MERN stack." },
            { icon: <FaRocket className="text-5xl text-blue-500 mb-4" />, title: "SEO Optimization", desc: "Rank higher on Google and bring organic traffic to your brand." },
            { icon: <FaChartLine className="text-5xl text-blue-500 mb-4" />, title: "Performance Marketing", desc: "Data-driven ad campaigns that maximize your ROI." }
          ].map((feature, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              className="bg-white p-8 rounded-2xl shadow-xl text-center hover:shadow-2xl transition"
            >
              <div className="flex justify-center">{feature.icon}</div>
              <h3 className="text-2xl font-semibold mb-3 text-gray-800">{feature.title}</h3>
              <p className="text-gray-600">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;