import express from 'express';
import Lead from '../models/Lead.js'; // Model ka path check kar lijiye

const router = express.Router();

// 1. POST: Nayi lead add karne ke liye (Contact Page se)
router.post('/', async (req, res) => {
  try {
    const newLead = new Lead(req.body);
    const savedLead = await newLead.save();
    res.status(201).json(savedLead);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// 2. GET: Saari leads dekhne ke liye (Admin Panel me)
router.get('/', async (req, res) => {
  try {
    const leads = await Lead.find().sort({ createdAt: -1 }); // Nayi lead sabse upar
    res.json(leads);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 3. DELETE: Kisi lead ko delete karne ke liye (Yeh missing tha!)
router.delete('/:id', async (req, res) => {
  try {
    const deletedLead = await Lead.findByIdAndDelete(req.params.id);
    if (!deletedLead) {
      return res.status(404).json({ message: 'Lead not found' });
    }
    res.json({ message: 'Lead deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;