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
      meta="2025 – 2029  ·  Waterloo, CAN"
      sub="Computer Science Honours · Hardware Specialization"
      desc="Bachelor of Computer Science; a co-op program, targeting Fall 2026 internships. Courses span mathematics, statistics, programming, systems, and hardware design."
      tags={["CS 241", "CS 245", "CS 246", "MATH 239", "STAT 231", "MTE 120"]}
      inner={{
        title: "University of Waterloo",
        subtitle: "Computer Science Honours · Hardware Specialization",
        timeframe: "2025 – 2029  ·  Waterloo, CAN",
        image: "/assets/dc.avif",
        description:
          "Honours Bachelor of Computer Science with a Digital Hardware specialization. Co-operative education program; alternating academic and work terms. Targeting Fall 2026 co-op. Courses completed span algorithms and data structures, combinatorics and graph theory, logic and computability, statistics, linear algebra, and hardware design.",
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
      meta="2024 – 2025  ·  Montreal, CAN"
      sub="Computer Science & Mathematics · Avg. 95"
      desc="One-year DEC program prior to transferring to UWaterloo."
      tags={["Python", "OOP", "Discrete Maths", "Cal I", "Cal II", "Mechanics"]}
      inner={{
        title: "Dawson College",
        subtitle: "DEC — Computer Science & Mathematics",
        timeframe: "2024 – 2025  ·  Montreal, CAN",
        image: "/assets/dawson.jpg",
        description:
          "Completed one year of the DEC (Diplôme d'études collégiales) program in Computer Science and Mathematics at Dawson College, Montreal. Left with a 95 average before transferring to the University of Waterloo.",
        tags: ["Python", "OOP", "Discrete Maths", "Cal I", "Cal II", "Mechanics"],
      }}
    />

    <PaneSectionTitle>Secondary</PaneSectionTitle>

    <PaneCard
      name="École Secondaire des Sources"
      meta="2019 – 2024  ·  Montreal, CAN"
      sub="International Baccalaureate Program · Avg. 96"
      desc="French Public High School, IB program over 5 years."
      inner={{
        title: "École Secondaire des Sources",
        subtitle: "International Baccalaureate Program",
        timeframe: "2019 – 2024  ·  Montreal, CAN",
        image: "/assets/esds.jpg",
        description:
          "Completed the full International Baccalaureate program over 5 years at École Secondaire des Sources in Montreal, Canada. Graduated with a 96 average.",
        tags: ["IB", "Mathematics", "Chemistry", "Physics", "English", "French", "History"],
      }}
    />

  </Pane>
);

export default EducationPane;