import express, { Request, Response } from 'express';
import { getThoughts, getThoughtById, createThought, updateThought, deleteThought, createReaction, removeReaction } from '../controllers/thoughtController';

const router = express.Router();

// /api/thoughts
router.get('/', getThoughts);
router.get('/:thoughtId', getThoughtById);
router.post('/', createThought);
router.put('/:thoughtId', updateThought);
router.delete('/:thoughtId', deleteThought);

// /api/thoughts/:thoughtId/reactions
router.post('/:thoughtId/reactions', createReaction);
router.delete('/:thoughtId/reactions/:reactionId', removeReaction);

export default router;
