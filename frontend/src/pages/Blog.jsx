// frontend/src/pages/Blog.jsx
import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import api from "../api/client";

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  // New UI states
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Newsletter
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await api.get("/blogs");
        setBlogs(Array.isArray(res.data) ? res.data : []);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  const categories = useMemo(() => {
    const cats = new Set();
    blogs.forEach((b) => {
      if (b?.category) cats.add(b.category);
    });
    return ["All", ...Array.from(cats)];
  }, [blogs]);

  const filteredBlogs = useMemo(() => {
    const q = search.trim().toLowerCase();

    return blogs.filter((b) => {
      const matchesCategory =
        selectedCategory === "All" || (b?.category || "") === selectedCategory;

      const haystack = `${b?.title || ""} ${b?.content || ""} ${b?.author || ""} ${
        b?.category || ""
      }`.toLowerCase();

      const matchesSearch = q === "" || haystack.includes(q);

      return matchesCategory && matchesSearch;
    });
  }, [blogs, search, selectedCategory]);

  const featuredBlogs = useMemo(() => {
    // Simple "featured": latest 3 (assuming createdAt exists)
    const sorted = [...blogs].sort((a, b) => {
      const da = a?.createdAt ? new Date(a.createdAt).getTime() : 0;
      const db = b?.createdAt ? new Date(b.createdAt).getTime() : 0;
      return db - da;
    });
    return sorted.slice(0, 3);
  }, [blogs]);

  const openBlog = (blog) => {
    setSelectedBlog(blog);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedBlog(null);
  };

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email.trim()) return alert("Please enter a valid email");

    try {
      setSubmitting(true);

      // If you have backend endpoint, use it:
      // await api.post("/newsletter/subscribe", { email });

      // For now: just UI behavior
      await new Promise((r) => setTimeout(r, 600));
      alert("Subscribed successfully!");
      setEmail("");
    } catch (err) {
      console.error(err);
      alert("Subscription failed. Try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-20 px-6 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* HERO SECTION */}
        <div className="text-center mb-10">
          <h1 className="text-5xl font-extrabold text-gray-900 mb-4">
            Techvera Insights
          </h1>
          <p className="text-xl text-gray-600">
            Latest news, tips, and strategies on Digital Marketing & Web Dev.
          </p>
        </div>

        {/* HIGHLIGHTS / FEATURED SECTION */}
        {!loading && featuredBlogs.length > 0 && (
          <div className="mb-10">
            <div className="flex items-end justify-between gap-4 mb-4">
              <h2 className="text-2xl font-bold text-gray-900">
                Featured articles
              </h2>
              <p className="text-sm text-gray-500">
                Latest picks from our blog
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {featuredBlogs.map((b, idx) => (
                <motion.button
                  key={b._id || idx}
                  type="button"
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05, duration: 0.35 }}
                  onClick={() => openBlog(b)}
                  className="text-left bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition p-6"
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">
                      {b?.category || "General"}
                    </span>
                    <span className="text-xs text-gray-400">
                      {b?.createdAt ? new Date(b.createdAt).toLocaleDateString() : ""}
                    </span>
                  </div>
                  <h3 className="text-lg font-extrabold text-gray-900 mt-3 line-clamp-2">
                    {b?.title}
                  </h3>
                  <p className="text-gray-600 mt-2 text-sm line-clamp-3">
                    {b?.content}
                  </p>
                  <div className="mt-4 text-sm font-semibold text-blue-600">
                    Read now →
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        )}

        {/* FILTER / SEARCH SECTION */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 mb-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
            <div className="md:col-span-2">
              <label className="text-sm font-semibold text-gray-700">
                Search blogs
              </label>
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by title, content, author..."
                className="w-full mt-2 p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-gray-700">
                Category
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full mt-2 p-3 border rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-gray-500">
              Showing <span className="font-semibold">{filteredBlogs.length}</span>{" "}
              result(s)
            </p>

            <button
              type="button"
              onClick={() => {
                setSearch("");
                setSelectedCategory("All");
              }}
              className="text-sm font-semibold text-gray-700 hover:text-blue-600"
            >
              Clear filters
            </button>
          </div>
        </div>

        {/* BLOG GRID SECTION */}
        {loading ? (
          <div className="text-center text-2xl text-blue-600 animate-pulse">
            Loading Blogs...
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {filteredBlogs.length === 0 && (
              <p className="text-center text-gray-500 col-span-3 text-lg">
                No blogs found. Try different keywords or category.
              </p>
            )}

            {filteredBlogs.map((blog, index) => (
              <motion.div
                key={blog._id || index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.06, duration: 0.45 }}
                className="bg-white rounded-2xl overflow-hidden shadow hover:shadow-xl transition"
              >
                <div className="p-8">
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-xs font-bold text-blue-500 uppercase tracking-widest">
                      {blog?.createdAt
                        ? new Date(blog.createdAt).toLocaleDateString()
                        : ""}
                    </span>
                    <span className="text-xs font-semibold text-gray-500">
                      {blog?.category || "General"}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold text-gray-800 mt-3 mb-3 line-clamp-2">
                    {blog.title}
                  </h3>

                  <p className="text-gray-600 mb-6 line-clamp-4">
                    {blog.content}
                  </p>

                  <div className="flex justify-between items-center border-t pt-4 mt-4">
                    <span className="text-sm font-semibold text-gray-500">
                      By {blog.author || "Admin"}
                    </span>
                    <button
                      type="button"
                      onClick={() => openBlog(blog)}
                      className="text-blue-600 font-bold hover:underline"
                    >
                      Read More →
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* NEWSLETTER CTA SECTION */}
        <div className="mt-14">
          <div className="bg-gradient-to-r from-gray-900 to-blue-900 text-white rounded-3xl p-8 md:p-12 shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-extrabold">
                  Get weekly growth tips
                </h2>
                <p className="text-white/80 mt-3">
                  Join our newsletter for practical marketing, SEO and web-dev
                  insights.
                </p>
              </div>

              <form onSubmit={handleSubscribe} className="flex gap-3">
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 p-3 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
                <button
                  disabled={submitting}
                  type="submit"
                  className="px-5 py-3 rounded-xl bg-blue-500 hover:bg-blue-600 font-bold disabled:opacity-60"
                >
                  {submitting ? "Joining..." : "Join"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* READ MORE MODAL SECTION */}
      {showModal && selectedBlog && (
        <div
          className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50"
          onClick={closeModal}
        >
          <div
            className="bg-white w-full max-w-3xl rounded-2xl shadow-2xl p-6 md:p-8 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-500 hover:text-red-500 font-bold"
            >
              ✕
            </button>

            <div className="flex flex-wrap items-center gap-3">
              <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">
                {selectedBlog?.category || "General"}
              </span>
              <span className="text-xs text-gray-400">
                {selectedBlog?.createdAt
                  ? new Date(selectedBlog.createdAt).toLocaleString()
                  : ""}
              </span>
              <span className="text-xs font-semibold text-gray-500">
                By {selectedBlog?.author || "Admin"}
              </span>
            </div>

            <h3 className="text-2xl md:text-3xl font-extrabold text-gray-900 mt-4">
              {selectedBlog?.title}
            </h3>

            <p className="text-gray-700 mt-4 whitespace-pre-wrap leading-relaxed">
              {selectedBlog?.content}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Blog;
