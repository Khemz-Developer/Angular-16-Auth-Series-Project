// db.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import seedBooks from './seed.js';

//import seedBooks from './seed';

dotenv.config();

export const connectMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    await seedBooks();
    console.log('Database connected successfully');
  } catch(err) {
    console.error('Database connection failed', err);
  }
}