import express from 'express';
import Blog from '../models/Blog.js'; // Model ka path check kar lein
const router = express.Router();

// GET all blogs
router.get('/', async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST new blog (Naya blog add karna)
router.post('/', async (req, res) => {
  try {
    // Agar frontend se data aata hai toh usme missing field check karke save karein
    const newBlog = new Blog({
        title: req.body.title,
        content: req.body.content || "No content provided",
        author: req.body.author || "Techvera Team",
        imageUrl: req.body.imageUrl || "" // Agar future me image lagana ho
    });
    
    await newBlog.save();
    res.status(201).json(newBlog);
  } catch (err) {
    console.error("Blog Save Error:", err);
    res.status(400).json({ message: "Failed to save blog", error: err.message });
  }
});

// DELETE blog
router.delete('/:id', async (req, res) => {
  try {
    await Blog.findByIdAndDelete(req.params.id);
    res.json({ message: 'Blog deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;