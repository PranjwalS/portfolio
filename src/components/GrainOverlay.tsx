import React from "react";

interface GrainOverlayProps {
  theme: string;
  intensity?: number; // optional: 1-10, default 5
  className?: string; // ✅ add className prop
}

const GrainOverlay: React.FC<GrainOverlayProps> = ({ theme, intensity = 5, className }) => {
  const opacity = theme === 'dark' 
    ? Math.min(intensity * 0.15, 0.8) 
    : Math.min(intensity * 0.05, 0.5);

  return (
    <div
      className={`absolute inset-0 pointer-events-none rounded-[inherit] overflow-hidden ${className ?? ""}`}
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='a'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.5' numOctaves='6' /%3E%3CfeColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23a)' opacity='1'/%3E%3C/svg%3E")`,
        opacity: opacity,
        backgroundRepeat: 'repeat',
        backgroundSize: '150px 150px',
        mixBlendMode: 'overlay'
      }}
    />
  );
};

export default GrainOverlay;
