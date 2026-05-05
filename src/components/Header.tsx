/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from "react";

interface HeaderProps {
  theme: string;
  setTheme: React.Dispatch<React.SetStateAction<"light" | "dark">>;
}

const Header: React.FC<HeaderProps> = ({ theme }) => {
  const [city,    setCity]    = useState<string | null>(null);
  const [weather, setWeather] = useState<string | null>(null);
  const [time, setTime] = useState(
    new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  );

  useEffect(() => {
    const iv = setInterval(() => {
      setTime(
        new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      );
    }, 60000);
    return () => clearInterval(iv);
  }, []);

  useEffect(() => {
    (async () => {
      // Location fetch — independent, hide if it fails
      let lat: number | null = null;
      let lon: number | null = null;
      try {
        const r = await fetch("https://ipapi.co/json/");
        const d = await r.json();
        if (d?.city) setCity(d.city);
        if (d?.latitude)  lat = d.latitude;
        if (d?.longitude) lon = d.longitude;
      } catch {
        // city stays null → hidden
      }

      // Weather fetch — independent, hide if it fails or if no coords
      if (lat !== null && lon !== null) {
        try {
          const wr = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`
          );
          const wd = await wr.json();
          if (wd?.current_weather?.temperature != null) {
            setWeather(`${Math.round(wd.current_weather.temperature)}°C`);
          }
        } catch {
          // weather stays null → hidden
        }
      }
    })();
  }, []);

  // Build the subtitle line from only what resolved
  const subtitleParts = [time, weather].filter(Boolean).join(" · ");
  const showLeft = city || subtitleParts;

  return (
    <>
      <style>{`
        .site-header {
          width: 100%;
          height: var(--header-h);
          background: var(--bg);
          border-bottom: 1px solid rgba(255,255,255,0.06);
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          align-items: center;
          padding: 0 clamp(14px, 2vw, 32px);
          position: relative;
          overflow: hidden;
          flex-shrink: 0;
        }

        .site-header::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E");
          opacity: 0.4;
          pointer-events: none;
        }

        .site-header::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(
            90deg,
            transparent 0%,
            rgba(255,255,255,0.025) 50%,
            transparent 100%
          );
          background-size: 200% 100%;
          animation: hdr-sweep 8s ease-in-out infinite;
          pointer-events: none;
        }
        @keyframes hdr-sweep {
          0%   { background-position: -200% 0; }
          100% { background-position:  200% 0; }
        }

        .h-left {
          display: flex;
          flex-direction: column;
          gap: clamp(1px, 0.25vh, 3px);
          position: relative;
          z-index: 1;
        }
        .h-city {
          font-size: clamp(9px, 0.78vw, 12px);
          color: var(--text);
          letter-spacing: 0.14em;
          text-transform: uppercase;
          font-weight: 600;
          opacity: 0.85;
        }
        .h-timewx {
          font-size: clamp(8px, 0.65vw, 10px);
          color: var(--text);
          opacity: 0.3;
          letter-spacing: 0.08em;
          font-weight: 400;
        }

        .h-center {
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          z-index: 1;
        }
        .h-name {
          font-size: clamp(13px, 1.4vw, 20px);
          color: var(--text);
          letter-spacing: clamp(0.25em, 0.5vw, 0.5em);
          text-transform: uppercase;
          font-weight: 800;
          cursor: default;
          position: relative;
          padding-bottom: 3px;
          user-select: none;
        }
        .h-name::before,
        .h-name::after {
          content: '';
          position: absolute;
          bottom: 0;
          height: 1px;
          background: var(--text);
          opacity: 0;
          transition:
            width 0.4s cubic-bezier(0.16,1,0.3,1),
            left 0.4s cubic-bezier(0.16,1,0.3,1),
            right 0.4s cubic-bezier(0.16,1,0.3,1),
            opacity 0.2s;
          width: 0%;
        }
        .h-name::before { left: 50%; }
        .h-name::after  { right: 50%; }
        .h-name:hover::before,
        .h-name:hover::after {
          opacity: 0.5;
          width: 50%;
        }
        .h-name:hover::before { left: 50%; }
        .h-name:hover::after  { right: 50%; }

        .h-right {
          display: flex;
          flex-direction: column;
          gap: clamp(1px, 0.25vh, 3px);
          align-items: flex-end;
          position: relative;
          z-index: 1;
        }
        .h-uni {
          font-size: clamp(8px, 0.7vw, 11px);
          color: var(--text);
          opacity: 0.45;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          text-align: right;
          font-weight: 500;
        }
        .h-role {
          font-size: clamp(7px, 0.62vw, 10px);
          color: var(--text);
          opacity: 0.25;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          text-align: right;
          font-weight: 400;
        }
      `}</style>

      <header className="site-header">
        <div className="h-left">
          {city         && <span className="h-city">{city}</span>}
          {subtitleParts && <span className="h-timewx">{subtitleParts}</span>}
        </div>

        <div className="h-center">
          <span className="h-name">Pranjwal Singh</span>
        </div>

        <div className="h-right">
          <span className="h-uni">UWaterloo Computer Science · Hardware Spec</span>
          <span className="h-role">Full Stack · Web / App · AI / ML</span>
        </div>
      </header>
    </>
  );
};

export default Header;