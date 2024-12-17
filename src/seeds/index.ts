import { seedUserData } from './userSeeder';
import { seedThoughtData } from './thoughtSeeder';
import { seedFriendshipData } from './friendSeeder';
import { seedReactionData } from './reactionSeeder';
import db from '../config/connection';
import cleanDB from './cleanDB';

const seedData = async (): Promise<void> => {
  try {
    await db();
    console.log('Database connected.');

    await cleanDB();
    console.log('Database nice and clean!');

    await seedUserData();
    await seedThoughtData();
    await seedFriendshipData();
    await seedReactionData();

    console.log('Seeding complete!');
  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {

    process.exit(0);
  }
};

seedData();