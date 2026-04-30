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
    name: "JobScout",
    meta: "2024 – Present",
    sub: "AI job aggregator & application tracker",
    desc: "Scrapes, scores, and ranks co-op postings. Cover letter generation and full application tracking.",
    tags: ["FastAPI", "React", "Celery", "Redis", "GCP"],
    inner: {
      title: "JobScout",
      subtitle: "AI job aggregator & application tracker",
      timeframe: "2024 – Present",
      image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&auto=format&fit=crop",
      description:
        "JobScout is a full-stack job aggregation platform built specifically for co-op hunting. It scrapes postings across multiple sources, scores and ranks them against your profile using an LLM, and tracks every application end-to-end. The companion Chrome extension (Apply AI) detects job application pages and autofills fields by parsing DOM context against your stored profile.",
      tags: ["FastAPI", "React", "TypeScript", "Celery", "Redis", "Supabase", "GCP", "Vercel", "Playwright", "Chrome Extension"],
      upcoming: [
        "Career Twin integration — persistent career logbook and RAG-powered trajectory modeling",
        "Subscription model with Stripe billing",
        "LinkedIn scraper hardening against CSS class randomization",
        "Email digest for new high-score postings",
      ],
      githubUrl: "https://github.com/Pranjwals/jobscout",
      liveUrl: "https://jobscout.vercel.app",
    },
  },
  {
    name: "Mute",
    meta: "2025 – Present",
    sub: "Minimal Android OS launcher",
    desc: "Replaces the Android home screen with an intent-based interface and baked-in app restriction logic.",
    tags: ["Kotlin", "Android", "FastAPI"],
    inner: {
      title: "Mute",
      subtitle: "Minimal Android OS launcher",
      timeframe: "2025 – Present",
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&auto=format&fit=crop",
      description:
        "Mute replaces the Android home screen entirely. Instead of a grid of icons, it presents an intent-based interface — you choose a mode (focus, unwind, communicate) and only the relevant apps surface. App blocking is baked in natively. Heavy usage triggers visual degradation — colours desaturate progressively — as soft resistance. A small FastAPI backend handles persistence across crashes.",
      tags: ["Kotlin", "Android", "FastAPI", "AccessibilityService", "UsageStatsManager"],
      upcoming: [
        "Health Connect integration — physical state unlocks digital permissions",
        "Symmetric accountability pacts — shared bypass logs with a partner",
        "Intent-based launching with session timers",
        "Google Play Store release",
      ],
      githubUrl: "https://github.com/Pranjwals/mute",
    },
  },
  {
    name: "Enosym",
    meta: "2025",
    sub: "Local RAG knowledge assistant",
    desc: "Ingests documents into a local vector store and lets you query your own knowledge base with an LLM.",
    tags: ["Python", "LangChain", "ChromaDB"],
    inner: {
      title: "Enosym",
      subtitle: "Local RAG knowledge assistant",
      timeframe: "2025",
      image: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=800&auto=format&fit=crop",
      description:
        "Enosym is a local-first RAG pipeline. You feed it documents — PDFs, markdown, notes — and it embeds them into a local ChromaDB vector store. You can then query your own knowledge base through a clean interface backed by an LLM. Nothing leaves your machine. Built as a portfolio piece to demonstrate RAG architecture ahead of the EdBridges internship.",
      tags: ["Python", "LangChain", "ChromaDB", "FastAPI", "Ollama"],
      upcoming: [
        "Multi-modal ingestion — images and audio transcripts",
        "Web UI with streaming responses",
        "Plugin system for custom data sources",
      ],
      githubUrl: "https://github.com/Pranjwals/enosym",
    },
  },
  {
    name: "POS Ecosystem",
    meta: "2024",
    sub: "Multi-business point-of-sale platform",
    desc: "Merchant checkout, inventory, transaction logs, and a revenue dashboard. Multi-tenant by design.",
    tags: ["FastAPI", "React", "PostgreSQL"],
    inner: {
      title: "POS Ecosystem",
      subtitle: "Multi-business point-of-sale platform",
      timeframe: "2024",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&auto=format&fit=crop",
      description:
        "A multi-tenant POS platform where one account can manage multiple businesses. Built with a FastAPI backend, React frontend, and PostgreSQL via SQLAlchemy. Features include merchant checkout, inventory management with real-time stock tracking, transaction logs, and a revenue dashboard with chart visualizations. Slug-based routing per business.",
      tags: ["FastAPI", "React", "PostgreSQL", "SQLAlchemy", "Pydantic", "JWT"],
      upcoming: [
        "Stripe payment integration",
        "Customer-facing storefront per business",
        "Mobile app via the Kotlin codebase",
        "ML-powered stock reorder recommendations",
      ],
      githubUrl: "https://github.com/Pranjwals/pos",
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