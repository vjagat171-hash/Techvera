import React, { useState } from 'react';
import { motion } from 'framer-motion';
import api from '../api/client';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaCheckCircle, FaLock } from 'react-icons/fa';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', company: '', budget: '', message: '' });
  const [status, setStatus] = useState({ type: '', msg: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: '', msg: '' });
    try {
      await api.post('/leads', formData);
      setStatus({ type: 'success', msg: 'Audit request received successfully! One of our growth experts will contact you shortly.' });
      setFormData({ name: '', email: '', phone: '', company: '', budget: '', message: '' });
    } catch (error) {
      setStatus({ type: 'error', msg: 'Something went wrong. Please check your network or call us directly.' });
    } finally {
      setLoading(false);
    }
  };

  const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } };

  return (
    <div className="min-h-screen bg-gray-50 font-sans pb-24">
      {/* Header */}
      <div className="bg-gray-900 text-white py-24 text-center px-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
        <motion.div initial="hidden" animate="visible" variants={fadeUp} className="relative z-10">
            <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight">
            Apply For Your <span className="text-blue-400 border-b-4 border-blue-500">Free Audit</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto">
            Fill out the form below to request a deep dive into your digital marketing architecture and website performance.
            </p>
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left: What to expect & Trust Signals (Col span 5) */}
        <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} className="lg:col-span-5 space-y-8">
          
          <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 border-b pb-4">What happens next?</h3>
            <ul className="space-y-5 text-gray-700 font-medium">
              <li className="flex items-start">
                <FaCheckCircle className="mt-1 mr-4 text-blue-600 text-xl flex-shrink-0" /> 
                <span><strong className="text-gray-900">Step 1:</strong> We analyze your current website speed, UI, and SEO health.</span>
              </li>
              <li className="flex items-start">
                <FaCheckCircle className="mt-1 mr-4 text-blue-600 text-xl flex-shrink-0" /> 
                <span><strong className="text-gray-900">Step 2:</strong> We break down your competitors' ad strategies.</span>
              </li>
              <li className="flex items-start">
                <FaCheckCircle className="mt-1 mr-4 text-blue-600 text-xl flex-shrink-0" /> 
                <span><strong className="text-gray-900">Step 3:</strong> Hop on a 15-min call where we share a custom growth blueprint.</span>
              </li>
            </ul>
          </div>

          <div className="bg-gray-900 text-white p-8 rounded-3xl shadow-xl">
            <h3 className="text-xl font-bold mb-6 text-blue-400">Direct Contact</h3>
            <div className="space-y-6 text-gray-300">
              <div className="flex items-center">
                <div className="bg-gray-800 p-3 rounded-full mr-4"><FaEnvelope className="text-white" /></div>
                <div>
                  <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">Email Us</p>
                  <p className="font-semibold text-white">hello@techvera.com</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="bg-gray-800 p-3 rounded-full mr-4"><FaPhoneAlt className="text-white" /></div>
                <div>
                  <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">Call Us</p>
                  <p className="font-semibold text-white">+91 98765 43210</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="bg-gray-800 p-3 rounded-full mr-4"><FaMapMarkerAlt className="text-white" /></div>
                <div>
                  <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">Headquarters</p>
                  <p className="font-semibold text-white">Cyber Hub, New Delhi</p>
                </div>
              </div>
            </div>
          </div>

        </motion.div>

        {/* Right: The High-End Lead Form (Col span 7) */}
        <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} className="lg:col-span-7">
          <div className="bg-white p-8 md:p-12 rounded-3xl shadow-2xl border border-gray-100 relative">
            
            <div className="absolute -top-5 right-8 bg-emerald-100 text-emerald-700 px-4 py-1 rounded-full text-xs font-bold flex items-center border border-emerald-200">
                <FaLock className="mr-2" /> 100% Confidential
            </div>

            <h2 className="text-3xl font-extrabold text-gray-900 mb-8">Tell us about your business</h2>
            
            {status.msg && (
              <div className={`mb-8 p-4 rounded-xl font-semibold border ${status.type === 'success' ? 'bg-emerald-50 text-emerald-800 border-emerald-200' : 'bg-red-50 text-red-800 border-red-200'}`}>
                {status.msg}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Your Name *</label>
                  <input type="text" name="name" value={formData.name} onChange={handleChange} required className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition" placeholder="John Doe" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Work Email *</label>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} required className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition" placeholder="john@company.com" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Phone Number *</label>
                  <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition" placeholder="+91 98765 43210" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Website URL</label>
                  <input type="text" name="company" value={formData.company} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition" placeholder="www.yourbrand.com" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Current Monthly Marketing Budget</label>
                <select name="budget" value={formData.budget} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition text-gray-700 font-medium">
                  <option value="">Select an option</option>
                  <option value="Under ₹50,000 / month">Under ₹50,000 / month</option>
                  <option value="₹50k - ₹2 Lakhs / month">₹50k - ₹2 Lakhs / month</option>
                  <option value="₹2 Lakhs - ₹10 Lakhs / month">₹2 Lakhs - ₹10 Lakhs / month</option>
                  <option value="Scale (Above ₹10 Lakhs)">Scale (Above ₹10 Lakhs)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">What is the biggest bottleneck in your growth right now? *</label>
                <textarea name="message" value={formData.message} onChange={handleChange} required rows="4" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition resize-none" placeholder="e.g., We have a website but no traffic, or Our ads are burning money with no ROAS..."></textarea>
              </div>

              <button type="submit" disabled={loading} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg py-4 rounded-xl shadow-[0_10px_20px_rgba(37,99,235,0.3)] transition duration-300 disabled:bg-blue-400 flex justify-center items-center">
                {loading ? <div className="animate-spin h-6 w-6 border-t-2 border-b-2 border-white rounded-full mr-3"></div> : null}
                {loading ? 'Sending Request...' : 'Submit Application & Request Audit'}
              </button>
            </form>
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default Contact;