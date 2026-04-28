import React from "react";

interface ProjectsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ProjectsModal: React.FC<ProjectsModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const projects = [
    {
      title: 'Portfolio Website',
      description: 'Personal portfolio built with Next.js, TypeScript, and Tailwind CSS',
      tech: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
      github: 'https://github.com',
      live: 'https://example.com',
    },
    {
      title: 'E-Commerce Platform',
      description: 'Full-stack e-commerce solution with payment integration',
      tech: ['React', 'Node.js', 'PostgreSQL', 'Stripe'],
      github: 'https://github.com',
      live: 'https://example.com',
    },
    {
      title: 'Real-time Chat App',
      description: 'WebSocket-based chat application with user authentication',
      tech: ['React', 'Socket.io', 'Express', 'MongoDB'],
      github: 'https://github.com',
      live: 'https://example.com',
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
              <h2 className="text-2xl font-medium text-white">Projects</h2>
              <p className="text-sm opacity-60 mt-1">Showcase of recent work</p>
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
            {projects.map((project, idx) => (
              <div
                key={idx}
                className="border border-neutral-800 rounded-lg p-4 hover:border-neutral-700 transition"
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-semibold">{project.title}</h3>
                  <div className="flex gap-2">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 hover:bg-neutral-900 rounded-lg transition text-white"
                    >
                      GH
                    </a>
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 hover:bg-neutral-900 rounded-lg transition text-white"
                    >
                      🔗
                    </a>
                  </div>
                </div>

                <p className="text-sm opacity-80 mb-3">{project.description}</p>

                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 text-xs rounded bg-neutral-900 border border-neutral-800"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
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

export default ProjectsModal;