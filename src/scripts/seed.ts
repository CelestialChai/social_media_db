import mongoose from 'mongoose';
import dotenv from 'dotenv';
import connectDB from '../config/connection';
import User from '../models/Users';


dotenv.config();

const seedData = async () => {
  try {

    await connectDB();

    await User.deleteMany({});
    console.log('All existing users deleted.');

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

    // Example: Adding friendships
    const alice = await User.findOne({ username: 'alice' });
const bob = await User.findOne({ username: 'bob' });
if (!alice || !bob) {
    console.error('One or both users not found');
    process.exit(1);
}

if (alice && bob) {
  alice.friends.push(bob._id as mongoose.Types.ObjectId); // No error
  bob.friends.push(alice._id as mongoose.Types.ObjectId);
  await alice.save();
  await bob.save();
}


    await alice.save();
    await bob.save();
    console.log('Friendship established between Alice and Bob.');


    mongoose.connection.close();
    console.log('Database connection closed.');
  } catch (error) {
    console.error('Error seeding data:', error);
    mongoose.connection.close();
  }
};


seedData();