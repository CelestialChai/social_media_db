import Thought from '../models/Thought';
import User from '../models/Users';

export const seedThoughtData = async (): Promise<void> => {
  try {
    const users = await User.find();

    if (users.length === 0) {
      console.log('No users found. Skipping thought seeding.');
      return;
    }

       const thoughts = users.map((user) => ({
      thoughtText: `This is a random thought for ${user.username}.`, // Add valid thoughtText
      username: user.username,
      userId: user._id,
    }));

    await Thought.insertMany(thoughts);
    console.log('Thoughts seeded successfully:', thoughts);

  } catch (error) {
    console.error('Error seeding thought data:', error);
  }
};