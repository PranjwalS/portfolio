import React from "react";

const techStack = ["React", "Node.js", "Python", "TypeScript", "MongoDB", "AWS", "Next.js", "PostgreSQL"];

const AboutBox: React.FC = () => {
  return (
    <div className="bg-gradient-to-tr from-gray-800 to-gray-900 p-6 rounded-xl flex flex-col gap-6">
      <h2 className="text-2xl font-light text-white">About Me</h2>
      <div className="text-gray-300 text-sm leading-relaxed">
        <p>Hey! I'm an 18-year-old Computer Science student at the University of Waterloo, passionate about building innovative solutions and exploring the intersection of technology and creativity.</p>
        <p>I love diving deep into full-stack development, working on challenging projects, and constantly learning new technologies. When I'm not coding, you can find me exploring new ideas, contributing to open source, or planning my next hackathon adventure.</p>
        <p>Currently focused on web development, AI/ML applications, and creating digital experiences that make a difference.</p>
      </div>
      <div className="flex flex-wrap gap-2">
        {techStack.map((tech) => (
          <span key={tech} className="px-3 py-1 border border-green-700 bg-green-900 rounded-full text-green-400 text-xs hover:bg-green-800 hover:translate-y-[-2px] transition">
            {tech}
          </span>
        ))}
      </div>
    </div>
  );
};

export default AboutBox;
