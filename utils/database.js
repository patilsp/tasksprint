import mongoose from 'mongoose';

let isConnected = false; // track the connection

export const connectToDB = async () => {
  
  if (isConnected) {
    console.log('MongoDB is already connected');
    return;
  }

  if (!process.env.MONGO_URL) {
    throw new Error('MONGO_URL is not defined in the environment variables');
  }

  try {
    await mongoose.connect(process.env.MONGO_URL, {
      dbName: "tasksprint",
    });

    isConnected = true;
    console.log('MongoDB connected');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error; // Re-throw the error for proper error handling
  }
};