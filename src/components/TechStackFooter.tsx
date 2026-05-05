import React from "react";

interface TechLogo {
  name: string;
  svg: React.ReactNode;
}

interface TechStackFooterProps {
  logos?: TechLogo[];
  theme?: "dark" | "light";
}

const LOGO_NAMES = [
  "react", "python", "typescript", "fastapi", "celery", "redis",
  "postgresql", "supabase", "docker", "git", "kotlin", "langchain",
  "mongodb", "vercel", "render", "linux", "c-language", "cplusplus", "vuedotjs",
  "dotnet", "sqlite"
];

const TechStackFooter: React.FC<TechStackFooterProps> = ({ theme = "dark" }) => {
  const logos: TechLogo[] = LOGO_NAMES.map(name => ({
    name,
    svg: (
      <img
        src={`/assets/logos/${name}.svg`}
        alt={name}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "contain",
          filter: theme === "dark"
            ? "brightness(0) invert(1)"
            : "brightness(0)",
          opacity: theme === "dark" ? 0.55 : 0.35,
        }}
      />
    ),
  }));

  const quadrupledLogos = [...logos, ...logos, ...logos, ...logos];

  return (
    <>
      <style>{`
        @keyframes scroll-infinite {
          0%   { transform: translateX(0); }
          100% { transform: translateX(calc(-25% - clamp(24px, 3vw, 48px))); }
        }

        .tech-stack-footer {
          height: calc(var(--footer-h) + 10px);
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
          mask-image: linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%);
          -webkit-mask-image: linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%);
        }

        .tech-scroll-inner {
          display: inline-flex;
          align-items: center;
          gap: clamp(32px, 4vw, 64px);
          animation: scroll-infinite 60s linear infinite;
          will-change: transform;
          padding: 10px 0;
        }

        .tech-scroll-inner:hover {
          animation-play-state: paused;
        }

        .tech-logo {
          width: clamp(22px, 2.6vw, 34px);
          height: clamp(22px, 2.6vw, 34px);
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: opacity 0.3s ease;
          margin: 8px 0;
        }

        .tech-logo:hover {
          opacity: 1 !important;
        }

        .tech-logo img {
          width: 100%;
          height: 100%;
          object-fit: contain;
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