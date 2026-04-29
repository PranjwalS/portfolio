import React from "react";
import { Pane, PaneCard, PaneSectionTitle } from "./Pane";

const projects = [
  {
    name: "JobScout",
    meta: "2024 – Present",
    sub: "AI job aggregator & application tracker",
    desc: "Scrapes, scores, and ranks co-op postings across sources. Generates tailored cover letters and tracks applications end-to-end. Chrome extension autofills application forms from your stored profile.",
    tags: ["FastAPI", "React", "TypeScript", "Celery", "Redis", "Supabase", "GCP", "Vercel"],
    links: [{ label: "Live", href: "https://jobscout.vercel.app" }],
    previewImage: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=600&auto=format&fit=crop",
    href: "https://github.com/Pranjwals/jobscout",
  },
  {
    name: "Mute",
    meta: "2025 – Present",
    sub: "Minimal Android OS launcher",
    desc: "Replaces the Android home screen with an intent-based interface. Choose a mode — focus, unwind, communicate — and only relevant apps surface. Baked-in app blocking and visual degradation on heavy usage.",
    tags: ["Kotlin", "Android", "FastAPI", "AccessibilityService"],
    previewImage: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&auto=format&fit=crop",
    href: "https://github.com/Pranjwals/mute",
  },
  {
    name: "Enosym",
    meta: "2025",
    sub: "Local RAG knowledge assistant",
    desc: "Ingests your documents, embeds them into a local vector store, and lets you query your own knowledge base with an LLM. Local-first — no data leaves your machine.",
    tags: ["Python", "LangChain", "ChromaDB", "FastAPI"],
    previewImage: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=600&auto=format&fit=crop",
    href: "https://github.com/Pranjwals/enosym",
  },
  {
    name: "POS Ecosystem",
    meta: "2024",
    sub: "Multi-business point-of-sale platform",
    desc: "Merchant checkout, inventory management, transaction logs, and revenue dashboard. Multi-tenant — one account, multiple businesses.",
    tags: ["FastAPI", "React", "PostgreSQL", "SQLAlchemy"],
    previewImage: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&auto=format&fit=crop",
    href: "https://github.com/Pranjwals/pos",
  },
];

interface ProjectsPaneProps {
  isOpen: boolean;
  onClose: () => void;
  theme: "dark" | "light";
}

const ProjectsPane: React.FC<ProjectsPaneProps> = ({ isOpen, onClose, theme }) => (
  <Pane open={isOpen} onClose={onClose} title="Projects" theme={theme}>
    <PaneSectionTitle>Selected Work</PaneSectionTitle>
    {projects.map(p => (
      <PaneCard key={p.name} {...p} />
    ))}
  </Pane>
);

export default ProjectsPane;



// import React from "react";
// import { Pane, PaneCard, PaneSectionTitle } from "./Pane";

// const projects = [
//   {
//     name: "JobScout",
//     meta: "2026 – Present",
//     sub: "Full-stack job aggregator",
//     desc: "Scrapes, scores, and ranks co-op postings across sources. Generates tailored cover letters and tracks applications end-to-end. Includes a Chrome extension that autofills application forms from your stored profile.",
//     tags: ["FastAPI", "React", "TypeScript", "Celery", "Redis", "Supabase", "GCP", "Vercel"],
//     links: [{ label: "Live", href: "https://jobscout.vercel.app" }],
//   },
//   {
//     name: "Mute.",
//     meta: "2025 – Present",
//     sub: "Minimal Android OS launcher",
//     desc: "Replaces the Android home screen with an intent-based interface. You choose a mode — focus, unwind, communicate — and only relevant apps surface. Baked-in app blocking, visual degradation on heavy usage, and a small FastAPI backend for persistence.",
//     tags: ["Kotlin", "Android", "FastAPI", "AccessibilityService"],
//     links: [],
//   },
//   {
//     name: "EnOSym",
//     meta: "2026 - Present",
//     sub: "Local RAG knowledge assistant",
//     desc: "Ingests your documents, embeds them into a local vector store, and lets you query your own knowledge base with an LLM. Built as a local-first tool — no data leaves your machine.",
//     tags: ["Python", "LangChain", "ChromaDB", "FastAPI"],
//     links: [],
//   },
//   {
//     name: "POS Ecosystem",
//     meta: "2025",
//     sub: "Multi-business point-of-sale platform",
//     desc: "Merchant checkout, inventory management, transaction logs, and revenue dashboard with charts. Built to be multi-tenant — one account, multiple businesses.",
//     tags: ["FastAPI", "React", "PostgreSQL", "SQLAlchemy"],
//     links: [],
//   },
// ];

// interface ProjectsPaneProps {
//   isOpen: boolean;
//   onClose: () => void;
//   theme: "dark" | "light";
// }

// const ProjectsPane: React.FC<ProjectsPaneProps> = ({ isOpen, onClose, theme }) => (
//   <Pane open={isOpen} onClose={onClose} title="Projects" theme={theme}>
//     {/* <PaneSectionTitle>Selected Work</PaneSectionTitle> */}
//     {projects.map(p => (
//       <PaneCard key={p.name} {...p} />
//     ))}
//   </Pane>
// );

// export default ProjectsPane;
