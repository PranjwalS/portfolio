import React, { useState, useRef } from "react";
import Header from "../components/Header";
import { LuSun, LuMoon, LuLinkedin, LuGithub } from "react-icons/lu";
import ProjectsPane from "../components/ProjectsPane";
import EducationPane from "../components/EducationPane";
import ExperiencePane from "../components/ExperiencePane";
import TechStackFooter from "../components/TechStackFooter";

/* ── Ripple + magnetic corner effect on hover ── */
const ClickableBox: React.FC<{
  label: string;
  onClick: () => void;
  className?: string;
  style?: React.CSSProperties;
}> = ({ label, onClick, className = "", style }) => {
  const boxRef = useRef<HTMLDivElement>(null);
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([]);
  const [corner, setCorner] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const counterRef = useRef(0);

  const handleMouseEnter = () => setHovered(true);

  const handleMouseLeave = () => {
    setHovered(false);
    setCorner({ x: 0, y: 0 });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!boxRef.current) return;
    const rect = boxRef.current.getBoundingClientRect();
    // magnetic pull toward nearest corner — arrow tracks cursor
    const cx = e.clientX - rect.left;
    const cy = e.clientY - rect.top;
    // offset the arrow slightly toward cursor from its anchor (bottom-right)
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
      style={style}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
    >
      <span className="box-label">{label}</span>

      {/* ripple layer */}
      {ripples.map((r) => (
        <span
          key={r.id}
          className="box-ripple"
          style={{ left: r.x, top: r.y }}
        />
      ))}

      {/* animated arrow — magnetic + rotating */}
      <span
        className={`box-arrow ${hovered ? "box-arrow--visible" : ""}`}
        style={{
          transform: hovered
            ? `translate(${corner.x}px, ${corner.y}px) rotate(0deg) scale(1)`
            : `translate(6px, 6px) rotate(-55deg) scale(0.5)`,
        }}
      >
        <svg
          width="clamp(14px, 1.6vw, 22px)"
          height="clamp(14px, 1.6vw, 22px)"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* shaft */}
          <line
            x1="5" y1="19" x2="19" y2="5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          {/* arrowhead */}
          <polyline
            points="8,5 19,5 19,16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
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
        }

        .dark {
          --bg:     #000000;
          --text:   #e6e6e6;
          --border: #1c1c1c;
          --card:   #080808;
          --hover-border: #3a3a3a;
          --ripple: rgba(255,255,255,0.06);
          --arrow-color: #ffffff;
        }

        .light {
          --bg:     #f5f5f5;
          --text:   #111111;
          --border: #dcdcdc;
          --card:   #ffffff;
          --hover-border: #aaaaaa;
          --ripple: rgba(0,0,0,0.06);
          --arrow-color: #111111;
        }

        * { box-sizing: border-box; margin: 0; padding: 0; }
        html, body { font-family: 'Open Sauce Sans', sans-serif; }

        .page {
          width: 100vw;
          height: 100vh;
          display: flex;
          flex-direction: column;
          background: var(--bg);
          color: var(--text);
        }

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

        /* ── BASE BOX ── */
        .box {
          background: var(--card);
          border: 1px solid var(--border);
          border-radius: var(--radius);
          padding: var(--pad-box);
          display: flex;
          flex-direction: column;
          position: relative;
          overflow: hidden;
          transition: border-color 0.25s ease;
        }

        .box-label {
          font-size: var(--fs-ui);
          opacity: 0.3;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          position: relative;
          z-index: 1;
        }

        /* ── CLICKABLE BOX HOVER STATE ── */
        .box.clickable {
          cursor: pointer;
        }

        .box.clickable:hover {
          border-color: var(--hover-border);
        }

        /* corner reveal gradient on hover */
        .box.clickable::after {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: var(--radius);
          background: radial-gradient(
            ellipse at 100% 100%,
            rgba(255,255,255,0.035) 0%,
            transparent 65%
          );
          opacity: 0;
          transition: opacity 0.3s ease;
          pointer-events: none;
        }
        .dark .box.clickable:hover::after { opacity: 1; }
        .light .box.clickable:hover::after {
          background: radial-gradient(
            ellipse at 100% 100%,
            rgba(0,0,0,0.04) 0%,
            transparent 65%
          );
          opacity: 1;
        }

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
          to {
            transform: translate(-50%, -50%) scale(60);
            opacity: 0;
          }
        }

        /* ── ARROW ── */
        .box-arrow {
          position: absolute;
          bottom: clamp(8px, 1.1vw, 16px);
          right: clamp(8px, 1.1vw, 16px);
          color: var(--arrow-color);
          opacity: 0;
          transition:
            opacity 0.28s ease,
            transform 0.45s cubic-bezier(0.34, 1.56, 0.64, 1);
          pointer-events: none;
          z-index: 2;
          display: flex;
          align-items: center;
          justify-content: center;
          width: clamp(14px, 1.6vw, 22px);
          height: clamp(14px, 1.6vw, 22px);
        }
        .box-arrow svg {
          width: 100%;
          height: 100%;
        }

        .box-arrow--visible {
          opacity: 0.55;
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

        .resume-box {
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          border: 1px solid var(--border);
          border-radius: var(--radius);
          background: var(--card);
          text-decoration: none;
          color: var(--text);
          transition: background 0.22s, color 0.22s, border-color 0.22s;
          height: 40%;
          flex-shrink: 0;
          font-weight: 500;
          font-size: var(--fs-ui);
          letter-spacing: 0.04em;
        }

        .resume-box:hover {
          background: var(--text);
          color: var(--bg);
          border-color: var(--text);
        }

        .links-grid {
          display: grid;
          grid-template-columns: 1fr 2fr 1fr;
          grid-template-rows: 1fr 1fr;
          gap: var(--gap);
          flex: 1;
          min-height: 0;
        }

        .links-grid > .link-item:nth-child(1) { grid-column: 1; grid-row: 1; }
        .links-grid > .link-item:nth-child(2) { grid-column: 2 / 4; grid-row: 1; }
        .links-grid > .link-item:nth-child(3) { grid-column: 1 / 3; grid-row: 2; }
        .links-grid > .link-item:nth-child(4) { grid-column: 3; grid-row: 2; }

        .link-item {
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid var(--border);
          border-radius: var(--radius);
          background: var(--card);
          cursor: pointer;
          transition: background 0.22s, color 0.22s, border-color 0.22s;
          color: var(--text);
          text-decoration: none;
          min-height: 0;
          font-size: clamp(16px, 2vw, 24px);
        }

        .link-item:hover {
          background: var(--text);
          color: var(--bg);
          border-color: var(--text);
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

        /* invert icons when link-item hovered */
        .link-item:hover .theme-btn {
          color: var(--bg);
        }
      `}</style>

      <div className={`${theme} page`}>
        <Header theme={theme} setTheme={setTheme} />

        <div className="bento-area">

          {/* LEFT */}
          <div className="left-col">
            <div className="box about-box">
              <span className="box-label">About</span>
            </div>
            <div className="box">
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
              />
              <ClickableBox
                label="Experience"
                onClick={() => setIsExperienceOpen(true)}
              />
            </div>

            {/* BOTTOM ROW */}
            <div className="bottom-row">
              <ClickableBox
                label="Projects"
                onClick={() => setIsProjectsOpen(true)}
              />

              {/* Links */}
              <div className="links-container">
                <div className="custom-links">

                  <a href="/resume.pdf" className="resume-box">
                    Download Resume
                  </a>

                  <div className="links-grid">
                    <a
                      href="https://linkedin.com/in/pranjwal-singh-01979b242/"
                      className="link-item"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <LuLinkedin />
                    </a>

                    <div className="link-item">
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

                    <div
                      className="link-item"
                      onClick={() => setIsProjectsOpen(true)}
                      title="View Projects"
                    >
                      +
                    </div>

                    <a
                      href="https://github.com/Pranjwals"
                      className="link-item"
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
      </div>
    </>
  );
};

export default Landing;