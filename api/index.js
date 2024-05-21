// server.js
import express from 'express';
import { connectMongoDB } from './db.js';
import dotenv from 'dotenv';
import roleRoute from './routes/role.js';
import authRoute from './routes/auth.js';
import userRoute from './routes/user.js';
import cookieParser from 'cookie-parser';
dotenv.config();

const app = express(); 
const PORT = process.env.PORT;

app.use(express.json()); // 
app.use(cookieParser());

app.use('/api/role',roleRoute);
app.use('/api/auth',authRoute);
app.use('/api/user',userRoute);

//error handling middleware
app.use((err,req,res,next) => {
  const statusCode = err.status || 500;
  const errorMessage = err.message || 'Internal Server Error';
  return res.status(statusCode).json({
     sucess: false,
     status: statusCode,
     message: errorMessage
    
  })
});



//response handling middleware
app.use((req, res, next) => {
  const obj = req.responseObj || {};
  const statusCode = obj.status || 200;
  const message = obj.message || {};
  return res.status(statusCode).json({
      success: [200,201,204].some(el => el === obj.status) ? true : false,
      status: statusCode,
      message: message,
      data: obj.data || {}
  });
});

app.listen(PORT, async () => {
  try {
    await connectMongoDB();
    console.log(`Server is running on port ${PORT}`);
  } catch(err) {
    console.error('Server failed to start', err);
  }
});