import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const JustEdits = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black text-green-400 font-mono p-8">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-4xl mx-auto"
      >
        <div className="mb-8">
          <button
            onClick={() => navigate('/dashboard')}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded border-2 border-red-400"
          >
            ← BACK TO DASHBOARD
          </button>
        </div>

        <motion.h1
          className="text-6xl font-black mb-8 text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-yellow-500"
          animate={{
            backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
          }}
          transition={{ duration: 5, repeat: Infinity }}
        >
          🎬 JUST EDITS 🎬
        </motion.h1>

        <div className="border-4 border-green-500 rounded-lg p-8 bg-black/80">
          <p className="text-2xl mb-6">
            {'>'} INITIALIZING_CLEAN_EDITS.exe...
          </p>
          
          <div className="space-y-4 text-lg">
            <p>{'>'} Loading W rizz transitions...</p>
            <p>{'>'} Compiling sigma edits...</p>
            <p>{'>'} No cringe allowed...</p>
          </div>

          <motion.div
            className="mt-8 p-6 bg-green-900/20 border-2 border-green-500 rounded"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <p className="text-yellow-400 text-xl font-bold">
              🚧 GENERATOR COMING SOON 🚧
            </p>
            <p className="text-gray-400 mt-2">
              Clean edits only. W rizz guaranteed. Fr fr no cap.
            </p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default JustEdits;
