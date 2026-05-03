/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect, useId } from "react";
import { LuLinkedin, LuGithub, LuInstagram } from "react-icons/lu";

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
/* ─── BB8 Toggle — scales via font-size to fill its container ── */
const BB8Toggle: React.FC<{
  theme: "dark" | "light";
  setTheme: (t: "dark" | "light") => void;
}> = ({ theme, setTheme }) => {
  const uid = useId().replace(/:/g, "");
  const isDay = theme === "light";

  return (
    <>
      <style>{`
        .bb8-wrap-${uid} {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          overflow: hidden;
        }

        .bb8-toggle-${uid} {
          --toggle-size: clamp(5px, 0.55vw, 8px);
          --toggle-width:  10.625em;
          --toggle-height: 5.625em;
          --toggle-offset: calc((var(--toggle-height) - var(--bb8-diameter)) / 2);
          --toggle-bg: linear-gradient(#2c4770, #070e2b 35%, #628cac 50% 70%, #a6c5d4) no-repeat;
          --bb8-diameter: 4.375em;
          --radius: 99em;
          --transition: 0.4s;
          --accent: #888;
          --bb8-bg: #ddd;
          font-size: var(--toggle-size);
          display: block;
          flex-shrink: 0;
        }

        .bb8-toggle-${uid} * { box-sizing: border-box; }

        .bb8-container-${uid} {
          width: var(--toggle-width);
          height: var(--toggle-height);
          background: var(--toggle-bg);
          background-size: 100% 11.25em;
          background-position-y: ${isDay ? "-5.625em" : "0"};
          border-radius: var(--radius);
          position: relative;
          transition: var(--transition);
          filter: saturate(0.15) brightness(0.9);
        }

        .bb8-droid-${uid} {
          display: flex; flex-direction: column; align-items: center;
          position: absolute;
          top: calc(var(--toggle-offset) - 1.688em + 0.188em);
          left: ${isDay ? "calc(100% - var(--bb8-diameter) - var(--toggle-offset))" : "var(--toggle-offset)"};
          transition: var(--transition);
          z-index: 2;
        }

        .bb8-headcont-${uid} {
          position: relative; transition: var(--transition); z-index: 2;
          transform-origin: 1.25em 3.75em;
        }

        .bb8-head-${uid} {
          overflow: hidden; margin-bottom: -0.188em;
          width: 2.5em; height: 1.688em;
          background:
            linear-gradient(transparent .063em, dimgray .063em .313em, transparent .313em .375em, var(--accent) .375em .5em, transparent .5em 1.313em, silver 1.313em 1.438em, transparent 1.438em),
            linear-gradient(45deg, transparent .188em, var(--bb8-bg) .188em 1.25em, transparent 1.25em),
            linear-gradient(-45deg, transparent .188em, var(--bb8-bg) .188em 1.25em, transparent 1.25em),
            linear-gradient(var(--bb8-bg) 1.25em, transparent 1.25em);
          border-radius: var(--radius) var(--radius) 0 0;
          position: relative; z-index: 1;
          filter: drop-shadow(0 .063em .125em gray);
        }

        .bb8-head-${uid}::before {
          content: ""; position: absolute;
          width: .563em; height: .563em;
          background:
            radial-gradient(.125em circle at .25em .375em, #666, transparent),
            radial-gradient(.063em circle at .375em .188em, var(--bb8-bg) 50%, transparent 100%),
            linear-gradient(45deg, #222 .188em, dimgray .313em .375em, #222 .5em);
          border-radius: var(--radius);
          top: .413em;
          left: ${isDay ? "100%" : "50%"};
          transform: translate(-50%);
          box-shadow: 0 0 0 .089em lightgray, .563em .281em 0 -.148em, .563em .281em 0 -.1em var(--bb8-bg), .563em .281em 0 -.063em;
          z-index: 1; transition: var(--transition);
        }

        .bb8-head-${uid}::after {
          content: ""; position: absolute;
          bottom: .375em; left: 0; width: 100%; height: .188em;
          background: linear-gradient(to right,
            var(--accent) .125em, transparent .125em .188em, var(--accent) .188em .313em,
            transparent .313em .375em, var(--accent) .375em .938em,
            transparent .938em 1em, var(--accent) 1em 1.125em,
            transparent 1.125em 1.875em, var(--accent) 1.875em 2em,
            transparent 2em 2.063em, var(--accent) 2.063em 2.25em,
            transparent 2.25em 2.313em, var(--accent) 2.313em 2.375em,
            transparent 2.375em 2.438em, var(--accent) 2.438em);
          transition: var(--transition);
          background-position: ${isDay ? "-1.375em 0" : "0 0"};
        }

        .bb8-antenna-${uid} {
          position: absolute; transform: translateY(-90%);
          width: .059em; border-radius: var(--radius) var(--radius) 0 0;
          transition: var(--transition);
        }
        .bb8-antenna-${uid}:nth-child(1) {
          height: .938em; right: .938em;
          background: linear-gradient(#222 .188em, silver .188em);
        }
        .bb8-antenna-${uid}:nth-child(2) {
          height: .375em; background: silver;
          left: ${isDay ? "calc(100% - 0.938em)" : "50%"};
          transform: translate(-50%, -90%);
        }

        .bb8-body-${uid} {
          width: 4.375em; height: 4.375em;
          border-radius: var(--radius);
          position: relative; overflow: hidden;
          transition: var(--transition); z-index: 1;
          transform: ${isDay ? "rotate(225deg)" : "rotate(45deg)"};
          background:
            linear-gradient(-90deg, var(--bb8-bg) 4%, var(--accent) 4% 10%, transparent 10% 90%, var(--accent) 90% 96%, var(--bb8-bg) 96%),
            linear-gradient(var(--bb8-bg) 4%, var(--accent) 4% 10%, transparent 10% 90%, var(--accent) 90% 96%, var(--bb8-bg) 96%),
            linear-gradient(to right, transparent 2.156em, silver 2.156em 2.219em, transparent 2.188em),
            linear-gradient(transparent 2.156em, silver 2.156em 2.219em, transparent 2.188em);
          background-color: var(--bb8-bg);
        }

        .bb8-body-${uid}::before {
          content: ""; width: 2.625em; height: 2.625em;
          position: absolute; border-radius: 50%; overflow: hidden;
          top: 50%; left: 50%; transform: translate(-50%, -50%);
          border: .313em solid var(--accent);
          background:
            radial-gradient(1em circle at center, #ccc 50%, transparent 51%),
            radial-gradient(1.25em circle at center, var(--bb8-bg) 50%, transparent 51%),
            linear-gradient(-90deg, transparent 42%, var(--accent) 42% 58%, transparent 58%),
            linear-gradient(var(--bb8-bg) 42%, var(--accent) 42% 58%, var(--bb8-bg) 58%);
        }

        .bb8-body-${uid}::after {
          content: ""; bottom: 1.5em; left: .563em; position: absolute;
          width: .188em; height: .188em;
          background: #ccc; color: #ccc; border-radius: 50%;
          box-shadow: .875em .938em, 0 -1.25em, .875em -2.125em, 2.125em -2.125em, 3.063em -1.25em, 3.063em 0, 2.125em .938em;
        }

        .bb8-hidden-${uid} {
          position: absolute; border-radius: inherit;
          inset: 0; pointer-events: none; overflow: hidden;
        }

        .bb8-shadow-${uid} {
          width: var(--bb8-diameter); height: 20%;
          border-radius: 50%; background: #333;
          box-shadow: .313em 0 3.125em #333;
          opacity: 0.2; position: absolute; bottom: 0;
          left: ${isDay ? "calc(100% - var(--bb8-diameter) - var(--toggle-offset) + 0.938em)" : "calc(var(--toggle-offset) - 0.938em)"};
          transform: ${isDay ? "skew(70deg)" : "skew(-70deg)"};
          transition: var(--transition); z-index: 1;
        }

        .bb8-scenery-${uid} {
          width: 100%; height: 100%;
          pointer-events: none; overflow: hidden;
          position: relative; border-radius: inherit;
        }
        .bb8-scenery-${uid}::before {
          content: ""; position: absolute;
          width: 100%; height: 30%; bottom: 0;
          background: #8a7060; z-index: 1;
        }

        .bb8-cloud-${uid} { z-index: 1; position: absolute; border-radius: 50%; }
        .bb8-cloud-${uid}:nth-last-child(1) {
          width: .875em; height: .625em;
          filter: blur(.125em);
          right: ${isDay ? "-100%" : "1.875em"}; top: 2.813em;
          background: rgba(255,255,255,0.5);
          transition: var(--transition);
        }
        .bb8-cloud-${uid}:nth-last-child(2) {
          top: .625em; right: ${isDay ? "-100%" : "4.375em"};
          width: .875em; height: .375em; background: rgba(200,200,200,0.5);
          filter: blur(.125em); transition: 0.6s;
        }
        .bb8-cloud-${uid}:nth-last-child(3) {
          top: 1.25em; right: ${isDay ? "-100%" : ".938em"};
          width: .875em; height: .375em; background: rgba(255,255,255,0.4);
          filter: blur(.125em); transition: 0.8s;
        }

        .bb8-star-${uid} {
          position: absolute; border-radius: var(--radius);
          background: #fff; filter: drop-shadow(0 0 .063em #fff); color: #fff;
        }

        .bb8-gomrassen-${uid}, .bb8-hermes-${uid}, .bb8-chenini-${uid} {
          position: absolute; border-radius: var(--radius);
          background: linear-gradient(#ddd, #999);
        }
        .bb8-gomrassen-${uid} {
          left: .938em; width: 1.875em; height: 1.875em;
          box-shadow: 0 0 .188em rgba(255,255,255,0.3);
          top: ${isDay ? ".938em" : "100%"}; transition: var(--transition);
        }
        .bb8-gomrassen-${uid}::before, .bb8-gomrassen-${uid}::after {
          content: ""; position: absolute; border-radius: inherit;
          background: #aaa;
        }
        .bb8-gomrassen-${uid}::before { left: .313em; top: .313em; width: .438em; height: .438em; }
        .bb8-gomrassen-${uid}::after  { width: .25em; height: .25em; left: 1.25em; top: .75em; }
        .bb8-hermes-${uid} {
          left: 3.438em; width: .625em; height: .625em;
          top: ${isDay ? "2.5em" : "100%"}; transition: 0.6s;
        }
        .bb8-chenini-${uid} {
          left: 4.375em; width: .5em; height: .5em;
          top: ${isDay ? "2.75em" : "100%"}; transition: 0.8s;
        }
        .bb8-tatto1-${uid} {
          position: absolute; width: 1.25em; height: 1.25em; border-radius: var(--radius);
          background: #e8e8e8; right: 3.125em;
          top: ${isDay ? "100%" : ".625em"}; transition: var(--transition);
        }
        .bb8-tatto2-${uid} {
          position: absolute; width: 1.25em; height: 1.25em; border-radius: var(--radius);
          background: linear-gradient(#bbb, #888); right: 1.25em;
          top: ${isDay ? "100%" : "2.188em"}; transition: 0.7s;
        }
      `}</style>

      <div className={`bb8-wrap-${uid}`} onClick={() => setTheme(isDay ? "dark" : "light")}>
        <div className={`bb8-toggle-${uid}`}>
          <div className={`bb8-container-${uid}`}>
            <div className={`bb8-scenery-${uid}`}>
              {[
                { left: "3.75em",  top: isDay ? "100%" : ".625em",  shadow: "1.25em .938em,-1.25em 2.5em,0 1.25em,1.875em .625em,-3.125em 1.875em,1.25em 2.813em", t: "0.2s" },
                { left: "4.688em", top: isDay ? "100%" : "1.875em", shadow: ".625em 0,0 .625em,-.625em -.625em,.625em .938em,-3.125em 1.25em,1.25em -1.563em", t: "0.3s" },
                { left: "5.313em", top: isDay ? "100%" : "1.25em",  shadow: "-.625em -.625em,-2.188em 1.25em,-2.188em 0,-3.75em -.625em,-3.125em -.625em,-2.5em -.313em,.75em -.625em", t: "0.4s" },
              ].map((s, i) => (
                <div key={i} className={`bb8-star-${uid}`} style={{ width: ".063em", height: ".063em", left: s.left, top: s.top, boxShadow: s.shadow, transition: s.t }} />
              ))}
              {[
                { left: "1.875em", top: isDay ? "100%" : "3.438em", t: "0.5s" },
                { left: "5em",     top: isDay ? "100%" : "3.438em", t: "0.6s" },
                { left: "2.5em",   top: isDay ? "100%" : ".313em",  t: "0.7s" },
                { left: "3.438em", top: isDay ? "100%" : "1.875em", t: "0.8s" },
              ].map((s, i) => (
                <div key={i + 3} className={`bb8-star-${uid}`} style={{ width: ".125em", height: ".125em", left: s.left, top: s.top, transition: s.t }} />
              ))}
              <div className={`bb8-tatto1-${uid}`} />
              <div className={`bb8-tatto2-${uid}`} />
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


/* ─── Leaflet Map — clean, no attribution ───────────────────────────── */
const LeafletMap: React.FC<{ theme: "dark" | "light" }> = ({ theme }) => {
  const mapRef = React.useRef<HTMLDivElement>(null);
  const leafletRef = React.useRef<any>(null);

  React.useEffect(() => {
    if (!mapRef.current) return;

    // Load Leaflet CSS
    if (!document.getElementById("leaflet-css")) {
      const link = document.createElement("link");
      link.id = "leaflet-css";
      link.rel = "stylesheet";
      link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
      document.head.appendChild(link);
    }

    // Load Leaflet JS then init
    const initMap = () => {
      const L = (window as any).L;
      if (!L || !mapRef.current || leafletRef.current) return;

      const map = L.map(mapRef.current, {
        center: [45.5017, -73.5673],
        zoom: 12,
        zoomControl: false,
        attributionControl: false,
        scrollWheelZoom: false,
        dragging: false,
        doubleClickZoom: false,
        touchZoom: false,
      });

      leafletRef.current = map;

      const tileUrl = theme === "dark"
        ? "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        : "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png";

      L.tileLayer(tileUrl, { maxZoom: 19 }).addTo(map);

      // Green pulse pin
      const pinIcon = L.divIcon({
        className: "lp-map-pin-label",
        html: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">' +
          '<circle cx="12" cy="12" r="3" fill="#3bff6e"/>' +
          '<circle cx="12" cy="12" r="6" stroke="#3bff6e" stroke-width="1.5" fill="none"/>' +
          '<line x1="12" y1="2" x2="12" y2="7" stroke="#3bff6e" stroke-width="1.5" stroke-linecap="round"/>' +
          '<line x1="12" y1="17" x2="12" y2="22" stroke="#3bff6e" stroke-width="1.5" stroke-linecap="round"/>' +
          '<line x1="2" y1="12" x2="7" y2="12" stroke="#3bff6e" stroke-width="1.5" stroke-linecap="round"/>' +
          '<line x1="17" y1="12" x2="22" y2="12" stroke="#3bff6e" stroke-width="1.5" stroke-linecap="round"/>' +
          '</svg>',
        iconSize: [16, 16],
        iconAnchor: [8, 8],
      });

      L.marker([45.5017, -73.5673], { icon: pinIcon }).addTo(map);
    };

    if ((window as any).L) {
      initMap();
    } else {
      const script = document.createElement("script");
      script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
      script.onload = initMap;
      document.head.appendChild(script);
    }

    return () => {
      if (leafletRef.current) {
        leafletRef.current.remove();
        leafletRef.current = null;
      }
    };
  }, []);

  // Swap tiles on theme change
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

  return <div ref={mapRef} className="lp-map-leaf" />;
};

/* ─── Main Panel ─────────────────────────────────────── */
const LinksPanel: React.FC<LinksPanelProps> = ({ theme, setTheme }) => {
  const [commit, setCommit] = useState<CommitData | null>(null);
  const [commitLoading, setCommitLoading] = useState(true);

  useEffect(() => {
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

  return (
    <>
      <style>{`
        /*
          height:100% + min-height:0 + overflow:hidden on the panel AND every
          row is what keeps this from pushing past its flex allotment.
          This is the key fix — all three must be present on each level.
        */
        .links-panel {
          height: 100%;
          min-height: 0;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          gap: var(--gap);
        }

        /* 30 / 40 / 30 vertical split — overflow:hidden + min-height:0 are critical */
        .lp-row-top { flex: 30 30 0; display: flex; gap: var(--gap); min-height: 0; overflow: hidden; }
        .lp-row-mid { flex: 40 40 0; min-height: 0; overflow: hidden; }
        .lp-row-bot { flex: 30 30 0; display: flex; gap: var(--gap); min-height: 0; overflow: hidden; }

        /* shared glass cell */
        .lp-cell {
          border-radius: var(--radius);
          background: var(--glass-bg);
          backdrop-filter: blur(var(--glass-blur));
          -webkit-backdrop-filter: blur(var(--glass-blur));
          border: 1px solid var(--glass-border);
          box-shadow: var(--glass-shadow);
          display: flex; align-items: center; justify-content: center;
          position: relative; overflow: hidden; min-width: 0; min-height: 0;
          transition: background 0.22s, border-color 0.22s, color 0.22s;
          animation: box-enter var(--anim-dur) var(--anim-ease) backwards;
        }
        .lp-cell::before {
          content: ''; position: absolute; inset: 0;
          border-radius: var(--radius);
          background: linear-gradient(160deg, var(--glass-highlight) 0%, transparent 40%);
          pointer-events: none; z-index: 0;
        }
        .lp-cell > * { position: relative; z-index: 1; }

        /* social icon cells */
        .lp-social {
          flex: 1; cursor: pointer;
          color: var(--text); text-decoration: none;
          font-size: clamp(14px, 1.5vw, 20px);
        }
        .lp-social:hover { background: var(--text) !important; color: var(--bg); border-color: var(--text) !important; box-shadow: none !important; }
        .lp-social:hover::before { display: none; }


        /* bb8 cell — transparent, no border, clipped to row height */
        .lp-bb8 {
          flex: 1.4; padding: 0; cursor: pointer;
          background: transparent !important;
          border-color: transparent !important;
          box-shadow: none !important;
          overflow: hidden;
        }
        .lp-bb8::before { display: none; }

        /* commit strip */
        .lp-commit {
          width: 100%; height: 100%;
          padding: clamp(6px, 0.8vw, 12px) clamp(8px, 1vw, 14px);
          flex-direction: column; align-items: flex-start; justify-content: center;
          gap: clamp(2px, 0.3vh, 5px);
          cursor: pointer; text-decoration: none; color: var(--text);
        }
        .lp-commit:hover { border-color: var(--hover-border) !important; }

        .lp-commit-eyebrow {
          display: flex; align-items: center; gap: clamp(4px, 0.45vw, 6px);
          width: 100%; flex-shrink: 0;
        }
        .lp-pulse-dot {
          width: clamp(5px, 0.5vw, 7px); height: clamp(5px, 0.5vw, 7px);
          border-radius: 50%; background: #3bff6e; flex-shrink: 0; position: relative;
        }
        .lp-pulse-dot::after {
          content: ''; position: absolute; inset: -3px; border-radius: 50%;
          background: rgba(59,255,110,0.3);
          animation: pulse-ring 2s ease-out infinite;
        }
        @keyframes pulse-ring { 0%{transform:scale(0.8);opacity:1} 100%{transform:scale(2.4);opacity:0} }

        .lp-eyebrow-label {
          font-size: clamp(7px, 0.58vw, 9px); letter-spacing: 0.12em;
          text-transform: uppercase; opacity: 0.28; font-weight: 600;
        }
        .lp-eyebrow-date {
          font-size: clamp(7px, 0.58vw, 9px); opacity: 0.22;
          letter-spacing: 0.05em; margin-left: auto; white-space: nowrap; flex-shrink: 0;
        }

        .lp-commit-repo-row {
          display: flex; align-items: baseline; gap: clamp(3px, 0.35vw, 5px);
          width: 100%; flex-shrink: 0;
        }
        .lp-repo-tag {
          font-size: clamp(7px, 0.58vw, 9px); letter-spacing: 0.1em;
          text-transform: uppercase; opacity: 0.3; font-weight: 500; flex-shrink: 0;
        }
        .lp-commit-repo {
          font-size: clamp(8px, 0.75vw, 11px); font-weight: 700;
          letter-spacing: 0.05em; text-transform: uppercase; opacity: 0.75;
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        }

        .lp-commit-label {
          font-size: clamp(7px, 0.58vw, 9px); letter-spacing: 0.1em;
          text-transform: uppercase; opacity: 0.25; font-weight: 500; flex-shrink: 0;
        }
        .lp-commit-msg {
          font-size: clamp(8px, 0.68vw, 11px); opacity: 0.42;
          line-height: 1.4; letter-spacing: 0.02em;
          display: -webkit-box; -webkit-line-clamp: 2;
          -webkit-box-orient: vertical; overflow: hidden; width: 100%;
        }

        .lp-skel {
          border-radius: 4px; background: var(--border);
          animation: skel-pulse 1.4s ease-in-out infinite;
        }
        @keyframes skel-pulse { 0%,100%{opacity:.4} 50%{opacity:.15} }

        /* resume */
        .lp-resume {
          flex: 1; cursor: pointer;
          font-size: clamp(8px, 0.72vw, 11px); font-weight: 600;
          letter-spacing: 0.08em; text-transform: uppercase;
          text-decoration: none; color: var(--text);
          flex-direction: column; gap: clamp(1px, 0.15vh, 3px);
        }
        .lp-resume:hover { background: var(--text) !important; color: var(--bg) !important; border-color: var(--text) !important; box-shadow: none !important; }
        .lp-resume:hover::before { display: none; }
        .lp-resume-sub { font-size: clamp(6px, 0.52vw, 8px); opacity: 0.3; font-weight: 400; letter-spacing: 0.06em; }
        .lp-resume:hover .lp-resume-sub { opacity: 0.5; }

        /* map */
        .lp-map { flex: 1; padding: 0; overflow: hidden; cursor: default; min-height: 0; }
        .lp-map-leaf {
          width: 100%; height: 100%; min-height: 0;
        }
        /* hide all leaflet attribution/watermark */
        .lp-map-leaf .leaflet-control-attribution,
        .lp-map-leaf .leaflet-control-zoom,
        .lp-map-leaf .leaflet-control-container { display: none !important; }
        /* pin label */
        .lp-map-pin-label {
          background: transparent !important;
          border: none !important;
          box-shadow: none !important;
          font-family: 'Open Sauce Sans', sans-serif;
          font-size: clamp(7px, 0.6vw, 10px);
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #3bff6e;
          white-space: nowrap;
          pointer-events: none;
        }

        /* stagger */
        .anim-lp-li  { animation-delay: 0.28s; }
        .anim-lp-gh  { animation-delay: 0.30s; }
        .anim-lp-bb8 { animation-delay: 0.32s; }
        .anim-lp-ph  { animation-delay: 0.34s; }
        .anim-lp-mid { animation-delay: 0.33s; }
        .anim-lp-cv  { animation-delay: 0.35s; }
        .anim-lp-map { animation-delay: 0.37s; }
      `}</style>

      <div className="links-panel">

        {/* TOP 30%: linkedin | github | bb8 | placeholder */}
        <div className="lp-row-top">
          <a href="https://www.linkedin.com/in/pranjwal-s-01979b242/" className="lp-cell lp-social anim-lp-li" target="_blank" rel="noopener noreferrer">
            <LuLinkedin />
          </a>
          <a href={`https://github.com/${GITHUB_USER}`} className="lp-cell lp-social anim-lp-gh" target="_blank" rel="noopener noreferrer">
            <LuGithub />
          </a>
          <div className="lp-cell lp-bb8 anim-lp-bb8">
            <BB8Toggle theme={theme} setTheme={setTheme} />
          </div>
          <a href="https://instagram.com/" className="lp-cell lp-social anim-lp-ph" target="_blank" rel="noopener noreferrer">
            <LuInstagram />
          </a>
        </div>

        {/* MID 40%: commit strip */}
        <a href={commit?.url ?? `https://github.com/${GITHUB_USER}`} className="lp-cell lp-commit lp-row-mid anim-lp-mid" target="_blank" rel="noopener noreferrer">
          {commitLoading ? (
            <div style={{ display: "flex", flexDirection: "column", gap: "clamp(3px,0.4vh,6px)", width: "100%" }}>
              <div className="lp-skel" style={{ height: "clamp(5px,0.6vh,8px)", width: "38%" }} />
              <div className="lp-skel" style={{ height: "clamp(6px,0.7vh,9px)", width: "65%" }} />
              <div className="lp-skel" style={{ height: "clamp(5px,0.6vh,8px)", width: "52%" }} />
            </div>
          ) : commit ? (
            <>
              <div className="lp-commit-eyebrow">
                <span className="lp-pulse-dot" />
                <span className="lp-eyebrow-label">Currently working</span>
                <span className="lp-eyebrow-date">{commit.date}</span>
              </div>
              <div className="lp-commit-repo-row">
                <span className="lp-repo-tag">Repo</span>
                <span className="lp-commit-repo">{commit.repo}</span>
              </div>
              <span className="lp-commit-label">Latest commit</span>
              <p className="lp-commit-msg">{commit.message}</p>
            </>
          ) : (
            <span style={{ fontSize: "clamp(7px,.65vw,10px)", opacity: 0.25, letterSpacing: "0.08em", textTransform: "uppercase" }}>
              No recent activity · github.com/{GITHUB_USER}
            </span>
          )}
        </a>

        {/* BOT 30%: resume | map */}
        <div className="lp-row-bot">
          <a href="/Pranjwal_Singh_CV__old.pdf" download className="lp-cell lp-resume anim-lp-cv">
            <span>Download CV</span>
            <span className="lp-resume-sub">PDF · Latest</span>
          </a>
          <div className="lp-cell lp-map anim-lp-map">
            <LeafletMap theme={theme} />
          </div>
        </div>

      </div>
    </>
  );
};

export default LinksPanel;