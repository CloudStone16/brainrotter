import { useState } from 'react'
import './App.css'

// Generate floating emojis once at module load time
const randomEmojis = ['🧠', '💀', '🔥', '💯', '🤯', '😵‍💫', '🎮', '📱', '🚽', '👾']
const floatingEmojis = Array(15).fill(0).map(() => ({
  emoji: randomEmojis[Math.floor(Math.random() * randomEmojis.length)],
  left: Math.random() * 100,
  delay: Math.random() * 5,
  duration: 10 + Math.random() * 10
}))

function App() {
  const [isLogin, setIsLogin] = useState(true)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [isVibrating, setIsVibrating] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsVibrating(true)
    setTimeout(() => setIsVibrating(false), 500)
    
    if (isLogin) {
      console.log('Login attempt:', { username, password })
      alert('💀 LOGGING IN TO THE BRAINROT ZONE 💀')
    } else {
      console.log('Signup attempt:', { username, email, password })
      alert('🧠 WELCOME TO THE ROT FAM 🧠')
    }
  }

  return (
    <div className="brainrot-container">
      {/* Floating background emojis */}
      {floatingEmojis.map((item, i) => (
        <div
          key={i}
          className="floating-emoji"
          style={{
            left: `${item.left}%`,
            animationDelay: `${item.delay}s`,
            animationDuration: `${item.duration}s`
          }}
        >
          {item.emoji}
        </div>
      ))}

      <div className={`auth-card ${isVibrating ? 'vibrate' : ''}`}>
        <div className="glitch-wrapper">
          <h1 className="glitch-text" data-text="BRAINROTTER">
            BRAINROTTER
          </h1>
        </div>
        
        <p className="tagline">
          {isLogin ? '🧠 rot your brain fr fr 💀' : '🔥 join the rot revolution 🔥'}
        </p>

        <div className="tab-switcher">
          <button
            className={`tab-btn ${isLogin ? 'active' : ''}`}
            onClick={() => setIsLogin(true)}
          >
            LOGIN 💀
          </button>
          <button
            className={`tab-btn ${!isLogin ? 'active' : ''}`}
            onClick={() => setIsLogin(false)}
          >
            SIGN UP 🧠
          </button>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="input-group">
            <label>👤 USERNAME (no cap)</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="ur username bestie"
              required
              className="brainrot-input"
            />
          </div>

          {!isLogin && (
            <div className="input-group">
              <label>📧 EMAIL (fr this time)</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ur email fr fr"
                required
                className="brainrot-input"
              />
            </div>
          )}

          <div className="input-group">
            <label>🔒 PASSWORD (make it bussin)</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="super secret fr"
              required
              className="brainrot-input"
            />
          </div>

          <button type="submit" className="submit-btn">
            {isLogin ? '🚀 ENTER THE ZONE 🚀' : '✨ JOIN THE ROT ✨'}
          </button>
        </form>

        <div className="footer-text">
          <p>💀 warning: may cause severe brainrot 💀</p>
          <p className="meme-text">
            {isLogin 
              ? "don't have an account? that's kinda mid ngl" 
              : "already rotted? click login above bestie"}
          </p>
        </div>
      </div>

      {/* Scrolling text banner */}
      <div className="scroll-banner">
        <div className="scroll-text">
          💀 BRAINROT 🧠 NO CAP 🔥 FR FR 💯 BUSSIN 😵‍💫 SHEESH 🚽 SKIBIDI 👾 RIZZ 💀 BRAINROT 🧠 NO CAP 🔥 FR FR 💯 BUSSIN 😵‍💫 SHEESH 🚽 SKIBIDI 👾 RIZZ 💀
        </div>
      </div>
    </div>
  )
}

export default App
