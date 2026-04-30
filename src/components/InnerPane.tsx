import React from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

export interface InnerPaneData {
  title: string;
  subtitle?: string;
  timeframe?: string;
  image?: string;
  description: string;
  tags?: string[];
  upcoming?: string[];
  githubUrl?: string;
  liveUrl?: string;
}

interface InnerPaneProps {
  data: InnerPaneData | null;
  onClose: () => void;
  theme: "dark" | "light";
}

// ─────────────────────────────────────────────────────────────────────────────
// Arrow link
// ─────────────────────────────────────────────────────────────────────────────

const ArrowLink: React.FC<{ href: string; label: string; isDark: boolean }> = ({
  href, label, isDark,
}) => (
  <motion.a
    href={href}
    target="_blank"
    rel="noreferrer"
    style={{
      display: "inline-flex",
      alignItems: "center",
      gap: "0.4rem",
      fontFamily: "monospace",
      fontSize: "clamp(10px, 0.85vw, 12px)",
      color: isDark ? "#f0f0f0" : "#111",
      textDecoration: "none",
      border: `1px solid ${isDark ? "#2a2a2a" : "#ddd"}`,
      borderRadius: "8px",
      padding: "0.5em 0.9em",
      opacity: 0.55,
    }}
    whileHover={{ opacity: 1, scale: 1.03, borderColor: isDark ? "#555" : "#aaa" }}
    whileTap={{ scale: 0.97 }}
    transition={{ duration: 0.15 }}
  >
    {label}
    <motion.span
      initial={{ x: 0, y: 0 }}
      whileHover={{ x: 3, y: -3 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
      style={{ display: "inline-flex" }}
    >
      <svg width="11" height="11" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="2.2"
        strokeLinecap="round" strokeLinejoin="round">
        <line x1="7" y1="17" x2="17" y2="7" />
        <polyline points="7 7 17 7 17 17" />
      </svg>
    </motion.span>
  </motion.a>
);

// ─────────────────────────────────────────────────────────────────────────────
// InnerPane
// ─────────────────────────────────────────────────────────────────────────────

export const InnerPane: React.FC<InnerPaneProps> = ({ data, onClose, theme }) => {
  const isDark = theme === "dark";

  const bg     = isDark ? "#080808" : "#ffffff";
  const text   = isDark ? "#f0f0f0" : "#111111";
  const border = isDark ? "#1e1e1e" : "#e0e0e0";
  const muted  = isDark ? "rgba(240,240,240,0.4)" : "rgba(0,0,0,0.4)";
  const tagBg  = isDark ? "#111"    : "#f2f2f2";

  React.useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return createPortal(
    <AnimatePresence>
      {data && (
        <>
          {/* Backdrop */}
          <motion.div
            key="ip-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            onClick={onClose}
            style={{
              position: "fixed", inset: 0, zIndex: 400,
              background: isDark ? "rgba(0,0,0,0.78)" : "rgba(0,0,0,0.45)",
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
              // flex centering for the modal
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* Modal — child of backdrop div so centering is automatic */}
            <motion.div
              key="ip-modal"
              initial={{ opacity: 0, scale: 0.93, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.93, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 28, mass: 0.85 }}
              onClick={e => e.stopPropagation()}
              style={{
                width: "clamp(320px, 55vw, 780px)",
                maxHeight: "80vh",
                background: bg,
                border: `1px solid ${border}`,
                borderRadius: "clamp(12px, 1.2vw, 20px)",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                boxShadow: isDark
                  ? "0 32px 80px rgba(0,0,0,0.85), 0 8px 24px rgba(0,0,0,0.6)"
                  : "0 32px 80px rgba(0,0,0,0.16), 0 8px 24px rgba(0,0,0,0.08)",
              }}
            >
              {/* Image */}
              {data.image && (
                <motion.div
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.08, duration: 0.45, ease: "easeOut" }}
                  style={{
                    width: "100%",
                    height: "clamp(140px, 20vh, 240px)",
                    position: "relative",
                    flexShrink: 0,
                    overflow: "hidden",
                  }}
                >
                  <img
                    src={data.image}
                    alt={data.title}
                    style={{
                      width: "100%", height: "100%",
                      objectFit: "cover", display: "block",
                      filter: isDark ? "brightness(0.65)" : "brightness(0.9)",
                    }}
                  />
                  <div style={{
                    position: "absolute", inset: 0,
                    background: isDark
                      ? "linear-gradient(to bottom, transparent 35%, #080808 100%)"
                      : "linear-gradient(to bottom, transparent 35%, #ffffff 100%)",
                  }} />
                </motion.div>
              )}

              {/* Scrollable body */}
              <div style={{
                flex: 1,
                overflowY: "auto",
                padding: "clamp(16px, 2vw, 28px)",
                display: "flex",
                flexDirection: "column",
                gap: "clamp(12px, 1.4vw, 20px)",
              }}>

                {/* Header */}
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.06, duration: 0.28 }}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent: "space-between",
                    gap: "1rem",
                  }}
                >
                  <div style={{ minWidth: 0 }}>
                    <h2 style={{
                      margin: 0,
                      fontSize: "clamp(15px, 1.5vw, 21px)",
                      fontWeight: 700,
                      color: text,
                      letterSpacing: "-0.02em",
                      lineHeight: 1.2,
                    }}>
                      {data.title}
                    </h2>
                    {data.subtitle && (
                      <p style={{
                        margin: "0.3em 0 0",
                        fontSize: "clamp(9px, 0.78vw, 11px)",
                        fontFamily: "monospace",
                        color: muted,
                        letterSpacing: "0.03em",
                      }}>
                        {data.subtitle}
                      </p>
                    )}
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", flexShrink: 0 }}>
                    {data.timeframe && (
                      <span style={{
                        fontFamily: "monospace",
                        fontSize: "clamp(8px, 0.65vw, 10px)",
                        color: muted,
                      }}>
                        {data.timeframe}
                      </span>
                    )}
                    <motion.button
                      onClick={onClose}
                      whileHover={{ scale: 1.12, opacity: 0.85 }}
                      whileTap={{ scale: 0.88 }}
                      style={{
                        background: "none",
                        border: `1px solid ${border}`,
                        borderRadius: "6px",
                        cursor: "pointer",
                        color: text,
                        opacity: 0.3,
                        width: "clamp(22px, 2vw, 28px)",
                        height: "clamp(22px, 2vw, 28px)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "clamp(10px, 0.9vw, 13px)",
                        flexShrink: 0,
                      }}
                    >
                      ✕
                    </motion.button>
                  </div>
                </motion.div>

                {/* Divider */}
                <motion.div
                  initial={{ scaleX: 0, originX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.12, duration: 0.38, ease: "easeOut" }}
                  style={{ height: "1px", background: border, flexShrink: 0 }}
                />

                {/* Description */}
                <motion.p
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.16, duration: 0.28 }}
                  style={{
                    margin: 0,
                    fontSize: "clamp(11px, 0.92vw, 13px)",
                    lineHeight: 1.75,
                    color: text,
                    opacity: 0.58,
                  }}
                >
                  {data.description}
                </motion.p>

                {/* Tags */}
                {data.tags && data.tags.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.20, duration: 0.28 }}
                  >
                    <p style={{
                      margin: "0 0 0.45rem",
                      fontFamily: "monospace",
                      fontSize: "clamp(7px, 0.65vw, 9px)",
                      textTransform: "uppercase",
                      letterSpacing: "0.13em",
                      opacity: 0.28,
                      color: text,
                    }}>
                      Stack
                    </p>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.3rem" }}>
                      {data.tags.map((t, i) => (
                        <motion.span
                          key={t}
                          initial={{ opacity: 0, scale: 0.82 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.22 + i * 0.025, duration: 0.18 }}
                          style={{
                            fontFamily: "monospace",
                            fontSize: "clamp(7px, 0.62vw, 9px)",
                            padding: "0.22em 0.6em",
                            borderRadius: "999px",
                            background: tagBg,
                            border: `1px solid ${border}`,
                            color: text,
                            opacity: 0.6,
                            letterSpacing: "0.03em",
                          }}
                        >
                          {t}
                        </motion.span>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Upcoming */}
                {data.upcoming && data.upcoming.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.26, duration: 0.28 }}
                  >
                    <p style={{
                      margin: "0 0 0.45rem",
                      fontFamily: "monospace",
                      fontSize: "clamp(7px, 0.65vw, 9px)",
                      textTransform: "uppercase",
                      letterSpacing: "0.13em",
                      opacity: 0.28,
                      color: text,
                    }}>
                      Upcoming
                    </p>
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.28rem" }}>
                      {data.upcoming.map((item, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -6 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.28 + i * 0.04, duration: 0.22 }}
                          style={{
                            display: "flex",
                            alignItems: "flex-start",
                            gap: "0.45rem",
                            fontSize: "clamp(10px, 0.85vw, 12px)",
                            color: text,
                            opacity: 0.48,
                            lineHeight: 1.5,
                          }}
                        >
                          <span style={{ opacity: 0.4, marginTop: "0.15em", flexShrink: 0 }}>—</span>
                          {item}
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Links */}
                {(data.githubUrl || data.liveUrl) && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.30, duration: 0.28 }}
                    style={{
                      display: "flex",
                      gap: "0.5rem",
                      paddingTop: "clamp(10px, 1vw, 14px)",
                      borderTop: `1px solid ${border}`,
                      flexWrap: "wrap",
                    }}
                  >
                    {data.githubUrl && (
                      <ArrowLink href={data.githubUrl} label="GitHub" isDark={isDark} />
                    )}
                    {data.liveUrl && (
                      <ArrowLink href={data.liveUrl} label="Live" isDark={isDark} />
                    )}
                  </motion.div>
                )}

              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
};