import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRoutes from './routes/auth';

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors({ origin: process.env.CORS_ORIGIN, credentials: true }));

// ROUTES
app.use('/api/auth', authRoutes);

// DB + Server
mongoose
  .connect(process.env.MONGO_URI!)
  .then(() => {
    console.log('MongoDB connected 🌐');
    app.listen(process.env.PORT, () =>
      console.log(`Brainrot backend running on port ${process.env.PORT} 💀🔥`)
    );
  })
  .catch((err) => console.error(err));
