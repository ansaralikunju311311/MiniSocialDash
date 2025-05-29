import express from "express";
import connectDB from "./config/db.js";
const app = express();
import cors from "cors";
import user from './routes/userRoute.js'
// import userRoute from './routes/userRoute.js'
import dotenv from "dotenv";
dotenv.config();
connectDB();

const corsOptions = {
  origin: process.env.FRONTEND_URL || 'http://localhost:5173', 
  credentials: true, 
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
app.use(express.json());
app.use('/api', user);
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});