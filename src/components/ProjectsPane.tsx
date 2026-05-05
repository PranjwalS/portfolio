import React from "react";
import { Pane, PaneCard, PaneSectionTitle } from "./Pane";
import type { InnerPaneData } from "./InnerPane";

const projects: Array<{
  name: string;
  meta: string;
  sub: string;
  desc: string;
  tags: string[];
  inner: InnerPaneData;
}> = [
  {
    name: "JobScout · Career Twin",
    meta: "2025 – Present",
    sub: "AI job aggregator, tracker & career platform",
    desc: "Scrapes, scores, and ranks job postings. LLM-powered cover letter and CV generation based on career. Custom dashboards with full application tracking and upcoming AutoApply bot.",
    tags: ["FastAPI", "React", "Celery", "Redis", "GCP"],
    inner: {
      title: "JobScout · Career Twin",
      subtitle: "AI job aggregator, tracker & career platform",
      timeframe: "2025 – Present",
      image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&auto=format&fit=crop",
      description:
        "JobScout is a full-stack career platform built around the idea that job hunting should be automated. Users maintain a Career Twin profile: experience, projects, skills, education, and spin up job search dashboards, each running a cron-scheduled scraper across major job boards.\n\nEvery listing gets scored and matched against your profile via LLM. Custom cover letters and tailored CVs are generated per listing through Celery + Redis async pipelines, with email alerts for high-ranked matches.\n\nA Chrome extension handles static form autofill across job application pages. An LLM + Playwright auto-application bot is in progress. Applied jobs are tracked via email scanning or manual input, and when an interview gets scheduled, the system assembles your CV, cover letter, job description, and an LLM-generated Q&A sheet one hour before, alongside a mock interview simulation.",
      tags: ["FastAPI", "React", "TypeScript", "Celery", "Redis", "Supabase", "GCP", "Playwright", "Groq API", "Chrome Extension API"],
      upcoming: [
        "Career Twin public profile layer with verified GitHub and deployed project links",
        "LLM + Playwright auto-application bot",
        "RAG-powered job recommendations based on career trajectory",
        "Recruiter-facing marketplace and subscription model",
      ],
      githubUrl: "https://github.com/PranjwalS/coverletter-generator-api",
      // liveUrl: "https://jobscout.vercel.app",
    },
  },
  {
    name: "EnOSym",
    meta: "2026",
    sub: "Agentic AI coding assistant",
    desc: "Voice-driven coding assistant with RAG over your codebases, a sandboxed execution environment, and an autonomous background agent.",
    tags: ["Python", "LangChain", "ChromaDB", "Whisper", "Playwright"],
    inner: {
      title: "EnOSym",
      subtitle: "Agentic AI coding assistant",
      timeframe: "2026",
      image: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=800&auto=format&fit=crop",
      description:
        "EnOSym is a locally-run agentic coding assistant you talk to. It knows your codebases, generates and tests code autonomously, and pings you when it has suggestions.\n\nVoice input is handled by Whisper, with Coqui TTS for responses. Every conversation is transcribed and stored in SQLite, then embedded into ChromaDB alongside your code, so context from past sessions bleeds naturally into new ones. Code is chunked with tree-sitter for function and class-aware retrieval rather than arbitrary token splits for the RAG.\n\nA LangChain agentic loop orchestrates LLM tool calls across RAG file/code retrieval, an isolated coding sandbox, and a Playwright browser environment for testing. A background agent runs when idle; scanning your repos for improvements and delivering accept/reject suggestions via email, with approved code changes auto-generated.",
      tags: ["Python", "LangChain", "ChromaDB", "Whisper", "Coqui TTS", "Playwright", "Groq API", "Ollama", "SQLite", "tree-sitter"],
      upcoming: [
        "Clean Desktop app for voice assistant and code output",
        "Mobile/email push notifications for background agent suggestions",
      ],
      githubUrl: "https://github.com/Pranjwals/enosym",
    },
  },
  {
    name: "Mute.",
    meta: "2025",
    sub: "Minimal Android OS launcher",
    desc: "Replaces the Android home screen with a clean launcher for your important apps and a baked-in app and website restriction logic.",
    tags: ["Kotlin", "Android", "FastAPI"],
    inner: {
      title: "Mute.",
      subtitle: "Minimal Android OS launcher",
      timeframe: "2025",
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&auto=format&fit=crop",
      description:
        "Mute replaces your Android home screen entirely. The goal is simple, strip the phone down to what you actually use, and make the rest harder to reach.\n\nIt presents only your pinned apps in a clean, minimal interface. Built-in blocking sits on top: apps and websites can be restricted via SYSTEM_ALERT_WINDOW overlays, with keyword and schedule-based rules enforced through AccessibilityService.\n\nA small FastAPI backend on Render handles configuration backups and usage stats.",
      tags: ["Kotlin", "Jetpack Compose", "AccessibilityService", "SYSTEM_ALERT_WINDOW", "FastAPI", "PostgreSQL", "Render"],
      upcoming: [
        "Launching on Google Play Store",
        "Health Connect integration, physical state unlocks digital permissions",
        "Accountability pacts between two users with shared bypass logs",
      ],
      githubUrl: "https://github.com/Pranjwals/mute.",
    },
  },
  {
    name: "POS Ecosystem",
    meta: "2025 - Present",
    sub: "Multi-business point-of-sale platform",
    desc: "Merchant checkout, inventory, transaction logs, and a revenue dashboard. Multi-tenant by design.",
    tags: ["FastAPI", "React", "PostgreSQL"],
    inner: {
      title: "POS Ecosystem",
      subtitle: "Multi-business point-of-sale platform",
      timeframe: "2025 - Present",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&auto=format&fit=crop",
      description:
        "A multi-tenant POS platform where one account manages multiple businesses. Built with a FastAPI backend, React frontend, and PostgreSQL via SQLAlchemy.\n\nFeatures merchant checkout, inventory management with real-time stock tracking, transaction logs, and a revenue dashboard with chart visualizations. Slug-based routing per business keeps everything cleanly separated.",
      tags: ["FastAPI", "React", "PostgreSQL", "SQLAlchemy", "Pydantic", "JWT"],
      upcoming: [
        "Stripe payment integration",
        "Customer-facing storefront per business",
        "ML-powered stock reorder recommendations",
      ],
      githubUrl: "https://github.com/PranjwalS/pos-ecosystem",
    },
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
      <PaneCard
        key={p.name}
        name={p.name}
        meta={p.meta}
        sub={p.sub}
        desc={p.desc}
        tags={p.tags}
        inner={p.inner}
      />
    ))}
  </Pane>
);

export default ProjectsPane;