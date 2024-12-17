import express from 'express';
import mongoose from 'mongoose';
import connectDB from './config/connection';

const app = express();


app.use(express.json());

connectDB();

// Routes (you can add your routes here)

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
