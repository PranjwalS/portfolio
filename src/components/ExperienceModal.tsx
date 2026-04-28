import React from "react";

interface ExperienceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ExperienceModal: React.FC<ExperienceModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const experiences = [
    {
      title: 'Full Stack Developer',
      company: 'Tech Startup Inc.',
      period: 'Jan 2024 - Present',
      description: 'Building scalable web applications using modern tech stack',
      responsibilities: [
        'Developed React components and backend APIs',
        'Optimized database queries improving performance by 40%',
        'Led code reviews and mentored junior developers',
      ],
    },
    {
      title: 'Frontend Developer Intern',
      company: 'Digital Agency',
      period: 'May 2023 - Aug 2023',
      description: 'Contributed to multiple client projects',
      responsibilities: [
        'Built responsive UIs with React and Tailwind CSS',
        'Implemented state management with Redux',
        'Collaborated with design team on UI/UX improvements',
      ],
    },
  ];

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/80 z-40"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-black border border-neutral-800 rounded-xl shadow-2xl max-w-2xl max-h-[80vh] overflow-hidden flex flex-col w-full animate-in fade-in-0 zoom-in-95 duration-200">
          
          {/* Header */}
          <div className="p-6 border-b border-neutral-800 flex justify-between items-center flex-shrink-0">
            <div>
              <h2 className="text-2xl font-medium text-white">Experience</h2>
              <p className="text-sm opacity-60 mt-1">Work & Professional Journey</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-neutral-900 rounded-lg transition text-white"
            >
              ✕
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6 text-white">
            {experiences.map((exp, idx) => (
              <div key={idx} className="border-l-2 border-neutral-700 pl-4 space-y-2">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold">{exp.title}</h3>
                    <p className="text-sm opacity-70">{exp.company}</p>
                  </div>
                  <span className="text-xs opacity-60">{exp.period}</span>
                </div>

                <p className="text-sm opacity-80">{exp.description}</p>

                <ul className="text-sm opacity-80 space-y-1 list-disc list-inside">
                  {exp.responsibilities.map((resp, i) => (
                    <li key={i}>{resp}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-neutral-800 flex justify-end flex-shrink-0">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-neutral-900 border border-neutral-800 rounded-lg text-white hover:bg-neutral-800 transition"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ExperienceModal;