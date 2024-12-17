import express from 'express';
import mongoose from 'mongoose';
import connectDB from './config/connection';
import { userRouter } from './routes/api/userRoutes';
import { thoughtRouter } from './routes/api/thoughtRoute';
import routes from './routes';
import apiRoutes from './routes/api';

const startServer = async () => {
   await connectDB();

  const PORT = process.env.PORT || 3001;
  const app = express();

  // Middleware
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  // routes
  app.use('/api/users', userRouter);
  app.use('/api/thoughts', thoughtRouter);
  app.use('/api', apiRoutes);
 // app.use(routes);


  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer();