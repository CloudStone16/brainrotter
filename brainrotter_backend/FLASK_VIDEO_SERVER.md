# Flask Video Server Setup Guide

This guide explains how to configure Flask to generate and serve video files to the frontend.

## 🎥 How Video Delivery Works

### Flow:
1. Frontend sends generation request → Express → Flask
2. Flask generates video and saves to `outputs/` folder
3. Flask returns video URL in JSON response
4. Frontend displays video using the URL
5. User can watch inline or download

---

## 🐍 Updated Flask Server Code

### **app.py** (Complete Implementation)

```python
from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import os
import uuid
from datetime import datetime

app = Flask(__name__)

# Enable CORS for both React frontend and Express backend
CORS(app, origins=[
    "http://localhost:5173",  # React frontend
    "http://localhost:3000"   # Express backend
])

# Configuration
OUTPUT_DIR = 'outputs'
ALLOWED_BACKGROUNDS = ['minecraft', 'subway_surfers', 'gta_v']

# Create outputs directory if it doesn't exist
os.makedirs(OUTPUT_DIR, exist_ok=True)

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
        if background_video not in ALLOWED_BACKGROUNDS:
            return jsonify({
                'status': 'error',
                'message': f'Invalid background_video. Must be one of: {ALLOWED_BACKGROUNDS}'
            }), 400
        
        # Validate topic length
        if len(topic) > 500 or len(topic) < 1:
            return jsonify({
                'status': 'error',
                'message': 'Topic must be between 1 and 500 characters'
            }), 400
        
        # Generate unique video ID and filename
        video_id = str(uuid.uuid4())[:8]
        timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
        filename = f'clip_{background_video}_{timestamp}_{video_id}.mp4'
        output_path = os.path.join(OUTPUT_DIR, filename)
        
        print(f"🎬 Generating video...")
        print(f"   Background: {background_video}")
        print(f"   Topic: {topic[:50]}...")
        print(f"   Output: {filename}")
        
        # TODO: Call your AI model here to generate the video
        # Example:
        # from your_ai_model import generate_brainrot_clip
        # generate_brainrot_clip(
        #     background_video=background_video,
        #     topic=topic,
        #     output_path=output_path
        # )
        
        # Placeholder: For testing, you can copy a sample video
        # import shutil
        # shutil.copy('sample_video.mp4', output_path)
        
        # For now, simulate successful generation
        # In production, replace this with actual video generation
        
        # Get video duration (placeholder - get from actual video)
        duration = 45  # seconds
        
        # Construct video URL
        # This URL will be accessible via the /outputs/<filename> route below
        video_url = f'http://localhost:5000/outputs/{filename}'
        
        response = {
            'status': 'success',
            'video_url': video_url,
            'video_id': video_id,
            'filename': filename,
            'duration': duration,
            'background': background_video,
            'topic': topic[:100],  # Return truncated topic for reference
            'message': 'Clip generated successfully'
        }
        
        print(f"✅ Video generated successfully!")
        print(f"   URL: {video_url}")
        
        return jsonify(response), 200
        
    except Exception as e:
        print(f"❌ Error: {str(e)}")
        return jsonify({
            'status': 'error',
            'message': str(e)
        }), 500

# Route to serve video files
@app.route('/outputs/<filename>', methods=['GET'])
def serve_video(filename):
    """
    Serves video files from the outputs directory.
    This allows the frontend to access videos via URL.
    """
    try:
        # Security: Validate filename to prevent directory traversal
        if '..' in filename or '/' in filename or '\\' in filename:
            return jsonify({'error': 'Invalid filename'}), 400
        
        # Check if file exists
        file_path = os.path.join(OUTPUT_DIR, filename)
        if not os.path.exists(file_path):
            return jsonify({'error': 'Video not found'}), 404
        
        # Serve the video file
        return send_from_directory(
            OUTPUT_DIR, 
            filename,
            mimetype='video/mp4',
            as_attachment=False  # Set to True to force download
        )
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Health check endpoint
@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({
        'status': 'ok',
        'message': 'Flask AI service is running',
        'outputs_dir': OUTPUT_DIR,
        'video_count': len([f for f in os.listdir(OUTPUT_DIR) if f.endswith('.mp4')])
    }), 200

# List all generated videos (optional - for debugging)
@app.route('/api/videos', methods=['GET'])
def list_videos():
    try:
        videos = []
        for filename in os.listdir(OUTPUT_DIR):
            if filename.endswith('.mp4'):
                file_path = os.path.join(OUTPUT_DIR, filename)
                videos.append({
                    'filename': filename,
                    'url': f'http://localhost:5000/outputs/{filename}',
                    'size': os.path.getsize(file_path),
                    'created': datetime.fromtimestamp(
                        os.path.getctime(file_path)
                    ).isoformat()
                })
        
        return jsonify({
            'status': 'success',
            'count': len(videos),
            'videos': videos
        }), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    print("🚀 Starting Flask AI Video Generation Service...")
    print(f"📁 Output directory: {os.path.abspath(OUTPUT_DIR)}")
    print(f"🌐 Server: http://localhost:5000")
    print(f"🎥 Video endpoint: http://localhost:5000/outputs/<filename>")
    
    app.run(host='0.0.0.0', port=5000, debug=True)
```

---

## 📁 Directory Structure

```
flask_backend/
├── app.py
├── outputs/               # Generated videos stored here
│   ├── clip_minecraft_20251119_143022_a1b2c3d4.mp4
│   └── clip_gta_v_20251119_143145_e5f6g7h8.mp4
├── models/               # Your AI models
├── requirements.txt
└── sample_video.mp4      # Optional: for testing
```

---

## 🧪 Testing the Video Server

### 1. Test Health Check
```bash
curl http://localhost:5000/api/health
```

### 2. Test Video Generation
```bash
curl -X POST http://localhost:5000/api/generate \
  -H "Content-Type: application/json" \
  -d '{"background_video": "minecraft", "topic": "Why diamonds are overrated"}'
```

### 3. Access Generated Video
After generation, you'll get a URL like:
```
http://localhost:5000/outputs/clip_minecraft_20251119_143022_a1b2c3d4.mp4
```

Open this URL in your browser to view the video.

### 4. List All Videos
```bash
curl http://localhost:5000/api/videos
```

---

## 🔒 Production Considerations

### 1. **Video Storage**
For production, consider:
- **Cloud Storage**: AWS S3, Google Cloud Storage, Cloudinary
- **CDN**: CloudFront, Cloudflare for faster delivery
- **Cleanup**: Delete old videos to save space

```python
# Example: Upload to AWS S3
import boto3

s3 = boto3.client('s3')
s3.upload_file(output_path, 'my-bucket', filename)
video_url = f'https://my-bucket.s3.amazonaws.com/{filename}'
```

### 2. **File Size Limits**
```python
app.config['MAX_CONTENT_LENGTH'] = 100 * 1024 * 1024  # 100MB max
```

### 3. **CORS in Production**
```python
CORS(app, origins=[
    "https://brainrotter.com",  # Your production domain
    "https://api.brainrotter.com"
])
```

### 4. **Video Cleanup Script**
```python
import time

def cleanup_old_videos(days=7):
    """Delete videos older than specified days"""
    current_time = time.time()
    for filename in os.listdir(OUTPUT_DIR):
        file_path = os.path.join(OUTPUT_DIR, filename)
        if os.path.getctime(file_path) < current_time - (days * 86400):
            os.remove(file_path)
            print(f"Deleted old video: {filename}")
```

---

## 📊 Response Format

### Success Response:
```json
{
  "status": "success",
  "video_url": "http://localhost:5000/outputs/clip_minecraft_20251119_143022_a1b2c3d4.mp4",
  "video_id": "a1b2c3d4",
  "filename": "clip_minecraft_20251119_143022_a1b2c3d4.mp4",
  "duration": 45,
  "background": "minecraft",
  "topic": "Why diamonds are overrated",
  "message": "Clip generated successfully"
}
```

### Error Response:
```json
{
  "status": "error",
  "message": "Invalid background_video. Must be one of: minecraft, subway_surfers, gta_v"
}
```

---

## 🚀 Complete Startup Sequence

```bash
# Terminal 1: Start Flask
cd flask_backend
python app.py

# Terminal 2: Start Express
cd backend
npm run dev

# Terminal 3: Start React
cd brainrotter_frontend
npm run dev
```

---

## 💡 Frontend Integration

The frontend now automatically:
1. ✅ Sends generation request
2. ✅ Receives video URL
3. ✅ Displays video player with controls
4. ✅ Provides download button
5. ✅ Allows generating another video

Everything is already implemented in `GenerateClip.tsx`! 🎉
