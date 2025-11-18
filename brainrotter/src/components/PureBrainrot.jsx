import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const PureBrainrot = () => {
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
          className="text-6xl font-black mb-8 text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500"
          animate={{
            backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
          }}
          transition={{ duration: 5, repeat: Infinity }}
        >
          💀 PURE BRAINROT GENERATOR 💀
        </motion.h1>

        <div className="border-4 border-green-500 rounded-lg p-8 bg-black/80">
          <p className="text-2xl mb-6">
            {'>'} INITIALIZING_MAX_ROT.exe...
          </p>
          
          <div className="space-y-4 text-lg">
            <p>{'>'} Loading chaotic algorithms...</p>
            <p>{'>'} Compiling random memes...</p>
            <p>{'>'} Generating pure rot...</p>
          </div>

          <motion.div
            className="mt-8 p-6 bg-purple-900/20 border-2 border-purple-500 rounded"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <p className="text-yellow-400 text-xl font-bold">
              🚧 GENERATOR COMING SOON 🚧
            </p>
            <p className="text-gray-400 mt-2">
              Maximum chaos mode will be implemented here. No context, only rot.
            </p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default PureBrainrot;
