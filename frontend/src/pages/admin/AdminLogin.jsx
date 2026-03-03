// frontend/src/pages/admin/AdminLogin.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import api from '../../api/client';

const AdminLogin = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      // Backend api par request bhej rahe hain
      const res = await api.post('/auth/login', credentials);
      
      if (res.data.token) {
        // Token ko localStorage me save karein
        localStorage.setItem('token', res.data.token);
        // Dashboard par bhej dein
        navigate('/admin/dashboard');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid Credentials');
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4 font-sans">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }} 
        animate={{ opacity: 1, scale: 1 }} 
        transition={{ duration: 0.5 }}
        className="max-w-md w-full bg-white p-8 rounded-2xl shadow-2xl"
      >
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-gray-800">Admin Portal</h2>
          <p className="text-gray-500 mt-2">Login to manage Techvera</p>
        </div>

        {error && <div className="bg-red-100 text-red-600 p-3 rounded mb-4 text-center font-semibold">{error}</div>}

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-gray-700 font-bold mb-2">Email Address</label>
            <input 
              type="email" name="email" value={credentials.email} onChange={handleChange} required 
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
              placeholder="admin@techvera.com"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-bold mb-2">Password</label>
            <input 
              type="password" name="password" value={credentials.password} onChange={handleChange} required 
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
              placeholder="••••••••"
            />
          </div>
          
          <motion.button 
            whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
            type="submit" 
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg shadow-lg transition duration-300"
          >
            Secure Login
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default AdminLogin;