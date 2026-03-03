// frontend/src/pages/Services.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import api from '../api/client';

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Backend se services fetch kar rahe hain
    const fetchServices = async () => {
      try {
        const res = await api.get('/services');
        setServices(res.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching services", error);
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-20 px-6">
      <motion.div 
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto text-center"
      >
        <h1 className="text-5xl font-bold text-gray-900 mb-6">Our Premium Services</h1>
        <p className="text-xl text-gray-600 mb-16">Everything you need to build and scale your digital presence.</p>

        {loading ? (
          <div className="text-2xl animate-pulse text-blue-600">Loading Services...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Agar backend me data nahi hai toh ek mock card dikhate hain */}
            {services.length === 0 && (
              <motion.div whileHover={{ scale: 1.03 }} className="bg-white p-8 rounded-xl shadow-lg border-t-4 border-blue-500">
                <h3 className="text-2xl font-bold text-gray-800 mb-3">Custom Web Development</h3>
                <p className="text-gray-600 mb-4">We build custom full-stack web applications tailored to your business needs.</p>
                <span className="text-blue-600 font-semibold cursor-pointer">Learn More &rarr;</span>
              </motion.div>
            )}

            {services.map((service, index) => (
              <motion.div 
                key={service._id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="bg-white p-8 rounded-xl shadow-lg border-t-4 border-blue-500 text-left"
              >
                <h3 className="text-2xl font-bold text-gray-800 mb-3">{service.title}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <button className="text-blue-600 font-semibold hover:underline">Get Quote</button>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default Services;