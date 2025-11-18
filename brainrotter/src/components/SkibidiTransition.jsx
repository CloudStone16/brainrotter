import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import skibidiGif from '../assets/skibidi-skibidi-toilet.gif';

const SkibidiTransition = ({ onComplete }) => {
  const [stage, setStage] = useState('stare'); // stare -> open -> swallow

  useEffect(() => {
    // Creepy stare for 2 seconds
    const stareTimer = setTimeout(() => {
      setStage('open');
    }, 2000);

    // Mouth opens for 1.5 seconds
    const openTimer = setTimeout(() => {
      setStage('swallow');
    }, 3500);

    // Complete transition
    const completeTimer = setTimeout(() => {
      onComplete();
    }, 5000);

    return () => {
      clearTimeout(stareTimer);
      clearTimeout(openTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black flex items-center justify-center overflow-hidden"
    >
      {/* Creepy red glow background */}
      <motion.div
        className="absolute inset-0 bg-gradient-radial from-red-900/50 via-black to-black"
        animate={{
          opacity: stage === 'stare' ? [0.3, 0.6, 0.3] : 0.8,
          scale: stage === 'swallow' ? 2 : 1,
        }}
        transition={{ duration: 1, repeat: stage === 'stare' ? Infinity : 0 }}
      />

      {/* Skibidi Toilet */}
      <motion.div
        className="relative z-10"
        initial={{ scale: 0.5, y: 100 }}
        animate={{
          scale: stage === 'stare' ? 1 : stage === 'open' ? 1.2 : 3,
          y: stage === 'stare' ? 0 : stage === 'open' ? -20 : 0,
          rotate: stage === 'open' ? [0, -2, 2, -2, 0] : 0,
        }}
        transition={{ 
          duration: stage === 'open' ? 0.3 : 1,
          repeat: stage === 'open' ? 3 : 0,
        }}
      >
        <motion.img
          src={skibidiGif}
          alt="skibidi toilet"
          className="w-96 h-96 rounded-full border-8 border-red-600 shadow-2xl shadow-red-600/50"
          animate={{
            boxShadow: [
              '0 0 20px rgba(220, 38, 38, 0.5)',
              '0 0 60px rgba(220, 38, 38, 0.8)',
              '0 0 20px rgba(220, 38, 38, 0.5)',
            ],
          }}
          transition={{ duration: 1, repeat: Infinity }}
        />

        {/* Glowing eyes effect */}
        <motion.div
          className="absolute top-1/3 left-1/4 w-12 h-12 bg-red-500 rounded-full blur-xl"
          animate={{
            opacity: [0.5, 1, 0.5],
            scale: [1, 1.3, 1],
          }}
          transition={{ duration: 0.8, repeat: Infinity }}
        />
        <motion.div
          className="absolute top-1/3 right-1/4 w-12 h-12 bg-red-500 rounded-full blur-xl"
          animate={{
            opacity: [0.5, 1, 0.5],
            scale: [1, 1.3, 1],
          }}
          transition={{ duration: 0.8, repeat: Infinity }}
        />
      </motion.div>

      {/* Mouth opening effect - dark circle that expands */}
      {stage === 'open' && (
        <motion.div
          className="absolute z-20 bg-black rounded-full"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ 
            scale: 3,
            opacity: 0.9,
            width: '500px',
            height: '500px',
          }}
          transition={{ duration: 1.5, ease: 'easeInOut' }}
        />
      )}

      {/* Swallow vortex effect */}
      {stage === 'swallow' && (
        <>
          {/* Spiral lines */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-full h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent"
              style={{
                top: '50%',
                left: '50%',
                transformOrigin: 'left center',
                rotate: (360 / 8) * i,
              }}
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{
                scaleX: [0, 2, 0],
                opacity: [0, 1, 0],
                rotate: (360 / 8) * i + 720,
              }}
              transition={{ duration: 1.5, ease: 'easeInOut' }}
            />
          ))}

          {/* Central vortex */}
          <motion.div
            className="absolute z-30 bg-gradient-radial from-cyan-500 via-purple-600 to-black rounded-full"
            initial={{ scale: 0 }}
            animate={{ 
              scale: 10,
              rotate: 720,
            }}
            transition={{ duration: 1.5, ease: 'easeIn' }}
            style={{ width: '100px', height: '100px' }}
          />

          {/* Screen shake effect */}
          <motion.div
            className="absolute inset-0 bg-white"
            animate={{
              opacity: [0, 0.3, 0, 0.2, 0],
            }}
            transition={{ duration: 0.5, repeat: 2 }}
          />
        </>
      )}

      {/* Creepy text during stare */}
      {stage === 'stare' && (
        <motion.div
          className="absolute bottom-20 text-red-500 font-mono text-3xl font-bold"
          initial={{ opacity: 0, y: 20 }}
          animate={{ 
            opacity: [0, 1, 0.5, 1],
            y: [20, 0],
          }}
          transition={{ duration: 1.5 }}
        >
          ENTERING THE ROT...
        </motion.div>
      )}

      {/* Glitch text during mouth opening */}
      {stage === 'open' && (
        <motion.div
          className="absolute top-20 text-white font-mono text-5xl font-black"
          animate={{
            x: [-5, 5, -3, 3, 0],
            opacity: [1, 0.5, 1, 0.3, 1],
          }}
          transition={{ duration: 0.2, repeat: Infinity }}
        >
          NO ESCAPE
        </motion.div>
      )}
    </motion.div>
  );
};

export default SkibidiTransition;
