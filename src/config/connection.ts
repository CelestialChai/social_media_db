import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/mydatabase', {

          serverSelectionTimeoutMS: 60000,
          connectTimeoutMS: 60000,

        });
        console.log('MongoDB connected successfully');
        return mongoose.connection;
    } catch (err) {
        console.error('Error connecting to MongoDB:', err);
        process.exit(1); // Exit process with failure code
    }
};

export default connectDB;