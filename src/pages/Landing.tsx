/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import { LuSun, LuMoon, LuLinkedin, LuGithub, LuMapPin } from "react-icons/lu";
import ProjectsPane from "../components/ProjectsPane";
import EducationPane from "../components/EducationPane";
import ExperiencePane from "../components/ExperiencePane";
import TechStackFooter from "../components/TechStackFooter";
import { InnerPane } from "../components/InnerPane";
import { aboutData } from "../components/AboutInnerData";

/* ── Ripple + magnetic corner effect on hover ── */
const ClickableBox: React.FC<{
  label: string;
  onClick: () => void;
  className?: string;
  style?: React.CSSProperties;
  animationDelay?: string;
}> = ({ label, onClick, className = "", style, animationDelay = "0s" }) => {
  const boxRef = React.useRef<HTMLDivElement>(null);
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([]);
  const [corner, setCorner] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const counterRef = React.useRef(0);
  const handleMouseEnter = () => setHovered(true);
  const handleMouseLeave = () => {
    setHovered(false);
    setCorner({ x: 0, y: 0 });
  };
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!boxRef.current) return;
    const rect = boxRef.current.getBoundingClientRect();
    const cx = e.clientX - rect.left;
    const cy = e.clientY - rect.top;
    const dx = (cx / rect.width - 1) * 10;
    const dy = (cy / rect.height - 1) * 10;
    setCorner({ x: dx, y: dy });
  };
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!boxRef.current) return;
    const rect = boxRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = counterRef.current++;
    setRipples((prev) => [...prev, { id, x, y }]);
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== id));
    }, 700);
    onClick();
  };

  return (
    <div
      ref={boxRef}
      className={`box clickable ${className}`}
      style={{ ...style, animationDelay }}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
    >
      <span className="box-label">{label}</span>
      {ripples.map((r) => (
        <span key={r.id} className="box-ripple" style={{ left: r.x, top: r.y }} />
      ))}
      <span
        className={`box-arrow ${hovered ? "box-arrow--visible" : ""}`}
        style={{
          transform: hovered
            ? `translate(${corner.x}px, ${corner.y}px) rotate(0deg) scale(1)`
            : `translate(6px, 6px) rotate(-55deg) scale(0.5)`,
        }}
      >
        <svg width="clamp(14px, 1.6vw, 22px)" height="clamp(14px, 1.6vw, 22px)" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <line x1="5" y1="19" x2="19" y2="5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <polyline points="8,5 19,5 19,16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    </div>
  );
};

/* ─────────────────────────────────────────────────────── */

const Landing: React.FC = () => {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [isProjectsOpen, setIsProjectsOpen] = useState(false);
  const [isEducationOpen, setIsEducationOpen] = useState(false);
  const [isExperienceOpen, setIsExperienceOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);

  useEffect(() => {
    // Tiny delay so CSS transition kicks in after first paint
    const t = setTimeout(() => setMounted(true), 30);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <style>{`
        :root {
          --header-h:  clamp(48px, 5.5vh, 68px);
          --footer-h:  clamp(36px, 4vh, 52px);
          --gap:       clamp(5px, 0.6vw, 9px);
          --pad:       clamp(5px, 0.6vw, 9px);
          --radius:    clamp(10px, 1vw, 16px);
          --fs-ui:     clamp(10px, 0.85vw, 13px);
          --pad-box:   clamp(12px, 1.4vw, 22px);

          /* Animation timing — every element gets a delay derived from its
             approximate (col, row) position to fake a top-left ripple wave */
          --anim-dur:   0.55s;
          --anim-ease:  cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        /* ── THEMES ── */
.dark {
  --bg:            #000000;
  --text:          #e6e6e6;
  --border:        #141414;
  --card:          #050505;
  --hover-border:  #2a2a2a;
  --ripple:        rgba(255,255,255,0.05);
  --arrow-color:   #ffffff;

  /* Dark, subtle “black glass” (not gray fog) */
  --glass-bg:        rgba(10, 10, 10, 0.28);   /* MUCH darker, less see-through */
  --glass-border:    rgba(255, 255, 255, 0.06);
  --glass-highlight: rgba(255, 255, 255, 0.05);
  --glass-blur:      clamp(6px, 1vw, 10px);    /* less blur = less milkiness */
  --glass-shadow:    0 6px 28px rgba(0,0,0,0.75),
                     0 1px 0 rgba(255,255,255,0.04) inset;
}

        .light {
          --bg:            #f0f0f0;
          --text:          #111111;
          --border:        #dcdcdc;
          --card:          #ffffff;
          --hover-border:  #aaaaaa;
          --ripple:        rgba(0,0,0,0.06);
          --arrow-color:   #111111;

          /* Apple-grade glass */
          --glass-bg:        rgba(255, 255, 255, 0.55);
          --glass-border:    rgba(255, 255, 255, 0.85);
          --glass-highlight: rgba(255, 255, 255, 0.95);
          --glass-blur:      clamp(10px, 1.5vw, 20px);
          --glass-shadow:    0 4px 20px rgba(0,0,0,0.10), 0 1px 0px rgba(255,255,255,0.9) inset;
        }

        * { box-sizing: border-box; margin: 0; padding: 0; }
        html, body { font-family: 'Open Sauce Sans', sans-serif; }

        /* ── PAGE ── */
        .page {
          width: 100vw;
          height: 100vh;
          display: flex;
          flex-direction: column;
          background: var(--bg);
          color: var(--text);
          position: relative;
          overflow: hidden;
        }

        /* ── GRAIN LAYER — rendered as canvas-like SVG, always moving ── */
        .grain-layer {
          position: fixed;
          inset: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 1;
          opacity: 0.045;
          mix-blend-mode: screen;
          animation: grain-drift 0.12s steps(1) infinite;
          /* Using a data URI that generates actual noise via feTurbulence */
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='turbulence' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)'/%3E%3C/svg%3E");
          background-size: 200px 200px;
        }

        .dark .grain-layer {
          mix-blend-mode: screen;
          opacity: 0.07;
        }

        .light .grain-layer {
          mix-blend-mode: multiply;
          opacity: 0.06;
        }

        @keyframes grain-drift {
          0%   { background-position:   0%   0%; }
          10%  { background-position: -5%  -10%; }
          20%  { background-position: -15%  5%; }
          30%  { background-position:  7% -25%; }
          40%  { background-position: -5%  25%; }
          50%  { background-position: -15%  10%; }
          60%  { background-position:  15%   0%; }
          70%  { background-position:  0%  15%; }
          80%  { background-position:  3%   35%; }
          90%  { background-position: -10%  10%; }
          100% { background-position:   0%   0%; }
        }

        /* ── All non-grain content sits above the grain ── */
        .page > *:not(.grain-layer) {
          position: relative;
          z-index: 2;
        }

        /* ─────────────────────────────────────────
           APPLE GLASSMORPHISM BOX
           Three-layer trick:
             1. Frosted glass fill (backdrop-filter + semi-transparent bg)
             2. Top-edge highlight (thin inset gradient simulating specular)
             3. Outer shadow for depth + lift
        ───────────────────────────────────────── */
        .box {
          background: var(--glass-bg);
          backdrop-filter: blur(var(--glass-blur));
          -webkit-backdrop-filter: blur(var(--glass-blur));
          border: 1px solid var(--glass-border);
          border-radius: var(--radius);
          padding: var(--pad-box);
          display: flex;
          flex-direction: column;
          position: relative;
          overflow: hidden;
          transition: border-color 0.25s ease, box-shadow 0.25s ease, background 0.25s ease;
          box-shadow: var(--glass-shadow);
          /* Animated entry — default; overridden per-element below */
          animation: box-enter var(--anim-dur) var(--anim-ease) backwards;
        }

        /* Top-edge specular highlight (the Apple magic) */
        .box::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: var(--radius);
          background: linear-gradient(
            160deg,
            var(--glass-highlight) 0%,
            transparent 40%
          );
          pointer-events: none;
          z-index: 0;
        }

        .box > * {
          position: relative;
          z-index: 1;
        }

        /* ─────────────────────────────────────────
           STAGGERED ENTRY ANIMATION
           We simulate a top-left ripple wave by
           assigning longer delays to elements that
           are further right / further down.
           delay = col_weight * 0.07s + row_weight * 0.07s
        ───────────────────────────────────────── */
        @keyframes box-enter {
          0% {
            opacity: 0;
            transform: translateY(clamp(16px, 2.5vh, 36px)) scale(0.97);
            filter: blur(4px);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
            filter: blur(0px);
          }
        }

        @keyframes fade-up {
          0% {
            opacity: 0;
            transform: translateY(clamp(10px, 1.5vh, 20px));
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Box label */
        .box-label {
          font-size: var(--fs-ui);
          opacity: 0.3;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          position: relative;
          z-index: 1;
        }

        /* ── CLICKABLE HOVER ── */
        .box.clickable { cursor: pointer; }

        .box.clickable:hover {
          border-color: var(--hover-border);
          box-shadow: var(--glass-shadow), 0 0 clamp(12px, 2vw, 28px) rgba(255,255,255,0.04);
        }

        .dark .box.clickable:hover {
          background: rgba(255,255,255,0.07);
        }

        .light .box.clickable:hover {
          background: rgba(255,255,255,0.72);
        }

        /* corner reveal gradient */
        .box.clickable::after {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: var(--radius);
          opacity: 0;
          transition: opacity 0.3s ease;
          pointer-events: none;
          z-index: 0;
        }
        .dark .box.clickable::after {
          background: radial-gradient(ellipse at 100% 100%, rgba(255,255,255,0.08) 0%, transparent 65%);
        }
        .dark .box.clickable:hover::after { opacity: 1; }
        .light .box.clickable::after {
          background: radial-gradient(ellipse at 100% 100%, rgba(0,0,0,0.04) 0%, transparent 65%);
        }
        .light .box.clickable:hover::after { opacity: 1; }

        /* ── RIPPLE ── */
        .box-ripple {
          position: absolute;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--ripple);
          transform: translate(-50%, -50%) scale(0);
          animation: ripple-expand 0.65s cubic-bezier(0.22,1,0.36,1) forwards;
          pointer-events: none;
          z-index: 0;
        }
        @keyframes ripple-expand {
          to { transform: translate(-50%, -50%) scale(60); opacity: 0; }
        }

        /* ── ARROW ── */
        .box-arrow {
          position: absolute;
          bottom: clamp(8px, 1.1vw, 16px);
          right: clamp(8px, 1.1vw, 16px);
          color: var(--arrow-color);
          opacity: 0;
          transition: opacity 0.28s ease, transform 0.45s cubic-bezier(0.34, 1.56, 0.64, 1);
          pointer-events: none;
          z-index: 2;
          display: flex;
          align-items: center;
          justify-content: center;
          width: clamp(14px, 1.6vw, 22px);
          height: clamp(14px, 1.6vw, 22px);
        }
        .box-arrow svg { width: 100%; height: 100%; }
        .box-arrow--visible { opacity: 0.55; }

        /* ── LAYOUT ── */
        .bento-area {
          flex: 1;
          padding: var(--pad);
          display: grid;
          grid-template-columns: 22% 1fr;
          gap: var(--gap);
          min-height: 0;
        }

        .left-col {
          display: flex;
          flex-direction: column;
          gap: var(--gap);
        }

        .about-box { flex: 1; }

        .right-grid {
          display: flex;
          flex-direction: column;
          gap: var(--gap);
          height: 100%;
        }

        .top-row {
          display: grid;
          grid-template-columns: 30% 70%;
          gap: var(--gap);
          flex: 1;
        }

        .bottom-row {
          display: grid;
          grid-template-columns: 70% 30%;
          gap: var(--gap);
          flex: 1;
        }

        /* ── LINKS COLUMN ── */
        .links-container {
          display: flex;
          flex-direction: column;
          gap: var(--gap);
          height: 100%;
        }

        .custom-links {
          display: flex;
          flex-direction: column;
          gap: var(--gap);
          width: 100%;
          height: 100%;
        }

        /* Glass-style shared for non-.box interactive elements */
        .glass-elem {
          background: var(--glass-bg);
          backdrop-filter: blur(var(--glass-blur));
          -webkit-backdrop-filter: blur(var(--glass-blur));
          border: 1px solid var(--glass-border);
          border-radius: var(--radius);
          box-shadow: var(--glass-shadow);
          position: relative;
          overflow: hidden;
          transition: border-color 0.22s, background 0.22s, box-shadow 0.22s, color 0.22s;
        }

        /* Top-edge highlight for glass-elem too */
        .glass-elem::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: var(--radius);
          background: linear-gradient(
            160deg,
            var(--glass-highlight) 0%,
            transparent 40%
          );
          pointer-events: none;
          z-index: 0;
        }

        .glass-elem > * {
          position: relative;
          z-index: 1;
        }

        .about-image-box {
          position: relative;
          overflow: hidden;
        }

        .about-image-box::after {
          content: '';
          position: absolute;
          inset: 0;

          background: rgba(0,0,0,0.55);
          backdrop-filter: blur(6px);
          -webkit-backdrop-filter: blur(6px);

          transition: background 0.3s ease, backdrop-filter 0.3s ease;
          z-index: 0;
        }

        .about-image-box img {
          display: none;
        }

        /* grayscale image */
        .about-image-box {
          filter: grayscale(100%) contrast(1.05);
          transition: filter 0.35s ease, transform 0.35s ease;
        }

        /* hover → color */
        .about-image-box:hover {
          filter: grayscale(0%) contrast(1.05);
          transform: scale(1.02);
        }

        .about-image-box:hover::after {
          background: rgba(0,0,0,0.35);
        }

        /* make label readable */
        .about-image-box .box-label {
          z-index: 2;
        }
        .resume-box {
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          text-decoration: none;
          color: var(--text);
          height: 40%;
          flex-shrink: 0;
          font-weight: 500;
          font-size: var(--fs-ui);
          letter-spacing: 0.04em;
        }

        .resume-box:hover {
          background: var(--text) !important;
          color: var(--bg);
          border-color: var(--text) !important;
          box-shadow: none !important;
        }

        .resume-box:hover::before {
          display: none;
        }

        .links-grid {
          display: grid;
          grid-template-columns: 1fr 2fr 1fr;
          grid-template-rows: 1fr 1fr;
          gap: var(--gap);
          flex: 1;
          min-height: 0;
        }

        .links-grid > .link-item:nth-child(1) { grid-column: 1;     grid-row: 1; }
        .links-grid > .link-item:nth-child(2) { grid-column: 2 / 4; grid-row: 1; }
        .links-grid > .link-item:nth-child(3) { grid-column: 1 / 3; grid-row: 2; }
        .links-grid > .link-item:nth-child(4) { grid-column: 3;     grid-row: 2; }

        .link-item {
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          color: var(--text);
          text-decoration: none;
          min-height: 0;
          font-size: clamp(16px, 2vw, 24px);
        }

        .link-item:hover {
          background: var(--text) !important;
          color: var(--bg);
          border-color: var(--text) !important;
          box-shadow: none !important;
        }

        .link-item:hover::before {
          display: none;
        }

        .theme-switcher {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: clamp(3px, 0.5vw, 8px);
          background: transparent;
          border: none;
          height: 100%;
          width: 100%;
        }

        .theme-btn {
          background: transparent;
          border: none;
          cursor: pointer;
          padding: clamp(4px, 0.8vw, 8px);
          color: var(--text);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: opacity 0.2s;
          flex: 1;
          font-size: clamp(14px, 2vw, 20px);
        }
        .theme-btn:hover { opacity: 0.6; }
        .theme-btn.active { opacity: 1; }

        .link-item:hover .theme-btn {
          color: var(--bg);
        }

        /* Location pill in the theme-switcher area */
        .location-pill {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: clamp(3px, 0.4vw, 6px);
          font-size: var(--fs-ui);
          opacity: 0.55;
          letter-spacing: 0.03em;
        }

        /* ────────────────────────────────────────
           STAGGER DELAYS — ripple from top-left
           Grid positions (approximate):
             About (col0, row0-1)    → 0.00s
             Contact (col0, row1)    → 0.07s
             Education (col1, row0)  → 0.10s
             Experience (col1-2,r0)  → 0.17s
             Projects (col1, row1)   → 0.21s
             Links area:
               resume                → 0.26s
               link[0] linkedin      → 0.28s
               link[1] theme         → 0.30s
               link[2] location      → 0.32s
               link[3] github        → 0.34s
        ─────────────────────────────────────── */

        /* These are applied via inline animationDelay on .box,
           or as animation on .glass-elem wrappers */

        .anim-about     { animation: box-enter var(--anim-dur) var(--anim-ease) 0.00s backwards; }
        .anim-contact   { animation: box-enter var(--anim-dur) var(--anim-ease) 0.07s backwards; }
        .anim-education { animation: box-enter var(--anim-dur) var(--anim-ease) 0.10s backwards; }
        .anim-exp       { animation: box-enter var(--anim-dur) var(--anim-ease) 0.17s backwards; }
        .anim-projects  { animation: box-enter var(--anim-dur) var(--anim-ease) 0.21s backwards; }
        .anim-resume    { animation: box-enter var(--anim-dur) var(--anim-ease) 0.26s backwards; }
        .anim-li0       { animation: box-enter var(--anim-dur) var(--anim-ease) 0.28s backwards; }
        .anim-li1       { animation: box-enter var(--anim-dur) var(--anim-ease) 0.30s backwards; }
        .anim-li2       { animation: box-enter var(--anim-dur) var(--anim-ease) 0.32s backwards; }
        .anim-li3       { animation: box-enter var(--anim-dur) var(--anim-ease) 0.34s backwards; }
      `}</style>

      <div className={`${theme} page`}>

        {/* ── GRAIN ── */}
        <div className="grain-layer" aria-hidden="true" />

        <Header theme={theme} setTheme={setTheme} />

        <div className="bento-area">

          {/* LEFT */}
          <div className="left-col">
              <ClickableBox
                label="About"
                onClick={() => setAboutOpen(true)}
                className="about-box about-image-box anim-about"
                style={{
                  backgroundImage: `url(${aboutData.image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />
            <div className="box anim-contact">
              <span className="box-label">Contact</span>
            </div>
          </div>

          {/* RIGHT */}
          <div className="right-grid">

            {/* TOP ROW */}
            <div className="top-row">
              <ClickableBox
                label="Education"
                onClick={() => setIsEducationOpen(true)}
                animationDelay="0.10s"
              />
              <ClickableBox
                label="Experience"
                onClick={() => setIsExperienceOpen(true)}
                animationDelay="0.17s"
              />
            </div>

            {/* BOTTOM ROW */}
            <div className="bottom-row">
              <ClickableBox
                label="Projects"
                onClick={() => setIsProjectsOpen(true)}
                animationDelay="0.21s"
              />

              {/* Links */}
              <div className="links-container">
                <div className="custom-links">

                  <a
                    href="/resume.pdf"
                    className="glass-elem resume-box anim-resume"
                  >
                    Download Resume
                  </a>

                  <div className="links-grid" style={{ flex: 1 }}>

                    {/* LinkedIn */}
                    <a
                      href="https://linkedin.com/in/pranjwal-singh-01979b242/"
                      className="glass-elem link-item anim-li0"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <LuLinkedin />
                    </a>

                    {/* Theme switcher */}
                    <div className="glass-elem link-item anim-li1" style={{ cursor: "default" }}>
                      <div className="theme-switcher">
                        <button
                          onClick={() => setTheme("light")}
                          className={`theme-btn ${theme === "light" ? "active" : ""}`}
                        >
                          <LuSun />
                        </button>
                        <button
                          onClick={() => setTheme("dark")}
                          className={`theme-btn ${theme === "dark" ? "active" : ""}`}
                        >
                          <LuMoon />
                        </button>
                      </div>
                    </div>

                    {/* Location — replaces the redundant "+" Projects button */}
                    <div
                      className="glass-elem link-item anim-li2"
                      style={{ cursor: "default", gap: "clamp(3px,0.4vw,6px)", flexDirection: "column", fontSize: "var(--fs-ui)" }}
                    >
                      <div className="location-pill">
                        <LuMapPin style={{ fontSize: "clamp(11px, 1.1vw, 15px)", flexShrink: 0 }} />
                        <span>Montreal, QC, Canada</span>
                      </div>
                    </div>

                    {/* GitHub */}
                    <a
                      href="https://github.com/Pranjwals"
                      className="glass-elem link-item anim-li3"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <LuGithub />
                    </a>

                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

        <TechStackFooter />

        {/* Panes */}
        <ProjectsPane
          isOpen={isProjectsOpen}
          onClose={() => setIsProjectsOpen(false)}
          theme={theme}
        />
        <EducationPane
          isOpen={isEducationOpen}
          onClose={() => setIsEducationOpen(false)}
          theme={theme}
        />
        <ExperiencePane
          isOpen={isExperienceOpen}
          onClose={() => setIsExperienceOpen(false)}
          theme={theme}
        />
        <InnerPane
          data={aboutOpen ? aboutData : null}
          onClose={() => setAboutOpen(false)}
          theme={theme}
        />
      </div>
    </>
  );
};

export default Landing;