# Backend Integration Guide

## Overview
This chat interface is ready for integration with your existing backend at `http://localhost:5000`.

## Prerequisites
- Backend server running on port 5000
- MongoDB connected at `mongodb://localhost:27017/brainrotter`
- JWT authentication system already in place

## Backend API Endpoints (Already Built)

### Authentication Endpoints
```
POST /api/auth/register
POST /api/auth/login
```

### Video Generation Endpoint (TO BE CREATED)
You'll need to create this endpoint in your backend:

```javascript
POST /api/generate
Content-Type: application/json
Authorization: Bearer <JWT_TOKEN>

Request Body:
{
  "background": "minecraft" | "subway" | "gta",
  "prompt": "Your creative prompt here"
}

Response:
{
  "success": true,
  "videoId": "unique-video-id",
  "status": "processing",
  "message": "Video generation started"
}
```

## Integration Steps

### 1. Add API Utility (Create `src/utils/api.js`)

\`\`\`javascript
const API_BASE_URL = 'http://localhost:5000/api'

// Store JWT token
export const setAuthToken = (token) => {
  localStorage.setItem('token', token)
}

export const getAuthToken = () => {
  return localStorage.getItem('token')
}

export const removeAuthToken = () => {
  localStorage.removeItem('token')
}

// Generate video API call
export const generateVideo = async (background, prompt) => {
  const token = getAuthToken()
  
  const response = await fetch(\`\${API_BASE_URL}/generate\`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': \`Bearer \${token}\`
    },
    body: JSON.stringify({ background, prompt })
  })

  if (!response.ok) {
    throw new Error('Failed to generate video')
  }

  return response.json()
}

// Login API call (if needed)
export const login = async (email, password) => {
  const response = await fetch(\`\${API_BASE_URL}/auth/login\`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  })

  const data = await response.json()
  
  if (data.token) {
    setAuthToken(data.token)
  }
  
  return data
}
\`\`\`

### 2. Update ChatInterface Component

Replace the TODO section in `handleGenerate` function:

\`\`\`javascript
import { generateVideo } from '../utils/api'

// Inside handleGenerate function:
try {
  const result = await generateVideo(selectedBackground, prompt)
  console.log('Video generation result:', result)
  alert(\`Video generation started! ID: \${result.videoId}\`)
} catch (error) {
  console.error('Error generating video:', error)
  alert('Failed to generate video. Please try again.')
} finally {
  setIsGenerating(false)
}
\`\`\`

### 3. Backend Controller (Add to your backend)

Create `/backend/controllers/generateController.js`:

\`\`\`javascript
const generateVideo = async (req, res) => {
  try {
    const { background, prompt } = req.body
    const userId = req.user.id // From JWT auth middleware

    // Validate inputs
    if (!background || !prompt) {
      return res.status(400).json({ 
        success: false, 
        message: 'Background and prompt are required' 
      })
    }

    // TODO: Add your video generation logic here
    // This could involve:
    // 1. Calling an AI API (OpenAI, etc.)
    // 2. Processing video with FFmpeg
    // 3. Storing video metadata in database
    // 4. Returning job ID for status tracking

    const videoId = generateUniqueId() // Implement this function

    res.json({
      success: true,
      videoId,
      status: 'processing',
      message: 'Video generation started'
    })
  } catch (error) {
    console.error('Generate video error:', error)
    res.status(500).json({ 
      success: false, 
      message: 'Server error' 
    })
  }
}

module.exports = { generateVideo }
\`\`\`

### 4. Backend Route (Add to your backend)

Create `/backend/routes/generate.js`:

\`\`\`javascript
const express = require('express')
const router = express.Router()
const { generateVideo } = require('../controllers/generateController')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/', authMiddleware, generateVideo)

module.exports = router
\`\`\`

Add to `/backend/server.js`:

\`\`\`javascript
const generateRoutes = require('./routes/generate')
app.use('/api/generate', generateRoutes)
\`\`\`

## Environment Variables

Add to your `.env` file (if needed):

\`\`\`
PORT=5000
MONGODB_URI=mongodb://localhost:27017/brainrotter
JWT_SECRET=your_jwt_secret_key_here
NODE_ENV=development
\`\`\`

## Testing the Integration

1. Start your backend:
\`\`\`bash
cd backend
npm start
\`\`\`

2. Start this frontend:
\`\`\`bash
cd chat-interface
npm install
npm run dev
\`\`\`

3. Open `http://localhost:3000`

4. Test the flow:
   - Select a background (Minecraft, Subway Surfers, or GTA V)
   - Enter a prompt
   - Click "Generate BrainRot Video"
   - Check console for API responses

## Vite Proxy Configuration

The `vite.config.js` is already configured to proxy `/api` requests to `http://localhost:5000`:

\`\`\`javascript
server: {
  port: 3000,
  proxy: {
    '/api': {
      target: 'http://localhost:5000',
      changeOrigin: true
    }
  }
}
\`\`\`

This means you can call `/api/generate` in your frontend and it will automatically route to `http://localhost:5000/api/generate`.

## Authentication Flow (Optional)

If you want to add login before video generation:

1. Create a Login component
2. Call the `login` API function
3. Store the JWT token
4. Protect the ChatInterface with auth check
5. Use the token for `/api/generate` requests

## Next Steps

1. ✅ Frontend is ready and clean
2. ⏳ Create `/api/generate` endpoint in backend
3. ⏳ Implement video generation logic (AI + video processing)
4. ⏳ Add video status polling (check if video is ready)
5. ⏳ Add video preview/download functionality
6. ⏳ Add user video history

## Notes

- The frontend uses Framer Motion for smooth animations
- Tailwind CSS is configured for styling
- The interface is clean and minimal as requested
- Three background options are available as specified
- Prompt input is simple and straightforward
