from flask import Flask, request, jsonify, url_for
from flask_cors import CORS # Import CORS
from moviepy.editor import VideoFileClip
import os
from generator import main as generate_video_flow
import traceback

app = Flask(__name__)

# Enable CORS for React frontend (localhost:5173)
CORS(app, origins=["http://localhost:5173"])

# Configure a static folder for serving generated videos
OUTPUTS_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'outputs')
app.config['OUTPUTS_DIR'] = OUTPUTS_DIR

# Ensure the outputs directory exists
os.makedirs(OUTPUTS_DIR, exist_ok=True)

@app.route('/outputs/<filename>')
def uploaded_file(filename):
    from flask import send_from_directory
    return send_from_directory(app.config['OUTPUTS_DIR'], filename)

@app.route('/api/generate', methods=['POST'])
def generate_clip_endpoint():
    # Get data from the request
    data = request.get_json()
    if not data or 'topic' not in data or 'background_video' not in data:
        return jsonify({
            "status": "error", # Changed from failure to error
            "message": "Missing 'topic' or 'background_video' in request body"
        }), 400

    topic = data.get('topic')
    background_video = data.get('background_video')

    try:
        # Call the main video generation flow
        # This now returns a tuple: (unique_id, output_path)
        video_id, output_path = generate_video_flow(topic, background_video)

        if not output_path or not os.path.exists(output_path):
             raise FileNotFoundError("Video generation failed, output file not found.")

        # Get video duration
        with VideoFileClip(output_path) as video_clip:
            duration = video_clip.duration

        # Construct the full video URL
        video_filename = os.path.basename(output_path)
        video_url = url_for('uploaded_file', filename=video_filename, _external=True)

        # Return the success response
        return jsonify({
            "status": "success",
            "video_url": video_url,
            "video_id": video_id,
            "duration": duration,
            "message": "Clip generated successfully"
        })

    except Exception as e:
        # Log the full error and return a failure response
        print(f"An error occurred: {e}")
        print(traceback.format_exc())
        return jsonify({
            "status": "error", # Changed from failure to error
            "message": str(e)
        }), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
