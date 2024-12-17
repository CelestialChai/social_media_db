import { Request, Response } from 'express';
import User from '../models/Users';

// GET all users
export const getAllUsers = async (_req: Request, res: Response): Promise<Response> => {
  try {
    const users = await User.find();
    return res.json(users);
  } catch (error: unknown) { // Explicitly typing 'error' as 'unknown'
    if (error instanceof Error) { // Check if it's an instance of the Error class
      return res.status(500).json({ message: error.message });
    } else {
      return res.status(500).json({ message: 'An unknown error occurred' });
    }
  }
};

// GET a single user by id with populated thoughts and friends
export const getUserById = async (req: Request, res: Response): Promise<Response> => {
  const { userId } = req.params;
  try {
    const user = await User.findById(userId).populate('thoughts').populate('friends');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    return res.json(user);
  } catch (error: unknown) { // Explicitly typing 'error' as 'unknown'
    if (error instanceof Error) { // Check if it's an instance of the Error class
      return res.status(500).json({ message: error.message });
    } else {
      return res.status(500).json({ message: 'An unknown error occurred' });
    }
  }
};

// POST a new user
export const createUser = async (req: Request, res: Response): Promise<Response> => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    return res.status(201).json(newUser);
  } catch (error: unknown) { // Explicitly typing 'error' as 'unknown'
    if (error instanceof Error) { // Check if it's an instance of the Error class
      return res.status(500).json({ message: error.message });
    } else {
      return res.status(500).json({ message: 'An unknown error occurred' });
    }
  }
};

// PUT to update a user by id
export const updateUser = async (req: Request, res: Response): Promise<Response> => {
  const { userId } = req.params;
  try {
    const user = await User.findByIdAndUpdate(userId, req.body, { new: true });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    return res.json(user);
  } catch (error: unknown) { // Explicitly typing 'error' as 'unknown'
    if (error instanceof Error) { // Check if it's an instance of the Error class
      return res.status(500).json({ message: error.message });
    } else {
      return res.status(500).json({ message: 'An unknown error occurred' });
    }
  }
};

// DELETE a user
export const deleteUser = async (req: Request, res: Response): Promise<Response> => {
  const { userId } = req.params;
  try {
    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    return res.json({ message: 'User deleted' });
  } catch (error: unknown) { // Explicitly typing 'error' as 'unknown'
    if (error instanceof Error) { // Check if it's an instance of the Error class
      return res.status(500).json({ message: error.message });
    } else {
      return res.status(500).json({ message: 'An unknown error occurred' });
    }
  }
};

// POST to add a friend
export const addFriend = async (req: Request, res: Response): Promise<Response> => {
  const { userId, friendId } = req.params;
  try {
    const user = await User.findById(userId);
    const friend = await User.findById(friendId);
    if (!user || !friend) {
      return res.status(404).json({ message: 'User or friend not found' });
    }
    if (user.friends.includes(friend._id)) {
      return res.status(400).json({ message: 'Already friends' });
    }
    user.friends.push(friend._id);
    friend.friends.push(user._id);
    await user.save();
    await friend.save();
    return res.json({ message: 'Friend added' });
  } catch (error: unknown) { // Explicitly typing 'error' as 'unknown'
    if (error instanceof Error) { // Check if it's an instance of the Error class
      return res.status(500).json({ message: error.message });
    } else {
      return res.status(500).json({ message: 'An unknown error occurred' });
    }
  }
};

// DELETE a friend
export const removeFriend = async (req: Request, res: Response): Promise<Response> => {
  const { userId, friendId } = req.params;
  try {
    const user = await User.findById(userId);
    const friend = await User.findById(friendId);
    if (!user || !friend) {
      return res.status(404).json({ message: 'User or friend not found' });
    }
    user.friends.pull(friend._id);
    friend.friends.pull(user._id);
    await user.save();
    await friend.save();
    return res.json({ message: 'Friend removed' });
  } catch (error: unknown) { // Explicitly typing 'error' as 'unknown'
    if (error instanceof Error) { // Check if it's an instance of the Error class
      return res.status(500).json({ message: error.message });
    } else {
      return res.status(500).json({ message: 'An unknown error occurred' });
    }
  }
};
