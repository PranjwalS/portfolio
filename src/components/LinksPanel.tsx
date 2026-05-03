import React, { useState, useEffect } from "react";
import { LuLinkedin, LuGithub, LuSun, LuMoon } from "react-icons/lu";

interface LinksPanelProps {
  theme: "dark" | "light";
  setTheme: (t: "dark" | "light") => void;
}

interface CommitData {
  repo: string;
  message: string;
  date: string;
  url: string;
}

const GITHUB_USER = "Pranjwals";
// ── Change this to update the pinned city ──
const CITY_LABEL = "Montréal, QC";
// Rough SVG-space coords for Montréal within a North-America bounding box
// viewBox 0 0 200 140 — lon[-140,-50] lat[20,75]
const PIN_X = 130; // ~(-73.6 lon) → (140-73.6)/(140-50)*200 ≈ 147, tuned visually
const PIN_Y = 48;  // ~(45.5 lat) → (75-45.5)/(75-20)*140 ≈ 75, flipped ≈ 48

const LinksPanel: React.FC<LinksPanelProps> = ({ theme, setTheme }) => {
  const [commit, setCommit] = useState<CommitData | null>(null);
  const [commitLoading, setCommitLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        // Get most recently pushed repo
        const reposRes = await fetch(
          `https://api.github.com/users/${GITHUB_USER}/repos?sort=pushed&per_page=1`
        );
        const repos = await reposRes.json();
        if (!repos?.length) throw new Error("no repos");
        const repo = repos[0];

        const commitsRes = await fetch(
          `https://api.github.com/repos/${GITHUB_USER}/${repo.name}/commits?per_page=1`
        );
        const commits = await commitsRes.json();
        if (!commits?.length) throw new Error("no commits");

        const c = commits[0].commit;
        const rawDate = new Date(c.author.date);
        const date = rawDate.toLocaleDateString("en-CA", {
          month: "short",
          day: "numeric",
          year: "numeric",
        });

        setCommit({
          repo: repo.name,
          message: c.message.split("\n")[0].slice(0, 72),
          date,
          url: repo.html_url,
        });
      } catch {
        setCommit(null);
      } finally {
        setCommitLoading(false);
      }
    })();
  }, []);

  return (
    <>
      <style>{`
        /* ── PANEL SHELL ── */
        .links-panel {
          display: flex;
          flex-direction: column;
          gap: var(--gap);
          height: 100%;
          min-height: 0;
        }

        /* ── ROW HEIGHTS ── */
        .lp-row-top    { flex: 30; display: flex; gap: var(--gap); min-height: 0; }
        .lp-row-mid    { flex: 40; min-height: 0; }
        .lp-row-bot    { flex: 30; display: flex; gap: var(--gap); min-height: 0; }

        /* ── SHARED CELL BASE ── */
        .lp-cell {
          border-radius: var(--radius);
          background: var(--glass-bg);
          backdrop-filter: blur(var(--glass-blur));
          -webkit-backdrop-filter: blur(var(--glass-blur));
          border: 1px solid var(--glass-border);
          box-shadow: var(--glass-shadow);
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
          transition: background 0.22s, border-color 0.22s, box-shadow 0.22s, color 0.22s;
          animation: box-enter var(--anim-dur) var(--anim-ease) backwards;
        }

        /* specular highlight */
        .lp-cell::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: var(--radius);
          background: linear-gradient(160deg, var(--glass-highlight) 0%, transparent 40%);
          pointer-events: none;
          z-index: 0;
        }
        .lp-cell > * { position: relative; z-index: 1; }

        /* ── TOP ROW: linkedin | theme | github ── */
        .lp-social {
          flex: 25;
          cursor: pointer;
          color: var(--text);
          text-decoration: none;
          font-size: clamp(15px, 1.6vw, 22px);
        }
        .lp-social:hover {
          background: var(--text) !important;
          color: var(--bg);
          border-color: var(--text) !important;
          box-shadow: none !important;
        }
        .lp-social:hover::before { display: none; }

        .lp-theme {
          flex: 50;
          cursor: default;
          gap: clamp(3px, 0.5vw, 8px);
        }
        .lp-theme-inner {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: clamp(4px, 0.6vw, 10px);
          width: 100%;
          height: 100%;
        }
        .lp-theme-btn {
          background: transparent;
          border: none;
          cursor: pointer;
          color: var(--text);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: clamp(4px, 0.6vw, 8px);
          border-radius: 6px;
          font-size: clamp(13px, 1.4vw, 19px);
          transition: opacity 0.2s;
          flex: 1;
        }
        .lp-theme-btn:hover { opacity: 0.5; }
        .lp-theme-btn.active { opacity: 1; }

        /* ── MID ROW: commit strip ── */
        .lp-commit {
          width: 100%;
          height: 100%;
          padding: clamp(8px, 1vw, 16px) clamp(10px, 1.2vw, 18px);
          flex-direction: column;
          align-items: flex-start;
          justify-content: center;
          gap: clamp(3px, 0.4vh, 7px);
          cursor: pointer;
          text-decoration: none;
          color: var(--text);
        }
        .lp-commit:hover {
          border-color: var(--hover-border) !important;
        }

        .lp-commit-header {
          display: flex;
          align-items: center;
          gap: clamp(5px, 0.6vw, 9px);
          width: 100%;
        }

        /* pulsing green dot */
        .lp-pulse-dot {
          width: clamp(6px, 0.6vw, 8px);
          height: clamp(6px, 0.6vw, 8px);
          border-radius: 50%;
          background: #3bff6e;
          flex-shrink: 0;
          position: relative;
        }
        .lp-pulse-dot::after {
          content: '';
          position: absolute;
          inset: -3px;
          border-radius: 50%;
          background: rgba(59,255,110,0.35);
          animation: pulse-ring 2s ease-out infinite;
        }
        @keyframes pulse-ring {
          0%   { transform: scale(0.8); opacity: 1; }
          100% { transform: scale(2.2); opacity: 0; }
        }

        .lp-commit-repo {
          font-size: clamp(9px, 0.75vw, 12px);
          font-weight: 700;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          opacity: 0.7;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          flex: 1;
        }

        .lp-commit-date {
          font-size: clamp(8px, 0.65vw, 10px);
          opacity: 0.3;
          letter-spacing: 0.05em;
          white-space: nowrap;
          flex-shrink: 0;
        }

        .lp-commit-msg {
          font-size: clamp(9px, 0.78vw, 12px);
          opacity: 0.45;
          line-height: 1.45;
          letter-spacing: 0.02em;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          width: 100%;
        }

        .lp-commit-skeleton {
          display: flex;
          flex-direction: column;
          gap: 6px;
          width: 100%;
        }
        .lp-skel {
          border-radius: 4px;
          background: var(--border);
          animation: skel-pulse 1.4s ease-in-out infinite;
        }
        @keyframes skel-pulse {
          0%, 100% { opacity: 0.4; }
          50%       { opacity: 0.15; }
        }

        /* ── BOT ROW: resume | map ── */
        .lp-resume {
          flex: 50;
          cursor: pointer;
          font-size: clamp(9px, 0.8vw, 12px);
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          text-decoration: none;
          color: var(--text);
          flex-direction: column;
          gap: clamp(2px, 0.3vh, 5px);
        }
        .lp-resume:hover {
          background: var(--text) !important;
          color: var(--bg) !important;
          border-color: var(--text) !important;
          box-shadow: none !important;
        }
        .lp-resume:hover::before { display: none; }
        .lp-resume-sub {
          font-size: clamp(7px, 0.6vw, 9px);
          opacity: 0.35;
          font-weight: 400;
          letter-spacing: 0.06em;
          text-transform: uppercase;
        }
        .lp-resume:hover .lp-resume-sub { opacity: 0.55; }

        .lp-map {
          flex: 50;
          padding: 0;
          overflow: hidden;
          cursor: default;
        }

        .lp-map-svg {
          width: 100%;
          height: 100%;
          display: block;
        }

        /* continent shapes — very minimal */
        .map-land {
          fill: none;
          stroke: var(--text);
          stroke-width: 0.5;
          opacity: 0.12;
        }

        /* grid lines */
        .map-grid {
          stroke: var(--text);
          stroke-width: 0.3;
          opacity: 0.06;
        }

        /* city label */
        .map-city-label {
          font-size: 5px;
          fill: var(--text);
          opacity: 0.45;
          font-family: 'Open Sauce Sans', sans-serif;
          letter-spacing: 0.06em;
          text-transform: uppercase;
        }

        /* pin dot */
        .map-pin-outer {
          fill: rgba(59,255,110,0.18);
          animation: pulse-ring 2.5s ease-out infinite;
        }
        .map-pin-inner {
          fill: #3bff6e;
        }

        /* stagger delays for new cells */
        .anim-lp-li  { animation-delay: 0.28s; }
        .anim-lp-th  { animation-delay: 0.30s; }
        .anim-lp-gh  { animation-delay: 0.32s; }
        .anim-lp-mid { animation-delay: 0.33s; }
        .anim-lp-cv  { animation-delay: 0.35s; }
        .anim-lp-map { animation-delay: 0.37s; }
      `}</style>

      <div className="links-panel">

        {/* ── TOP ROW: linkedin | theme | github ── */}
        <div className="lp-row-top">

          <a
            href="https://linkedin.com/in/pranjwal-singh-01979b242/"
            className="lp-cell lp-social anim-lp-li"
            target="_blank"
            rel="noopener noreferrer"
            title="LinkedIn"
          >
            <LuLinkedin />
          </a>

          <div className="lp-cell lp-theme anim-lp-th">
            <div className="lp-theme-inner">
              <button
                onClick={() => setTheme("light")}
                className={`lp-theme-btn ${theme === "light" ? "active" : ""}`}
              >
                <LuSun />
              </button>
              <button
                onClick={() => setTheme("dark")}
                className={`lp-theme-btn ${theme === "dark" ? "active" : ""}`}
              >
                <LuMoon />
              </button>
            </div>
          </div>

          <a
            href={`https://github.com/${GITHUB_USER}`}
            className="lp-cell lp-social anim-lp-gh"
            target="_blank"
            rel="noopener noreferrer"
            title="GitHub"
          >
            <LuGithub />
          </a>

        </div>

        {/* ── MID ROW: latest commit ── */}
        <a
          href={commit?.url ?? `https://github.com/${GITHUB_USER}`}
          className="lp-cell lp-commit lp-row-mid anim-lp-mid"
          target="_blank"
          rel="noopener noreferrer"
          style={{ textDecoration: "none" }}
        >
          {commitLoading ? (
            <div className="lp-commit-skeleton">
              <div className="lp-skel" style={{ height: "10px", width: "55%" }} />
              <div className="lp-skel" style={{ height: "9px", width: "80%" }} />
              <div className="lp-skel" style={{ height: "9px", width: "65%" }} />
            </div>
          ) : commit ? (
            <>
              <div className="lp-commit-header">
                <span className="lp-pulse-dot" />
                <span className="lp-commit-repo">{commit.repo}</span>
                <span className="lp-commit-date">{commit.date}</span>
              </div>
              <p className="lp-commit-msg">{commit.message}</p>
            </>
          ) : (
            <span style={{ fontSize: "clamp(9px,0.75vw,11px)", opacity: 0.3, letterSpacing: "0.06em", textTransform: "uppercase" }}>
              no recent activity
            </span>
          )}
        </a>

        {/* ── BOT ROW: resume | map ── */}
        <div className="lp-row-bot">

          <a
            href="/resume.pdf"
            download
            className="lp-cell lp-resume anim-lp-cv"
          >
            <span>Download CV</span>
            <span className="lp-resume-sub">PDF · Latest</span>
          </a>

          {/* Minimal SVG map — pinned to Montréal */}
          <div className="lp-cell lp-map anim-lp-map">
            <svg
              className="lp-map-svg"
              viewBox="0 0 200 140"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="xMidYMid slice"
            >
              {/* Lat/lon grid */}
              {[0,35,70,105,140,175,200].map(x => (
                <line key={`vg${x}`} className="map-grid" x1={x} y1={0} x2={x} y2={140} />
              ))}
              {[0,28,56,84,112,140].map(y => (
                <line key={`hg${y}`} className="map-grid" x1={0} y1={y} x2={200} y2={y} />
              ))}

              {/* Very rough North America outline — just enough to orient */}
              <path
                className="map-land"
                d="M60,10 L75,8 L95,5 L115,6 L130,10 L145,8 L158,12
                   L165,20 L168,30 L163,42 L155,52 L148,65 L150,78
                   L144,88 L138,95 L130,100 L122,108 L115,115
                   L108,120 L100,125 L92,120 L84,112 L80,102
                   L72,95 L65,88 L58,78 L52,68 L48,56 L44,44
                   L42,32 L45,22 L52,14 Z"
              />

              {/* Canada rough interior line */}
              <path
                className="map-land"
                d="M58,42 L80,38 L100,35 L120,36 L140,40 L155,44"
              />

              {/* Pin: Montréal */}
              {/* pulse ring */}
              <circle cx={PIN_X} cy={PIN_Y} r="10" className="map-pin-outer" />
              {/* inner dot */}
              <circle cx={PIN_X} cy={PIN_Y} r="3" className="map-pin-inner" />

              {/* City label — positioned to not overlap pin */}
              <text
                x={PIN_X + 6}
                y={PIN_Y - 5}
                className="map-city-label"
              >
                {CITY_LABEL}
              </text>
            </svg>
          </div>

        </div>
      </div>
    </>
  );
};

export default LinksPanel;