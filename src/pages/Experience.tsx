import React from "react";
import { motion } from "framer-motion";

const experiences = [
  { title: "1A CS @ Waterloo", subtitle: "Current", year: "2025" },
  { title: "Dawson College", subtitle: "CS Diploma", year: "2023" },
  { title: "ESDS High School", subtitle: "Graduated", year: "2021" },
];

const Experience: React.FC = () => {
  return (
    <section className="p-8 space-y-8">
      <h2 className="text-3xl text-green-400 font-bold mb-4">Experience & Education</h2>
      <div className="space-y-6">
        {experiences.map((exp, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-gray-900 p-4 rounded-xl shadow-md"
          >
            <h3 className="text-green-400 font-bold text-xl">{exp.title}</h3>
            <p className="text-gray-400">{exp.subtitle}</p>
            <span className="text-gray-500">{exp.year}</span>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Experience;
