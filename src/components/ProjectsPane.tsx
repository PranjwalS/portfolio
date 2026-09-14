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
      content: [
        {
          type: "paragraph",
          text: "JobScout is a full-stack career platform built around the idea that job hunting should be automated. Users maintain a Career Twin profile — experience, projects, skills, education — and spin up job search dashboards, each running a cron-scheduled scraper across major job boards.",
        },
        {
          type: "heading",
          text: "Matching & Generation",
        },
        {
          type: "paragraph",
          text: "Every listing gets scored and matched against your profile via LLM. Custom cover letters and tailored CVs are generated per listing through Celery + Redis async pipelines, with email alerts for high-ranked matches.",
        },
        {
          type: "heading",
          text: "Application Layer",
        },
        {
          type: "paragraph",
          text: "A Chrome extension handles static form autofill across job application pages. Applied jobs are tracked via email scanning or manual input. When an interview gets scheduled, the system assembles your CV, cover letter, job description, and an LLM-generated Q&A sheet one hour before — alongside a mock interview simulation.",
        },
        {
          type: "subheading",
          text: "AutoApply bot in progress",
        },
        {
          type: "paragraph",
          text: "An LLM + Playwright auto-application bot is currently being built to handle dynamic form pages end-to-end without manual input.",
        },
      ],
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
      content: [
        {
          type: "paragraph",
          text: "Campus is the social layer UW never built. Students log in with their UW account — no bots, real people — plug in their full schedule, and the app surfaces others with meaningful overlap: same courses, clubs, gym slots, or free blocks.",
        },
        {
          type: "heading",
          text: "How Matching Works",
        },
        {
          type: "paragraph",
          text: "Friend mode and date mode coexist on the same social graph. Matching is rule-based and math-driven — no LLMs anywhere in the product.",
        },
        {
          type: "bullets",
          items: [
            "Mutual-match ELO weighted by reciprocal like rate and conversation quality",
            "Proximity memory tracking shared campus spaces (DC, SLC, DP) — happn-style, campus-tuned",
            "Weekly rose mechanic: 1 per week, spin-to-win, artificial scarcity = genuine signal",
            "Mandatory audio snippet with an odd prompt — filters ego-browsers, surfaces personality",
          ],
        },
        {
          type: "heading",
          text: "Date Mode",
        },
        {
          type: "paragraph",
          text: "A BeReal-style date quest triggers when two matched people are live on campus at the same time. Quest photo posts to a public campus feed — no captions, no comments, just tags and likes. The scrapbook on your profile keeps a private memory of every date quest.",
        },
        {
          type: "heading",
          text: "The Game Layer",
        },
        {
          type: "paragraph",
          text: "Stakes without real money. The gambling mechanics add social tension and retention without monetizing directly.",
        },
        {
          type: "bullets",
          items: [
            "Prediction markets — bet in-app currency on social outcomes (will this match go on a date quest this week?)",
            "Streak wagers — bet currency your talking streak lasts X days",
            "Mystery box reward for completing date quests",
            "Hot-or-not campus poll where you stake points on whether a profile hits a likes threshold",
          ],
        },
      ],
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
      content: [
        {
          type: "paragraph",
          text: "Puja Hampers fills the gap between cheap Amazon listings and overpriced US competitors — curated Hindu religious gift boxes built for second-gen South Asians in Canada who want a thoughtful cultural gift without the assembly friction.",
        },
        {
          type: "heading",
          text: "What's in the Box",
        },
        {
          type: "paragraph",
          text: "Not a puja kit — a gift. Everything inside should be displayable and keepable. The hero piece is an aesthetic mid-range murti that fits a modern apartment: not cheap plastic, not temple-grade expensive.",
        },
        {
          type: "bullets",
          items: [
            "Murti (occasion-specific) — the statement piece",
            "One figurine — brass OR terracotta, not both",
            "Festival-specific item (diya for Diwali, gulaal for Holi, etc.)",
            "Occasion card (language-specific) — storytelling is core",
            "Premium reusable outer box + gift wrapping",
          ],
        },
        {
          type: "heading",
          text: "The Model",
        },
        {
          type: "paragraph",
          text: "One box per festival. Seasonal SKU model keeps focus tight: Diwali launches first, then New Year's, Holi, Raksha Bandhan. Sourced wholesale via IndiaMart and local Brampton/Mississauga suppliers. Occasion cards are language-specific — Hindi, Gujarati, Tamil, Punjabi over time.",
        },
        {
          type: "subheading",
          text: "Target: ~$60–70 sale price on ~$40–45 COGS",
        },
        {
          type: "paragraph",
          text: "Starting with tighter margins to build demand, then adjusting as the seasonal rhythm proves out. Customizable base box with optional add-ons at checkout.",
        },
      ],
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
      content: [
        {
          type: "paragraph",
          text: "Mute replaces your Android home screen entirely. The goal is simple: strip the phone down to what you actually use, and make the rest harder to reach.",
        },
        {
          type: "heading",
          text: "How It Works",
        },
        {
          type: "paragraph",
          text: "It presents only your pinned apps in a clean, minimal interface. Built-in blocking sits on top — apps and websites can be restricted via SYSTEM_ALERT_WINDOW overlays, with keyword and schedule-based rules enforced through AccessibilityService.",
        },
        {
          type: "bullets",
          items: [
            "Full home screen replacement — launcher takes over on boot",
            "App blocking via SYSTEM_ALERT_WINDOW overlays",
            "Website blocking with keyword and schedule-based rules",
            "AccessibilityService enforcement for persistent restriction",
          ],
        },
        {
          type: "heading",
          text: "Backend",
        },
        {
          type: "paragraph",
          text: "A small FastAPI backend on Render handles configuration backups and usage stats — keeping the on-device install lean.",
        },
      ],
      tags: ["Kotlin", "Jetpack Compose", "AccessibilityService", "SYSTEM_ALERT_WINDOW", "FastAPI", "PostgreSQL", "Render"],
      upcoming: [
        "Launching on Google Play Store",
        "Health Connect integration — physical state unlocks digital permissions",
        "Accountability pacts between two users with shared bypass logs",
      ],
      githubUrl: "https://github.com/Pranjwals/mute.",
    },
  },
  {
    name: "POS Ecosystem",
    meta: "2025 – Present",
    sub: "Multi-business point-of-sale platform",
    desc: "Merchant checkout, inventory, transaction logs, and a revenue dashboard. Multi-tenant by design.",
    tags: ["FastAPI", "React", "PostgreSQL"],
    inner: {
      title: "POS Ecosystem",
      subtitle: "Multi-business point-of-sale platform",
      timeframe: "2025 – Present",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&auto=format&fit=crop",
      content: [
        {
          type: "paragraph",
          text: "A multi-tenant POS platform where one account manages multiple businesses. Built with a FastAPI backend, React frontend, and PostgreSQL via SQLAlchemy.",
        },
        {
          type: "heading",
          text: "Features",
        },
        {
          type: "bullets",
          items: [
            "Merchant checkout flow",
            "Inventory management with real-time stock tracking",
            "Transaction logs with full history",
            "Revenue dashboard with chart visualizations",
            "Slug-based routing per business — cleanly separated tenants",
          ],
        },
        {
          type: "heading",
          text: "Architecture",
        },
        {
          type: "paragraph",
          text: "Slug-based routing keeps each business's data and UI cleanly separated within a single account. JWT auth handles multi-tenant access control across the stack.",
        },
      ],
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

