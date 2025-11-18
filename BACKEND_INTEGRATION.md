# Backend Integration Guide - Brainrotter

This document explains how to integrate the Brainrotter React frontend with the Flask backend for AI-powered brainrot clip generation.

---

## 📋 Overview

The Brainrotter project uses a **hybrid stack**:
- **Frontend**: React + TypeScript + Vite + Tailwind CSS (Port: 5173 default)
- **Main Backend**: Node.js/Express (MERN stack for auth, user management, etc.)
- **AI Backend**: Flask (Python) for clip generation using AI models (Port: 5000)

---

## 🔌 API Endpoint Specification

### **POST** `/api/generate`

**Base URL**: `http://localhost:5000`

**Full Endpoint**: `http://localhost:5000/api/generate`

#### Request Headers
```json
{
  "Content-Type": "application/json"
}
```

#### Request Body (JSON)
```json
{
  "background_video": "minecraft" | "subway_surfers" | "gta_v",
  "topic": "string (max 500 characters)"
}
```

#### Example Request
```json
{
  "background_video": "gta_v",
  "topic": "Why sigma males always win at everything"
}
```

#### Expected Response (Success - 200)
```json
{
  "status": "success",
  "video_url": "http://localhost:5000/outputs/generated_clip_12345.mp4",
  "video_id": "12345",
  "duration": 45,
  "message": "Clip generated successfully"
}
```

#### Expected Response (Error - 400/500)
```json
{
  "status": "error",
  "message": "Error description here"
}
```

---

## 🐍 Flask Backend Implementation

### Required Setup

#### 1. Create Flask Server File

Create a file named `app.py` in your Flask backend directory:

```python
from flask import Flask, request, jsonify
from flask_cors import CORS
import os

app = Flask(__name__)

# Enable CORS for React frontend (localhost:5173)
CORS(app, origins=["http://localhost:5173"])

# Your AI model imports and setup here
# from your_ai_model import generate_clip_function

@app.route('/api/generate', methods=['POST'])
def generate_clip():
    try:
        # Get JSON data from request
        data = request.get_json()
        
        # Validate required fields
        if not data or 'background_video' not in data or 'topic' not in data:
            return jsonify({
                'status': 'error',
                'message': 'Missing required fields: background_video and topic'
            }), 400
        
        background_video = data['background_video']
        topic = data['topic']
        
        # Validate background_video type
        valid_backgrounds = ['minecraft', 'subway_surfers', 'gta_v']
        if background_video not in valid_backgrounds:
            return jsonify({
                'status': 'error',
                'message': f'Invalid background_video. Must be one of: {valid_backgrounds}'
            }), 400
        
        # Validate topic length
        if len(topic) > 500 or len(topic) < 1:
            return jsonify({
                'status': 'error',
                'message': 'Topic must be between 1 and 500 characters'
            }), 400
        
        # TODO: Call your AI model here
        # result = generate_clip_function(background_video, topic)
        
        # Placeholder response
        # Replace this with your actual clip generation logic
        response = {
            'status': 'success',
            'video_url': f'http://localhost:5000/outputs/clip_{background_video}.mp4',
            'video_id': 'temp_12345',
            'duration': 60,
            'message': 'Clip generated successfully'
        }
        
        return jsonify(response), 200
        
    except Exception as e:
        return jsonify({
            'status': 'error',
            'message': str(e)
        }), 500

# Health check endpoint
@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({
        'status': 'ok',
        'message': 'Flask backend is running'
    }), 200

if __name__ == '__main__':
    # Create outputs directory if it doesn't exist
    os.makedirs('outputs', exist_ok=True)
    
    # Run on port 5000
    app.run(host='0.0.0.0', port=5000, debug=True)
```

#### 2. Install Required Python Packages

```bash
pip install flask flask-cors
```

If you need to save the dependencies:
```bash
pip freeze > requirements.txt
```

#### 3. Start the Flask Server

```bash
python app.py
```

The server will start on `http://localhost:5000`

---

## 🚀 Frontend Implementation Details

The frontend implementation is already complete in:
- **File**: `src/pages/GenerateClip.tsx`

### Key Features:
1. **Background Video Selection**: Minecraft, Subway Surfers, or GTA V
2. **Topic Input**: User enters what the video should be about (max 500 chars)
3. **Error Handling**: Displays user-friendly error messages
4. **Loading States**: Shows loading spinner during generation
5. **Brainrot Mode**: Adaptive UI based on BrainrotContext

### How the Frontend Sends Data:

```typescript
const response = await fetch('http://localhost:5000/api/generate', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    background_video: selectedBackground, // 'minecraft' | 'subway_surfers' | 'gta_v'
    topic: topic, // string from user input
  }),
});
```

---

## 🧪 Testing the Integration

### 1. Test Backend Health Check
```bash
curl http://localhost:5000/api/health
```

Expected response:
```json
{"status": "ok", "message": "Flask backend is running"}
```

### 2. Test Generate Endpoint (Using curl)
```bash
curl -X POST http://localhost:5000/api/generate \
  -H "Content-Type: application/json" \
  -d '{"background_video": "minecraft", "topic": "Why water sheep was the real villain"}'
```

### 3. Test from Frontend
1. Start your React dev server: `npm run dev`
2. Start your Flask server: `python app.py`
3. Navigate to `http://localhost:5173/generate`
4. Fill in the form and click "Generate"
5. Check browser console (F12) for network requests and responses

---

## 🔧 Common Issues & Solutions

### Issue: CORS Error
**Error**: `Access to fetch at 'http://localhost:5000/api/generate' has been blocked by CORS policy`

**Solution**: Make sure you have `flask-cors` installed and properly configured:
```python
from flask_cors import CORS
CORS(app, origins=["http://localhost:5173"])
```

### Issue: Connection Refused
**Error**: `Failed to fetch` or `ERR_CONNECTION_REFUSED`

**Solution**: 
- Ensure Flask server is running on port 5000
- Check if another process is using port 5000: `netstat -ano | findstr :5000` (Windows)
- Try accessing `http://localhost:5000/api/health` in your browser

### Issue: 404 Not Found
**Error**: `404 Not Found` when calling `/api/generate`

**Solution**: 
- Verify the Flask route is defined: `@app.route('/api/generate', methods=['POST'])`
- Make sure you're sending a POST request, not GET

---

## 📁 Project Structure

```
brainrotter/
├── brainrotter_frontend/          # React frontend
│   ├── src/
│   │   ├── pages/
│   │   │   └── GenerateClip.tsx   # Clip generation page
│   │   ├── contexts/
│   │   │   └── BrainrotContext.tsx
│   │   └── components/
│   │       └── GlitchBackground.tsx
│   └── package.json
│
└── brainrotter_backend/           # Flask AI backend (create this)
    ├── app.py                     # Main Flask server
    ├── requirements.txt           # Python dependencies
    ├── models/                    # AI model files
    ├── outputs/                   # Generated video outputs
    └── utils/                     # Helper functions
```

---

## 🎯 Next Steps

1. **Implement AI Model Integration**
   - Import your AI model into `app.py`
   - Replace placeholder response with actual clip generation
   - Handle video file storage and serving

2. **Add Authentication** (Optional)
   - Protect `/api/generate` endpoint with JWT tokens
   - Integrate with your MERN backend for user verification

3. **Video Storage**
   - Set up file serving for generated videos
   - Consider cloud storage (AWS S3, Google Cloud Storage)
   - Add cleanup for old video files

4. **Error Handling**
   - Add more specific error messages
   - Implement retry logic on the frontend
   - Add logging for debugging

5. **Database Integration**
   - Store generation history in MongoDB
   - Track user quotas and limits
   - Save video metadata

---

## 💡 Example Full Workflow

1. User navigates to `/generate` from Dashboard
2. User selects "GTA V Parkour" as background
3. User types: "Why skibidi toilet is the greatest cinematic masterpiece"
4. User clicks "COOK IT UP FAM 🔥"
5. Frontend sends POST to `http://localhost:5000/api/generate`
6. Flask receives request, validates data
7. Flask calls AI model to generate clip
8. Flask saves video to `outputs/` folder
9. Flask returns video URL to frontend
10. Frontend displays success message or shows video

---

## 📞 Support

If you encounter any issues:
1. Check browser console for errors (F12 → Console)
2. Check Flask terminal for backend errors
3. Verify both servers are running (React on 5173, Flask on 5000)
4. Test endpoints individually with curl or Postman

---

**Happy Cooking! 🔥💀🧠**
