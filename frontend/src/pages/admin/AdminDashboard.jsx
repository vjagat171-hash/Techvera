import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api/client';
import { FaProjectDiagram, FaBlog, FaUsers, FaCogs, FaSignOutAlt, FaTimes, FaQuoteLeft, FaIdBadge } from 'react-icons/fa';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('projects');
  const [data, setData] = useState([]);
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({});

  const token = localStorage.getItem("tv_token") || localStorage.getItem("token");

  const isCrudTab = useMemo(
    () => ['projects', 'services', 'blogs', 'team', 'testimonials'].includes(activeTab),
    [activeTab]
  );

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('tv_token');
    navigate('/admin');
  };

  const fetchData = async () => {
    setLoading(true);
    setErr("");
    try {
      if (activeTab === "leads") {
        const leadsData = await api.get("/leads", { headers: { Authorization: `Bearer ${token}` } }); 
        setLeads(Array.isArray(leadsData.data) ? leadsData.data : (leadsData || []));
        setData([]);
      } else {
        const res = await api.get(`/${activeTab}`);
        setData(res.data || []);
        setLeads([]);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setErr(error?.response?.data?.message || "Error connecting to server.");
      if(error?.response?.status === 401) handleLogout();
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const handleDelete = async (id) => {
    if(!window.confirm(`Are you sure you want to delete this ${activeTab.slice(0, -1)}?`)) return;
    try {
      if (activeTab === "leads") {
        await api.delete(`/leads/${id}`, { headers: { Authorization: `Bearer ${token}` } });
      } else {
        await api.delete(`/${activeTab}/${id}`);
      }
      fetchData(); 
    } catch (error) {
      console.error("Delete Error:", error);
      alert("Error deleting item.");
    }
  };

  const openModal = () => {
    setFormData({});
    setShowModal(true);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!isCrudTab) return;

      let payload = { ...formData };

      if (activeTab === 'services' && typeof payload.features === 'string') {
        payload.features = payload.features.split(',').map(item => item.trim()).filter(item => item !== "");
      }

      await api.post(`/${activeTab}`, payload);
      setShowModal(false); 
      setFormData({});     
      fetchData();         
      alert(`${activeTab.slice(0, -1)} published successfully!`);
    } catch (error) {
      console.error(error);
      alert("Error saving data. Please check fields.");
    }
  };

  const renderFormFields = () => {
    if (activeTab === 'projects') {
      return (
        <>
          <input type="text" name="title" placeholder="Project Title *" onChange={handleInputChange} required className="w-full p-3 border border-slate-200 rounded-xl mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 focus:bg-white transition" />
          <textarea name="description" placeholder="Project Description *" onChange={handleInputChange} required className="w-full p-3 border border-slate-200 rounded-xl mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 focus:bg-white transition resize-none" rows="3" />
          <input type="text" name="imageUrl" placeholder="Image URL (http://...)" onChange={handleInputChange} className="w-full p-3 border border-slate-200 rounded-xl mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 focus:bg-white transition" />
          <input type="text" name="liveLink" placeholder="Live Website Link" onChange={handleInputChange} className="w-full p-3 border border-slate-200 rounded-xl mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 focus:bg-white transition" />
          <input type="text" name="category" placeholder="Category (e.g. Web Dev, SEO)" onChange={handleInputChange} className="w-full p-3 border border-slate-200 rounded-xl mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 focus:bg-white transition" />
        </>
      );
    }
    if (activeTab === 'services') {
      return (
        <>
          <input type="text" name="title" placeholder="Service Name *" onChange={handleInputChange} required className="w-full p-3 border border-slate-200 rounded-xl mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 focus:bg-white transition" />
          <input type="text" name="category" placeholder="Category (e.g. Development, Marketing)" onChange={handleInputChange} className="w-full p-3 border border-slate-200 rounded-xl mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 focus:bg-white transition" />
          <textarea name="shortDesc" placeholder="Short Description (For Card) *" onChange={handleInputChange} required className="w-full p-3 border border-slate-200 rounded-xl mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 focus:bg-white transition resize-none" rows="2" />
          <textarea name="features" placeholder="Bullet Points (Use Comma to separate: Fast UI, SEO Ready, Admin Panel)" onChange={handleInputChange} className="w-full p-3 border border-slate-200 rounded-xl mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 focus:bg-white transition resize-none" rows="2" />
        </>
      );
    }
    if (activeTab === 'blogs') {
      return (
        <>
          <input type="text" name="title" placeholder="Blog Title *" onChange={handleInputChange} required className="w-full p-3 border border-slate-200 rounded-xl mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 focus:bg-white transition" />
          <input type="text" name="author" placeholder="Author Name" onChange={handleInputChange} className="w-full p-3 border border-slate-200 rounded-xl mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 focus:bg-white transition" />
          <textarea name="content" placeholder="Blog Content... *" rows="5" onChange={handleInputChange} required className="w-full p-3 border border-slate-200 rounded-xl mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 focus:bg-white transition resize-none" />
        </>
      );
    }
    if (activeTab === 'team') {
      return (
        <>
          <input type="text" name="name" placeholder="Member Name *" onChange={handleInputChange} required className="w-full p-3 border border-slate-200 rounded-xl mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 focus:bg-white transition" />
          <input type="text" name="role" placeholder="Job Role (e.g. Developer) *" onChange={handleInputChange} required className="w-full p-3 border border-slate-200 rounded-xl mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 focus:bg-white transition" />
          <input type="text" name="image" placeholder="Image URL (http://...)" onChange={handleInputChange} className="w-full p-3 border border-slate-200 rounded-xl mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 focus:bg-white transition" />
          <textarea name="bio" placeholder="Short Bio / Description" onChange={handleInputChange} className="w-full p-3 border border-slate-200 rounded-xl mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 focus:bg-white transition resize-none" rows="3" />
        </>
      );
    }
    if (activeTab === 'testimonials') {
      return (
        <>
          <input type="text" name="name" placeholder="Client Name *" onChange={handleInputChange} required className="w-full p-3 border border-slate-200 rounded-xl mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 focus:bg-white transition" />
          <input type="text" name="company" placeholder="Company / Role (Optional)" onChange={handleInputChange} className="w-full p-3 border border-slate-200 rounded-xl mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 focus:bg-white transition" />
          <textarea name="quote" placeholder="Client Quote / Feedback *" onChange={handleInputChange} required className="w-full p-3 border border-slate-200 rounded-xl mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 focus:bg-white transition resize-none" rows="4" />
        </>
      );
    }
  };

  const NavButton = ({ tab, icon, label }) => (
    <button onClick={() => setActiveTab(tab)} className={`flex items-center p-3.5 rounded-xl transition duration-300 font-semibold ${activeTab === tab ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}>
      <span className="mr-3 text-lg">{icon}</span> {label}
    </button>
  );

  return (
    <div className="flex h-screen bg-[#f8fafc] font-sans selection:bg-blue-600 selection:text-white">
      {/* Sidebar */}
      <div className="w-72 bg-slate-950 text-white shadow-2xl flex flex-col relative z-20">
        <div className="p-8 text-2xl font-black border-b border-slate-800 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 tracking-tight">
          TECHVERA <span className="text-xs font-bold text-slate-500 block mt-1 tracking-widest uppercase">Admin System</span>
        </div>
        <nav className="mt-6 flex flex-col space-y-2 px-5 overflow-y-auto pb-24 custom-scrollbar">
          <NavButton tab="projects" icon={<FaProjectDiagram />} label="Projects" />
          <NavButton tab="services" icon={<FaCogs />} label="Services" />
          <NavButton tab="blogs" icon={<FaBlog />} label="Blogs" />
          <NavButton tab="team" icon={<FaIdBadge />} label="Team Members" />
          <NavButton tab="testimonials" icon={<FaQuoteLeft />} label="Testimonials" />
          <div className="mt-4 mb-2 px-4 text-xs font-black uppercase text-slate-600 tracking-widest">Client Data</div>
          <NavButton tab="leads" icon={<FaUsers />} label="Audit Requests" />
        </nav>
        <div className="absolute bottom-0 w-full p-6 bg-gradient-to-t from-slate-950 to-transparent">
          <button onClick={handleLogout} className="flex w-full items-center justify-center p-3.5 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white rounded-xl transition duration-300 font-bold border border-red-500/20 hover:border-red-500">
            <FaSignOutAlt className="mr-2" /> End Session
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden relative">
        <header className="bg-white shadow-sm border-b border-slate-200 p-8 flex justify-between items-center z-10">
          <div>
            <h2 className="text-3xl font-black text-slate-900 capitalize">{activeTab} Database</h2>
            <p className="text-slate-500 text-sm mt-1 font-medium">Control the data shown on your live website.</p>
          </div>
          {isCrudTab && (
            <button onClick={openModal} className="bg-slate-900 text-white px-6 py-3.5 rounded-full shadow-lg hover:bg-blue-600 transition duration-300 font-bold flex items-center transform hover:-translate-y-0.5">
              <span className="text-xl mr-2 leading-none">+</span> Add {activeTab.slice(0, -1)}
            </button>
          )}
        </header>

        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-[#f8fafc] p-8">
          {err && <div className="mb-6 text-red-600 bg-red-50 border border-red-200 p-4 rounded-xl font-bold">{err}</div>}

          {loading ? (
            <div className="flex justify-center items-center h-64"><div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-600"></div></div>
          ) : (
            <div className="bg-white shadow-xl shadow-slate-200/50 rounded-3xl overflow-hidden border border-slate-100 p-2 md:p-6">
              {activeTab === "leads" ? (
                <div className="overflow-x-auto">
                  <table className="min-w-full leading-normal border-collapse">
                    <thead>
                      <tr className="bg-slate-50 text-slate-500 uppercase text-xs font-black tracking-widest border-b border-slate-200">
                        <th className="py-5 px-6 text-left">Name & Details</th>
                        <th className="py-5 px-6 text-left">Contact Info</th>
                        <th className="py-5 px-6 text-left">Message / Request</th>
                        <th className="py-5 px-6 text-center">Action</th>
                      </tr>
                    </thead>
                    <tbody className="text-sm">
                      {leads.length === 0 ? (
                        <tr><td colSpan="4" className="py-16 text-center text-slate-400 font-bold">No leads or requests found.</td></tr>
                      ) : (
                        leads.map((l) => (
                          <tr key={l._id} className="border-b border-slate-100 hover:bg-slate-50/50 transition">
                            <td className="py-5 px-6">
                              <div className="font-bold text-slate-900 text-base">{l.name}</div>
                              {l.company && <div className="text-xs text-blue-600 font-bold uppercase mt-1 tracking-wide">{l.company}</div>}
                              {l.budget && <div className="inline-block mt-2 text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-100 px-2.5 py-1 rounded-md">{l.budget}</div>}
                            </td>
                            <td className="py-5 px-6">
                              <div className="font-semibold text-slate-700">{l.email}</div>
                              <div className="text-xs text-slate-500 font-medium mt-1">{l.phone || 'No phone provided'}</div>
                              <div className="text-xs text-slate-400 mt-2">{l.createdAt ? new Date(l.createdAt).toLocaleDateString() : ""}</div>
                            </td>
                            <td className="py-5 px-6">
                               <div className="text-slate-600 leading-relaxed line-clamp-3 max-w-xs">{l.message || 'Quick lead. No message.'}</div>
                            </td>
                            <td className="py-5 px-6 text-center">
                              <button onClick={() => handleDelete(l._id)} className="bg-red-50 text-red-600 hover:bg-red-600 hover:text-white px-4 py-2 rounded-lg font-bold transition">Delete</button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              ) : (
                <table className="min-w-full leading-normal">
                  <thead>
                    <tr className="bg-slate-50 text-slate-500 uppercase text-xs font-black tracking-widest">
                      <th className="py-5 px-6 text-left border-b border-slate-200">Main Information</th>
                      <th className="py-5 px-6 text-right border-b border-slate-200">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    {data.length === 0 ? (
                      <tr><td colSpan="2" className="py-16 text-center text-slate-400 font-bold">No {activeTab} found in database.</td></tr>
                    ) : (
                      data.map((item) => (
                        <tr key={item._id} className="hover:bg-slate-50/50 transition border-b border-slate-100 last:border-b-0">
                          <td className="py-5 px-6 text-left">
                            <div className="font-bold text-slate-900 text-lg">{item.title || item.name}</div>
                            {(item.category || item.role || item.company) && (
                              <span className="inline-block mt-1 text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded uppercase tracking-wide">
                                {item.category || item.role || item.company}
                              </span>
                            )}
                            {(item.shortDesc || item.description || item.bio || item.quote) && (
                                <div className="text-slate-500 mt-2 text-xs max-w-md truncate">
                                    {item.shortDesc || item.description || item.bio || item.quote}
                                </div>
                            )}
                          </td>
                          <td className="py-5 px-6 text-right">
                            <button onClick={() => handleDelete(item._id)} className="bg-red-50 text-red-600 hover:bg-red-600 hover:text-white px-4 py-2 rounded-lg font-bold transition">
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              )}
            </div>
          )}
        </main>

        {/* Modal */}
        {showModal && isCrudTab && (
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm flex justify-center items-center z-50 p-4">
            <div className="bg-white p-10 rounded-[2.5rem] shadow-2xl w-full max-w-xl relative border border-slate-100 transform transition-all">
              <button onClick={() => setShowModal(false)} className="absolute top-6 right-6 text-slate-400 hover:text-red-500 transition bg-slate-50 hover:bg-red-50 p-3 rounded-full">
                <FaTimes size={16} />
              </button>
              <h3 className="text-3xl font-black mb-2 capitalize text-slate-900">Add New {activeTab.slice(0, -1)}</h3>
              <p className="text-slate-500 text-sm mb-8 font-medium">Fill the details. It will immediately reflect on the live website.</p>
              <form onSubmit={handleSubmit}>
                {renderFormFields()}
                <button type="submit" className="w-full bg-blue-600 text-white font-black text-lg py-4 px-4 rounded-xl hover:bg-blue-700 shadow-lg shadow-blue-500/30 transition duration-300 mt-4">
                  Publish to Live Site
                </button>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default AdminDashboard;