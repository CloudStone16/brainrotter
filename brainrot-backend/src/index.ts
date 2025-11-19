import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.ts';
import clipRoutes from './routes/clips.ts';

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors({ origin: process.env.CORS_ORIGIN, credentials: true }));

app.use("/api/auth", authRoutes);
app.use("/api/clips", clipRoutes);

mongoose
  .connect(process.env.MONGO_URI!)
  .then(() => {
    console.log("✅ MongoDB Connected!");
    app.listen(process.env.PORT, () =>
      console.log(`🚀 Backend running at http://localhost:${process.env.PORT}`)
    );
  })
  .catch((err) => console.error(err));
