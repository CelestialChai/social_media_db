import User from '../models/Users';
import mongoose from 'mongoose';

export const seedFriendshipData = async (): Promise<void> => {
  try {
    const users = await User.find({});
    if (users.length < 2) {
      console.error('Not enough users to create friendships.');
      return;
    }

    const alice = users.find((user) => user.username === 'alice');
    const bob = users.find((user) => user.username === 'bob');
    const charlie = users.find((user) => user.username === 'charlie');

    if (!alice || !bob || !charlie) {
      console.error('One or more users not found.');
      return;
    }

    alice.friends.push(bob._id as mongoose.Types.ObjectId, charlie._id as mongoose.Types.ObjectId);
    bob.friends.push(alice._id as mongoose.Types.ObjectId, charlie._id as mongoose.Types.ObjectId);
    charlie.friends.push(alice._id as mongoose.Types.ObjectId, bob._id as mongoose.Types.ObjectId);

    await alice.save();
    await bob.save();
    await charlie.save();

    console.log('Friendships established between Alice, Bob, and Charlie.');
  } catch (error) {
    console.error('Error seeding friendship data:', error);
  }
};