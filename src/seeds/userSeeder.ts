import User from '../models/Users';
import mongoose from 'mongoose';

export const seedUserData = async (): Promise<void> => {
  try {
    const users = [
      {
        username: 'alice',
        email: 'alice@example.com',
        thoughts: [],
        friends: [],
      },
      {
        username: 'bob',
        email: 'bob@example.com',
        thoughts: [],
        friends: [],
      },
      {
        username: 'charlie',
        email: 'charlie@example.com',
        thoughts: [],
        friends: [],
      },
    ];

    const createdUsers = await User.insertMany(users);
    console.log('Users seeded successfully:', createdUsers);

    // Example: Establish friendships between users
    const alice = await User.findOne({ username: 'alice' });
    const bob = await User.findOne({ username: 'bob' });

    if (!alice || !bob) {
      console.error('One or both users not found');
      process.exit(1);
    }

    alice.friends.push(bob._id as mongoose.Types.ObjectId);
    bob.friends.push(alice._id as mongoose.Types.ObjectId);
    await alice.save();
    await bob.save();
    console.log('Friendship established between Alice and Bob.');
  } catch (error) {
    console.error('Error seeding user data:', error);
  }
};