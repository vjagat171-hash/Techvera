import express from 'express';
import { upload } from '../config/cloudinary.js';

const router = express.Router();

router.post('/', upload.single('image'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No image uploaded" });
    }
    res.status(200).json({ imageUrl: req.file.path });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ message: "Image upload failed" });
  }
});

export default router;