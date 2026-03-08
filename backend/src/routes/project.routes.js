import express from 'express';
import Project from '../models/Project.js';
const router = express.Router();

// GET all projects
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (err) { 
    res.status(500).json({ message: err.message }); 
  }
});

// POST new project (Admin panel se add karne ke liye)
router.post('/', async (req, res) => {
  try {
    const newProject = new Project({
      title: req.body.title,
      category: req.body.category || 'MERN Stack',
      status: req.body.status || 'Live',
      description: req.body.description,
      tech: req.body.tech || [], // Array of strings
      imageUrl: req.body.imageUrl || '',
      liveLink: req.body.liveLink || '',
      repoLink: req.body.repoLink || ''
    });
    
    await newProject.save();
    res.status(201).json(newProject);
  } catch (err) { 
    res.status(400).json({ message: err.message }); 
  }
});

// DELETE a project
router.delete('/:id', async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    res.json({ message: 'Project deleted' });
  } catch (err) { 
    res.status(500).json({ message: err.message }); 
  }
});

export default router;