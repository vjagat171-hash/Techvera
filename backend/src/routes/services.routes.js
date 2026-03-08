import express from 'express';
import Service from '../models/Service.js';
const router = express.Router();

// GET all active services (order ke hisaab se sorted)
router.get('/', async (req, res) => {
  try {
    const services = await Service.find({ isActive: true }).sort({ order: 1, createdAt: -1 });
    res.json(services);
  } catch (err) { 
    res.status(500).json({ message: err.message }); 
  }
});

// POST new service
router.post('/', async (req, res) => {
  try {
    const newService = new Service({
      title: req.body.title,
      slug: req.body.slug, 
      category: req.body.category || 'Specialized',
      shortDesc: req.body.shortDesc || '',
      fullDesc: req.body.fullDesc || '',
      features: req.body.features || [], 
      order: req.body.order || 0,
      isActive: req.body.isActive !== undefined ? req.body.isActive : true
    });
    
    await newService.save();
    res.status(201).json(newService);
  } catch (err) { 
    res.status(400).json({ message: err.message }); 
  }
});

// DELETE service
router.delete('/:id', async (req, res) => {
  try {
    await Service.findByIdAndDelete(req.params.id);
    res.json({ message: 'Service deleted' });
  } catch (err) { 
    res.status(500).json({ message: err.message }); 
  }
});

export default router;