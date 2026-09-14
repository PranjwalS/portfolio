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
    },
  },
  {
    name: "Campus",
    meta: "2026 – Present",
    sub: "Schedule-based campus social & dating app",
    desc: "UW-first social layer built on real schedules. Surfaces people in your orbit — same courses, clubs, free blocks — with friend and date mode on the same graph. No LLMs, all math.",
    tags: ["Expo", "Supabase", "Vercel"],
    inner: {
      title: "Campus",
      subtitle: "Schedule-based campus social & dating app",
      timeframe: "2026 – Present",
      image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&auto=format&fit=crop",
      description:
        "Campus is the social layer UW never built. Students log in with their UW account — no bots, real people — plug in their full schedule, and the app surfaces others with meaningful overlap: same courses, clubs, gym slots, or free blocks.\n\nFriend mode and date mode coexist on the same social graph. Matching is rule-based and math-driven: mutual-match ELO weighted by reciprocal like rate and conversation quality, proximity memory tracking shared campus spaces, and a weekly rose mechanic for genuine signal. A mandatory audio snippet filters ego-browsers.\n\nThe gambling layer adds stakes without real money — spin-to-win roses, prediction markets on social outcomes, streak wagers, and mystery box rewards for completing date quests. A BeReal-style date quest posts to a public campus feed when two people meet up live on campus.",
      tags: ["Expo", "React Native", "Supabase", "Vercel", "PostGIS"],
      upcoming: [
        "UW SSO login integration",
        "Schedule import from Quest",
        "Prediction market engine",
        "Expand to other Canadian campuses",
      ],
    },
  },
  {
    name: "Puja Hampers",
    meta: "2026 – Present",
    sub: "Curated Hindu religious gift boxes for the diaspora",
    desc: "Occasion-based puja gift kits for South Asian Canadians. Seasonal SKU model, storytelling-first packaging, sourced and shipped from Canada.",
    tags: ["E-commerce", "Shopify", "Consumer"],
    inner: {
      title: "Puja Hampers",
      subtitle: "Curated Hindu religious gift boxes for the diaspora",
      timeframe: "2026 – Present",
      image: "https://images.unsplash.com/photo-1604595677054-43b8c23a8a9f?w=800&auto=format&fit=crop",
      description:
        "Puja Hampers fills the gap between cheap Amazon listings and overpriced US competitors — curated Hindu religious gift boxes built for second-gen South Asians in Canada who want a thoughtful cultural gift without the assembly friction.\n\nOne box per festival. Each box tells a story: what the occasion is, why these items, brief cultural context on the card. Everything inside should be displayable and keepable — not a puja kit, a gift. Hero piece is an aesthetic mid-range murti that fits a modern apartment.\n\nSeasonal SKU model keeps focus tight: Diwali launches first, then New Year's, Holi, Raksha Bandhan. Sourced wholesale via IndiaMart and local Brampton/Mississauga suppliers. Occasion cards are language-specific — Hindi, Gujarati, Tamil, Punjabi over time.",
      tags: ["E-commerce", "Consumer", "Shopify", "D2C"],
      upcoming: [
        "Diwali box launch",
        "Storefront live with seasonal SKU rotation",
        "Language-specific occasion cards",
        "Decorative coaster add-on line",
      ],
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