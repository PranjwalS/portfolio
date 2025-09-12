import React from "react";

const About: React.FC = () => {
  return (
    <section className="p-8 max-w-3xl mx-auto space-y-6">
      <h2 className="text-3xl text-green-400 font-bold">About Me</h2>
      <p className="text-gray-400">
        Long-form blurb about yourself. Mention your skills, projects, interests, and personality.
        Include links to GitHub, LinkedIn, Discord, Instagram, Medium, Devpost, etc.
      </p>
      <button className="bg-green-400 text-black px-4 py-2 rounded hover:bg-green-500 transition">
        Download CV
      </button>
    </section>
  );
};

export default About;
