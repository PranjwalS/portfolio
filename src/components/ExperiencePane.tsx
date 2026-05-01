/* eslint-disable @typescript-eslint/no-unused-vars */

import React from "react";
import { Pane, PaneCard, PaneSectionTitle } from "./Pane";
import type { InnerPaneData } from "./InnerPane";

interface ExperiencePaneProps {
  isOpen: boolean;
  onClose: () => void;
  theme: "dark" | "light";
}

const ExperiencePane: React.FC<ExperiencePaneProps> = ({ isOpen, onClose, theme }) => (
  <Pane open={isOpen} onClose={onClose} title="Experience" theme={theme}>

    <PaneSectionTitle>Work</PaneSectionTitle>

    <PaneCard
      name="EdBridges Inc. — Askly.today"
      meta="Jun – Aug 2026"
      sub="AI Software Engineer"
      desc="RAG pipelines, LLM response quality, Python backend systems, prompt engineering."
      tags={["Python", "RAG", "LangChain", "Pinecone", "MongoDB"]}
      inner={{
        title: "EdBridges Inc.",
        subtitle: "AI Software Engineer — Askly.today",
        timeframe: "Jun – Aug 2026",
        image: "/assets/edbridge.jpg",
        description:
          "Working on Askly.today, an AI-powered learning assistant. Core work involves designing and improving RAG pipelines — retrieval, ranking, and chunking architecture — and systematically improving LLM response quality through prompt engineering and evaluation tooling. Also building Python backend systems and QA infrastructure to measure answer accuracy.",
        tags: ["Python", "RAG", "LangChain", "Pinecone", "MongoDB", "Prompt Engineering", "FastAPI"],
        upcoming: [
          "Release 3 feature rollout",
          "Evaluation pipeline for LLM response quality",
          "Chunking strategy improvements for long documents",
        ],
        liveUrl: "https://askly.today",
      }}
    />

    <PaneCard
      name="Ericsson"
      meta="2024"
      sub="DevOps Engineer Intern"
      desc="Kubernetes monitoring, Jenkins pipelines, Grafana dashboards, Redis/Celery optimization."
      tags={["Kubernetes", "Jenkins", "Grafana", "Redis", "Celery"]}
      inner={{
        title: "Ericsson",
        subtitle: "DevOps Engineer Intern",
        timeframe: "2024",
        image: "/assets/ericsson.jpeg",
        description:
          "Monitoring and observability work across Kubernetes clusters in a production environment. Built and maintained Jenkins CI/CD pipelines. Set up Grafana dashboards for infrastructure health tracking. Reduced idle Redis command volume by optimizing Celery polling intervals on Upstash — meaningful cost and latency improvement on a high-throughput system.",
        tags: ["Kubernetes", "Jenkins", "Grafana", "Redis", "Celery", "Upstash", "Docker", "Linux"],
      }}
    />

    <PaneCard
      name="Dept. of National Defence — CJCR"
      meta="2023"
      sub="Full Stack Developer Intern"
      desc="Vue.js frontend, .NET backend, SignalR for real-time updates, Power Platform automation."
      tags={["Vue.js", ".NET", "SignalR", "Power Platform"]}
      inner={{
        title: "Dept. of National Defence",
        subtitle: "Full Stack Developer Intern — CJCR",
        timeframe: "2023",
        image: "assets/cadets.jpg",
        description:
          "Full-stack development on internal tools for the Canadian Joint Cadet Recruiting organization. Built features across the stack — Vue.js on the frontend, .NET on the backend. Integrated SignalR for real-time data updates. Also built Power Platform automation flows to reduce manual administrative work.",
        tags: ["Vue.js", ".NET", "C#", "SignalR", "Power Platform", "Azure"],
      }}
    />

    <PaneSectionTitle>Other</PaneSectionTitle>

    <PaneCard
      name="Math Department — University of Waterloo"
      meta="2025 – Present"
      sub="Course Grader"
      desc="Grading undergraduate mathematics assignments. ~6 hrs/week."
      tags={["Mathematics", "Grading"]}
    />

  </Pane>
);

export default ExperiencePane;