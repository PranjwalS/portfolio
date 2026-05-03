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
      name="EdBridges Inc. · Askly.today"
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
        liveUrl: "https://askly.today",
      }}
    />

    <PaneCard
      name="Math Department · University of Waterloo"
      meta="May - Aug 2026"
      sub="Math Course Grader"
      desc="Grading undergraduate mathematics assignments and exams. ~6 hrs/week."
      tags={["Mathematics", "Grading"]}
    />


    <PaneCard
      name="Cadets IT Team, Dept. of National Defence"
      meta="Jun - Aug 2025"
      sub="Software Developer Intern"
      desc="Built features across Vue.js frontend, .NET backend, SignalR Hubs, and Power Platform automation."
      tags={["Vue.js", ".NET", "SignalR", "Power Platform"]}
      inner={{
        title: "Cadets IT Team, Dept. of National Defence",
        subtitle: "Software Developer Intern",
        timeframe: "Jun - Aug 2025",
        image: "assets/cadets.jpg",
        description:
          "Full-stack development on internal tools used by 10,000+ program staff nationwide. Built pages, UI components, and dynamic dashboards on a Vue.js frontend. Extended the .NET backend with new data entities, SignalR Hubs, and RESTful APIs for asset tracking and reporting. Also built Power Apps solutions integrating Dataverse and SQL for reporting dashboards and cadet asset management.",
        tags: ["Vue.js", ".NET", "SignalR", "Power Platform", "SQL"],
      }}
    />

    <PaneCard
      name="Ericsson"
      meta="Jun - Aug 2024"
      sub="Digital Transformation and Software Testing Intern"
      desc="Monitored pipelines with Jenkins and Kubernetes, maintained Grafana dashboards, and supported telecom infrastructure testing."
      tags={["Kubernetes", "Jenkins", "Grafana"]}
      inner={{
        title: "Ericsson",
        subtitle: "Digital Transformation and Software Testing Intern",
        timeframe: "Jun - Aug 2024",
        image: "/assets/ericsson.jpeg",
        description:
          "Monitored and debugged software pipelines using Jenkins and Kubernetes, diagnosing build and deployment failures by inspecting pod status and reviewing logs. Maintained Grafana dashboards tracking KPIs and performance metrics across telecom infrastructure. Supported software testing workflows and contributed to operational reporting.",
        tags: ["Kubernetes", "Jenkins", "Grafana", "Linux"],
      }}
    />

  </Pane>
);

export default ExperiencePane;