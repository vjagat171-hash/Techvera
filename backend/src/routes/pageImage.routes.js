// backend/src/routes/pageImage.routes.js
import express from 'express';
import PageImage from '../models/PageImage.js';

const router = express.Router();

// GET: Saari page images fetch karne ke liye (Frontend/Public use)
router.get('/', async (req, res) => {
  try {
    const images = await PageImage.find();
    res.json(images);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST: Nayi image add karne ya purani update karne ke liye (Admin use)
router.post('/', async (req, res) => {
  try {
    // Check karein kya is page ke liye koi image pehle se database me hai
    const existingImage = await PageImage.findOne({ title: req.body.title });
    
    if (existingImage) {
      // Agar hai, toh use naye image URL se update kar dein (Overwrite/Duplicate rokne ke liye)
      existingImage.imageUrl = req.body.imageUrl;
      await existingImage.save();
      return res.status(200).json(existingImage);
    }

    // Agar nahi hai, toh ek bilkul naya record banayein
    const newPageImage = new PageImage({
      title: req.body.title,
      imageUrl: req.body.imageUrl
    });
    
    await newPageImage.save();
    res.status(201).json(newPageImage);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE: Image delete karne ke liye (Admin use)
router.delete('/:id', async (req, res) => {
  try {
    await PageImage.findByIdAndDelete(req.params.id);
    res.json({ message: 'Page Image deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;