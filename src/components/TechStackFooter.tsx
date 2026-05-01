import React from "react";

interface TechLogo {
  name: string;
  svg: React.ReactNode;
}

interface TechStackFooterProps {
  logos?: TechLogo[];
}

const DEFAULT_LOGOS: TechLogo[] = [
  {
    name: "React",
    svg: (
      <svg viewBox="0 0 256 230" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid">
        <circle cx="128" cy="128" r="50" fill="none" stroke="currentColor" strokeWidth="8" opacity="0.7"/>
        <circle cx="90" cy="100" r="6" fill="currentColor" opacity="0.7"/>
        <circle cx="128" cy="75" r="6" fill="currentColor" opacity="0.7"/>
        <circle cx="166" cy="100" r="6" fill="currentColor" opacity="0.7"/>
        <g opacity="0.7">
          <path d="M 90 100 Q 128 75 166 100" stroke="currentColor" strokeWidth="5" fill="none"/>
          <path d="M 90 100 Q 128 140 166 100" stroke="currentColor" strokeWidth="5" fill="none"/>
        </g>
      </svg>
    ),
  },
  {
    name: "TypeScript",
    svg: (
      <svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid">
        <rect x="4" y="4" width="40" height="40" fill="none" stroke="currentColor" strokeWidth="1.5" rx="3" opacity="0.7"/>
        <text x="24" y="32" fontSize="24" fontWeight="bold" textAnchor="middle" fill="currentColor" opacity="0.7" fontFamily="monospace">
          TS
        </text>
      </svg>
    ),
  },
  {
    name: "JavaScript",
    svg: (
      <svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid">
        <rect x="4" y="4" width="40" height="40" fill="none" stroke="currentColor" strokeWidth="1.5" rx="3" opacity="0.7"/>
        <text x="24" y="32" fontSize="22" fontWeight="bold" textAnchor="middle" fill="currentColor" opacity="0.7" fontFamily="monospace">
          JS
        </text>
      </svg>
    ),
  },
  {
    name: "Node.js",
    svg: (
      <svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid">
        <path d="M 12 16 L 24 24 L 12 32 L 24 40 L 36 32 L 24 24 L 36 16 L 24 8 Z" stroke="currentColor" fill="none" strokeWidth="1.5" opacity="0.7"/>
      </svg>
    ),
  },
  {
    name: "Python",
    svg: (
      <svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid">
        <circle cx="20" cy="20" r="8" stroke="currentColor" fill="none" strokeWidth="1.5" opacity="0.7"/>
        <circle cx="28" cy="28" r="8" stroke="currentColor" fill="none" strokeWidth="1.5" opacity="0.7"/>
        <line x1="24" y1="16" x2="24" y2="32" stroke="currentColor" strokeWidth="1.5" opacity="0.7"/>
        <line x1="16" y1="24" x2="32" y2="24" stroke="currentColor" strokeWidth="1.5" opacity="0.7"/>
      </svg>
    ),
  },
  {
    name: "PostgreSQL",
    svg: (
      <svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid">
        <circle cx="24" cy="20" r="6" stroke="currentColor" fill="none" strokeWidth="1.5" opacity="0.7"/>
        <path d="M 18 26 Q 12 30 12 36 Q 12 40 18 42 L 30 42 Q 36 40 36 36 Q 36 30 30 26" stroke="currentColor" fill="none" strokeWidth="1.5" opacity="0.7"/>
      </svg>
    ),
  },
  {
    name: "Docker",
    svg: (
      <svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid">
        <g opacity="0.7">
          <rect x="8" y="14" width="6" height="6" fill="none" stroke="currentColor" strokeWidth="1.5"/>
          <rect x="16" y="14" width="6" height="6" fill="none" stroke="currentColor" strokeWidth="1.5"/>
          <rect x="24" y="14" width="6" height="6" fill="none" stroke="currentColor" strokeWidth="1.5"/>
          <rect x="32" y="14" width="6" height="6" fill="none" stroke="currentColor" strokeWidth="1.5"/>
          <rect x="8" y="22" width="6" height="6" fill="none" stroke="currentColor" strokeWidth="1.5"/>
          <rect x="16" y="22" width="6" height="6" fill="none" stroke="currentColor" strokeWidth="1.5"/>
          <rect x="24" y="22" width="6" height="6" fill="none" stroke="currentColor" strokeWidth="1.5"/>
        </g>
      </svg>
    ),
  },
  {
    name: "Git",
    svg: (
      <svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid">
        <circle cx="24" cy="24" r="16" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.7"/>
        <circle cx="16" cy="16" r="3" fill="currentColor" opacity="0.7"/>
        <circle cx="32" cy="24" r="3" fill="currentColor" opacity="0.7"/>
        <circle cx="24" cy="32" r="3" fill="currentColor" opacity="0.7"/>
        <line x1="18" y1="18" x2="30" y2="30" stroke="currentColor" strokeWidth="1.5" opacity="0.7"/>
      </svg>
    ),
  },
  {
    name: "MongoDB",
    svg: (
      <svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid">
        <path d="M 24 10 C 20 14 18 22 18 28 C 18 36 22 40 24 40 C 26 40 30 36 30 28 C 30 22 28 14 24 10 Z" stroke="currentColor" fill="none" strokeWidth="1.5" opacity="0.7"/>
        <circle cx="24" cy="22" r="2" fill="currentColor" opacity="0.7"/>
      </svg>
    ),
  },
  {
    name: "Tailwind CSS",
    svg: (
      <svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid">
        <path d="M 16 16 Q 12 20 12 24 Q 12 32 20 32 Q 28 32 32 24" stroke="currentColor" fill="none" strokeWidth="1.5" opacity="0.7"/>
        <path d="M 32 16 Q 36 20 36 24 Q 36 32 28 32 Q 20 32 16 24" stroke="currentColor" fill="none" strokeWidth="1.5" opacity="0.7"/>
        <circle cx="24" cy="24" r="2" fill="currentColor" opacity="0.7"/>
      </svg>
    ),
  },
  {
    name: "Next.js",
    svg: (
      <svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid">
        <path d="M 10 24 L 24 10 L 38 24 M 24 10 L 24 38" stroke="currentColor" fill="none" strokeWidth="1.5" opacity="0.7"/>
        <circle cx="24" cy="24" r="3" fill="currentColor" opacity="0.7"/>
      </svg>
    ),
  },
];

const TechStackFooter: React.FC<TechStackFooterProps> = ({ logos = DEFAULT_LOGOS }) => {
  // Duplicate 4x times to ensure seamless infinite loop
  const quadrupledLogos = [...logos, ...logos, ...logos, ...logos];

  return (
    <>
      <style>{`
        @keyframes scroll-infinite {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-25% - clamp(12px, 1.6vw, 24px)));
          }
        }

        .tech-stack-footer {
          height: var(--footer-h);
          border-top: 1px solid var(--border);
          display: flex;
          align-items: center;
          padding: 0 var(--pad);
          font-size: var(--fs-ui);
          gap: clamp(8px, 1.2vw, 16px);
          overflow: hidden;
          background: var(--bg);
          position: relative;
        }

        .tech-stack-label {
          font-size: clamp(10px, 0.85vw, 13px);
          opacity: 0.4;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          font-weight: 600;
          white-space: nowrap;
          flex-shrink: 0;
          z-index: 10;
          padding-right: clamp(4px, 0.8vw, 8px);
        }

        .tech-scroll-container {
          display: flex;
          align-items: center;
          flex: 1;
          position: relative;
          overflow: hidden;
          mask-image: linear-gradient(
            to right,
            transparent 0%,
            black 8%,
            black 92%,
            transparent 100%
          );
          -webkit-mask-image: linear-gradient(
            to right,
            transparent 0%,
            black 8%,
            black 92%,
            transparent 100%
          );
        }

        .tech-scroll-inner {
          display: inline-flex;
          align-items: center;
          gap: clamp(12px, 1.6vw, 24px);
          animation: scroll-infinite 50s linear infinite;
          will-change: transform;
        }

        .tech-scroll-inner:hover {
          animation-play-state: paused;
        }

        .tech-logo {
          width: clamp(24px, 3vw, 40px);
          height: clamp(24px, 3vw, 40px);
          flex-shrink: 0;
          color: var(--text);
          opacity: 0.65;
          transition: opacity 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .tech-logo:hover {
          opacity: 1;
        }

        .tech-logo svg {
          width: 100%;
          height: 100%;
        }
      `}</style>

      <div className="tech-stack-footer">
        <span className="tech-stack-label">Tech Stack</span>

        <div className="tech-scroll-container">
          <div className="tech-scroll-inner">
            {quadrupledLogos.map((logo, idx) => (
              <div key={idx} className="tech-logo" title={logo.name}>
                {logo.svg}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default TechStackFooter;