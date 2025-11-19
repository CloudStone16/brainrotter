// Fixed App.tsx — no syntax errors, scroll handled with React, styles intact
import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";

export default function App() {
  const scrollRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.classList.add("scroll-show");
          }
        });
      },
      { threshold: 0.2 }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div className="app-root">
      <style>{`
        html, body, #root {
          margin: 0;
          padding: 0;
          width: 100%;
          height: 100%;
          overflow-x: hidden;
        }

        .app-root {
          width: 100vw;
          min-height: 100vh;
          max-width: 100%;
          overflow: hidden;
          position: relative;
          background: linear-gradient(135deg, #0d0d0d, #111827, #1e1b4b);
          color: white;
        }

        /* Minecraft blurred background */
        .mc-bg {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          background-image: url('/minecraft_bg.jpg');
          background-size: cover;
          background-position: center;
          opacity: 0.32;
          filter: blur(10px);
          z-index: 0;
        }

        /* Animated colorful grid */
        .grid-bg {
          position: absolute;
          inset: 0;
          display: grid;
          grid-template-columns: repeat(40, 1fr);
          grid-template-rows: repeat(22, 1fr);
          opacity: 0.14;
          z-index: 1;
        }
        .grid-cell { background: rgba(255,255,255,0.04); animation: colorPulse 6s infinite alternate ease-in-out; }
        @keyframes colorPulse {
          0% { background-color: rgba(236,72,153,0.06); }
          33% { background-color: rgba(168,85,247,0.06); }
          66% { background-color: rgba(59,130,246,0.06); }
          100% { background-color: rgba(255,255,255,0.04); }
        }

        /* Layout */
        .center-wrap { position: relative; z-index: 20; display:flex; flex-direction:column; align-items:center; justify-content:center; min-height: 80vh; text-align:center; padding: 2rem; }

        .title { font-size: clamp(3rem, 6vw, 6rem); letter-spacing: 0.45rem; font-weight: 800; margin-bottom: 0.8rem; background: linear-gradient(to bottom, rgba(255,255,255,1), rgba(255,255,255,0.85)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }

        .subtitle { font-size: 1.2rem; font-weight:500; color: rgba(255,255,255,0.97); padding: 0.9rem 1.6rem; border-radius:14px; background: rgba(147,51,234,0.28); backdrop-filter: blur(10px); border:1px solid rgba(147,51,234,0.38); box-shadow: 0 0 18px rgba(147,51,234,0.25); margin-bottom: 3.5rem; }

        .card-row { margin-top: 3rem; display:flex; gap: 2rem; justify-content:center; position:relative; z-index:25; }
        .card { background: rgba(0,0,0,0.6); border:1px solid rgba(255,255,255,0.12); padding: 1.8rem 2.2rem; width: 360px; border-radius:20px; backdrop-filter: blur(8px); box-shadow: 0 10px 30px rgba(0,0,0,0.6); transition: transform .3s ease, background .3s ease; }
        .card:hover{ transform: translateY(-6px); background: rgba(0,0,0,0.72); }
        .card-title{ font-size:1.6rem; font-weight:700; color:white; margin-bottom:0.6rem; }
        .card-sub{ color: rgba(255,255,255,0.85); }

        /* Skibidi GIFs */
        .skibidi{ position:absolute; width: 300px; animation: wiggle 4s infinite ease-in-out; z-index:10; opacity:0.65; pointer-events:none; }
        @keyframes wiggle{ 0%{transform:translate(0,0) rotate(0deg);}25%{transform:translate(20px,-20px) rotate(4deg);}50%{transform:translate(-20px,15px) rotate(-4deg);}75%{transform:translate(10px,-10px) rotate(2deg);}100%{transform:translate(0,0) rotate(0deg);} }
        .sk-left{ left:2%; top:18%; width:280px; }
        .sk-mid{ left:55%; top:40%; width:240px; }
        .sk-right{ right:2%; top:20%; width:300px; }

        /* Scroll section styling and animations */
        .scroll-section{
          padding:10rem 3rem;
          text-align:center;
          max-width:1100px;
          margin:0 auto;
          color:white;
          position:relative;
          z-index:30;
          opacity:0;
          transform:scale(0.7) translateY(160px) rotateX(35deg);
          transition:opacity 1.4s ease-out, transform 1.4s cubic-bezier(0.16,1,0.3,1);

          /* Navy blue translucent block */
          background:rgba(10,20,60,0.7);
          backdrop-filter:blur(25px);
          border-radius:28px;
          border:1px solid rgba(120,150,255,0.35);
          box-shadow:0 0 60px rgba(0,0,80,0.55);
        }
        .scroll-show{
          opacity:1;
          transform:scale(1) translateY(0) rotateX(0deg);
        }

        /* Ensure body spacing for scroll demo */
        .spacer { height: 30vh; } { height: 30vh; }
      `}</style>

      <div className="mc-bg" />
      <div className="grid-bg">{Array.from({ length: 880 }).map((_, i) => (<div key={i} className="grid-cell"/>))}</div>

      <div className="center-wrap">
        <motion.h1 className="title" initial={{ opacity:0, y:40 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.1 }}>BRAINROTTER</motion.h1>
        <motion.div className="subtitle" initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.3 }}>
          <span style={{ fontSize: '1.8rem', fontWeight: 700 }}>Automate the chaos. Breathe life into noise.</span>
          <br/><br/>
          <span style={{ fontSize: '1.1rem', fontWeight: 500 }}>From Random Thought to Viral Reel in One Click.</span>
          <br/>
          <span style={{ fontSize: '1.05rem', fontWeight: 500 }}>Tired of spending hours on edits for a 30-second video?</span>
        </motion.div>

        <motion.div className="card-row" initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.6 }}>
          <div className="card">
            <div className="card-title">Generate Clip</div>
            <div className="card-sub">Backend placeholder.</div>
          </div>
        </motion.div>
      </div>

      <img src="/skibidi1.gif" className="skibidi sk-left" />
      <img src="/skibidi2.gif" className="skibidi sk-mid" />
      <img src="/skibidi3.gif" className="skibidi sk-right" />

      {/* spacer so scrolling works */}
      <div className="spacer" />

      <section ref={scrollRef as any} className="scroll-section big-scroll-section">
        <h1 style={{ fontSize: '3.6rem', fontWeight: 900, marginBottom: '2rem', background: 'linear-gradient(to bottom, #ffffff, #cfd8ff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          Your brainrot, automated.
        </h1>

        <p style={{ fontSize: '1.25rem', lineHeight: 1.9, opacity: 0.96, maxWidth: '900px', margin: '0 auto' }}>
          Serve up pure, uncut brainrot.<br /><br />
          Stop just having the idea—instantly generate the reel.<br />
          Our AI is terminally online, turning your random thoughts, memes, and inside jokes
          into perfectly chaotic, algorithm-ready videos.<br /><br />
          Go from a blank screen to a viral masterpiece in seconds.
        </p>
      </section>

    </div>
  );
}
