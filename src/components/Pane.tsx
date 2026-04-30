import React, { useEffect, useState, useRef } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { InnerPane, type InnerPaneData } from "./InnerPane";

// ─────────────────────────────────────────────────────────────────────────────
// Pane (outer drawer)
// ─────────────────────────────────────────────────────────────────────────────

interface PaneProps {
  open: boolean;
  onClose: () => void;
  title: string;
  theme: "dark" | "light";
  children: React.ReactNode;
}

export const Pane: React.FC<PaneProps> = ({ open, onClose, title, theme, children }) => {
  const isDark = theme === "dark";
  const [innerData, setInnerData] = useState<InnerPaneData | null>(null);

  const bg        = isDark ? "#060606" : "#ffffff";
  const text      = isDark ? "#f0f0f0" : "#111111";
  const border    = isDark ? "#1e1e1e" : "#e0e0e0";
  const scrollThumb = isDark ? "#252525" : "#ddd";

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (innerData) setInnerData(null);
        else onClose();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose, innerData]);

  return createPortal(
    <>
      <style>{`
        .pane-body::-webkit-scrollbar { width: 3px; }
        .pane-body::-webkit-scrollbar-track { background: transparent; }
        .pane-body::-webkit-scrollbar-thumb { background: ${scrollThumb}; border-radius: 2px; }

        .p-section-title {
          font-family: monospace;
          font-size: clamp(8px, 0.7vw, 10px);
          text-transform: uppercase;
          letter-spacing: 0.14em;
          opacity: 0.25;
          padding-bottom: 0.4rem;
          border-bottom: 1px solid ${border};
          margin-bottom: 0.2rem;
          color: ${text};
        }

        /* ── Card ── */
        .p-card {
          border: 1px solid ${isDark ? "#181818" : "#ebebeb"};
          border-radius: clamp(8px, 0.9vw, 14px);
          padding: clamp(14px, 1.6vw, 22px);
          display: flex; flex-direction: column; gap: 0.55rem;
          background: ${isDark ? "#0a0a0a" : "#fafafa"};
          cursor: pointer;
          transition: border-color 0.2s, background 0.2s;
        }
        .p-card:hover {
          border-color: ${isDark ? "#2e2e2e" : "#ccc"};
          background: ${isDark ? "#0f0f0f" : "#f4f4f4"};
        }

        .p-card-top {
          display: flex; align-items: center;
          justify-content: space-between; gap: 1rem;
        }
        .p-card-name-row {
          display: flex; align-items: center; gap: 0.5rem;
          min-width: 0;
        }
        .p-card-name {
          font-size: clamp(12px, 1.05vw, 15px);
          font-weight: 600; margin: 0;
          color: ${text};
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        }
        .p-card-meta {
          font-family: monospace;
          font-size: clamp(8px, 0.7vw, 10px);
          opacity: 0.3;
          white-space: nowrap;
          color: ${text};
        }
        .p-card-sub {
          font-size: clamp(10px, 0.85vw, 12px);
          opacity: 0.4;
          margin: 0;
          font-family: monospace;
          color: ${text};
        }
        .p-card-desc {
          font-size: clamp(10px, 0.88vw, 13px);
          line-height: 1.65;
          opacity: 0.5;
          margin: 0.1rem 0 0;
          color: ${text};
        }
        .p-tags {
          display: flex; flex-wrap: wrap; gap: 0.3rem;
          margin-top: 0.15rem;
        }
        .p-tag {
          font-family: monospace;
          font-size: clamp(7px, 0.62vw, 9px);
          padding: 0.22em 0.65em;
          border-radius: 999px;
          background: ${isDark ? "#111" : "#f2f2f2"};
          border: 1px solid ${isDark ? "#1e1e1e" : "#e0e0e0"};
          color: ${text};
          opacity: 0.6;
          letter-spacing: 0.03em;
        }
        .p-links {
          display: flex; gap: 0.6rem; margin-top: 0.2rem;
        }
        .p-link {
          font-family: monospace;
          font-size: clamp(9px, 0.72vw, 10px);
          color: ${text};
          text-decoration: none;
          opacity: 0.35;
          border-bottom: 1px solid currentColor;
          padding-bottom: 1px;
          transition: opacity 0.15s;
          letter-spacing: 0.03em;
        }
        .p-link:hover { opacity: 0.85; }
      `}</style>

      {/* Backdrop */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="pane-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            onClick={() => { setInnerData(null); onClose(); }}
            style={{
              position: "fixed", inset: 0, zIndex: 200,
              background: "rgba(0,0,0,0.55)",
              backdropFilter: "blur(4px)",
              WebkitBackdropFilter: "blur(4px)",
            }}
          />
        )}
      </AnimatePresence>

      {/* Drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="pane-drawer"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 280, damping: 30, mass: 0.9 }}
            style={{
              position: "fixed", top: 0, right: 0, bottom: 0,
              width: "clamp(340px, 44vw, 640px)",
              zIndex: 201,
              display: "flex", flexDirection: "column",
              background: bg,
              borderLeft: `1px solid ${border}`,
              boxShadow: isDark
                ? "-20px 0 60px rgba(0,0,0,0.7)"
                : "-20px 0 60px rgba(0,0,0,0.1)",
            }}
          >
            {/* Header */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.15, duration: 0.3 }}
              style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                padding: "clamp(14px,1.8vw,26px) clamp(16px,2vw,28px)",
                borderBottom: `1px solid ${border}`,
                flexShrink: 0,
              }}
            >
              <span style={{
                fontFamily: "monospace",
                fontSize: "clamp(9px,0.75vw,11px)",
                textTransform: "uppercase",
                letterSpacing: "0.14em",
                opacity: 0.35,
                color: text,
              }}>
                {title}
              </span>
              <motion.button
                onClick={onClose}
                whileHover={{ scale: 1.12, opacity: 0.9 }}
                whileTap={{ scale: 0.88 }}
                style={{
                  background: "none", border: "none", cursor: "pointer",
                  color: text, opacity: 0.28,
                  width: 28, height: 28,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  borderRadius: 6, fontSize: 13,
                }}
              >
                ✕
              </motion.button>
            </motion.div>

            {/* Body */}
            <div
              className="pane-body"
              style={{
                flex: 1, overflowY: "auto", overflowX: "hidden",
                padding: "clamp(12px,1.6vw,24px)",
                display: "flex", flexDirection: "column",
                gap: "clamp(8px,1vw,12px)",
              }}
            >
              {/* Stagger children in */}
              <PaneContext.Provider value={{ openInner: setInnerData, theme }}>
                {children}
              </PaneContext.Provider>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Inner pane */}
      <InnerPane
        data={innerData}
        onClose={() => setInnerData(null)}
        theme={theme}
      />
    </>,
    document.body
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// Context so PaneCard can open InnerPane without prop drilling
// ─────────────────────────────────────────────────────────────────────────────

interface PaneContextType {
  openInner: (data: InnerPaneData) => void;
  theme: "dark" | "light";
}

export const PaneContext = React.createContext<PaneContextType>({
  openInner: () => {},
  theme: "dark",
});

// ─────────────────────────────────────────────────────────────────────────────
// PaneCard — animated arrow, clicks open InnerPane
// ─────────────────────────────────────────────────────────────────────────────

export interface CardProps {
  name: string;
  meta?: string;
  sub?: string;
  desc?: string;
  tags?: string[];
  links?: { label: string; href: string }[];
  /** If provided, clicking the card opens InnerPane with this data */
  inner?: InnerPaneData;
}

export const PaneCard: React.FC<CardProps> = ({
  name, meta, sub, desc, tags, links, inner,
}) => {
  const { openInner } = React.useContext(PaneContext);
  const [hovered, setHovered] = useState(false);
  const hasInner = !!inner;

  return (
    <motion.div
      className="p-card"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      onClick={() => { if (hasInner) openInner(inner!); }}
      style={{ cursor: hasInner ? "pointer" : "default" }}
    >
      <div className="p-card-top">
        <div className="p-card-name-row">
          <p className="p-card-name">{name}</p>

          {/* Animated arrow — only shown when hasInner */}
          {hasInner && (
            <motion.span
              animate={{
                x: hovered ? 2 : -1,
                y: hovered ? -2 : 1,
                opacity: hovered ? 0.7 : 0.2,
              }}
              transition={{ type: "spring", stiffness: 400, damping: 18 }}
              style={{ display: "inline-flex", flexShrink: 0 }}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2.2"
                strokeLinecap="round" strokeLinejoin="round">
                <line x1="7" y1="17" x2="17" y2="7" />
                <polyline points="7 7 17 7 17 17" />
              </svg>
            </motion.span>
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
            <a
              className="p-link" key={l.label}
              href={l.href} target="_blank" rel="noreferrer"
              onClick={e => e.stopPropagation()}
            >
              {l.label} ↗
            </a>
          ))}
        </div>
      )}
    </motion.div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// PaneSectionTitle
// ─────────────────────────────────────────────────────────────────────────────

export const PaneSectionTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <motion.p
    className="p-section-title"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.3 }}
  >
    {children}
  </motion.p>
);