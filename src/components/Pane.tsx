import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
} from "react";
import { createPortal } from "react-dom";

// ─────────────────────────────────────────────────────────────────────────────
// RESPONSIVE CONFIG
// ─────────────────────────────────────────────────────────────────────────────
const getResponsiveConfig = () => {
  const w = typeof window !== "undefined" ? window.innerWidth : 1024;
  const h = typeof window !== "undefined" ? window.innerHeight : 768;
  
  // Mobile: < 640px
  if (w < 640) {
    return {
      drawerWidth: "90vw",
      previewWidth: "150px",
      previewHeight: "100px",
      fontSize: {
        title: "13px",
        name: "13px",
        meta: "9px",
        sub: "11px",
        desc: "11px",
        tag: "8px",
        link: "9px",
        sectionTitle: "9px",
      },
      padding: {
        head: "12px 14px",
        body: "14px",
        card: "12px",
        gap: "8px",
      },
    };
  }
  
  // Tablet: 640px - 1024px
  if (w < 1024) {
    return {
      drawerWidth: "65vw",
      previewWidth: "200px",
      previewHeight: "140px",
      fontSize: {
        title: "14px",
        name: "14px",
        meta: "10px",
        sub: "12px",
        desc: "12px",
        tag: "9px",
        link: "10px",
        sectionTitle: "10px",
      },
      padding: {
        head: "14px 16px",
        body: "16px",
        card: "13px",
        gap: "10px",
      },
    };
  }
  
  // Desktop: >= 1024px
  return {
    drawerWidth: "45vw",
    previewWidth: "280px",
    previewHeight: "180px",
    fontSize: {
      title: "15px",
      name: "15px",
      meta: "11px",
      sub: "13px",
      desc: "13px",
      tag: "10px",
      link: "11px",
      sectionTitle: "11px",
    },
    padding: {
      head: "16px 18px",
      body: "18px",
      card: "14px",
      gap: "12px",
    },
  };
};

// ─────────────────────────────────────────────────────────────────────────────
// Shared CSS (Dynamic)
// ─────────────────────────────────────────────────────────────────────────────
const getPaneStyles = (config: ReturnType<typeof getResponsiveConfig>) => `
  .pane-backdrop {
    position: fixed; inset: 0; z-index: 200;
    background: transparent;
    backdrop-filter: blur(0px);
    transition: background 0.4s ease, backdrop-filter 0.4s ease;
  }
  .pane-backdrop.pane-vis {
    background: rgba(0,0,0,0.58);
    backdrop-filter: blur(4px);
  }
  .pane-drawer {
    position: fixed; top: 0; right: 0; bottom: 0;
    width: ${config.drawerWidth};
    max-width: 90vw;
    z-index: 201;
    transform: translateX(105%);
    transition: transform 0.42s cubic-bezier(0.32, 0.72, 0, 1);
  }
  .pane-drawer.pane-vis { transform: translateX(0); }

  /* ── Shell ── */
  .pane-shell {
    height: 100%;
    display: flex;
    flex-direction: column;
  }
  .pane-head {
    display: flex; align-items: center; justify-content: space-between;
    padding: ${config.padding.head};
    flex-shrink: 0;
  }
  .pane-head-label {
    font-family: monospace;
    font-size: ${config.fontSize.sectionTitle};
    text-transform: uppercase;
    letter-spacing: 0.14em;
    opacity: 0.35;
  }
  .pane-x {
    background: none; border: none; cursor: pointer;
    opacity: 0.28;
    width: 28px; height: 28px;
    display: flex; align-items: center; justify-content: center;
    border-radius: 6px;
    font-size: 13px;
    transition: opacity 0.15s, background 0.15s;
  }
  .pane-x:hover { opacity: 0.85; }

  .pane-body {
    flex: 1; overflow-y: auto; overflow-x: hidden;
    padding: ${config.padding.body};
    display: flex; flex-direction: column;
    gap: ${config.padding.gap};
  }
  .pane-body::-webkit-scrollbar { width: 3px; }
  .pane-body::-webkit-scrollbar-track { background: transparent; }

  /* ── Section title ── */
  .p-section-title {
    font-family: monospace;
    font-size: ${config.fontSize.sectionTitle};
    text-transform: uppercase;
    letter-spacing: 0.14em;
    opacity: 0.25;
    padding-bottom: 0.35rem;
    margin-top: 0.5rem;
  }

  /* ── Card ── */
  .p-card {
    position: relative;
    border-radius: 8px;
    padding: ${config.padding.card};
    display: flex; flex-direction: column; gap: 0.45rem;
    transition: border-color 0.2s, background 0.2s;
    cursor: default;
    overflow: visible;
  }
  .p-card.p-card-linked { cursor: pointer; }

  .p-card-top {
    display: flex; align-items: center;
    justify-content: space-between; gap: 0.75rem;
  }
  .p-card-name-row {
    display: flex; align-items: center; gap: 0.45rem;
    min-width: 0;
  }
  .p-card-name {
    font-size: ${config.fontSize.name};
    font-weight: 600; margin: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  /* arrow icon */
  .p-arrow {
    display: inline-flex; align-items: center; justify-content: center;
    flex-shrink: 0;
    opacity: 0;
    transform: translate(-3px, 3px) rotate(0deg);
    transition: opacity 0.25s ease, transform 0.25s cubic-bezier(0.34,1.56,0.64,1);
  }
  .p-card-linked:hover .p-arrow {
    opacity: 0.6;
    transform: translate(0px, 0px) rotate(0deg);
  }

  .p-card-meta {
    font-family: monospace;
    font-size: ${config.fontSize.meta};
    opacity: 0.3;
    white-space: nowrap;
    flex-shrink: 0;
  }
  .p-card-sub {
    font-size: ${config.fontSize.sub};
    opacity: 0.4;
    margin: 0;
    font-family: monospace;
    letter-spacing: 0.02em;
  }
  .p-card-desc {
    font-size: ${config.fontSize.desc};
    line-height: 1.65;
    opacity: 0.5;
    margin: 0.1rem 0 0;
  }
  .p-tags {
    display: flex; flex-wrap: wrap; gap: 0.28rem;
    margin-top: 0.1rem;
  }
  .p-tag {
    font-family: monospace;
    font-size: ${config.fontSize.tag};
    padding: 0.2em 0.6em;
    border-radius: 999px;
    opacity: 0.55;
    letter-spacing: 0.03em;
  }
  .p-links {
    display: flex; gap: 0.6rem; margin-top: 0.15rem;
  }
  .p-link {
    font-family: monospace;
    font-size: ${config.fontSize.link};
    text-decoration: none;
    opacity: 0.32;
    border-bottom: 1px solid currentColor;
    padding-bottom: 1px;
    transition: opacity 0.15s;
    letter-spacing: 0.03em;
  }
  .p-link:hover { opacity: 0.8; }

  /* ── Hover image preview - PORTAL ROOT, NO CLIPPING ── */
  .p-preview {
    pointer-events: none;
    position: fixed;
    z-index: 9999;
    width: ${config.previewWidth};
    height: ${config.previewHeight};
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 20px 60px rgba(0,0,0,0.5), 0 4px 16px rgba(0,0,0,0.3);
    opacity: 0;
    transform: scale(0.88) translateY(8px);
    transition:
      opacity 0.28s cubic-bezier(0.4,0,0.2,1),
      transform 0.28s cubic-bezier(0.4,0,0.2,1),
      left 0.08s linear,
      top 0.08s linear;
    will-change: transform, opacity, left, top;
  }
  .p-preview.p-preview-vis {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
  .p-preview img {
    width: 100%; height: 100%;
    object-fit: cover;
    display: block;
  }
  .p-preview-overlay {
    position: absolute; inset: 0;
    background: linear-gradient(to top, rgba(0,0,0,0.25), transparent);
  }
`;

// ─────────────────────────────────────────────────────────────────────────────
// Global hover image preview
// ─────────────────────────────────────────────────────────────────────────────
interface PreviewState {
  visible: boolean;
  x: number;
  y: number;
  src: string;
  alt: string;
}

let _setPreview: ((s: PreviewState) => void) | null = null;

export function usePreview() {
  return {
    show: (src: string, alt: string, x: number, y: number) => {
      _setPreview?.({ visible: true, src, alt, x, y });
    },
    move: (x: number, y: number) => {
      _setPreview?.((prev: PreviewState) => ({ ...prev, x, y }));
    },
    hide: () => {
      _setPreview?.((prev: PreviewState) => ({ ...prev, visible: false }));
    },
  };
}

// Singleton preview bubble — mounted in BODY portal (no clipping)
function PreviewBubble() {
  const [state, setState] = useState<PreviewState>({
    visible: false, x: 0, y: 0, src: "", alt: "",
  });
  const divRef = useRef<HTMLDivElement>(null);

  // Register setter
  useEffect(() => {
    _setPreview = setState as (s: PreviewState) => void;
    return () => { _setPreview = null; };
  }, []);

  // Direct position sync (no lerp, prevents lag)
  useEffect(() => {
    if (divRef.current) {
      divRef.current.style.left = `${state.x}px`;
      divRef.current.style.top = `${state.y}px`;
    }
  }, [state.x, state.y]);

  return (
    <div
      ref={divRef}
      className={`p-preview${state.visible ? " p-preview-vis" : ""}`}
      style={{ left: state.x, top: state.y }}
    >
      {state.src && <img src={state.src} alt={state.alt} />}
      <div className="p-preview-overlay" />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Pane (base drawer)
// ─────────────────────────────────────────────────────────────────────────────
interface PaneProps {
  open: boolean;
  onClose: () => void;
  title: string;
  theme: "dark" | "light";
  children: React.ReactNode;
}

export const Pane: React.FC<PaneProps> = ({ open, onClose, title, theme, children }) => {
  const [rendered, setRendered] = useState(false);
  const [visible, setVisible] = useState(false);
  const [config, setConfig] = useState(getResponsiveConfig());
  const isDark = theme === "dark";

  const bg = isDark ? "#060606" : "#ffffff";
  const text = isDark ? "#f0f0f0" : "#111111";
  const border = isDark ? "#1c1c1c" : "#e0e0e0";
  const cardBg = isDark ? "#0d0d0d" : "#fafafa";
  const tagBg = isDark ? "#131313" : "#f0f0f0";
  const scrollThumb = isDark ? "#222" : "#ddd";

  // Handle window resize for responsive
  useEffect(() => {
    const handleResize = () => {
      setConfig(getResponsiveConfig());
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (open) {
      setRendered(true);
      requestAnimationFrame(() => requestAnimationFrame(() => setVisible(true)));
    } else {
      setVisible(false);
      const t = setTimeout(() => setRendered(false), 420);
      return () => clearTimeout(t);
    }
  }, [open]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  if (!rendered) return null;

  return createPortal(
    <>
      <style>{getPaneStyles(config)}</style>
      <style>{`
        .pane-shell  { background:${bg}; color:${text}; border-left:1px solid ${border}; }
        .pane-head   { border-bottom:1px solid ${border}; }
        .pane-x      { color:${text}; }
        .pane-x:hover{ background:${isDark ? "#1a1a1a" : "#f0f0f0"}; }
        .pane-body::-webkit-scrollbar-thumb { background:${scrollThumb}; border-radius:2px; }
        .p-section-title { border-bottom:1px solid ${border}; }
        .p-card      { background:${cardBg}; border:1px solid ${border}; }
        .p-card:hover{ border-color:${isDark ? "#2c2c2c" : "#c8c8c8"}; background:${isDark ? "#101010" : "#f5f5f5"}; }
        .p-tag       { background:${tagBg}; border:1px solid ${border}; color:${text}; }
        .p-link      { color:${text}; }
        .p-card-name { color:${text}; }
      `}</style>

      <div
        className={`pane-backdrop${visible ? " pane-vis" : ""}`}
        onClick={onClose}
      />
      <div
        className={`pane-drawer${visible ? " pane-vis" : ""}`}
        role="dialog"
        aria-modal
        aria-label={title}
      >
        <div className="pane-shell">
          <div className="pane-head">
            <span className="pane-head-label">{title}</span>
            <button className="pane-x" onClick={onClose} aria-label="Close">✕</button>
          </div>
          <div className="pane-body">
            {children}
          </div>
        </div>
      </div>
    </>,
    document.body
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// PaneCard — with hover image preview + animated arrow
// ─────────────────────────────────────────────────────────────────────────────
export interface CardProps {
  name: string;
  meta?: string;
  sub?: string;
  desc?: string;
  tags?: string[];
  links?: { label: string; href: string }[];
  previewImage?: string;
  href?: string;
}

export const PaneCard: React.FC<CardProps> = ({
  name, meta, sub, desc, tags, links, previewImage, href,
}) => {
  const preview = usePreview();
  const cardRef = useRef<HTMLDivElement>(null);
  const hasLink = !!href;
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = useCallback((e: React.MouseEvent) => {
    if (!previewImage) return;
    
    // Clear any pending hide
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    
    // Offset: 20px right, 100px up from cursor
    const x = e.clientX + 20;
    const y = e.clientY - 100;
    
    preview.show(previewImage, name, x, y);
  }, [previewImage, name, preview]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!previewImage) return;
    
    // Clear pending hide on move
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    
    const x = e.clientX + 20;
    const y = e.clientY - 100;
    
    preview.move(x, y);
  }, [previewImage, preview]);

  const handleMouseLeave = useCallback(() => {
    if (!previewImage) return;
    
    // Debounce hide slightly to prevent flicker
    timeoutRef.current = setTimeout(() => {
      preview.hide();
    }, 50);
  }, [previewImage, preview]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const inner = (
    <div
      ref={cardRef}
      className={`p-card${hasLink ? " p-card-linked" : ""}`}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="p-card-top">
        <div className="p-card-name-row">
          <p className="p-card-name">{name}</p>
          {hasLink && (
            <span className="p-arrow">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2.2"
                strokeLinecap="round" strokeLinejoin="round">
                <line x1="7" y1="17" x2="17" y2="7"/>
                <polyline points="7 7 17 7 17 17"/>
              </svg>
            </span>
          )}
        </div>
        {meta && <span className="p-card-meta">{meta}</span>}
      </div>
      {sub  && <p className="p-card-sub">{sub}</p>}
      {desc && <p className="p-card-desc">{desc}</p>}
      {tags && tags.length > 0 && (
        <div className="p-tags">
          {tags.map(t => <span className="p-tag" key={t}>{t}</span>)}
        </div>
      )}
      {links && links.length > 0 && (
        <div className="p-links">
          {links.map(l => (
            <a className="p-link" key={l.label} href={l.href}
              target="_blank" rel="noreferrer"
              onClick={e => e.stopPropagation()}>
              {l.label} ↗
            </a>
          ))}
        </div>
      )}
    </div>
  );

  if (hasLink) {
    return (
      <a href={href} target="_blank" rel="noreferrer"
        style={{ textDecoration: "none", display: "block" }}>
        {inner}
      </a>
    );
  }

  return inner;
};

// ─────────────────────────────────────────────────────────────────────────────
// PaneSectionTitle
// ─────────────────────────────────────────────────────────────────────────────
export const PaneSectionTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <p className="p-section-title">{children}</p>
);

// ─────────────────────────────────────────────────────────────────────────────
// PreviewBubble Portal Wrapper (mount once at root)
// ─────────────────────────────────────────────────────────────────────────────
export function PanePreviewPortal() {
  return createPortal(<PreviewBubble />, document.body);
}















// import React, { useEffect, useRef, useState } from "react";
// import { createPortal } from "react-dom";

// interface PaneProps {
//   open: boolean;
//   onClose: () => void;
//   title: string;
//   theme: "dark" | "light";
//   children: React.ReactNode;
// }

// export const Pane: React.FC<PaneProps> = ({ open, onClose, title, theme, children }) => {
//   const [rendered, setRendered] = useState(false);
//   const [visible, setVisible] = useState(false);
//   const isDark = theme === "dark";

//   useEffect(() => {
//     if (open) {
//       setRendered(true);
//       requestAnimationFrame(() => requestAnimationFrame(() => setVisible(true)));
//     } else {
//       setVisible(false);
//       const t = setTimeout(() => setRendered(false), 400);
//       return () => clearTimeout(t);
//     }
//   }, [open]);

//   useEffect(() => {
//     const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
//     window.addEventListener("keydown", handler);
//     return () => window.removeEventListener("keydown", handler);
//   }, [onClose]);

//   if (!rendered) return null;

//   return createPortal(
//     <>
//       <style>{`
//         .pane-backdrop {
//           position: fixed; inset: 0; z-index: 200;
//           background: transparent;
//           backdrop-filter: blur(0px);
//           transition: background 0.4s ease, backdrop-filter 0.4s ease;
//         }
//         .pane-backdrop.pane-vis {
//           background: rgba(0,0,0,0.6);
//           backdrop-filter: blur(4px);
//         }
//         .pane-drawer {
//           position: fixed; top: 0; right: 0; bottom: 0;
//           width: clamp(340px, 44vw, 640px);
//           z-index: 201;
//           transform: translateX(105%);
//           transition: transform 0.4s cubic-bezier(0.32, 0.72, 0, 1);
//         }
//         .pane-drawer.pane-vis { transform: translateX(0); }

//         .pane-shell {
//           height: 100%;
//           display: flex;
//           flex-direction: column;
//           background: ${isDark ? "#060606" : "#ffffff"};
//           color: ${isDark ? "#f0f0f0" : "#111111"};
//           border-left: 1px solid ${isDark ? "#1e1e1e" : "#e0e0e0"};
//         }

//         .pane-head {
//           display: flex; align-items: center; justify-content: space-between;
//           padding: clamp(14px, 1.8vw, 26px) clamp(16px, 2vw, 28px);
//           border-bottom: 1px solid ${isDark ? "#1a1a1a" : "#ebebeb"};
//           flex-shrink: 0;
//         }
//         .pane-head-label {
//           font-family: monospace;
//           font-size: clamp(9px, 0.75vw, 11px);
//           text-transform: uppercase;
//           letter-spacing: 0.14em;
//           opacity: 0.35;
//         }
//         .pane-x {
//           background: none; border: none; cursor: pointer;
//           color: ${isDark ? "#f0f0f0" : "#111"};
//           opacity: 0.3;
//           width: 28px; height: 28px;
//           display: flex; align-items: center; justify-content: center;
//           border-radius: 6px;
//           font-size: 14px;
//           transition: opacity 0.15s, background 0.15s;
//         }
//         .pane-x:hover {
//           opacity: 0.9;
//           background: ${isDark ? "#1a1a1a" : "#f0f0f0"};
//         }

//         .pane-body {
//           flex: 1; overflow-y: auto; overflow-x: hidden;
//           padding: clamp(16px, 2vw, 28px);
//           display: flex; flex-direction: column;
//           gap: clamp(10px, 1.2vw, 16px);
//         }
//         .pane-body::-webkit-scrollbar { width: 3px; }
//         .pane-body::-webkit-scrollbar-track { background: transparent; }
//         .pane-body::-webkit-scrollbar-thumb {
//           background: ${isDark ? "#252525" : "#ddd"};
//           border-radius: 2px;
//         }

//         /* ── Card ── */
//         .p-card {
//           border: 1px solid ${isDark ? "#181818" : "#ebebeb"};
//           border-radius: clamp(8px, 0.9vw, 14px);
//           padding: clamp(14px, 1.6vw, 22px);
//           display: flex; flex-direction: column; gap: 0.55rem;
//           transition: border-color 0.2s;
//         }
//         .p-card:hover { border-color: ${isDark ? "#2e2e2e" : "#ccc"}; }

//         .p-card-top {
//           display: flex; align-items: baseline;
//           justify-content: space-between; gap: 1rem;
//         }
//         .p-card-name {
//           font-size: clamp(12px, 1.05vw, 15px);
//           font-weight: 600; margin: 0;
//           color: ${isDark ? "#f0f0f0" : "#111"};
//         }
//         .p-card-meta {
//           font-family: monospace;
//           font-size: clamp(8px, 0.7vw, 10px);
//           opacity: 0.3;
//           white-space: nowrap;
//         }
//         .p-card-sub {
//           font-size: clamp(10px, 0.85vw, 12px);
//           opacity: 0.45;
//           margin: 0;
//           font-family: monospace;
//         }
//         .p-card-desc {
//           font-size: clamp(10px, 0.88vw, 13px);
//           line-height: 1.65;
//           opacity: 0.55;
//           margin: 0.1rem 0 0;
//         }
//         .p-tags {
//           display: flex; flex-wrap: wrap; gap: 0.3rem;
//           margin-top: 0.15rem;
//         }
//         .p-tag {
//           font-family: monospace;
//           font-size: clamp(7px, 0.62vw, 9px);
//           padding: 0.22em 0.65em;
//           border-radius: 999px;
//           background: ${isDark ? "#111" : "#f2f2f2"};
//           border: 1px solid ${isDark ? "#1e1e1e" : "#e0e0e0"};
//           opacity: 0.65;
//           letter-spacing: 0.03em;
//         }
//         .p-links {
//           display: flex; gap: 0.6rem; margin-top: 0.2rem;
//         }
//         .p-link {
//           font-family: monospace;
//           font-size: clamp(9px, 0.72vw, 10px);
//           color: ${isDark ? "#f0f0f0" : "#111"};
//           text-decoration: none;
//           opacity: 0.35;
//           border-bottom: 1px solid currentColor;
//           padding-bottom: 1px;
//           transition: opacity 0.15s;
//           letter-spacing: 0.03em;
//         }
//         .p-link:hover { opacity: 0.85; }

//         /* ── Section divider ── */
//         .p-section-title {
//           font-family: monospace;
//           font-size: clamp(8px, 0.7vw, 10px);
//           text-transform: uppercase;
//           letter-spacing: 0.14em;
//           opacity: 0.25;
//           padding-bottom: 0.4rem;
//           border-bottom: 1px solid ${isDark ? "#1a1a1a" : "#ebebeb"};
//           margin-bottom: 0.2rem;
//         }
//       `}</style>

//       <div
//         className={`pane-backdrop${visible ? " pane-vis" : ""}`}
//         onClick={onClose}
//       />
//       <div className={`pane-drawer${visible ? " pane-vis" : ""}`} role="dialog" aria-modal>
//         <div className="pane-shell">
//           <div className="pane-head">
//             <span className="pane-head-label">{title}</span>
//             <button className="pane-x" onClick={onClose}>✕</button>
//           </div>
//           <div className="pane-body">{children}</div>
//         </div>
//       </div>
//     </>,
//     document.body
//   );
// };

// // ── Convenience card components ────────────────────────────────────────────

// interface CardProps {
//   name: string;
//   meta?: string;
//   sub?: string;
//   desc?: string;
//   tags?: string[];
//   links?: { label: string; href: string }[];
// }

// export const PaneCard: React.FC<CardProps> = ({ name, meta, sub, desc, tags, links }) => (
//   <div className="p-card">
//     <div className="p-card-top">
//       <p className="p-card-name">{name}</p>
//       {meta && <span className="p-card-meta">{meta}</span>}
//     </div>
//     {sub && <p className="p-card-sub">{sub}</p>}
//     {desc && <p className="p-card-desc">{desc}</p>}
//     {tags && tags.length > 0 && (
//       <div className="p-tags">
//         {tags.map(t => <span className="p-tag" key={t}>{t}</span>)}
//       </div>
//     )}
//     {links && links.length > 0 && (
//       <div className="p-links">
//         {links.map(l => (
//           <a className="p-link" key={l.label} href={l.href} target="_blank" rel="noreferrer">
//             {l.label} ↗
//           </a>
//         ))}
//       </div>
//     )}
//   </div>
// );

// export const PaneSectionTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
//   <p className="p-section-title">{children}</p>
// );