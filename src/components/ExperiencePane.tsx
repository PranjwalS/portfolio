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
      desc="Migrated test suite from Selenium to Playwright and built a visual regression tool comparing Figma designs to live UI using Playwright, pixel diffing, and an LLM API."
      tags={["Java", "Playwright", "Figma API", "LLM"]}
      inner={{
        title: "Definity",
        subtitle: "Test Automation Developer",
        timeframe: "Sept - Dec 2026  ·  Waterloo, CAN",
        image: "assets/definity.jpg",
        content: [
          {
            type: "paragraph",
            text: "Migrated the test suite from Selenium to Playwright, modernizing the automation framework across Definity's consumer-facing insurance platforms.",
          },
          {
            type: "heading",
            text: "Visual Regression Tool",
          },
          {
            type: "paragraph",
            text: "Built a visual regression testing tool from scratch that pulls design data from the Figma API and renders live frontend pages via Playwright, then runs pixel-level diffing to catch UI/UX discrepancies before they reach production.",
          },
          {
            type: "bullets",
            items: [
              "Figma API integration to pull design specs per component",
              "Playwright renders live pages for side-by-side comparison",
              "Pixel-level diffing to surface visual regressions automatically",
              "LLM API interprets diffs and generates human-readable reports for significant deltas",
              "Automated multi-step navigation and structured input handling",
              "Results output to dashboards with full historical logging",
            ],
          },
        ],
        tags: ["Python", "Playwright", "Figma API", "LLM", "Selenium", "BrowserStack"],
      }}
    />

    <PaneCard
      name="Cadets (CJCR), Dept. of National Defence"
      meta="Jun - Aug 2025  ·  St-Jean, CAN"
      sub="Software Developer Intern"
      desc="Built features across Vue.js frontend, .NET backend, SignalR Hubs, and Power Platform automation."
      tags={["Vue.js", ".NET", "SignalR", "Power Platform"]}
      inner={{
        title: "Cadets (CJCR), Dept. of National Defence",
        subtitle: "Software Developer Intern",
        timeframe: "Jun - Aug 2025  ·  St-Jean, CAN",
        image: "assets/cadets.jpg",
        content: [
          {
            type: "paragraph",
            text: "Full-stack development on internal tools used by 10,000+ program staff nationwide.",
          },
          {
            type: "heading",
            text: "Frontend",
          },
          {
            type: "paragraph",
            text: "Built pages, UI components, and dynamic dashboards on a Vue.js frontend.",
          },
          {
            type: "heading",
            text: "Backend",
          },
          {
            type: "bullets",
            items: [
              "Extended the .NET backend with new data entities and RESTful APIs",
              "Built SignalR Hubs for real-time asset tracking and reporting",
              "Power Apps solutions integrating Dataverse and SQL for cadet asset management",
            ],
          },
        ],
        tags: ["Vue.js", ".NET", "SignalR", "Power Platform", "SQL"],
      }}
    />

    <PaneCard
      name="Ericsson"
      meta="Jun - Aug 2024  ·  Ottawa, CAN"
      sub="Digital Transformation Intern"
      desc="Monitored pipelines with Jenkins and Kubernetes, maintained Grafana dashboards, and supported telecom infrastructure testing."
      tags={["Kubernetes", "Jenkins", "Grafana"]}
      inner={{
        title: "Ericsson",
        subtitle: "Digital Transformation Intern",
        timeframe: "Jun - Aug 2024  ·  Ottawa, CAN",
        image: "/assets/ericsson.jpeg",
        content: [
          {
            type: "paragraph",
            text: "Monitored and debugged software pipelines using Jenkins and Kubernetes, diagnosing build and deployment failures by inspecting pod status and reviewing logs.",
          },
          {
            type: "bullets",
            items: [
              "Pipeline monitoring and failure diagnosis across Jenkins and Kubernetes",
              "Grafana dashboards tracking KPIs and performance metrics across telecom infrastructure",
              "Software testing workflows and operational reporting",
            ],
          },
        ],
        tags: ["Kubernetes", "Jenkins", "Grafana", "Linux"],
      }}
    />

  </Pane>
);

export default ExperiencePane;