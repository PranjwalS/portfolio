import React, { useState } from "react";
import Header from "../components/Header";
import { LuSun, LuMoon, LuLinkedin, LuGithub } from "react-icons/lu";

const Landing: React.FC = () => {
  const [theme, setTheme] = useState<"dark" | "light">("dark");

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
          height: 100%;
        }

        .custom-links {
          display: flex;
          flex-direction: column;
          gap: var(--gap);
          width: 100%;
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
        }

        .resume-box:hover {
          background: var(--primary);
          color: #000;
        }

        .link-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: var(--gap);
          flex: 1;
        }

        .link-box {
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
        }

        .link-box:hover {
          background: var(--primary);
          color: #000;
        }

        .theme-switcher {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 6px;
          border: 1px solid var(--border);
          border-radius: var(--radius);
        }

        .theme-btn {
          background: transparent;
          border: none;
          cursor: pointer;
          padding: 6px;
          color: var(--text);
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

            {/* BOTTOM */}
            <div className="bottom-row">
              <div className="box">
                <span className="box-label">Projects</span>
              </div>

              <div className="links-container">
                <div className="custom-links">

                  {/* Resume */}
                  <a href="/resume.pdf" className="resume-box">
                    Download Resume
                  </a>

                  {/* Row 1 */}
                  <div className="link-row">
                    <a href="https://linkedin.com" className="link-box">
                      <LuLinkedin />
                    </a>

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

                  {/* Row 2 */}
                  <div className="link-row">
                    <a href="https://github.com" className="link-box">
                      <LuGithub />
                    </a>

                    <div className="link-box">
                      +
                    </div>
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
    </>
  );
};

export default Landing;