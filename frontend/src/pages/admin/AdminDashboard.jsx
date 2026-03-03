// frontend/src/pages/admin/AdminDashboard.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/client";
import {
  FaProjectDiagram,
  FaBlog,
  FaUsers,
  FaCogs,
  FaSignOutAlt,
} from "react-icons/fa";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("projects");
  const [data, setData] = useState([]);
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  // token: aapke first code me key "tv_token" tha, yaha fallback bhi de diya
  const token = localStorage.getItem("tv_token") || localStorage.getItem("token");

  // Logout Function
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("tv_token");
    navigate("/admin");
  };

  // Fetch Data based on active tab
  const fetchData = async () => {
    setLoading(true);
    setErr("");

    try {
      // Leads tab: aapka custom api() helper use hoga (token ke sath)
      if (activeTab === "leads") {
        const leadsData = await api("/api/leads", { token });
        setLeads(Array.isArray(leadsData) ? leadsData : []);
        setData([]); // clean
        setLoading(false);
        return;
      }

      // Other tabs: axios instance style
      let endpoint = "";
      if (activeTab === "projects") endpoint = "/projects";
      if (activeTab === "blogs") endpoint = "/blogs";
      if (activeTab === "services") endpoint = "/services";

      const res = await api.get(endpoint);
      setData(res.data || []);
      setLeads([]); // clean
    } catch (error) {
      console.error("Error fetching data", error);
      setErr(error?.message || "Something went wrong");

      if (error?.response?.status === 401) handleLogout(); // token expire
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab]);

  // Delete Item
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this?")) return;

    try {
      // NOTE: leads delete ka endpoint aapke backend pe depend karta hai.
      // Abhi aapke existing logic ke according:
      // projects -> /projects/:id, blogs -> /blogs/:id, services -> /services/:id
      if (activeTab === "leads") {
        alert("Leads delete endpoint set nahi hai. Backend route add karke yaha update karo.");
        return;
      }

      await api.delete(`/${activeTab}/${id}`);
      fetchData();
    } catch (error) {
      alert("Error deleting item");
    }
  };

  return (
    <div className="flex h-screen bg-gray-100 font-sans">
      {/* Sidebar */}
      <div className="w-64 bg-gray-900 text-white shadow-xl relative">
        <div className="p-6 text-2xl font-bold border-b border-gray-700 text-blue-400">
          Techvera Admin
        </div>

        <nav className="mt-6 flex flex-col space-y-2 px-4">
          <button
            onClick={() => setActiveTab("projects")}
            className={`flex items-center p-3 rounded-lg hover:bg-gray-800 transition ${
              activeTab === "projects" ? "bg-blue-600" : ""
            }`}
          >
            <FaProjectDiagram className="mr-3" /> Projects
          </button>

          <button
            onClick={() => setActiveTab("services")}
            className={`flex items-center p-3 rounded-lg hover:bg-gray-800 transition ${
              activeTab === "services" ? "bg-blue-600" : ""
            }`}
          >
            <FaCogs className="mr-3" /> Services
          </button>

          <button
            onClick={() => setActiveTab("blogs")}
            className={`flex items-center p-3 rounded-lg hover:bg-gray-800 transition ${
              activeTab === "blogs" ? "bg-blue-600" : ""
            }`}
          >
            <FaBlog className="mr-3" /> Blogs
          </button>

          <button
            onClick={() => setActiveTab("leads")}
            className={`flex items-center p-3 rounded-lg hover:bg-gray-800 transition ${
              activeTab === "leads" ? "bg-blue-600" : ""
            }`}
          >
            <FaUsers className="mr-3" /> Leads (Contacts)
          </button>
        </nav>

        <div className="absolute bottom-0 w-64 p-4">
          <button
            onClick={handleLogout}
            className="flex w-full items-center justify-center p-3 bg-red-600 rounded-lg hover:bg-red-700 transition"
          >
            <FaSignOutAlt className="mr-2" /> Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow p-4 flex justify-between items-center">
          <h2 className="text-2xl font-semibold text-gray-800 capitalize">
            Manage {activeTab}
          </h2>

          {activeTab !== "leads" && (
            <button className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700 transition">
              + Add New
            </button>
          )}
        </header>

        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
          {err ? (
            <div className="mb-4 text-red-600 bg-red-50 border border-red-200 p-3 rounded">
              {err}
            </div>
          ) : null}

          {loading ? (
            <div className="flex justify-center items-center h-full text-xl text-gray-500">
              Loading...
            </div>
          ) : (
            <div className="bg-white shadow rounded-lg p-4">
              {/* LEADS VIEW (your first code UI) */}
              {activeTab === "leads" ? (
                <div style={{ maxWidth: 900, margin: "0 auto" }}>
                  <h2 className="text-xl font-semibold mb-3">Leads</h2>

                  <table
                    border="1"
                    cellPadding="8"
                    style={{
                      width: "100%",
                      borderCollapse: "collapse",
                    }}
                  >
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Service</th>
                        <th>Status</th>
                        <th>Date</th>
                      </tr>
                    </thead>

                    <tbody>
                      {leads.length === 0 ? (
                        <tr>
                          <td colSpan="5" style={{ textAlign: "center" }}>
                            No Data Found
                          </td>
                        </tr>
                      ) : (
                        leads.map((l) => (
                          <tr key={l._id}>
                            <td>{l.name}</td>
                            <td>{l.email}</td>
                            <td>{l.service}</td>
                            <td>{l.status}</td>
                            <td>
                              {l.createdAt
                                ? new Date(l.createdAt).toLocaleString()
                                : ""}
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              ) : (
                /* DEFAULT VIEW (your existing tab table) */
                <table className="min-w-full leading-normal">
                  <thead>
                    <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                      <th className="py-3 px-6 text-left">Title / Name</th>
                      <th className="py-3 px-6 text-right">Actions</th>
                    </tr>
                  </thead>

                  <tbody className="text-gray-600 text-sm font-light">
                    {data.length === 0 ? (
                      <tr>
                        <td colSpan="2" className="py-4 text-center">
                          No Data Found
                        </td>
                      </tr>
                    ) : (
                      data.map((item) => (
                        <tr
                          key={item._id}
                          className="border-b border-gray-200 hover:bg-gray-100"
                        >
                          <td className="py-3 px-6 text-left whitespace-nowrap font-medium">
                            {item.title || item.name}
                          </td>
                          <td className="py-3 px-6 text-right">
                            <button
                              onClick={() => handleDelete(item._id)}
                              className="text-red-500 hover:text-red-700 font-semibold"
                            >
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
      </div>
    </div>
  );
};

export default AdminDashboard;
