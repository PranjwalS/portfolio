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
        /* ─── BASE TOKENS (desktop) ─── */
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

        /* ─── MOBILE TOKEN OVERRIDES ─── */
        /* Only targets portrait phones — max-width 500px keeps tablets untouched */
        @media (max-width: 500px) and (orientation: portrait) {
          :root {
            --gap:     5px;
            --pad:     5px;
            --radius:  10px;
            --fs-ui:   9px;
            --pad-box: 9px;
          }
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

        /* ══════════════════════════════════════════
           DESKTOP BENTO LAYOUT (unchanged)
           ══════════════════════════════════════════ */
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

        /* ══════════════════════════════════════════
           MOBILE PORTRAIT LAYOUT
           Two columns:
             col-left  (35%): about photo + contact pills stacked
             col-right (65%): education, experience, projects,
                              social/toggle strip, commit strip,
                              cv+map strip — all stacked full-width
           No scrolling — everything is flex with proportional flex values
           ══════════════════════════════════════════ */
        @media (max-width: 500px) and (orientation: portrait) {

          /* override desktop bento to 2 col mobile split */
          .bento-area {
            grid-template-columns: 35% 1fr;
            padding: var(--pad);
            gap: var(--gap);
          }

          /* LEFT col: same as desktop (about image + contact row) */
          .left-col {
            height: 100%;
            display: flex;
            flex-direction: column;
            gap: var(--gap);
          }

          /* About image takes majority of left col */
          .about-box { flex: 1 1 0; min-height: 0; }

          /* Contact row stays as a flex row, side by side within left col */
          .mob-contact-row {
            display: flex;
            flex-direction: row;
            gap: var(--gap);
            flex: 0 0 auto;
          }

          /* RIGHT col: vertical stack of all boxes */
          .mob-right-stack {
            display: flex;
            flex-direction: column;
            gap: var(--gap);
            height: 100%;
            min-height: 0;
          }

          /*
            Flex weights mirror the visual importance / desktop sizing rationale:
            - Education:   smaller strip (like desktop top-row left which was 30%)  → flex 10
            - Experience:  larger block  (desktop top-row right was 70%)             → flex 14
            - Projects:    widest desktop cell (bottom-row left 70%)                 → flex 14
            - Links strip: social icons + BB8 — thin strip                           → flex 8
            - Commit strip: medium prominence                                        → flex 13
            - CV+Map strip: bottom bar, paired                                       → flex 9
          */
          .mob-education  { flex: 10 10 0; min-height: 0; }
          .mob-experience { flex: 14 14 0; min-height: 0; }
          .mob-projects   { flex: 14 14 0; min-height: 0; }
          .mob-links-top  { flex: 8 8 0;   min-height: 0; }
          .mob-commit     { flex: 13 13 0; min-height: 0; }
          .mob-bot-strip  { flex: 9 9 0;   min-height: 0; display: flex; flex-direction: row; gap: var(--gap); }

          /* Hide the desktop right-grid structure entirely on mobile */
          .right-grid  { display: none !important; }

          /* box-arrow sizing on mobile */
          .box-arrow,
          .box-arrow svg {
            width: 11px !important;
            height: 11px !important;
          }

          /* box-label font on mobile */
          .box-label {
            font-size: 8px;
          }
        }
      `}</style>

      <div className={`${theme} page`}>
        <div className="grain-layer" aria-hidden="true" />

        <Header theme={theme} setTheme={setTheme} />

        <div className="bento-area">

          {/* ── LEFT COLUMN (same role on both desktop and mobile) ── */}
          <div className="left-col">
            <ClickableBox
              label="About"
              onClick={() => setAboutOpen(true)}
              className="about-box about-image-box anim-about"
              style={{ backgroundImage: `url("/assets/me.png")`, backgroundSize: "cover", backgroundPosition: "center" }}
            />

            {/* Contact boxes — wrapped in mob-contact-row div for mobile targeting */}
            <div className="mob-contact-row" style={{ display: "flex", gap: "var(--gap)", flex: "0 0 auto" }}>
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

          {/* ── DESKTOP RIGHT GRID (hidden on mobile via CSS) ── */}
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

          {/* ── MOBILE RIGHT STACK (hidden on desktop via CSS, shown only on mobile) ── */}
          <MobileRightStack
            theme={theme}
            setTheme={setTheme}
            onEducation={() => setIsEducationOpen(true)}
            onExperience={() => setIsExperienceOpen(true)}
            onProjects={() => setIsProjectsOpen(true)}
          />
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

/* ─────────────────────────────────────────────────────────────────────────
   MobileRightStack
   Renders ONLY on mobile portrait (display:none on desktop via CSS).
   Contains: Education, Experience, Projects, Links-top (social+BB8),
             Commit strip, CV+Map strip — all stacked, proportional flex.
   Imports LinksPanel sub-parts inline to avoid touching LinksPanel source.
───────────────────────────────────────────────────────────────────────── */
import { LuLinkedin, LuGithub, LuInstagram } from "react-icons/lu";
import { useId, useEffect } from "react";

const GITHUB_USER = "Pranjwals";

interface MobileRightStackProps {
  theme: "dark" | "light";
  setTheme: (t: "dark" | "light") => void;
  onEducation: () => void;
  onExperience: () => void;
  onProjects: () => void;
}

/* Minimal BB8 toggle re-used from LinksPanel — same logic, scoped uid */
const MobileBB8Toggle: React.FC<{ theme: "dark" | "light"; setTheme: (t: "dark" | "light") => void }> = ({ theme, setTheme }) => {
  const uid = useId().replace(/:/g, "mob");
  const isDay = theme === "light";

  return (
    <>
      <style>{`
        .bb8-wrap-${uid} { width:100%; height:100%; display:flex; align-items:center; justify-content:center; cursor:pointer; overflow:hidden; }
        .bb8-toggle-${uid} {
          --toggle-size: clamp(4px, 1.8vw, 7px);
          --toggle-width: 10.625em; --toggle-height: 5.625em;
          --toggle-offset: calc((var(--toggle-height) - var(--bb8-diameter)) / 2);
          --toggle-bg: linear-gradient(#2c4770,#070e2b 35%,#628cac 50% 70%,#a6c5d4) no-repeat;
          --bb8-diameter: 4.375em; --radius: 99em; --transition: 0.4s;
          --accent: #888; --bb8-bg: #ddd;
          font-size: var(--toggle-size);
          display: block; flex-shrink: 0;
        }
        .bb8-toggle-${uid} * { box-sizing: border-box; }
        .bb8-container-${uid} {
          width: var(--toggle-width); height: var(--toggle-height);
          background: var(--toggle-bg); background-size: 100% 11.25em;
          background-position-y: ${isDay ? "-5.625em" : "0"};
          border-radius: var(--radius); position: relative; transition: var(--transition);
          filter: saturate(0.15) brightness(0.9);
        }
        .bb8-droid-${uid} {
          display: flex; flex-direction: column; align-items: center;
          position: absolute;
          top: calc(var(--toggle-offset) - 1.688em + 0.188em);
          left: ${isDay ? "calc(100% - var(--bb8-diameter) - var(--toggle-offset))" : "var(--toggle-offset)"};
          transition: var(--transition); z-index: 2;
        }
        .bb8-headcont-${uid} { position: relative; transition: var(--transition); z-index: 2; transform-origin: 1.25em 3.75em; }
        .bb8-head-${uid} {
          overflow: hidden; margin-bottom: -0.188em;
          width: 2.5em; height: 1.688em;
          background:
            linear-gradient(transparent .063em,dimgray .063em .313em,transparent .313em .375em,var(--accent) .375em .5em,transparent .5em 1.313em,silver 1.313em 1.438em,transparent 1.438em),
            linear-gradient(45deg,transparent .188em,var(--bb8-bg) .188em 1.25em,transparent 1.25em),
            linear-gradient(-45deg,transparent .188em,var(--bb8-bg) .188em 1.25em,transparent 1.25em),
            linear-gradient(var(--bb8-bg) 1.25em,transparent 1.25em);
          border-radius: var(--radius) var(--radius) 0 0;
          position: relative; z-index: 1;
          filter: drop-shadow(0 .063em .125em gray);
        }
        .bb8-head-${uid}::before {
          content:""; position:absolute;
          width:.563em; height:.563em;
          background: radial-gradient(.125em circle at .25em .375em,#666,transparent), radial-gradient(.063em circle at .375em .188em,var(--bb8-bg) 50%,transparent 100%), linear-gradient(45deg,#222 .188em,dimgray .313em .375em,#222 .5em);
          border-radius: var(--radius);
          top:.413em; left:${isDay ? "100%" : "50%"};
          transform:translate(-50%);
          box-shadow: 0 0 0 .089em lightgray,.563em .281em 0 -.148em,.563em .281em 0 -.1em var(--bb8-bg),.563em .281em 0 -.063em;
          z-index:1; transition:var(--transition);
        }
        .bb8-head-${uid}::after {
          content:""; position:absolute;
          bottom:.375em; left:0; width:100%; height:.188em;
          background: linear-gradient(to right,var(--accent) .125em,transparent .125em .188em,var(--accent) .188em .313em,transparent .313em .375em,var(--accent) .375em .938em,transparent .938em 1em,var(--accent) 1em 1.125em,transparent 1.125em 1.875em,var(--accent) 1.875em 2em,transparent 2em 2.063em,var(--accent) 2.063em 2.25em,transparent 2.25em 2.313em,var(--accent) 2.313em 2.375em,transparent 2.375em 2.438em,var(--accent) 2.438em);
          transition:var(--transition);
          background-position: ${isDay ? "-1.375em 0" : "0 0"};
        }
        .bb8-antenna-${uid} { position:absolute; transform:translateY(-90%); width:.059em; border-radius:var(--radius) var(--radius) 0 0; transition:var(--transition); }
        .bb8-antenna-${uid}:nth-child(1) { height:.938em; right:.938em; background:linear-gradient(#222 .188em,silver .188em); }
        .bb8-antenna-${uid}:nth-child(2) { height:.375em; background:silver; left:${isDay ? "calc(100% - 0.938em)" : "50%"}; transform:translate(-50%,-90%); }
        .bb8-body-${uid} {
          width:4.375em; height:4.375em; border-radius:var(--radius);
          position:relative; overflow:hidden; transition:var(--transition); z-index:1;
          transform:${isDay ? "rotate(225deg)" : "rotate(45deg)"};
          background:
            linear-gradient(-90deg,var(--bb8-bg) 4%,var(--accent) 4% 10%,transparent 10% 90%,var(--accent) 90% 96%,var(--bb8-bg) 96%),
            linear-gradient(var(--bb8-bg) 4%,var(--accent) 4% 10%,transparent 10% 90%,var(--accent) 90% 96%,var(--bb8-bg) 96%),
            linear-gradient(to right,transparent 2.156em,silver 2.156em 2.219em,transparent 2.188em),
            linear-gradient(transparent 2.156em,silver 2.156em 2.219em,transparent 2.188em);
          background-color:var(--bb8-bg);
        }
        .bb8-body-${uid}::before {
          content:""; width:2.625em; height:2.625em;
          position:absolute; border-radius:50%; overflow:hidden;
          top:50%; left:50%; transform:translate(-50%,-50%);
          border:.313em solid var(--accent);
          background: radial-gradient(1em circle at center,#ccc 50%,transparent 51%), radial-gradient(1.25em circle at center,var(--bb8-bg) 50%,transparent 51%), linear-gradient(-90deg,transparent 42%,var(--accent) 42% 58%,transparent 58%), linear-gradient(var(--bb8-bg) 42%,var(--accent) 42% 58%,var(--bb8-bg) 58%);
        }
        .bb8-body-${uid}::after {
          content:""; bottom:1.5em; left:.563em; position:absolute;
          width:.188em; height:.188em;
          background:#ccc; color:#ccc; border-radius:50%;
          box-shadow:.875em .938em,0 -1.25em,.875em -2.125em,2.125em -2.125em,3.063em -1.25em,3.063em 0,2.125em .938em;
        }
        .bb8-hidden-${uid} { position:absolute; border-radius:inherit; inset:0; pointer-events:none; overflow:hidden; }
        .bb8-shadow-${uid} {
          width:var(--bb8-diameter); height:20%;
          border-radius:50%; background:#333; box-shadow:.313em 0 3.125em #333;
          opacity:0.2; position:absolute; bottom:0;
          left:${isDay ? "calc(100% - var(--bb8-diameter) - var(--toggle-offset) + 0.938em)" : "calc(var(--toggle-offset) - 0.938em)"};
          transform:${isDay ? "skew(70deg)" : "skew(-70deg)"};
          transition:var(--transition); z-index:1;
        }
        .bb8-scenery-${uid} { width:100%; height:100%; pointer-events:none; overflow:hidden; position:relative; border-radius:inherit; }
        .bb8-scenery-${uid}::before { content:""; position:absolute; width:100%; height:30%; bottom:0; background:#8a7060; z-index:1; }
        .bb8-cloud-${uid} { z-index:1; position:absolute; border-radius:50%; }
        .bb8-cloud-${uid}:nth-last-child(1) { width:.875em; height:.625em; filter:blur(.125em); right:${isDay ? "-100%" : "1.875em"}; top:2.813em; background:rgba(255,255,255,0.5); transition:var(--transition); }
        .bb8-cloud-${uid}:nth-last-child(2) { top:.625em; right:${isDay ? "-100%" : "4.375em"}; width:.875em; height:.375em; background:rgba(200,200,200,0.5); filter:blur(.125em); transition:0.6s; }
        .bb8-cloud-${uid}:nth-last-child(3) { top:1.25em; right:${isDay ? "-100%" : ".938em"}; width:.875em; height:.375em; background:rgba(255,255,255,0.4); filter:blur(.125em); transition:0.8s; }
        .bb8-gomrassen-${uid},.bb8-hermes-${uid},.bb8-chenini-${uid} { position:absolute; border-radius:var(--radius); background:linear-gradient(#ddd,#999); }
        .bb8-gomrassen-${uid} { left:.938em; width:1.875em; height:1.875em; box-shadow:0 0 .188em rgba(255,255,255,0.3); top:${isDay ? ".938em" : "100%"}; transition:var(--transition); }
        .bb8-gomrassen-${uid}::before,.bb8-gomrassen-${uid}::after { content:""; position:absolute; border-radius:inherit; background:#aaa; }
        .bb8-gomrassen-${uid}::before { left:.313em; top:.313em; width:.438em; height:.438em; }
        .bb8-gomrassen-${uid}::after  { width:.25em; height:.25em; left:1.25em; top:.75em; }
        .bb8-hermes-${uid} { left:3.438em; width:.625em; height:.625em; top:${isDay ? "2.5em" : "100%"}; transition:0.6s; }
        .bb8-chenini-${uid} { left:4.375em; width:.5em; height:.5em; top:${isDay ? "2.75em" : "100%"}; transition:0.8s; }
        .bb8-tatto1-${uid} { position:absolute; width:1.25em; height:1.25em; border-radius:var(--radius); background:#e8e8e8; right:3.125em; top:${isDay ? "100%" : ".625em"}; transition:var(--transition); }
        .bb8-tatto2-${uid} { position:absolute; width:1.25em; height:1.25em; border-radius:var(--radius); background:linear-gradient(#bbb,#888); right:1.25em; top:${isDay ? "100%" : "2.188em"}; transition:0.7s; }
      `}</style>
      <div className={`bb8-wrap-${uid}`} onClick={() => setTheme(isDay ? "dark" : "light")}>
        <div className={`bb8-toggle-${uid}`}>
          <div className={`bb8-container-${uid}`}>
            <div className={`bb8-scenery-${uid}`}>
              {[
                { left:"3.75em",  top:isDay?"100%":".625em",  shadow:"1.25em .938em,-1.25em 2.5em,0 1.25em,1.875em .625em,-3.125em 1.875em,1.25em 2.813em", t:"0.2s" },
                { left:"4.688em", top:isDay?"100%":"1.875em", shadow:".625em 0,0 .625em,-.625em -.625em,.625em .938em,-3.125em 1.25em,1.25em -1.563em",      t:"0.3s" },
                { left:"5.313em", top:isDay?"100%":"1.25em",  shadow:"-.625em -.625em,-2.188em 1.25em,-2.188em 0,-3.75em -.625em,-3.125em -.625em,-2.5em -.313em,.75em -.625em", t:"0.4s" },
              ].map((s, i) => (
                <div key={i} style={{ position:"absolute", width:".063em", height:".063em", left:s.left, top:s.top, boxShadow:s.shadow, transition:s.t, borderRadius:"99em", background:"#fff", filter:"drop-shadow(0 0 .063em #fff)" }} />
              ))}
              {[
                { left:"1.875em", top:isDay?"100%":"3.438em", t:"0.5s" },
                { left:"5em",     top:isDay?"100%":"3.438em", t:"0.6s" },
                { left:"2.5em",   top:isDay?"100%":".313em",  t:"0.7s" },
                { left:"3.438em", top:isDay?"100%":"1.875em", t:"0.8s" },
              ].map((s, i) => (
                <div key={i+3} style={{ position:"absolute", width:".125em", height:".125em", left:s.left, top:s.top, transition:s.t, borderRadius:"99em", background:"#fff" }} />
              ))}
              <div style={{ position:"absolute", width:"1.25em", height:"1.25em", borderRadius:"99em", background:"#e8e8e8", right:"3.125em", top:isDay?"100%":".625em", transition:"var(--transition)" }} />
              <div style={{ position:"absolute", width:"1.25em", height:"1.25em", borderRadius:"99em", background:"linear-gradient(#bbb,#888)", right:"1.25em", top:isDay?"100%":"2.188em", transition:"0.7s" }} />
              <div className={`bb8-gomrassen-${uid}`} />
              <div className={`bb8-hermes-${uid}`} />
              <div className={`bb8-chenini-${uid}`} />
              <div className={`bb8-cloud-${uid}`} />
              <div className={`bb8-cloud-${uid}`} />
              <div className={`bb8-cloud-${uid}`} />
            </div>
            <div className={`bb8-droid-${uid}`}>
              <div className={`bb8-headcont-${uid}`}>
                <div className={`bb8-antenna-${uid}`} />
                <div className={`bb8-antenna-${uid}`} />
                <div className={`bb8-head-${uid}`} />
              </div>
              <div className={`bb8-body-${uid}`} />
            </div>
            <div className={`bb8-hidden-${uid}`}>
              <div className={`bb8-shadow-${uid}`} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

/* Inline commit + map for mobile stack — reads same GitHub data */
const MobileRightStack: React.FC<MobileRightStackProps> = ({
  theme, setTheme, onEducation, onExperience, onProjects
}) => {
  const [commit, setCommit] = React.useState<{ repo: string; message: string; date: string; url: string } | null>(null);
  const [commitLoading, setCommitLoading] = React.useState(true);
  const mapRef = React.useRef<HTMLDivElement>(null);
  const leafletRef = React.useRef<any>(null);

  /* fetch commit */
  React.useEffect(() => {
    (async () => {
      try {
        const reposRes = await fetch(`https://api.github.com/users/${GITHUB_USER}/repos?sort=pushed&per_page=1`);
        const repos = await reposRes.json();
        if (!repos?.length) throw new Error();
        const repo = repos[0];
        const commitsRes = await fetch(`https://api.github.com/repos/${GITHUB_USER}/${repo.name}/commits?per_page=1`);
        const commits = await commitsRes.json();
        if (!commits?.length) throw new Error();
        const c = commits[0].commit;
        setCommit({
          repo: repo.name,
          message: c.message.split("\n")[0].slice(0, 68),
          date: new Date(c.author.date).toLocaleDateString("en-CA", { month: "short", day: "numeric", year: "numeric" }),
          url: repo.html_url,
        });
      } catch {
        setCommit(null);
      } finally {
        setCommitLoading(false);
      }
    })();
  }, []);

  /* leaflet map */
  React.useEffect(() => {
    if (!mapRef.current) return;
    if (!document.getElementById("leaflet-css")) {
      const link = document.createElement("link");
      link.id = "leaflet-css"; link.rel = "stylesheet";
      link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
      document.head.appendChild(link);
    }
    const initMap = () => {
      const L = (window as any).L;
      if (!L || !mapRef.current || leafletRef.current) return;
      const map = L.map(mapRef.current, {
        center: [45.5017, -73.5673], zoom: 12,
        zoomControl: false, attributionControl: false,
        scrollWheelZoom: false, dragging: false,
        doubleClickZoom: false, touchZoom: false,
      });
      leafletRef.current = map;
      const tileUrl = theme === "dark"
        ? "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        : "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png";
      L.tileLayer(tileUrl, { maxZoom: 19 }).addTo(map);
      const pinIcon = L.divIcon({
        className: "lp-map-pin-label",
        html: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="3" fill="#3bff6e"/><circle cx="12" cy="12" r="6" stroke="#3bff6e" stroke-width="1.5" fill="none"/><line x1="12" y1="2" x2="12" y2="7" stroke="#3bff6e" stroke-width="1.5" stroke-linecap="round"/><line x1="12" y1="17" x2="12" y2="22" stroke="#3bff6e" stroke-width="1.5" stroke-linecap="round"/><line x1="2" y1="12" x2="7" y2="12" stroke="#3bff6e" stroke-width="1.5" stroke-linecap="round"/><line x1="17" y1="12" x2="22" y2="12" stroke="#3bff6e" stroke-width="1.5" stroke-linecap="round"/></svg>',
        iconSize: [14, 14], iconAnchor: [7, 7],
      });
      L.marker([45.5017, -73.5673], { icon: pinIcon }).addTo(map);
    };
    if ((window as any).L) { initMap(); }
    else {
      const script = document.createElement("script");
      script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
      script.onload = initMap;
      document.head.appendChild(script);
    }
    return () => { if (leafletRef.current) { leafletRef.current.remove(); leafletRef.current = null; } };
  }, []);

  React.useEffect(() => {
    const L = (window as any).L;
    const map = leafletRef.current;
    if (!L || !map) return;
    map.eachLayer((layer: any) => { if (layer._url) map.removeLayer(layer); });
    const tileUrl = theme === "dark"
      ? "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
      : "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png";
    L.tileLayer(tileUrl, { maxZoom: 19 }).addTo(map);
  }, [theme]);

  /* shared glass cell style */
  const cellBase: React.CSSProperties = {
    borderRadius: "var(--radius)",
    background: "var(--glass-bg)",
    backdropFilter: "blur(var(--glass-blur))",
    WebkitBackdropFilter: "blur(var(--glass-blur))",
    border: "1px solid var(--glass-border)",
    boxShadow: "var(--glass-shadow)",
    position: "relative",
    overflow: "hidden",
  };

  return (
    <>
      <style>{`
        /* Only visible on mobile portrait */
        .mob-right-stack { display: none; }
        @media (max-width: 500px) and (orientation: portrait) {
          .mob-right-stack { display: flex; }
        }

        /* Social icons for mobile strip */
        .mob-social-icon {
          flex: 1; display: flex; align-items: center; justify-content: center;
          font-size: 14px;
          color: var(--text); text-decoration: none;
          cursor: pointer;
          border-radius: var(--radius);
          background: var(--glass-bg);
          border: 1px solid var(--glass-border);
          box-shadow: var(--glass-shadow);
          transition: background 0.22s, border-color 0.22s, color 0.22s;
          animation: box-enter var(--anim-dur) var(--anim-ease) backwards;
          animation-delay: 0.28s;
          position: relative; overflow: hidden;
        }
        .mob-social-icon::before {
          content: ''; position: absolute; inset: 0; border-radius: var(--radius);
          background: linear-gradient(160deg, var(--glass-highlight) 0%, transparent 40%);
          pointer-events: none;
        }
        .mob-social-icon:hover { background: var(--text) !important; color: var(--bg); border-color: var(--text) !important; }

        /* BB8 cell on mobile */
        .mob-bb8-cell {
          flex: 1.4; display: flex; align-items: center; justify-content: center;
          overflow: hidden;
          background: transparent !important;
          border: 1px solid transparent !important;
          box-shadow: none !important;
          border-radius: var(--radius);
          animation: box-enter var(--anim-dur) var(--anim-ease) 0.30s backwards;
        }

        /* commit strip mobile */
        .mob-commit-strip {
          padding: 7px 9px;
          flex-direction: column; align-items: flex-start; justify-content: center;
          gap: 3px;
          text-decoration: none; color: var(--text);
          cursor: pointer;
          animation: box-enter var(--anim-dur) var(--anim-ease) 0.33s backwards;
        }
        .mob-commit-strip:hover { border-color: var(--hover-border) !important; }

        /* map on mobile */
        .mob-map-cell { padding: 0; overflow: hidden; cursor: default; }
        .mob-map-cell .mob-map-leaf { width: 100%; height: 100%; }
        .mob-map-cell .leaflet-control-attribution,
        .mob-map-cell .leaflet-control-zoom,
        .mob-map-cell .leaflet-control-container { display: none !important; }
        .mob-map-pin-label { background:transparent!important; border:none!important; box-shadow:none!important; }

        /* cv cell mobile */
        .mob-cv-cell {
          flex: 1; display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          text-decoration: none; color: var(--text); cursor: pointer;
          font-size: 8px; font-weight: 600; letter-spacing: 0.08em;
          text-transform: uppercase;
          animation: box-enter var(--anim-dur) var(--anim-ease) 0.35s backwards;
        }
        .mob-cv-cell:hover { background: var(--text) !important; color: var(--bg) !important; border-color: var(--text) !important; }
        .mob-cv-sub { font-size: 6px; opacity: 0.3; font-weight: 400; letter-spacing: 0.06em; }

        /* pulse dot */
        .mob-pulse-dot {
          width: 5px; height: 5px; border-radius: 50%;
          background: #3bff6e; flex-shrink: 0; position: relative;
        }
        .mob-pulse-dot::after {
          content: ''; position: absolute; inset: -3px; border-radius: 50%;
          background: rgba(59,255,110,0.3);
          animation: pulse-ring 2s ease-out infinite;
        }
        @keyframes pulse-ring { 0%{transform:scale(0.8);opacity:1} 100%{transform:scale(2.4);opacity:0} }

        /* skeleton */
        .mob-skel { border-radius: 3px; background: var(--border); animation: skel-pulse 1.4s ease-in-out infinite; }
        @keyframes skel-pulse { 0%,100%{opacity:.4} 50%{opacity:.15} }
      `}</style>

      <div className="mob-right-stack">
        {/* 1. Education */}
        <div
          className="box clickable mob-education anim-education"
          onClick={onEducation}
          style={{ animationDelay: "0.10s" }}
        >
          <span className="box-label">Education</span>
          <span className="box-arrow box-arrow--visible" style={{ transform: "translate(0,0) rotate(0deg) scale(1)", opacity: 0.3 }}>
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
              <line x1="5" y1="19" x2="19" y2="5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              <polyline points="8,5 19,5 19,16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </div>

        {/* 2. Experience */}
        <div
          className="box clickable mob-experience anim-exp"
          onClick={onExperience}
          style={{ animationDelay: "0.17s" }}
        >
          <span className="box-label">Experience</span>
          <span className="box-arrow box-arrow--visible" style={{ transform: "translate(0,0) rotate(0deg) scale(1)", opacity: 0.3 }}>
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
              <line x1="5" y1="19" x2="19" y2="5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              <polyline points="8,5 19,5 19,16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </div>

        {/* 3. Projects */}
        <div
          className="box clickable mob-projects anim-projects"
          onClick={onProjects}
          style={{ animationDelay: "0.21s" }}
        >
          <span className="box-label">Projects</span>
          <span className="box-arrow box-arrow--visible" style={{ transform: "translate(0,0) rotate(0deg) scale(1)", opacity: 0.3 }}>
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
              <line x1="5" y1="19" x2="19" y2="5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              <polyline points="8,5 19,5 19,16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </div>

        {/* 4. Social icons + BB8 toggle strip */}
        <div className="mob-links-top" style={{ display: "flex", gap: "var(--gap)" }}>
          <a href="https://www.linkedin.com/in/pranjwal-s-01979b242/" className="mob-social-icon" target="_blank" rel="noopener noreferrer">
            <LuLinkedin />
          </a>
          <a href={`https://github.com/${GITHUB_USER}`} className="mob-social-icon" target="_blank" rel="noopener noreferrer">
            <LuGithub />
          </a>
          <div className="mob-bb8-cell">
            <MobileBB8Toggle theme={theme} setTheme={setTheme} />
          </div>
          <a href="https://instagram.com/" className="mob-social-icon" target="_blank" rel="noopener noreferrer">
            <LuInstagram />
          </a>
        </div>

        {/* 5. Commit strip */}
        <a
          href={commit?.url ?? `https://github.com/${GITHUB_USER}`}
          className="mob-commit mob-commit-strip"
          style={{ ...cellBase, display: "flex" }}
          target="_blank" rel="noopener noreferrer"
        >
          {commitLoading ? (
            <div style={{ display: "flex", flexDirection: "column", gap: "4px", width: "100%" }}>
              <div className="mob-skel" style={{ height: "6px", width: "38%" }} />
              <div className="mob-skel" style={{ height: "7px", width: "65%" }} />
              <div className="mob-skel" style={{ height: "6px", width: "52%" }} />
            </div>
          ) : commit ? (
            <>
              <div style={{ display: "flex", alignItems: "center", gap: "5px", width: "100%", flexShrink: 0 }}>
                <span className="mob-pulse-dot" />
                <span style={{ fontSize: "7px", letterSpacing: "0.1em", textTransform: "uppercase", opacity: 0.28, fontWeight: 600 }}>Active:</span>
                <span style={{ fontSize: "7px", opacity: 0.2, letterSpacing: "0.04em", marginLeft: "auto", whiteSpace: "nowrap", flexShrink: 0 }}>{commit.date}</span>
              </div>
              <div style={{ display: "flex", alignItems: "baseline", gap: "4px", width: "100%", flexShrink: 0 }}>
                <span style={{ fontSize: "7px", letterSpacing: "0.08em", textTransform: "uppercase", opacity: 0.28, fontWeight: 500 }}>Repo</span>
                <span style={{ fontSize: "9px", fontWeight: 700, letterSpacing: "0.04em", textTransform: "uppercase", opacity: 0.75, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{commit.repo}</span>
              </div>
              <p style={{ fontSize: "8px", opacity: 0.4, lineHeight: 1.35, letterSpacing: "0.01em", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden", width: "100%" }}>{commit.message}</p>
            </>
          ) : (
            <span style={{ fontSize: "7px", opacity: 0.25, letterSpacing: "0.07em", textTransform: "uppercase" }}>
              No recent activity
            </span>
          )}
        </a>

        {/* 6. CV + Map strip */}
        <div className="mob-bot-strip">
          <a href="/Pranjwal_Singh_CV_Fall2026.pdf" download style={{ ...cellBase, flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textDecoration: "none", color: "var(--text)", cursor: "pointer", fontSize: "8px", fontWeight: 600, letterSpacing: "0.07em", textTransform: "uppercase", animationDelay: "0.35s" }} className="mob-cv-cell box">
            <span>Download CV</span>
            <span className="mob-cv-sub">PDF · Latest</span>
          </a>
          <div style={{ ...cellBase, flex: 1, padding: 0, overflow: "hidden", animationDelay: "0.37s" }} className="mob-map-cell box">
            <div ref={mapRef} className="mob-map-leaf" style={{ width: "100%", height: "100%" }} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Landing;