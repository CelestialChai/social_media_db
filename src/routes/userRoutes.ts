import express, { Request, Response } from 'express';
import { getUsers, getUserById, createUser, updateUser, deleteUser, addFriend, removeFriend } from '../controllers/userController';

const router = express.Router();

// /api/users
router.get('/', getUsers);
router.get('/:userId', getUserById);
router.post('/', createUser);
router.put('/:userId', updateUser);
router.delete('/:userId', deleteUser);

// /api/users/:userId/friends/:friendId
router.post('/:userId/friends/:friendId', addFriend);
router.delete('/:userId/friends/:friendId', removeFriend);

export default router;
