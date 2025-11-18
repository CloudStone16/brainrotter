# BrainRot Chat Interface

A clean, modern chat interface for generating BrainRot videos with customizable backgrounds.

## Features

- 🎮 Choose from 3 background videos:
  - Minecraft Parkour
  - Subway Surfers
  - GTA V Parkour
- ✍️ Enter creative prompts for video generation
- 🎨 Clean, gradient UI with Framer Motion animations
- 🔌 Ready for backend integration

## Setup

### Prerequisites

- Node.js (v16+)
- npm or yarn
- Backend server running on `http://localhost:5000` (optional for development)

### Installation

\`\`\`bash
# Navigate to the chat-interface directory
cd chat-interface

# Install dependencies
npm install

# Start development server
npm run dev
\`\`\`

The app will run on `http://localhost:3000`

### Build for Production

\`\`\`bash
npm run build
npm run preview
\`\`\`

## Project Structure

\`\`\`
chat-interface/
├── src/
│   ├── components/
│   │   └── ChatInterface.jsx   # Main chat interface component
│   ├── utils/                   # API utilities (to be added)
│   ├── App.jsx                  # Root component
│   ├── main.jsx                 # Entry point
│   └── index.css                # Global styles
├── index.html
├── package.json
├── vite.config.js
├── INTEGRATION.md               # Backend integration guide
└── README.md
\`\`\`

## Backend Integration

This frontend is designed to work with your existing backend at `http://localhost:5000`.

**See `INTEGRATION.md` for complete backend integration instructions.**

Quick summary:
1. Create `/api/generate` endpoint in your backend
2. Add `src/utils/api.js` for API calls
3. Update `handleGenerate` function in ChatInterface
4. Test the integration

## Technologies

- **React 19.2.0** - UI library
- **Vite 7.2.2** - Build tool and dev server
- **Framer Motion 12.23.24** - Animations
- **Tailwind CSS 4.1.17** - Styling

## Current State

✅ Clean UI design  
✅ Background selection (Minecraft, Subway Surfers, GTA V)  
✅ Prompt input interface  
✅ Loading states  
⏳ Backend integration (placeholder ready)  
⏳ Video generation API (backend needs implementation)  

## Development

The interface currently shows a placeholder when generating videos. To enable real video generation:

1. Follow the steps in `INTEGRATION.md`
2. Implement the `/api/generate` endpoint in your backend
3. Add video processing logic (AI + FFmpeg)
4. Update the frontend API calls

## Notes

- Backend server should run on port 5000
- Frontend dev server runs on port 3000
- Vite proxy automatically forwards `/api` requests to backend
- No authentication required yet (can be added later)

## Branching

This project is on the `chat-interface` branch, separate from the main authentication flow.
