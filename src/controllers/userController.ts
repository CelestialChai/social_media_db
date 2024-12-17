import { Request, Response } from 'express';
import { UserModel } from '../models/index.js';

export const getAllUsers = async (_req: Request, res: Response) => {
  try {
    const users = await UserModel.find();
    res.json(users);
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  const { userId } = req.params;
  try {
    const user = await UserModel.findById(userId);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({
        message: 'User not found',
      });
    }
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const createUser = async (req: Request, res: Response) => {
  const { username, email } = req.body;
  try {
    const newUser = await UserModel.create({
      username,
      email,
    });
    res.status(201).json(newUser);
  } catch (error: any) {
    res.status(400).json({
      message: error.message,
    });
  }
};


export const updateUser = async (req: Request, res: Response) => {
  const { userId } = req.params;
  try {
    const user = await UserModel.findOneAndUpdate(
      { _id: userId },
      { $set: req.body },
      { runValidators: true, new: true }
    );

    if (!user) {
      res.status(404).json({ message: 'No user with this id!' });
    }

    res.json(user);
  } catch (error: any) {
    res.status(400).json({
      message: error.message,
    });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  const { userId } = req.params;
  try {
    const user = await UserModel.findOneAndDelete({ _id: userId });

    if (!user) {
      res.status(404).json({
        message: 'No user with that ID',
      });
    } else {
      res.json({ message: 'User deleted!' });
    }
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
    });
  }
};


export const addFriend = async (req: Request, res: Response) => {
  const { userId, friendId } = req.params;
  try {
    // Add friendId to the user's friends array
    const user = await UserModel.findByIdAndUpdate(
      userId,
      { $addToSet: { friends: friendId } },
      { new: true }
    );

    if (!user) {
      res.status(404).json({
        message: 'User not found',
      });
    } else {
      res.json(user);
    }
  } catch (error: any) {
    res.status(400).json({
      message: error.message,
    });
  }
};


export const removeFriend = async (req: Request, res: Response) => {
  const { userId, friendId } = req.params;
  try {
    // Remove friendId from the user's friends array
    const user = await UserModel.findByIdAndUpdate(
      userId,
      { $pull: { friends: friendId } },
      { new: true }
    );

    if (!user) {
      res.status(404).json({
        message: 'User not found',
      });
    } else {
      res.json(user);
    }
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
    });
  }
};