import React, { useState } from "react";
import Header from "../components/Header";
import { LuSun, LuMoon, LuLinkedin, LuGithub } from "react-icons/lu";
import ProjectsModal from "../components/ProjectsModal";

const Landing: React.FC = () => {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [isProjectsOpen, setIsProjectsOpen] = useState(false);
  return (
    <>
      <style>{`
        :root {
          --header-h:  clamp(44px, 5vh, 60px);
          --footer-h:  clamp(36px, 4vh, 52px);
          --gap:       clamp(5px, 0.6vw, 9px);
          --pad:       clamp(5px, 0.6vw, 9px);
          --radius:    clamp(10px, 1vw, 16px);
          --fs-ui:     clamp(10px, 0.85vw, 13px);
          --pad-box:   clamp(12px, 1.4vw, 22px);

          --primary: #3bff6e;
          --bg: #000000;
          --text: #e6e6e6;
        }

        .dark {
          --bg: #000000;
          --text: #e6e6e6;
          --primary: #3bff6e;
          --border: #1a1a1a;
          --card: #0a0a0a;
        }

        .light {
          --bg: #ffffff;
          --text: #1a1a1a;
          --primary: #3bff6e;
          --border: #e5e5e5;
          --card: #f9f9f9;
        }

        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        html, body {
          font-family: 'Open Sauce Sans', sans-serif;
        }

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
        }

        /* LEFT */
        .left-col {
          display: flex;
          flex-direction: column;
          gap: var(--gap);
        }

        .about-box {
          flex: 1;
        }

        /* RIGHT */
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

        /* BOX */
        .box {
          background: var(--card);
          border: 1px solid var(--border);
          border-radius: var(--radius);
          padding: var(--pad-box);
          display: flex;
          flex-direction: column;
        }

        .box-label {
          font-size: var(--fs-ui);
          opacity: 0.3;
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }

        /* LINKS CUSTOM */
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
          transition: 0.2s;
          height: 40%;
          flex-shrink: 0;
          font-weight: 500;
        }

        .resume-box:hover {
          background: var(--primary);
          color: #000;
        }

        /* 2x3 grid: top 30%, bottom 30% */
        .links-grid {
          display: grid;
          grid-template-columns: 1fr 2fr 1fr;
          grid-template-rows: 1fr 1fr;
          gap: var(--gap);
          flex: 1;
          min-height: 0;
        }

        /* Top row (row 1): LinkedIn 1/3, Theme 2/3 */
        .links-grid > .link-item:nth-child(1) {
          grid-column: 1;
          grid-row: 1;
        }

        .links-grid > .link-item:nth-child(2) {
          grid-column: 2 / 4;
          grid-row: 1;
        }

        /* Bottom row (row 2): + 2/3, GitHub 1/3 */
        .links-grid > .link-item:nth-child(3) {
          grid-column: 1 / 3;
          grid-row: 2;
        }

        .links-grid > .link-item:nth-child(4) {
          grid-column: 3;
          grid-row: 2;
        }

        .link-item {
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid var(--border);
          border-radius: var(--radius);
          background: var(--card);
          cursor: pointer;
          transition: 0.2s;
          color: var(--text);
          text-decoration: none;
          min-height: 0;
          font-size: clamp(16px, 2vw, 24px);
        }

        .link-item:hover {
          background: var(--primary);
          color: #000;
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
          transition: 0.2s;
          flex: 1;
          font-size: clamp(14px, 2vw, 20px);
        }

        .theme-btn:hover {
          color: var(--primary);
        }

        .theme-btn.active {
          color: var(--primary);
        }

        .footer-bar {
          height: var(--footer-h);
          border-top: 1px solid var(--border);
          display: flex;
          align-items: center;
          padding: 0 var(--pad);
          font-size: var(--fs-ui);
          opacity: 0.3;
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

  {/* TOP */}
  <div className="top-row">
    <div className="box">
      <span className="box-label">Education</span>
    </div>

    <div className="box">
      <span className="box-label">Experience</span>
    </div>
  </div>

  {/* BOTTOM (PUT THIS BACK) */}
  <div className="bottom-row">
    
    {/* Projects */}
    <div
      className="box"
      style={{ cursor: "pointer" }}
      onClick={() => setIsProjectsOpen(true)}
    >
      <span className="box-label">Projects</span>
    </div>

    {/* Links */}
    <div className="links-container">
      <div className="custom-links">

        <a href="/resume.pdf" className="resume-box">
          Download Resume
        </a>

        <div className="links-grid">
          <a href="https://linkedin.com" className="link-item" target="_blank" rel="noopener noreferrer">
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
          >
            +
          </div>

          <a href="https://github.com" className="link-item" target="_blank" rel="noopener noreferrer">
            <LuGithub />
          </a>
        </div>

      </div>
    </div>

  </div>
</div>
        </div>

        <div className="footer-bar">
          stack animation · · ·
        </div>
      </div>
      <ProjectsModal
  isOpen={isProjectsOpen}
  onClose={() => setIsProjectsOpen(false)}
/>
    </>
  );
};

export default Landing;