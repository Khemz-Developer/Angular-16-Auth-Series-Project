// server.js
import express from 'express';
import { connectMongoDB } from './db.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.listen(PORT, async () => {
  try {
    await connectMongoDB();
    console.log(`Server is running on port ${PORT}`);
  } catch(err) {
    console.error('Server failed to start', err);
  }
});