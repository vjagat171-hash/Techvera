// frontend/src/pages/Projects.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import api from '../api/client';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await api.get('/projects');
        setProjects(res.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching projects:", error);
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-20 px-6 font-sans">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-extrabold text-gray-900 mb-4">Our Live Projects</h1>
          <p className="text-xl text-gray-600">A glimpse into our successful digital marketing and web development campaigns.</p>
        </motion.div>

        {loading ? (
          <div className="text-center text-2xl text-blue-600 animate-pulse">Loading Projects...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {projects.length === 0 && (
              <p className="text-center text-gray-500 col-span-3 text-lg">New projects are being updated. Check back soon!</p>
            )}
            
            {projects.map((project, index) => (
              <motion.div 
                key={project._id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition group"
              >
                <div className="h-56 bg-gray-200 overflow-hidden relative">
                  {/* Image with zoom effect on hover */}
                  <img 
                    src={project.imageUrl || 'https://via.placeholder.com/600x400?text=Techvera+Project'} 
                    alt={project.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-500" 
                  />
                  <div className="absolute top-4 right-4 bg-white/90 text-blue-700 text-xs font-bold px-3 py-1 rounded-full shadow">
                    {project.category}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-800 mb-3">{project.title}</h3>
                  <p className="text-gray-600 mb-6 line-clamp-3">{project.description}</p>
                  
                  {project.liveLink ? (
                    <a href={project.liveLink} target="_blank" rel="noreferrer" className="inline-block w-full text-center bg-gray-900 hover:bg-black text-white px-5 py-3 rounded-lg font-semibold transition">
                      View Live Website &rarr;
                    </a>
                  ) : (
                    <button className="inline-block w-full text-center bg-gray-200 text-gray-500 px-5 py-3 rounded-lg font-semibold cursor-not-allowed">
                      Completed
                    </button>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Projects;