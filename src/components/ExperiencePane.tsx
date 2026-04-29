import React from "react";
import { Pane, PaneCard, PaneSectionTitle } from "./Pane";

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
      desc="Developing RAG pipelines and improving LLM response quality for an AI-powered learning assistant. Python backend systems, prompt engineering workflows, and retrieval/ranking/chunking architecture."
      tags={["Python", "RAG", "LangChain", "Pinecone", "MongoDB", "Prompt Engineering"]}
      previewImage="https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=600&auto=format&fit=crop"
      href="https://askly.today"
    />

    <PaneCard
      name="Ericsson"
      meta="2024"
      sub="DevOps Engineer Intern"
      desc="Monitoring and observability across Kubernetes clusters. Built and maintained Jenkins pipelines. Grafana dashboards for infrastructure health. Optimized Celery/Redis polling on Upstash to reduce idle command volume."
      tags={["Kubernetes", "Jenkins", "Grafana", "Redis", "Celery", "Upstash"]}
      previewImage="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&auto=format&fit=crop"
      href="https://ericsson.com"
    />

    <PaneCard
      name="Dept. of National Defence — CJCR"
      meta="2023"
      sub="Full Stack Developer Intern"
      desc="Full-stack development on internal tools. Vue.js frontend, .NET backend, SignalR for real-time updates. Power Platform automation."
      tags={["Vue.js", ".NET", "SignalR", "Power Platform", "C#"]}
      previewImage="https://images.unsplash.com/photo-1569025690938-a00729c9e1f9?w=600&auto=format&fit=crop"
      href="https://forces.gc.ca"
    />

    <PaneSectionTitle>Other</PaneSectionTitle>

    <PaneCard
      name="Math Department — University of Waterloo"
      meta="2025 – Present"
      sub="Course Grader"
      desc="Grading assignments and providing feedback for undergraduate mathematics courses. ~6 hrs/week."
      tags={["Grading", "Mathematics"]}
    />

  </Pane>
);

export default ExperiencePane;







// import React from "react";
// import { Pane, PaneCard, PaneSectionTitle } from "./Pane";

// interface ExperiencePaneProps {
//   isOpen: boolean;
//   onClose: () => void;
//   theme: "dark" | "light";
// }

// const ExperiencePane: React.FC<ExperiencePaneProps> = ({ isOpen, onClose, theme }) => (
//   <Pane open={isOpen} onClose={onClose} title="Experience" theme={theme}>

//     <PaneSectionTitle>Work</PaneSectionTitle>

//     <PaneCard
//       name="EdBridges Inc. — Askly.today"
//       meta="Jun 2026 – Aug 2026 — Remote"
//       sub="AI Software Engineer"
//       desc="Developing RAG pipelines and improving LLM response quality for an AI-powered learning assistant. Building Python backend systems and prompt engineering workflows. Working on retrieval, ranking, and chunking architecture."
//       tags={["Python", "RAG", "LangChain", "Pinecone", "MongoDB", "Prompt Engineering"]}
//     />

//     <PaneCard
//       name="Math Department — University of Waterloo"
//       meta="May 2026 - Aug 2026 — Waterloo, CAN"
//       sub="Course Grader"
//       desc="Grading assignments and providing feedback for undergraduate mathematics courses. ~6 hrs/week."
//       tags={["Grading", "Mathematics"]}
//     />
//     <PaneCard
//       name="Cadets, Dept. of National Defence"
//       meta="June 2025 - Aug 2025 — St-Jean, CAN"
//       sub="Full Stack Developer Intern"
//       desc="Full-stack development on internal tools. Built features with Vue.js on the frontend and .NET on the backend. Integrated SignalR for real-time updates. Power Platform automation work."
//       tags={["Vue.js", ".NET", "SignalR", "Power Platform", "C#"]}
//     />

//     <PaneCard
//       name="Ericsson"
//       meta="June 2024 - Aug 2024 — Ottawa, CAN"
//       sub="DevOps Engineer Intern"
//       desc="Monitoring and observability work across Kubernetes clusters. Built and maintained Jenkins pipelines. Grafana dashboard setup for infrastructure health tracking. Optimized Celery/Redis polling on Upstash to reduce idle command volume."
//       tags={["Kubernetes", "Jenkins", "Grafana", "Redis", "Celery", "Upstash"]}
//     />

//   </Pane>
// );

// export default ExperiencePane;