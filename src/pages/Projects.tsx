import React from "react";
import ProjectCard from "../components/ProjectCard";

type Project = {
  title: string;
  status?: "active" | "completed";
};

const Projects: React.FC = () => {
  const projects: Project[] = [
    { title: "Portfolio Website", status: "active" },
    { title: "mPOS System", status: "active" },
    { title: "AI Stock Predictor", status: "completed" },
    { title: "Game Library Prototype", status: "active" },
  ];

  return (
    <section className="p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((p) => (
        <ProjectCard key={p.title} title={p.title} status={p.status} />
      ))}
    </section>
  );
};

export default Projects;
