import React from "react";
import { motion } from "framer-motion";

const experiences = [
  {
    company: "CJCR IT Operations & Applications Development",
    role: "Applications Development Intern",
    location: "Rheinmetall, St-Jean, QC",
    duration: "June 2025 – Aug. 2025",
    bullets: [
      "- Built Power Apps for dashboards, audit tracking, and asset management integrating Dataverse + SQL.",
      "Contributed to Vue.js app used by 1000+ staff; created pages and real-time notifications with SignalR.",
      "Worked on .NET backend APIs for notifications and asset tracking.",
      "Participated in Agile Scrum/Kanban across a 55+ member nationwide team.",
      "Used Azure DevOps for version control, code reviews, and task assignment.",
      "Created Power Automate approval flows for process streamlining."
    ]
  },
  {
    company: "Ericsson R&D",
    role: "Digital Transformation Intern",
    location: "Ottawa, ON",
    duration: "June 2024 – Aug. 2024",
    bullets: [
      "Monitored and reported software KPIs from Jenkins CI/CD pipelines, diagnosing failures and raising tickets.",
      "Worked with Kubernetes + Docker, with exposure to Rancher UI.",
      "Built dashboards and monitoring tools with Grafana.",
      "Learned telecom basics: RF, beamforming, cluster architecture, TCP/UDP, and OS interactions."
    ]
  }
];

const education = [
  {
    school: "University of Waterloo",
    degree: "Bachelor of Computer Science, Honors",
    location: "Waterloo, ON",
    duration: "Sep. 2025 – Apr. 2030",
    coursework: [
      "Designing Functional Programs",
      "Linear Algebra",
      "Probability"
    ]
  },
  {
    school: "Dawson College",
    degree: "Computer Science and Mathematics — GPA: 3.99 (93%)",
    location: "Montreal, QC",
    duration: "Aug. 2024 – May 2025",
    coursework: [
      "Intro to Python",
      "Data Structures",
      "Object-Oriented Programming",
      "Calculus I & II",
      "Discrete Mathematics",
      "Mechanics"
    ]
  },
  {
    school: "ESDS High School",
    degree: "High School Diploma",
    location: "—",
    duration: "Graduated 2021",
    coursework: []
  }
];

const Experience: React.FC = () => {
  return (
    <section className="p-8 space-y-12">
      {/* Experience Section */}
      <div>
        <h2 className="text-3xl text-green-400 font-bold mb-6">Experience</h2>
        <div className="space-y-8">
          {experiences.map((exp, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-gray-900 p-6 rounded-xl shadow-md"
            >
              <h3 className="text-green-400 font-bold text-xl">{exp.company}</h3>
              <p className="text-gray-400">{exp.role} — {exp.location}</p>
              <span className="text-gray-500 text-sm">{exp.duration}</span>
              <ul className="mt-3 list-disc list-inside text-gray-300 space-y-1 text-sm">
                {exp.bullets.map((point, j) => (
                  <li key={j}>{point}</li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Education Section */}
      <div>
        <h2 className="text-3xl text-green-400 font-bold mb-6">Education</h2>
        <div className="space-y-8">
          {education.map((edu, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-gray-900 p-6 rounded-xl shadow-md"
            >
              <h3 className="text-green-400 font-bold text-xl">{edu.school}</h3>
              <p className="text-gray-400">{edu.degree} — {edu.location}</p>
              <span className="text-gray-500 text-sm">{edu.duration}</span>
              {edu.coursework.length > 0 && (
                <p className="mt-2 text-gray-300 text-sm">
                  Coursework: {edu.coursework.join(", ")}
                </p>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
