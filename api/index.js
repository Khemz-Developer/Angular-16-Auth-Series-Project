// server.js
import express from 'express';
import { connectMongoDB } from './db.js';
import dotenv from 'dotenv';
import roleRoute from './routes/role.js';
import authRoute from './routes/auth.js';
import userRoute from './routes/user.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
dotenv.config();




const app = express(); 
const PORT = process.env.PORT;

app.use(express.json()); // 
app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:4200',
  credentials: true
}));
app.use('/api/role',roleRoute);
app.use('/api/auth',authRoute);
app.use('/api/user',userRoute);







app.listen(PORT, async () => {
  try {
    await connectMongoDB();
    console.log(`Server is running on port ${PORT}`);
  } catch(err) {
    console.error('Server failed to start', err);
  }
});