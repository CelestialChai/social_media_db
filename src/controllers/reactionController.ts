import { Request, Response } from 'express';
import Thought from '../models/Thought';
import mongoose from 'mongoose';


export const createReaction = async (req: Request, res: Response): Promise<Response> => {
    const { thoughtId } = req.params;
    const { reactionBody, username } = req.body;

    try {
        const thought = await Thought.findById(thoughtId);
        if (!thought) {
            return res.status(404).json({ message: 'Thought not found' });
        }

        const newReaction = {
            reactionId: new mongoose.Types.ObjectId(),
            reactionBody,
            username,
            createdAt: new Date(),
        };

        thought.reactions.push(newReaction);
        await thought.save();

        return res.json(thought);
    } catch (error: any) {
        return res.status(500).json({ message: error.message });
    }
};

// DELETE
export const removeReaction = async (req: Request, res: Response): Promise<Response> => {
    const { thoughtId, reactionId } = req.params;

    try {
        const updatedThought = await Thought.findOneAndUpdate(
            { _id: thoughtId },
            { $pull: { reactions: { _id: reactionId } } },
            { new: true, runValidators: true }
        );

        if (!updatedThought) {
            return res.status(404).json({ message: 'Thought not found or reaction does not exist' });
        }

        return res.json(updatedThought);
    } catch (error: any) {
        return res.status(500).json({ message: error.message });
    }
};