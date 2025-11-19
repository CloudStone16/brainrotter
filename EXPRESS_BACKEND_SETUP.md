# Express.js Backend for Brainrotter

This Express.js backend acts as a middleware between the React frontend and the Flask AI service.

## Architecture Flow

```
React Frontend (port 5173) 
    ↓ POST /api/clips/generate
Express.js Backend (port 3000)
    ↓ POST /api/generate  
Flask AI Service (port 5000)
    ↓ returns video data
Express.js Backend
    ↓ returns to frontend
React Frontend
```

## Setup Instructions

### 1. Create Backend Directory

```bash
# From the brainrotter directory
mkdir backend
cd backend
```

### 2. Initialize Node.js Project

```bash
npm init -y
```

### 3. Install Dependencies

```bash
npm install express cors dotenv axios
npm install --save-dev nodemon
```

### 4. Create Required Files

Create the following file structure:

```
backend/
├── package.json
├── .env
├── server.js
└── routes/
    └── clipRoutes.js
```

### 5. Update package.json Scripts

Add these scripts to your `package.json`:

```json
{
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  }
}
```

## File Contents

### `server.js`

```javascript
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
```

### `routes/clipRoutes.js`

```javascript
const express = require('express');
const axios = require('axios');
const router = express.Router();

const FLASK_AI_URL = process.env.FLASK_AI_URL || 'http://localhost:5000';

// Generate clip endpoint
router.post('/generate', async (req, res) => {
  try {
    const { background_video, topic } = req.body;

    // Validate input
    if (!background_video || !topic) {
      return res.status(400).json({
        status: 'error',
        message: 'Missing required fields: background_video and topic'
      });
    }

    const validBackgrounds = ['minecraft', 'subway_surfers', 'gta_v'];
    if (!validBackgrounds.includes(background_video)) {
      return res.status(400).json({
        status: 'error',
        message: `Invalid background_video. Must be one of: ${validBackgrounds.join(', ')}`
      });
    }

    if (!topic.trim() || topic.length > 500) {
      return res.status(400).json({
        status: 'error',
        message: 'Topic must be between 1 and 500 characters'
      });
    }

    // Forward request to Flask AI service
    console.log(`📤 Forwarding request to Flask AI service...`);
    console.log(`   Background: ${background_video}`);
    console.log(`   Topic: ${topic.substring(0, 50)}...`);

    const flaskResponse = await axios.post(`${FLASK_AI_URL}/api/generate`, {
      background_video,
      topic
    }, {
      timeout: 120000 // 2 minutes timeout for AI generation
    });

    console.log(`✅ Received response from Flask AI service`);

    // Return Flask response to frontend
    res.json(flaskResponse.data);

  } catch (error) {
    console.error('❌ Error in clip generation:', error.message);

    if (error.code === 'ECONNREFUSED') {
      return res.status(503).json({
        status: 'error',
        message: 'Flask AI service is not running. Please start it on port 5000.'
      });
    }

    if (error.response) {
      // Flask returned an error
      return res.status(error.response.status).json(error.response.data);
    }

    res.status(500).json({
      status: 'error',
      message: error.message || 'Failed to generate clip'
    });
  }
});

// Get all clips (placeholder for future implementation)
router.get('/', async (req, res) => {
  res.json({
    status: 'success',
    message: 'Clip history endpoint (to be implemented)',
    clips: []
  });
});

module.exports = router;
```

### `.env`

```env
PORT=3000
FLASK_AI_URL=http://localhost:5000
NODE_ENV=development
```

## Running the Backend

### Development Mode (with auto-reload)
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

## Testing

### 1. Test Backend Health
```bash
curl http://localhost:3000/api/health
```

### 2. Test Clip Generation
```bash
curl -X POST http://localhost:3000/api/clips/generate \
  -H "Content-Type: application/json" \
  -d '{"background_video": "minecraft", "topic": "Why diamonds are overrated"}'
```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Express server port | 3000 |
| `FLASK_AI_URL` | Flask AI service URL | http://localhost:5000 |
| `NODE_ENV` | Environment mode | development |

## Common Issues

### CORS Errors
Make sure the Express server has CORS enabled for `http://localhost:5173`

### Flask Service Not Running
The backend will return a 503 error if Flask is not running. Start Flask first:
```bash
python app.py
```

### Port Already in Use
If port 3000 is taken, change it in `.env`:
```env
PORT=4000
```

Then update the frontend fetch URL in `GenerateClip.tsx`:
```typescript
fetch('http://localhost:4000/api/clips/generate', ...)
```

## Full Startup Sequence

1. **Start Flask AI Service** (Terminal 1)
   ```bash
   cd flask_backend
   python app.py
   ```

2. **Start Express Backend** (Terminal 2)
   ```bash
   cd backend
   npm run dev
   ```

3. **Start React Frontend** (Terminal 3)
   ```bash
   cd brainrotter_frontend
   npm run dev
   ```

Now the full stack is running! 🎉
