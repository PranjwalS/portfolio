import React from "react";
import { Pane, PaneCard, PaneSectionTitle } from "./Pane";

interface EducationPaneProps {
  isOpen: boolean;
  onClose: () => void;
  theme: "dark" | "light";
}

const EducationPane: React.FC<EducationPaneProps> = ({ isOpen, onClose, theme }) => (
  <Pane open={isOpen} onClose={onClose} title="Education" theme={theme}>

    <PaneSectionTitle>Post-Secondary</PaneSectionTitle>

    <PaneCard
      name="University of Waterloo"
      meta="2025 – 2029"
      sub="Computer Science Honours · Digital Hardware Specialization"
      desc="Co-op program in Computer Science with a Hardware spec. Targeting Fall 2026 co-op. Courses completed and in progress span mathematics, statistics, systems, and hardware design."
      tags={[
        "MATH 135", "MATH 136", "MATH 137", "MATH 138", "MATH 239",
        "STAT 230", "STAT 231",
        "CS 135", "CS 136", "CS 241", "CS 245", "CS 246",
        "MTE 120",
      ]}
    />

    <PaneCard
      name="Dawson College"
      meta="2024 – 2025"
      sub="Computer Science & Mathematics · Avg. 95"
      desc="One-year DEC program in Computer Science and Mathematics prior to transferring to UWaterloo."
      tags={["Computer Science", "Mathematics"]}
    />

    <PaneSectionTitle>Secondary</PaneSectionTitle>

    <PaneCard
      name="École Secondaire des Sources"
      meta="2019 – 2024"
      sub="International Baccalaureate · 5 Years · Avg. 96"
      desc="IB program. French High School"
    />

  </Pane>
);

export default EducationPane;