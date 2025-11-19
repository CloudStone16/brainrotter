const express = require('express');
const cors = require('cors');
require('dotenv').config();

const clipRoutes = require('./routes/clipRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({
  origin: 'http://localhost:5173', // React frontend URL
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/clips', clipRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Express backend is running' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    status: 'error',
    message: err.message || 'Internal server error' 
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Express server running on http://localhost:${PORT}`);
  console.log(`🔗 Connected to React frontend on http://localhost:5173`);
  console.log(`🤖 Will proxy requests to Flask AI service on http://localhost:5000`);
});
