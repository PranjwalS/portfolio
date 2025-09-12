import React from "react";
import { motion } from "framer-motion";

interface ProjectCardProps {
  title: string;
  status?: "active" | "completed";
}

const ProjectCard: React.FC<ProjectCardProps> = ({ title, status }) => {
  return (
    <motion.div
      className="bg-gray-900 p-4 rounded-xl shadow-lg flex flex-col justify-between hover:scale-105 transition-transform"
      whileHover={{ scale: 1.05 }}
    >
      <div className="flex justify-between items-center">
        <h3 className="text-green-400 font-bold text-lg">{title}</h3>
        {status && (
          <span
            className={`px-2 py-1 rounded-full text-xs font-semibold ${
              status === "active" ? "bg-green-600" : "bg-gray-700"
            }`}
          >
            {status}
          </span>
        )}
      </div>
      <p className="text-gray-400 mt-2">Project description placeholder.</p>
    </motion.div>
  );
};

export default ProjectCard;
