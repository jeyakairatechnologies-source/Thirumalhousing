import mongoose from 'mongoose';

let isMongoConnected = false;

export const connectDB = async () => {
  const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/thirumal_housing';
  console.log(`[MongoDB] Connecting to MongoDB at: ${mongoUri}`);

  try {
    const conn = await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 3000,
    });
    isMongoConnected = true;
    console.log(`[MongoDB] Successfully connected to: ${conn.connection.host}/${conn.connection.name}`);
    return true;
  } catch (error) {
    isMongoConnected = false;
    console.warn(`[MongoDB] Notice: Could not connect to local MongoDB (${error.message}).`);
    console.log(`[Store] Operating with Resilient In-Memory & Seed Data Store.`);
    return false;
  }
};

export const getIsMongoConnected = () => isMongoConnected;
