import express from 'express';
import Team from '../models/Team.js';
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const team = await Team.find();
    res.json(team);
  } catch (err) { res.status(500).json({ message: err.message }); }
});

router.post('/', async (req, res) => {
  try {
    const newMember = new Team(req.body);
    await newMember.save();
    res.status(201).json(newMember);
  } catch (err) { res.status(400).json({ message: err.message }); }
});

router.delete('/:id', async (req, res) => {
  try {
    await Team.findByIdAndDelete(req.params.id);
    res.json({ message: 'Team member deleted' });
  } catch (err) { res.status(500).json({ message: err.message }); }
});

export default router;