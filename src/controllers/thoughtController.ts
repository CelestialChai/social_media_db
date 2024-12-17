import { Request, Response } from 'express';
import Thought from '../models/Thought';
import User from '../models/Users';

// GET all thoughts
export const getAllThoughts = async (_req: Request, res: Response): Promise<Response> => {
  try {
    const thoughts = await Thought.find();
    if (!thoughts.length) {
      return res.status(404).json({ message: 'No thoughts found' });
    }
    return res.json(thoughts);
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching thoughts: ' + error.message });
  }
};

// GET a single thought by id
export const getThoughtById = async (req: Request, res: Response): Promise<Response> => {
  const { thoughtId } = req.params;
  try {
    const thought = await Thought.findById(thoughtId).populate('reactions');
    if (!thought) {
      return res.status(404).json({ message: 'Thought not found' });
    }
    return res.json(thought);
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching thought: ' + error.message });
  }
};

// POST to create a new thought
export const createThought = async (req: Request, res: Response): Promise<Response> => {
  const { thoughtText, username, userId } = req.body;
  try {
    const newThought = new Thought({ thoughtText, username, userId });
    await newThought.save();

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.thoughts.push(newThought._id);
    await user.save();
    return res.status(201).json(newThought);
  } catch (error) {
    return res.status(500).json({ message: 'Error creating thought: ' + error.message });
  }
};

// PUT to update a thought by id
export const updateThought = async (req: Request, res: Response): Promise<Response> => {
  const { thoughtId } = req.params;
  try {
    const updatedThought = await Thought.findByIdAndUpdate(thoughtId, req.body, { new: true });
    if (!updatedThought) {
      return res.status(404).json({ message: 'Thought not found or not updated' });
    }
    return res.json(updatedThought);
  } catch (error) {
    return res.status(500).json({ message: 'Error updating thought: ' + error.message });
  }
};

// DELETE a thought
export const deleteThought = async (req: Request, res: Response): Promise<Response> => {
  const { thoughtId } = req.params;
  try {
    const deletedThought = await Thought.findByIdAndDelete(thoughtId);
    if (!deletedThought) {
      return res.status(404).json({ message: 'Thought not found or already deleted' });
    }
    return res.json({ message: 'Thought deleted' });
  } catch (error) {
    return res.status(500).json({ message: 'Error deleting thought: ' + error.message });
  }
};