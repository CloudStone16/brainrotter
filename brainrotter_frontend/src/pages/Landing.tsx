import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useBrainrot } from "../contexts/BrainrotContext";

// Correctly import assets
import skibidi1 from '../assets/skibidi1.gif';
import skibidi2 from '../assets/skibidi2.gif';
import skibidi3 from '../assets/skibidi3.gif';
import minecraftBg from '../assets/minecraft_bg.jpg'; // Import Minecraft background

const Landing: React.FC = () => {
  const navigate = useNavigate();
  const { isBrainrot } = useBrainrot();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen w-full bg-black text-white overflow-x-hidden p-4 sm:p-8 relative">
      {/* Minecraft Background */}
      <div 
        className="absolute inset-0 w-full h-full bg-cover bg-center opacity-30 blur-lg z-0" // Increased blur
        style={{ backgroundImage: `url(${minecraftBg})` }}
      />

      {/* Glitch Grid Overlay */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 grid grid-cols-20 md:grid-cols-40 gap-px opacity-5">
          {Array.from({ length: 800 }).map((_, i) => (
            <div key={i} className="bg-white/10 animate-pulse" style={{ animationDelay: `${Math.random() * 5}s` }} />
          ))}
        </div>
      </div>

      {/* Floating GIFs */}
      <> {/* Removed isBrainrot condition */}
        <motion.img 
          src={skibidi1} 
          alt="skibidi 1" 
          className="absolute w-64 opacity-70 pointer-events-none z-10" // Increased size and opacity
          style={{ top: '15%', left: '5%' }} 
          animate={{ y: [0, -20, 0], rotate: [0, 5, -5, 0] }} 
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} 
        />
        <motion.img 
          src={skibidi2} 
          alt="skibidi 2" 
          className="absolute w-48 opacity-70 pointer-events-none z-10" // Increased size and opacity
          style={{ top: '50%', left: '50%', transform: 'translateX(-50%)' }} 
          animate={{ y: [0, 20, 0], rotate: [0, -5, 5, 0] }} 
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }} 
        />
        <motion.img 
          src={skibidi3} 
          alt="skibidi 3" 
          className="absolute w-56 opacity-70 pointer-events-none z-10" // Increased size and opacity
          style={{ top: '20%', right: '5%' }} 
          animate={{ y: [0, -15, 0], rotate: [0, 3, -3, 0] }} 
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }} 
        />
      </>

      <motion.div 
        className="relative z-20 flex flex-col items-center justify-center min-h-[80vh] text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1 
          className="text-6xl sm:text-7xl md:text-8xl font-extrabold tracking-widest bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400"
          variants={itemVariants}
        >
          BRAINROTTER
        </motion.h1>

        <motion.div 
          className="mt-6 mb-12 p-4 max-w-2xl bg-neon-purple/10 border border-neon-purple/30 rounded-2xl backdrop-blur-lg shadow-lg shadow-neon-purple/20"
          variants={itemVariants}
        >
          <h2 className="text-xl sm:text-2xl font-bold">
            {isBrainrot ? "From Random Thought to Viral Reel in One Click." : "Automate the Chaos. Breathe Life into Noise."}
          </h2>
          <p className="text-base sm:text-lg mt-2 text-gray-300">
            {isBrainrot ? "Stop spending hours on edits for a 30-second video that gets 10 views. Let's cook." : "Tired of complex video editing? Turn your ideas into engaging short-form content instantly."}
          </p>
        </motion.div>

        <motion.button
          onClick={() => navigate("/home")}
          className="px-12 py-4 bg-white text-black font-bold text-xl rounded-xl shadow-lg transition-transform transform hover:scale-105"
          variants={itemVariants}
          whileHover={{ boxShadow: "0 0 20px rgba(255, 255, 255, 0.5)" }}
        >
          {isBrainrot ? "ENTER THE ASYLUM" : "ENTER"}
        </motion.button>
      </motion.div>

      <div className="h-32" /> 

      <motion.section 
        className="relative z-20 max-w-4xl mx-auto p-8 sm:p-12 text-center bg-gray-900/50 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h2 className="text-3xl sm:text-4xl font-black mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-300">
          {isBrainrot ? "Your Brainrot, Automated." : "Effortless Content Creation."}
        </h2>
        <p className="text-lg sm:text-xl leading-relaxed text-gray-300">
          {isBrainrot ? "Serve up pure, uncut brainrot. Stop just having the idea—instantly generate the reel. Our AI is terminally online, turning your random thoughts, memes, and inside jokes into perfectly chaotic, algorithm-ready videos. Go from a blank screen to a viral masterpiece in seconds." : "Focus on your ideas, not the editing. Our AI-powered platform takes your concepts and transforms them into engaging, shareable short-form videos, complete with dynamic backgrounds, voiceovers, and subtitles. Create more, faster."}
        </p>
      </motion.section>

      <div className="h-32" />
    </div>
  );
};

export default Landing;