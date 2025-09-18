import React from "react";

const awards = [
  { title: "Dean's List", subtitle: "University of Waterloo - Fall 2024" },
  { title: "Hackathon Winner", subtitle: "Best Tech Innovation - Hack the North 2024" },
  { title: "Scholarship Recipient", subtitle: "President's Scholarship of Distinction" },
  { title: "Open Source Contributor", subtitle: "Featured contributor to React ecosystem" },
];

const AwardsBox: React.FC = () => {
  return (
    <div className="bg-gradient-to-tr from-gray-800 to-gray-900 p-6 rounded-xl">
      <h3 className="text-xl font-medium text-white mb-4">Awards & Recognition</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {awards.map((award) => (
          <div key={award.title} className="p-4 bg-white/5 rounded-lg border-l-4 border-green-700 hover:bg-white/10 hover:translate-x-1 transition">
            <h4 className="text-green-400 font-medium">{award.title}</h4>
            <p className="text-gray-400 text-sm">{award.subtitle}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AwardsBox;
