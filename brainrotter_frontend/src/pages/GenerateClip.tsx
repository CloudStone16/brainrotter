import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBrainrot } from '../contexts/BrainrotContext';
import skibidi from '../assets/skibidi-skibidi-toilet.gif';
import brain from '../assets/brain.gif';
import skull from '../assets/skull.png';

type BackgroundVideo = 'minecraft' | 'subway_surfers' | 'gta_v';

const GenerateClip: React.FC = () => {
  const { isBrainrot } = useBrainrot();
  const navigate = useNavigate();
  
  const [selectedBackground, setSelectedBackground] = useState<BackgroundVideo>('minecraft');
  const [topic, setTopic] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState('');

  const backgroundOptions = [
    { 
      value: 'minecraft' as BackgroundVideo, 
      label: isBrainrot ? 'Minecraft Parkour (OG Vibes)' : 'Minecraft Parkour',
      emoji: '⛏️'
    },
    { 
      value: 'subway_surfers' as BackgroundVideo, 
      label: isBrainrot ? 'Subway Surfers (Classic Sauce)' : 'Subway Surfers',
      emoji: '🚇'
    },
    { 
      value: 'gta_v' as BackgroundVideo, 
      label: isBrainrot ? 'GTA V Parkour (Sigma Energy)' : 'GTA V Parkour',
      emoji: '🏃'
    },
  ];

  const handleGenerate = async () => {
    if (!topic.trim()) {
      setError(isBrainrot ? 'Bro, type something fr fr 💀' : 'Please enter a topic for your video');
      return;
    }

    setIsGenerating(true);
    setError('');

    try {
      // Send request to Express.js backend instead of directly to Flask
      const response = await fetch('http://localhost:3000/api/clips/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          background_video: selectedBackground,
          topic: topic,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to generate clip');
      }

      const data = await response.json();
      console.log('Generation successful:', data);
      
      // You can navigate to a results page or show success message
      // navigate('/results', { state: { videoData: data } });
      
    } catch (err) {
      setError(isBrainrot ? 'L rizz moment, try again chief 😭' : 'Failed to generate clip. Please try again.');
      console.error('Error generating clip:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  const tips = [
    '💀 Pro tip: The more unhinged, the better',
    '🧠 Galaxy brain move: Mix serious topics with absurd takes',
    '💯 Sigma grindset: Make it controversial but not cringe',
    '🔥 Chad energy: Keep it under 60 seconds for max attention span',
    '⚡ Gigachad move: Add plot twists nobody asked for',
    '🎯 Based tip: Reference current memes for extra clout',
  ];

  const normalTips = [
    '💡 Tip: Shorter topics work better for engaging clips',
    '✨ Suggestion: Be creative and unique with your ideas',
    '🎬 Hint: Think about what would grab attention in 60 seconds',
    '🚀 Pro tip: Mix entertainment with information',
    '🎨 Idea: Controversial topics get more engagement',
    '⭐ Advice: Keep your audience guessing',
  ];

  const randomTip = isBrainrot 
    ? tips[Math.floor(Math.random() * tips.length)]
    : normalTips[Math.floor(Math.random() * normalTips.length)];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-4 mb-4">
            <img src={skull} alt="skull" className="w-16 h-16 animate-pulse" />
            <h1 className="text-5xl md:text-7xl font-bold tracking-widest">
              {isBrainrot ? 'COOK A CLIP' : 'GENERATE CLIP'}
            </h1>
            <img src={brain} alt="brain" className="w-16 h-16 animate-bounce" />
          </div>
          <p className="text-lg md:text-xl text-gray-300 italic">
            {isBrainrot ? 'let him cook fr fr no cap 🔥' : 'Create your brainrot masterpiece'}
          </p>
        </div>

        {/* Main Form Card */}
        <div className="bg-black/40 backdrop-blur-xl border-2 border-neon-purple/30 rounded-3xl p-8 md:p-12 shadow-2xl">
          
          {/* Background Video Selection */}
          <div className="mb-8">
            <label className="block text-2xl font-bold mb-4">
              {isBrainrot ? '🎮 Pick Your Grind:' : '🎥 Select Background Video:'}
            </label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {backgroundOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => setSelectedBackground(option.value)}
                  className={`p-6 rounded-2xl border-2 transition-all duration-300 transform hover:scale-105 ${
                    selectedBackground === option.value
                      ? 'border-neon-purple bg-neon-purple/20 shadow-lg shadow-neon-purple/50'
                      : 'border-white/20 bg-white/5 hover:border-white/40'
                  }`}
                >
                  <div className="text-4xl mb-2">{option.emoji}</div>
                  <div className="text-lg font-semibold">{option.label}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Topic Input */}
          <div className="mb-8">
            <label className="block text-2xl font-bold mb-4">
              {isBrainrot ? '📝 What\'s The Vibe?:' : '📝 Video Topic:'}
            </label>
            <textarea
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder={isBrainrot 
                ? 'Type your most unhinged take... let the intrusive thoughts win 💭' 
                : 'Enter what you want your video to be about...'}
              className="w-full h-32 px-6 py-4 bg-black/50 border-2 border-white/20 rounded-2xl text-white placeholder-gray-500 focus:border-neon-purple focus:outline-none resize-none font-mono text-lg transition-all duration-300"
              maxLength={500}
            />
            <div className="text-right text-sm text-gray-500 mt-2">
              {topic.length}/500 {isBrainrot ? 'characters of pure chaos' : 'characters'}
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-500/20 border-2 border-red-500/50 rounded-xl text-red-200 text-center font-bold">
              {error}
            </div>
          )}

          {/* Generate Button */}
          <button
            onClick={handleGenerate}
            disabled={isGenerating || !topic.trim()}
            className={`w-full py-6 rounded-2xl text-2xl font-bold transition-all duration-300 transform ${
              isGenerating || !topic.trim()
                ? 'bg-gray-600 cursor-not-allowed opacity-50'
                : 'bg-neon-purple hover:bg-neon-purple/80 hover:scale-105 hover:shadow-2xl hover:shadow-neon-purple/50'
            }`}
          >
            {isGenerating ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin h-6 w-6 mr-3" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                {isBrainrot ? 'COOKING... LET HIM COOK 👨‍🍳' : 'GENERATING YOUR CLIP...'}
              </span>
            ) : (
              isBrainrot ? '🔥 COOK IT UP FAM 🔥' : '✨ GENERATE BRAINROT VIDEO ✨'
            )}
          </button>

          {/* Skibidi Toilet Image */}
          {isBrainrot && (
            <div className="mt-8 flex justify-center">
              <img 
                src={skibidi} 
                alt="skibidi toilet" 
                className="w-48 h-48 rounded-2xl border-2 border-neon-purple/50 shadow-lg shadow-neon-purple/30" 
              />
            </div>
          )}

          {/* Random Tip */}
          <div className="mt-8 p-6 bg-gradient-to-r from-neon-purple/10 to-transparent border-l-4 border-neon-purple rounded-lg">
            <p className="text-lg text-gray-300 italic">
              {randomTip}
            </p>
          </div>

          {/* Back to Dashboard */}
          <button
            onClick={() => navigate('/dashboard')}
            className="mt-6 w-full py-3 border border-white/20 rounded-2xl text-lg hover:bg-white/5 transition-colors duration-300"
          >
            {isBrainrot ? '← Back to the Hub' : '← Back to Dashboard'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default GenerateClip;
