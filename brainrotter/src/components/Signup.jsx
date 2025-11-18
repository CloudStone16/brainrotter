import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import skibidiGif from '../assets/skibidi-skibidi-toilet.gif';
import brainImg from '../assets/brain.png';
import skullImg from '../assets/skull.png';
import moaiImg from '../assets/4666433.png';

const Signup = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { signup } = useAuth();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords don\'t match fam 😭');
      return;
    }

    setLoading(true);

    const result = await signup(formData.username, formData.email, formData.password);

    if (result.success) {
      navigate('/dashboard');
    } else {
      setError(result.error || 'Signup failed. Skill issue? 💀');
    }

    setLoading(false);
  };

  const brainrotPhrases = [
    'OHIO SUPREMACY',
    'SKIBIDI',
    'RIZZ',
    'SIGMA',
    'GYATT',
    'BASED',
    'W RIZZ',
    'FANUM TAX'
  ];

  return (
    <div className="min-h-screen relative overflow-hidden bg-black flex items-center justify-center p-4">
      {/* Animated background assets */}
      <motion.img
        src={brainImg}
        alt="brain"
        className="absolute w-32 h-32 opacity-20 pointer-events-none"
        style={{ top: '10%', left: '15%' }}
        animate={{ y: [0, -30, 0], rotate: [0, 10, -10, 0], scale: [1, 1.2, 1] }}
        transition={{ duration: 6, repeat: Infinity }}
      />
      <motion.img
        src={skullImg}
        alt="skull"
        className="absolute w-40 h-40 opacity-15 pointer-events-none"
        style={{ top: '60%', right: '10%' }}
        animate={{ y: [0, 30, 0], x: [0, -20, 0], rotate: [0, -15, 15, 0] }}
        transition={{ duration: 5, repeat: Infinity }}
      />
      <motion.img
        src={moaiImg}
        alt="moai"
        className="absolute w-36 h-36 opacity-25 pointer-events-none"
        style={{ bottom: '15%', left: '8%' }}
        animate={{ scale: [1, 1.15, 1], rotate: [0, 8, -8, 0] }}
        transition={{ duration: 7, repeat: Infinity }}
      />
      <motion.img
        src={brainImg}
        alt="brain2"
        className="absolute w-28 h-28 opacity-10 pointer-events-none"
        style={{ top: '30%', right: '20%' }}
        animate={{ y: [0, -20, 0], x: [0, 15, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      {/* Floating brainrot text */}
      {brainrotPhrases.map((phrase, i) => (
        <motion.div
          key={phrase}
          className="absolute font-black text-2xl opacity-10 pointer-events-none text-yellow-300"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -50, 0],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: 3 + i,
            repeat: Infinity,
          }}
        >
          {phrase}
        </motion.div>
      ))}

      {/* Main signup card */}
      <motion.div
        initial={{ scale: 0, rotate: 180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', duration: 0.8 }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="bg-black/50 backdrop-blur-2xl rounded-3xl p-8 shadow-2xl border-4 border-yellow-400 hover:border-cyan-500 transition-all duration-300">
          {/* Skull Image */}
          <div className="flex justify-center mb-4">
            <motion.img
              src={skullImg}
              alt="skull"
              className="w-40 h-40 rounded-full border-4 border-purple-500"
              animate={{ 
                scale: [1, 1.15, 1],
                rotate: [0, -10, 10, 0]
              }}
              transition={{ duration: 2.5, repeat: Infinity }}
            />
          </div>

          {/* Title */}
          <motion.h1
            className="text-6xl font-black text-center mb-2 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-pink-500 to-cyan-400"
            animate={{
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            SIGN UP
          </motion.h1>
          
          <motion.p
            className="text-center text-yellow-300 text-xl mb-6 font-bold"
            animate={{ 
              scale: [1, 1.1, 1],
              rotate: [0, 2, -2, 0]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            join the brainrot army 🧠🚽
          </motion.p>

          {error && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="bg-red-500/80 text-white p-3 rounded-xl mb-4 text-center font-bold border-2 border-red-300"
            >
              ❌ {error}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-yellow-300 font-bold mb-2 text-lg flex items-center gap-2">
                👤 Username (make it skibidi)
              </label>
              <motion.input
                whileFocus={{ scale: 1.02, borderColor: '#ff00ff' }}
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-blue-900/50 border-2 border-yellow-400 rounded-xl text-white placeholder-pink-300 focus:outline-none focus:ring-4 focus:ring-cyan-500 font-semibold"
                placeholder="sigma_grindset_420"
                required
              />
            </div>

            <div>
              <label className="block text-yellow-300 font-bold mb-2 text-lg flex items-center gap-2">
                📧 Email (no cap)
              </label>
              <motion.input
                whileFocus={{ scale: 1.02, borderColor: '#ff00ff' }}
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-blue-900/50 border-2 border-yellow-400 rounded-xl text-white placeholder-pink-300 focus:outline-none focus:ring-4 focus:ring-cyan-500 font-semibold"
                placeholder="sigma@ohio.gyatt"
                required
              />
            </div>

            <div>
              <label className="block text-yellow-300 font-bold mb-2 text-lg flex items-center gap-2">
                🔐 Password (bussin)
              </label>
              <motion.input
                whileFocus={{ scale: 1.02, borderColor: '#ff00ff' }}
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-blue-900/50 border-2 border-yellow-400 rounded-xl text-white placeholder-pink-300 focus:outline-none focus:ring-4 focus:ring-cyan-500 font-semibold"
                placeholder="••••••••"
                required
              />
            </div>

            <div>
              <label className="block text-yellow-300 font-bold mb-2 text-lg flex items-center gap-2">
                🔐 Confirm Password
              </label>
              <motion.input
                whileFocus={{ scale: 1.02, borderColor: '#ff00ff' }}
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-blue-900/50 border-2 border-yellow-400 rounded-xl text-white placeholder-pink-300 focus:outline-none focus:ring-4 focus:ring-cyan-500 font-semibold"
                placeholder="••••••••"
                required
              />
            </div>

            <motion.button
              whileHover={{ 
                scale: 1.05,
                boxShadow: '0 0 30px rgba(255, 255, 0, 0.8)',
              }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 text-white font-black text-xl py-4 rounded-xl shadow-lg transition-all duration-300 disabled:opacity-50 border-2 border-white"
            >
              {loading ? (
                <motion.span
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  className="inline-block"
                >
                  ⏳
                </motion.span>
              ) : (
                '💪 CREATE ACCOUNT (SIGMA MODE) 💪'
              )}
            </motion.button>
          </form>

          <motion.div
            className="mt-6 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <p className="text-yellow-200 font-semibold">
              Already got an account? W 🗿
            </p>
            <Link to="/login">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="mt-2 text-cyan-300 font-black text-lg hover:text-pink-300 transition-colors underline decoration-wavy"
              >
                LOGIN HERE (based)
              </motion.button>
            </Link>
          </motion.div>
        </div>

        {/* Corner decorations */}
        <motion.div
          className="absolute -top-10 -right-10 text-8xl"
          animate={{ 
            rotate: 360,
            scale: [1, 1.2, 1]
          }}
          transition={{ 
            rotate: { duration: 3, repeat: Infinity, ease: 'linear' },
            scale: { duration: 2, repeat: Infinity }
          }}
        >
          🧠
        </motion.div>
        <motion.div
          className="absolute -bottom-10 -left-10 text-8xl"
          animate={{ 
            rotate: -360,
            scale: [1, 1.3, 1]
          }}
          transition={{ 
            rotate: { duration: 4, repeat: Infinity, ease: 'linear' },
            scale: { duration: 2.5, repeat: Infinity }
          }}
        >
          🚽
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Signup;
