import React, { useMemo } from 'react';
import { useBrainrot } from '../contexts/BrainrotContext';
import skibidi from '../assets/skibidi-skibidi-toilet.gif';
import skibidi1 from '../assets/skibidi1.gif';
import skibidi2 from '../assets/skibidi2.gif';
import skibidi3 from '../assets/skibidi3.gif';

const gifs = [skibidi, skibidi1, skibidi2, skibidi3];

const GlitchBackground: React.FC = () => {
  const { isBrainrot } = useBrainrot();

  const blocks = useMemo(() => Array.from({ length: 200 }), []);
  const chaoticGifs = useMemo(() => Array.from({ length: 30 }).map((_, i) => ({
    id: i,
    src: gifs[i % gifs.length],
    style: {
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      width: `${Math.random() * 80 + 20}px`, // Smaller size
      opacity: Math.random() * 0.15 + 0.05, // Lower opacity
      transform: `rotate(${Math.random() * 360}deg)`,
      animationDelay: `${Math.random() * 10}s`,
      animationDuration: `${Math.random() * 15 + 10}s`,
    }
  })), []);

  return (
    <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 grid grid-cols-10 md:grid-cols-20 gap-px">
        {blocks.map((_, i) => {
          const randomOpacity = Math.random() * 0.05;
          const randomAnimationDelay = `${Math.random() * 5}s`;
          return (
            <div
              key={i}
              className="bg-white/10 animate-pulse"
              style={{
                opacity: randomOpacity,
                animationDelay: randomAnimationDelay,
                animationDuration: '5s'
              }}
            />
          );
        })}
      </div>
      {isBrainrot && (
        <div className="absolute inset-0">
          {chaoticGifs.map(gif => (
            <img
              key={gif.id}
              src={gif.src}
              alt=""
              className="absolute animate-pulse"
              style={gif.style}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default GlitchBackground;
