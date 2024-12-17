import { Request, Response } from 'express';
import Thought from '../models/Thought';
import mongoose from 'mongoose'; // Adjust path as needed

// POST to create a reaction stored in a single thought's reactions array field
export const createReaction = async (req: Request, res: Response): Promise<Response> => {
    const { thoughtId } = req.params;
    const { reactionBody, username } = req.body;

    try {
        // Find the thought and add the new reaction
        const thought = await Thought.findById(thoughtId);
        if (!thought) {
            return res.status(404).json({ message: 'Thought not found' });
        }

        // Create a new reaction object with all necessary fields
        const newReaction = {
            reactionId: new mongoose.Types.ObjectId(), // Generate a new reactionId
            reactionBody,
            username,
            createdAt: new Date(), // Automatically set the current timestamp
        };

        thought.reactions.push(newReaction);
        await thought.save();

        return res.json(thought);
    } catch (error: any) {
        return res.status(500).json({ message: error.message });
    }
};

// DELETE to pull and remove a reaction by the reaction's reactionId value
export const removeReaction = async (req: Request, res: Response): Promise<Response> => {
    const { thoughtId, reactionId } = req.params;

    try {
        // Using findOneAndUpdate with $pull to remove the reaction
        const updatedThought = await Thought.findOneAndUpdate(
            { _id: thoughtId },
            { $pull: { reactions: { _id: reactionId } } },
            { new: true, runValidators: true } // Ensure the update is validated
        );

        if (!updatedThought) {
            return res.status(404).json({ message: 'Thought not found or reaction does not exist' });
        }

        return res.json(updatedThought);
    } catch (error: any) {
        return res.status(500).json({ message: error.message });
    }
};