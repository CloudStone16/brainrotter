import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const ChatInterface = () => {
  const [selectedBackground, setSelectedBackground] = useState('')
  const [prompt, setPrompt] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)

  const backgrounds = [
    {
      id: 'minecraft',
      name: 'Minecraft Parkour',
      emoji: '⛏️',
      gradient: 'from-green-500 to-emerald-700'
    },
    {
      id: 'subway',
      name: 'Subway Surfers',
      emoji: '🚇',
      gradient: 'from-blue-500 to-cyan-700'
    },
    {
      id: 'gta',
      name: 'GTA V Parkour',
      emoji: '🏙️',
      gradient: 'from-orange-500 to-red-700'
    }
  ]

  const handleGenerate = async () => {
    if (!selectedBackground || !prompt.trim()) {
      alert('Please select a background and enter a prompt')
      return
    }

    setIsGenerating(true)

    // TODO: Backend Integration
    // Replace this with actual API call to your backend
    // Example:
    // try {
    //   const response = await fetch('/api/generate', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //       'Authorization': `Bearer ${yourTokenHere}` // If using JWT auth
    //     },
    //     body: JSON.stringify({
    //       background: selectedBackground,
    //       prompt: prompt
    //     })
    //   })
    //   const data = await response.json()
    //   console.log('Video generated:', data)
    // } catch (error) {
    //   console.error('Error generating video:', error)
    // }

    // Simulate API call
    setTimeout(() => {
      console.log('Generating video with:', { selectedBackground, prompt })
      setIsGenerating(false)
      alert('Video generation started! (This is a placeholder)')
    }, 2000)
  }

  return (
    <div className="relative min-h-dvh w-full overflow-hidden bg-[#0b0b0c] flex items-center justify-center p-6 md:p-10">
      {/* subtle grid background */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(#1a1a1a_1px,transparent_1px),linear-gradient(90deg,#1a1a1a_1px,transparent_1px)] bg-[size:32px_32px] opacity-25"></div>
      {/* soft radial vignette */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.06),transparent_60%)]"></div>
      <div className="relative w-full max-w-[1200px]">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="rounded-3xl bg-zinc-900/60 backdrop-blur-xl shadow-2xl border border-zinc-700/40 p-8 md:p-12"
        >
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-center mb-12"
          >
            <h1 className="font-black text-white mb-4 text-[clamp(2rem,6vw,4.5rem)] tracking-tight">
              BrainRot Generator
            </h1>
            <p className="text-[clamp(0.95rem,1.4vw,1.25rem)] text-zinc-300 font-light">
              Create viral content with AI-powered video generation
            </p>
          </motion.div>

          {/* Background Selection - Large Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="mb-12"
          >
            <h2 className="text-3xl font-bold text-zinc-100 mb-6 text-center">
              Choose Your Background
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {backgrounds.map((bg, index) => (
                <motion.div
                  key={bg.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1, duration: 0.5 }}
                  whileHover={{ scale: 1.05, y: -8 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedBackground(bg.id)}
                  className={`relative cursor-pointer rounded-2xl p-8 transition-all duration-300 ${
                    selectedBackground === bg.id
                      ? 'bg-zinc-800/80 ring-4 ring-cyan-400/40 shadow-xl shadow-cyan-500/20'
                      : 'bg-zinc-800/50 hover:bg-zinc-800/70 border border-zinc-700/50'
                  }`}
                >
                  <div className="text-center">
                    <div className="text-8xl mb-4">{bg.emoji}</div>
                    <h3 className="text-2xl font-bold text-zinc-100 mb-2">{bg.name}</h3>
                    {selectedBackground === bg.id && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="mt-3"
                      >
                        <span className="inline-block bg-zinc-900/60 border border-cyan-400/30 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold text-cyan-200">
                          ✓ Selected
                        </span>
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Prompt Input - Stylish Textbox */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            className="mb-10"
          >
            <h2 className="text-3xl font-bold text-zinc-100 mb-6 text-center">
              What's Your Vision?
            </h2>
            <div className="relative">
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe your content idea here...&#10;&#10;Example: 'Explain how quantum physics works but make it Gen Z slang' or 'Tell the history of Rome like it's tea ☕'"
                rows="6"
                className="w-full px-8 py-6 text-xl text-zinc-100 placeholder-zinc-400 bg-zinc-900/60 border border-zinc-700/50 rounded-2xl focus:outline-none focus:ring-4 focus:ring-cyan-500/30 focus:border-cyan-400/70 backdrop-blur-sm transition-all duration-300 resize-none"
              />
              <div className="absolute bottom-4 right-4 text-gray-400 text-sm">
                {prompt.length} characters
              </div>
            </div>
          </motion.div>

          {/* Generate Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.5 }}
          >
            <motion.button
              onClick={handleGenerate}
              disabled={isGenerating || !selectedBackground || !prompt.trim()}
              whileHover={{ scale: isGenerating ? 1 : 1.02 }}
              whileTap={{ scale: isGenerating ? 1 : 0.98 }}
              className={`w-full py-6 px-8 rounded-2xl text-2xl font-bold transition-all duration-300 ${
                isGenerating || !selectedBackground || !prompt.trim()
                  ? 'bg-zinc-600 cursor-not-allowed opacity-50'
                  : 'bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 shadow-xl hover:shadow-2xl shadow-cyan-500/30'
              } text-white`}
            >
              <AnimatePresence mode="wait">
                {isGenerating ? (
                  <motion.span
                    key="generating"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center justify-center gap-3"
                  >
                    <svg className="animate-spin h-8 w-8" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Generating Your BrainRot...
                  </motion.span>
                ) : (
                  <motion.span
                    key="ready"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    🚀 Generate BrainRot Video
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          </motion.div>

          {/* Info Banner */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.5 }}
            className="mt-8 p-6 bg-gradient-to-r from-zinc-700/20 to-zinc-800/20 border border-zinc-600/30 rounded-xl backdrop-blur-sm"
          >
            <div className="flex items-start gap-4">
              <span className="text-3xl">💡</span>
              <div>
                <p className="text-zinc-300 text-lg leading-relaxed">
                  <strong className="text-zinc-200">Pro Tip:</strong> Be creative with your prompts! The AI works best with clear, entertaining ideas. 
                  Backend integration pending - check <code className="bg-black/30 px-2 py-1 rounded text-zinc-200 font-mono text-sm">INTEGRATION.md</code> for setup.
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

export default ChatInterface
