/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import { Pane, PaneCard, PaneSectionTitle } from "./Pane";
import type { InnerPaneData } from "./InnerPane";

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
      meta="2024 – 2029"
      sub="BCS Honours · Digital Hardware Specialization"
      desc="Co-op program targeting Fall 2026. Courses span mathematics, statistics, systems, and hardware design."
      tags={["CS 241", "CS 245", "CS 246", "MATH 239", "STAT 231", "MTE 120"]}
      inner={{
        title: "University of Waterloo",
        subtitle: "BCS Honours · Digital Hardware Specialization",
        timeframe: "2024 – 2029",
        image: "/assets/dc.avif",
        description:
          "Honours Bachelor of Computer Science with a Digital Hardware specialization. Co-operative education program — alternating academic and work terms. Targeting Fall 2026 co-op. Courses completed span algorithms and data structures, combinatorics and graph theory, logic and computability, statistics, linear algebra, and hardware design.",
        tags: [
          "MATH 135", "MATH 136", "MATH 137", "MATH 138", "MATH 239",
          "STAT 230", "STAT 231",
          "CS 135", "CS 136", "CS 241", "CS 245", "CS 246",
          "MTE 120",
        ],
        upcoming: [
          "Fall 2026 co-op placement",
          "2A term — CS 241, CS 245, CS 246, MTE 120",
          "Grading position in the math department",
        ],
        liveUrl: "https://uwaterloo.ca/future-students/programs/computer-science",
      }}
    />

    <PaneCard
      name="Dawson College"
      meta="2023 – 2024"
      sub="Computer Science & Mathematics · Avg. 95"
      desc="One-year DEC program prior to transferring to Waterloo."
      tags={["Computer Science", "Mathematics"]}
      inner={{
        title: "Dawson College",
        subtitle: "DEC — Computer Science & Mathematics",
        timeframe: "2023 – 2024",
        image: "/assets/dawson.jpg",
        description:
          "Completed one year of the DEC (Diplôme d'études collégiales) program in Computer Science and Mathematics at Dawson College, Montreal. Graduated with a 95 average before transferring to the University of Waterloo for the BCS Honours program.",
        tags: ["Computer Science", "Mathematics", "Calculus", "Linear Algebra", "Data Structures"],
      }}
    />

    <PaneSectionTitle>Secondary</PaneSectionTitle>

    <PaneCard
      name="École Secondaire des Sources"
      meta="2018 – 2023"
      sub="International Baccalaureate · 5 Years · Avg. 96"
      desc="Full IB program over 5 years."
      inner={{
        title: "École Secondaire des Sources",
        subtitle: "International Baccalaureate",
        timeframe: "2018 – 2023",
        image: "/assets/esds.jpg",
        description:
          "Completed the full International Baccalaureate program over 5 years at École Secondaire des Sources in Dollard-des-Ormeaux, Montreal. Graduated with a 96 average.",
        tags: ["International Baccalaureate", "Mathematics", "Sciences", "French", "Theory of Knowledge"],
      }}
    />

  </Pane>
);

export default EducationPane;