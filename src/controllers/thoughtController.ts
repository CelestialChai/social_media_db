import { Request, Response } from 'express';
import { ThoughtModel } from '../models/index.js';


export const getAllThoughts = async (_req: Request, res: Response) => {
  try {
    const thoughts = await ThoughtModel.find();
    res.json(thoughts);
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
    });
  }
};


export const getThoughtById = async (req: Request, res: Response) => {
  const { thoughtId } = req.params;
  try {
    const thought = await ThoughtModel.findById(thoughtId);
    if (thought) {
      res.json(thought);
    } else {
      res.status(404).json({
        message: 'Thought not found',
      });
    }
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
    });
  }
};


export const createThought = async (req: Request, res: Response) => {
  const { thoughtText, username } = req.body;
  try {
    const newThought = await ThoughtModel.create({
      thoughtText,
      username,
    });
    res.status(201).json(newThought);
  } catch (error: any) {
    res.status(400).json({
      message: error.message,
    });
  }
};


export const updateThought = async (req: Request, res: Response) => {
  const { thoughtId } = req.params;
  try {
    const thought = await ThoughtModel.findOneAndUpdate(
      { _id: thoughtId },
      { $set: req.body },
      { runValidators: true, new: true }
    );

    if (!thought) {
      res.status(404).json({ message: 'No thought with this id!' });
    }

    res.json(thought);
  } catch (error: any) {
    res.status(400).json({
      message: error.message,
    });
  }
};


export const deleteThought = async (req: Request, res: Response) => {
  const { thoughtId } = req.params;
  try {
    const thought = await ThoughtModel.findOneAndDelete({ _id: thoughtId });

    if (!thought) {
      res.status(404).json({
        message: 'No thought with that ID',
      });
    } else {
      res.json({ message: 'Thought deleted!' });
    }
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
    });
  }
};


export const addReactionToThought = async (req: Request, res: Response) => {
  const { thoughtId } = req.params;
  const { reactionBody, username } = req.body;

  try {
       const thought = await ThoughtModel.findByIdAndUpdate(
      thoughtId,
      {
        $push: { reactions: { reactionBody, username } }, // Push the reaction to the reactions array
      },
      { new: true }
    );

    if (!thought) {
      res.status(404).json({
        message: 'Thought not found',
      });
    } else {
      res.status(201).json(thought);
    }
  } catch (error: any) {
    res.status(400).json({
      message: error.message,
    });
  }
};


export const removeReactionFromThought = async (req: Request, res: Response) => {
  const { thoughtId, reactionId } = req.params;
  try {
    const thought = await ThoughtModel.findByIdAndUpdate(
      thoughtId,
      { $pull: { reactions: { _id: reactionId } } },
      { new: true }
    );

    if (!thought) {
      res.status(404).json({
        message: 'Thought not found',
      });
    } else {
      res.json({ message: 'Reaction deleted' });
    }
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
    });
  }
};