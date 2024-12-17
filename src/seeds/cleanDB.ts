import Thought from '../models/Thought';
import { ThoughtModel, UserModel } from '../models/index';
import User from '../models/Users';

const cleanDB = async (): Promise<void> => {
  try {
    const maxRetries = 3;
    let attempt = 0;
    let success = false;

    while (attempt < maxRetries && !success) {
      try {
        await Thought.deleteMany({});
        console.log('Thought collection cleaned.');

        await User.deleteMany({});
        console.log('User collection cleaned.');

        success = true; // Exit loop on success
      } catch (err) {
        attempt++;
        console.error(`Error cleaning collections (attempt ${attempt}):`, err);

        if (attempt === maxRetries) {
          console.error('Max retries reached, exiting...');
          process.exit(1);
        }
      }
    }
  } catch (err) {
    console.error('Error cleaning collections:', err);
    process.exit(1);
  }
};

export default cleanDB;