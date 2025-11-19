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
