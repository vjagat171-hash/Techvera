// frontend/src/pages/Contact.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import api from '../api/client';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [status, setStatus] = useState(''); // success ya error dikhane ke liye

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Submitting...');
    try {
      await api.post('/leads', formData);
      setStatus('Success! We will contact you soon.');
      setFormData({ name: '', email: '', phone: '', message: '' }); // form reset
    } catch (error) {
      console.error(error);
      setStatus('Error submitting form. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-20 px-6">
      <motion.div 
        initial={{ opacity: 0, y: 30 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.6 }}
        className="bg-white p-10 rounded-2xl shadow-2xl max-w-lg w-full"
      >
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Let's Talk Business</h2>
        <p className="text-gray-500 text-center mb-8">Drop your details below and our team will get back to you.</p>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 font-medium mb-2">Full Name</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} required className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition" placeholder="John Doe" />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">Email Address</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition" placeholder="john@example.com" />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">Phone Number</label>
            <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition" placeholder="+91 9876543210" />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">How can we help?</label>
            <textarea name="message" value={formData.message} onChange={handleChange} rows="4" className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition" placeholder="I need a website..."></textarea>
          </div>
          
          <motion.button 
            whileHover={{ scale: 1.02 }} 
            whileTap={{ scale: 0.98 }}
            type="submit" 
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition duration-300"
          >
            Send Message
          </motion.button>
        </form>

        {status && (
          <p className={`mt-4 text-center font-medium ${status.includes('Success') ? 'text-green-600' : 'text-red-600'}`}>
            {status}
          </p>
        )}
      </motion.div>
    </div>
  );
};

export default Contact;