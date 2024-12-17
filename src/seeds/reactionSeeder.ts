import Reaction from '../models/Reaction';
import { ThoughtModel, UserModel } from '../models'; 
const seedReactionData = async (): Promise<void> => {
  try {
    const reactions = [
      {
        thoughtId: "67616270eddac3d99c93c0d5",
        userId: "67616270eddac3d99c93c0c5",
        reactionBody: "This is an amazing thought!",
      },
      {
        thoughtId: "67616270eddac3d99c93c0d6", // Replace with another thoughtId
        userId: "67616270eddac3d99c93c0c6", // Replace with another userId
        reactionBody: "I totally agree with this.",
      },
    ];

    // Create reactions
    await Reaction.insertMany(reactions);
    console.log('Reactions seeded successfully!');
  } catch (error) {
    console.error('Error seeding reactions:', error);
  }
};

export { seedReactionData };
