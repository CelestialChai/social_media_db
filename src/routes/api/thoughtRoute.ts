import { Router } from 'express';
const router = Router();
import {
  getAllThoughts,
  getThoughtById,
  createThought,
  updateThought,
  deleteThought,
  addReactionToThought,
  removeReactionFromThought,
} from '../../controllers/thoughtController';

router.route('/').get(getAllThoughts).post(createThought);
router.route('/:thoughtId').get(getThoughtById).put(updateThought).delete(deleteThought);
router.route('/:thoughtId/reactions').post(addReactionToThought);  // Updated function name
router.route('/:thoughtId/reactions/:reactionId').delete(removeReactionFromThought);  // Updated function name

export { router as thoughtRouter };