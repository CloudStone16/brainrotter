import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ChatInterface = () => {
  const [messages, setMessages] = useState([
    { id: 1, type: 'bot', text: 'Yo! Ready to create some PEAK brainrot content? 🧠💀' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    const userMessage = {
      id: Date.now(),
      type: 'user',
      text: input
    };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate bot response
    setTimeout(() => {
      const botMessage = {
        id: Date.now() + 1,
        type: 'bot',
        text: 'Processing your brainrot request... 🚽✨'
      };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="h-screen w-screen bg-black flex flex-col overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-900 via-pink-900 to-cyan-900 border-b-4 border-cyan-400 p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <motion.div
              className="text-4xl"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              🧠
            </motion.div>
            <div>
              <h1 className="text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-pink-500">
                BRAINROT GENERATOR
              </h1>
              <p className="text-sm text-gray-400 font-mono">fr fr no cap 💀</p>
            </div>
          </div>
          <motion.div
            className="text-3xl"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            🚽
          </motion.div>
        </div>
      </div>

      {/* Chat Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 bg-gradient-to-br from-black via-gray-900 to-black">
        <div className="max-w-4xl mx-auto space-y-4">
          <AnimatePresence>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs md:max-w-md lg:max-w-lg px-6 py-4 rounded-2xl ${
                    message.type === 'user'
                      ? 'bg-gradient-to-r from-pink-600 to-purple-600 text-white border-2 border-pink-400'
                      : 'bg-gradient-to-r from-cyan-900 to-blue-900 text-white border-2 border-cyan-400'
                  } shadow-lg`}
                >
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">
                      {message.type === 'user' ? '👤' : '🤖'}
                    </span>
                    <p className="text-base md:text-lg font-semibold">{message.text}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Typing Indicator */}
          {isTyping && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-start"
            >
              <div className="bg-gradient-to-r from-cyan-900 to-blue-900 border-2 border-cyan-400 px-6 py-4 rounded-2xl">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">🤖</span>
                  <div className="flex gap-1">
                    <motion.div
                      className="w-2 h-2 bg-cyan-400 rounded-full"
                      animate={{ y: [0, -10, 0] }}
                      transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                    />
                    <motion.div
                      className="w-2 h-2 bg-cyan-400 rounded-full"
                      animate={{ y: [0, -10, 0] }}
                      transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                    />
                    <motion.div
                      className="w-2 h-2 bg-cyan-400 rounded-full"
                      animate={{ y: [0, -10, 0] }}
                      transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className="bg-gradient-to-r from-purple-900 via-pink-900 to-cyan-900 border-t-4 border-cyan-400 p-4">
        <div className="max-w-4xl mx-auto">
          <form onSubmit={handleSend} className="flex gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Describe your brainrot vision... 💀🧠"
              className="flex-1 px-6 py-4 bg-black/50 border-2 border-cyan-400 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-pink-500 text-lg font-semibold"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-black text-lg rounded-xl border-2 border-pink-400 shadow-lg hover:shadow-pink-500/50 transition-all"
            >
              GENERATE 🚀
            </motion.button>
          </form>
          <p className="text-center text-gray-500 text-sm mt-2 font-mono">
            Max brainrot mode activated fr fr 💯
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
