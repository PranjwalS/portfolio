/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import Header from "../components/Header";
import ProjectsPane from "../components/ProjectsPane";
import EducationPane from "../components/EducationPane";
import ExperiencePane from "../components/ExperiencePane";
import TechStackFooter from "../components/TechStackFooter";
import { InnerPane } from "../components/InnerPane";
import { aboutData } from "../components/AboutInnerData";
import LinksPanel from "../components/LinksPanel";

/* ── Ripple + magnetic corner arrow ── */
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

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!boxRef.current) return;
    const rect = boxRef.current.getBoundingClientRect();
    setCorner({
      x: ((e.clientX - rect.left) / rect.width  - 1) * 10,
      y: ((e.clientY - rect.top)  / rect.height - 1) * 10,
    });
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!boxRef.current) return;
    const rect = boxRef.current.getBoundingClientRect();
    const id = counterRef.current++;
    setRipples(prev => [...prev, { id, x: e.clientX - rect.left, y: e.clientY - rect.top }]);
    setTimeout(() => setRipples(prev => prev.filter(r => r.id !== id)), 700);
    onClick();
  };

  return (
    <div
      ref={boxRef}
      className={`box clickable ${className}`}
      style={{ ...style, animationDelay }}
      onClick={handleClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setCorner({ x: 0, y: 0 }); }}
      onMouseMove={handleMouseMove}
    >
      <span className="box-label">{label}</span>
      {ripples.map(r => (
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
        <svg width="clamp(14px, 1.6vw, 22px)" height="clamp(14px, 1.6vw, 22px)" viewBox="0 0 24 24" fill="none">
          <line x1="5" y1="19" x2="19" y2="5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <polyline points="8,5 19,5 19,16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    </div>
  );
};

/* ───────────────────────────────────── */

const Landing: React.FC = () => {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [isProjectsOpen,   setIsProjectsOpen]   = useState(false);
  const [isEducationOpen,  setIsEducationOpen]   = useState(false);
  const [isExperienceOpen, setIsExperienceOpen]  = useState(false);
  const [aboutOpen,        setAboutOpen]         = useState(false);

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
          --anim-dur:  0.55s;
          --anim-ease: cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .dark {
          --bg:              #000000;
          --text:            #e6e6e6;
          --border:          #141414;
          --card:            #050505;
          --hover-border:    #2a2a2a;
          --ripple:          rgba(255,255,255,0.05);
          --arrow-color:     #ffffff;
          --glass-bg:        rgba(10,10,10,0.28);
          --glass-border:    rgba(255,255,255,0.06);
          --glass-highlight: rgba(255,255,255,0.05);
          --glass-blur:      clamp(6px,1vw,10px);
          --glass-shadow:    0 6px 28px rgba(0,0,0,0.75), 0 1px 0 rgba(255,255,255,0.04) inset;
        }

        .light {
          --bg:              #f0f0f0;
          --text:            #111111;
          --border:          #dcdcdc;
          --card:            #ffffff;
          --hover-border:    #aaaaaa;
          --ripple:          rgba(0,0,0,0.06);
          --arrow-color:     #111111;
          --glass-bg:        rgba(255,255,255,0.55);
          --glass-border:    rgba(255,255,255,0.85);
          --glass-highlight: rgba(255,255,255,0.95);
          --glass-blur:      clamp(10px,1.5vw,20px);
          --glass-shadow:    0 4px 20px rgba(0,0,0,0.10), 0 1px 0px rgba(255,255,255,0.9) inset;
        }

        * { box-sizing: border-box; margin: 0; padding: 0; }
        html, body { font-family: 'Open Sauce Sans', sans-serif; }

        .page {
          width: 100vw; height: 100vh;
          display: flex; flex-direction: column;
          background: var(--bg); color: var(--text);
          position: relative; overflow: hidden;
        }

        .grain-layer {
          position: fixed; inset: 0;
          pointer-events: none; z-index: 1;
          animation: grain-drift 0.12s steps(1) infinite;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='turbulence' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)'/%3E%3C/svg%3E");
          background-size: 200px 200px;
        }
        .dark  .grain-layer { mix-blend-mode: screen;   opacity: 0.07; }
        .light .grain-layer { mix-blend-mode: multiply; opacity: 0.06; }

        @keyframes grain-drift {
          0%   { background-position:   0%   0%; }
          10%  { background-position:  -5% -10%; }
          20%  { background-position: -15%   5%; }
          30%  { background-position:   7% -25%; }
          40%  { background-position:  -5%  25%; }
          50%  { background-position: -15%  10%; }
          60%  { background-position:  15%   0%; }
          70%  { background-position:   0%  15%; }
          80%  { background-position:   3%  35%; }
          90%  { background-position: -10%  10%; }
          100% { background-position:   0%   0%; }
        }

        .page > *:not(.grain-layer) { position: relative; z-index: 2; }

        .box {
          background: var(--glass-bg);
          backdrop-filter: blur(var(--glass-blur));
          -webkit-backdrop-filter: blur(var(--glass-blur));
          border: 1px solid var(--glass-border);
          border-radius: var(--radius);
          padding: var(--pad-box);
          display: flex; flex-direction: column;
          position: relative; overflow: hidden;
          transition: border-color 0.25s, box-shadow 0.25s, background 0.25s;
          box-shadow: var(--glass-shadow);
          animation: box-enter var(--anim-dur) var(--anim-ease) backwards;
        }
        .box::before {
          content: ''; position: absolute; inset: 0;
          border-radius: var(--radius);
          background: linear-gradient(160deg, var(--glass-highlight) 0%, transparent 40%);
          pointer-events: none; z-index: 0;
        }
        .box > * { position: relative; z-index: 1; }

        @keyframes box-enter {
          0%   { opacity: 0; transform: translateY(clamp(16px,2.5vh,36px)) scale(0.97); filter: blur(4px); }
          100% { opacity: 1; transform: translateY(0) scale(1); filter: blur(0); }
        }

        .box-label {
          font-size: var(--fs-ui); opacity: 0.3;
          text-transform: uppercase; letter-spacing: 0.1em;
        }

        .box.clickable { cursor: pointer; }
        .box.clickable:hover {
          border-color: var(--hover-border);
          box-shadow: var(--glass-shadow), 0 0 clamp(12px,2vw,28px) rgba(255,255,255,0.04);
        }
        .dark  .box.clickable:hover { background: rgba(255,255,255,0.07); }
        .light .box.clickable:hover { background: rgba(255,255,255,0.72); }

        .box.clickable::after {
          content: ''; position: absolute; inset: 0;
          border-radius: var(--radius); opacity: 0;
          transition: opacity 0.3s; pointer-events: none; z-index: 0;
        }
        .dark  .box.clickable::after        { background: radial-gradient(ellipse at 100% 100%, rgba(255,255,255,0.08) 0%, transparent 65%); }
        .dark  .box.clickable:hover::after  { opacity: 1; }
        .light .box.clickable::after        { background: radial-gradient(ellipse at 100% 100%, rgba(0,0,0,0.04) 0%, transparent 65%); }
        .light .box.clickable:hover::after  { opacity: 1; }

        .box-ripple {
          position: absolute; width: 8px; height: 8px; border-radius: 50%;
          background: var(--ripple);
          transform: translate(-50%, -50%) scale(0);
          animation: ripple-expand 0.65s cubic-bezier(0.22,1,0.36,1) forwards;
          pointer-events: none; z-index: 0;
        }
        @keyframes ripple-expand {
          to { transform: translate(-50%, -50%) scale(60); opacity: 0; }
        }

        .box-arrow {
          position: absolute;
          bottom: clamp(8px,1.1vw,16px); right: clamp(8px,1.1vw,16px);
          color: var(--arrow-color); opacity: 0;
          transition: opacity 0.28s, transform 0.45s cubic-bezier(0.34,1.56,0.64,1);
          pointer-events: none; z-index: 2;
          display: flex; align-items: center; justify-content: center;
          width: clamp(14px,1.6vw,22px); height: clamp(14px,1.6vw,22px);
        }
        .box-arrow svg { width: 100%; height: 100%; }
        .box-arrow--visible { opacity: 0.55; }

        .bento-area {
          flex: 1; padding: var(--pad);
          display: grid; grid-template-columns: 22% 1fr;
          gap: var(--gap); min-height: 0;
        }
        .left-col   { display: flex; flex-direction: column; gap: var(--gap); }
        .about-box  { flex: 1; }
        .right-grid { display: flex; flex-direction: column; gap: var(--gap); height: 100%; }
        .top-row    { display: grid; grid-template-columns: 30% 70%; gap: var(--gap); flex: 1; }
        .bottom-row { display: grid; grid-template-columns: 70% 30%; gap: var(--gap); flex: 1; }

        .about-image-box {
          filter: grayscale(100%) contrast(1.05);
          transition: filter 0.35s, transform 0.35s;
        }
        .about-image-box:hover { filter: grayscale(0%) contrast(1.05); transform: scale(1.02); }
        .about-image-box::after {
          content: ''; position: absolute; inset: 0;
          background: rgba(0,0,0,0.55); transition: background 0.3s; z-index: 0;
        }
        .about-image-box:hover::after { background: rgba(0,0,0,0.35); }
        .about-image-box .box-label { z-index: 2; }
        .about-image-box img { display: none; }

        .anim-about     { animation-delay: 0.00s; }
        .anim-contact   { animation-delay: 0.07s; }
        .anim-education { animation-delay: 0.10s; }
        .anim-exp       { animation-delay: 0.17s; }
        .anim-projects  { animation-delay: 0.21s; }
      `}</style>

      <div className={`${theme} page`}>
        <div className="grain-layer" aria-hidden="true" />

        <Header theme={theme} setTheme={setTheme} />

        <div className="bento-area">
          <div className="left-col">
            <ClickableBox
              label="About"
              onClick={() => setAboutOpen(true)}
              className="about-box about-image-box anim-about"
              style={{ backgroundImage: `url("/assets/me.png")`, backgroundSize: "cover", backgroundPosition: "center" }}
            />
{/* Contact boxes */}
<div style={{ display: "flex", gap: "var(--gap)", flex: "0 0 auto" }}>
  {[
    { label: "Phone", value: "438 773 4010", icon: (
      <svg width="clamp(11px,1vw,15px)" height="clamp(11px,1vw,15px)" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.12 1.18 2 2 0 012.11 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z"/>
      </svg>
    )},
    { label: "Email", value: "singhpranjwal\n@gmail.com", icon: (
      <svg width="clamp(11px,1vw,15px)" height="clamp(11px,1vw,15px)" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="16" rx="2"/>
        <path d="M2 7l10 7 10-7"/>
      </svg>
    )},
  ].map(({ label, value, icon }) => {
    const [copied, setCopied] = React.useState(false);
    const handleCopy = () => {
      navigator.clipboard.writeText(value.replace(/\n/g, ""));
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    };
    return (
      <div
        key={label}
        className="box anim-contact clickable"
        onClick={handleCopy}
        style={{ flex: 1, cursor: "copy", justifyContent: "center", gap: "clamp(4px,0.4vw,7px)" }}
        title={`Copy ${label.toLowerCase()}`}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "clamp(5px,0.5vw,8px)", opacity: copied ? 0 : 1, transition: "opacity 0.2s" }}>
          <span style={{ opacity: 0.4, display: "flex", alignItems: "center" }}>{icon}</span>
          <span className="box-label" style={{ textTransform: "none", letterSpacing: "0.02em", opacity: 0.55, fontSize: "clamp(9px,0.78vw,12px)" }}>
            {value}
          </span>
        </div>
        {copied && (
          <div style={{
            position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center",
            animation: "box-enter 0.3s cubic-bezier(0.34,1.56,0.64,1) forwards"
          }}>
            <svg width="clamp(14px,1.4vw,20px)" height="clamp(14px,1.4vw,20px)" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.7 }}>
              <polyline points="20 6 9 17 4 12"/>
            </svg>
          </div>
        )}
      </div>
    );
  })}
</div>
          </div>

          <div className="right-grid">
            <div className="top-row">
              <ClickableBox label="Education"  onClick={() => setIsEducationOpen(true)}  animationDelay="0.10s" />
              <ClickableBox label="Experience" onClick={() => setIsExperienceOpen(true)} animationDelay="0.17s" />
            </div>

            <div className="bottom-row">
              <ClickableBox label="Projects" onClick={() => setIsProjectsOpen(true)} animationDelay="0.21s" />
              <LinksPanel theme={theme} setTheme={setTheme} />
            </div>
          </div>
        </div>

        <TechStackFooter theme={theme}/>

        <ProjectsPane   isOpen={isProjectsOpen}   onClose={() => setIsProjectsOpen(false)}   theme={theme} />
        <EducationPane  isOpen={isEducationOpen}   onClose={() => setIsEducationOpen(false)}  theme={theme} />
        <ExperiencePane isOpen={isExperienceOpen}  onClose={() => setIsExperienceOpen(false)} theme={theme} />
        <InnerPane      data={aboutOpen ? aboutData : null} onClose={() => setAboutOpen(false)} theme={theme} />
      </div>
    </>
  );
};

export default Landing;



