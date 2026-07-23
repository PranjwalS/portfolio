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
      name="Definity"
      meta="Sept - Dec 2026  ·  Waterloo, CAN"
      sub="Test Automation Developer"
      desc="."
      tags={["Python"]}
      inner={{
        title: "Definity",
        subtitle: "Test Automation Developer",
        timeframe: "Sept - Dec 2026  ·  Waterloo, CAN",
        image: "-",
        description:
          "new job",
        tags: ["Python"],
      }}
    />


    <PaneCard
      name="Cadets IT Team, Dept. of National Defence"
      meta="Jun - Aug 2025  ·  St-Jean, CAN"
      sub="Software Developer Intern"
      desc="Built features across Vue.js frontend, .NET backend, SignalR Hubs, and Power Platform automation."
      tags={["Vue.js", ".NET", "SignalR", "Power Platform"]}
      inner={{
        title: "Cadets IT Team, Dept. of National Defence",
        subtitle: "Software Developer Intern",
        timeframe: "Jun - Aug 2025  ·  St-Jean, CAN",
        image: "assets/cadets.jpg",
        description:
          "Full-stack development on internal tools used by 10,000+ program staff nationwide. Built pages, UI components, and dynamic dashboards on a Vue.js frontend. Extended the .NET backend with new data entities, SignalR Hubs, and RESTful APIs for asset tracking and reporting. Also built Power Apps solutions integrating Dataverse and SQL for reporting dashboards and cadet asset management.",
        tags: ["Vue.js", ".NET", "SignalR", "Power Platform", "SQL"],
      }}
    />

    <PaneCard
      name="Ericsson"
      meta="Jun - Aug 2024  ·  Ottawa, CAN"
      sub="Digital Transformation and Software Testing Intern"
      desc="Monitored pipelines with Jenkins and Kubernetes, maintained Grafana dashboards, and supported telecom infrastructure testing."
      tags={["Kubernetes", "Jenkins", "Grafana"]}
      inner={{
        title: "Ericsson",
        subtitle: "Digital Transformation and Software Testing Intern",
        timeframe: "Jun - Aug 2024  ·  Ottawa, CAN",
        image: "/assets/ericsson.jpeg",
        description:
          "Monitored and debugged software pipelines using Jenkins and Kubernetes, diagnosing build and deployment failures by inspecting pod status and reviewing logs. Maintained Grafana dashboards tracking KPIs and performance metrics across telecom infrastructure. Supported software testing workflows and contributed to operational reporting.",
        tags: ["Kubernetes", "Jenkins", "Grafana", "Linux"],
      }}
    />

  </Pane>
);

export default ExperiencePane;