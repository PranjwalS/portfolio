import React, { useState } from "react";

interface EducationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const EducationModal: React.FC<EducationModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

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
              <h2 className="text-2xl font-medium text-white">Education</h2>
              <p className="text-sm opacity-60 mt-1">University of Waterloo</p>
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
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold">Bachelor of Computer Science (Honors Co-op)</h3>
                <p className="text-sm opacity-60">2023 - Present</p>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium">Key Courses</h4>
                <ul className="text-sm opacity-80 space-y-1 list-disc list-inside">
                  <li>Data Structures and Algorithms</li>
                  <li>Database Systems</li>
                  <li>Software Engineering</li>
                  <li>Web Development</li>
                </ul>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium">Achievements</h4>
                <p className="text-sm opacity-80">Dean's Honor List • GPA: 3.8/4.0</p>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium">Skills Developed</h4>
                <div className="flex flex-wrap gap-2">
                  {['TypeScript', 'React', 'Node.js', 'Python', 'SQL'].map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 text-xs rounded-lg bg-neutral-900 border border-neutral-800"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
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

export default EducationModal;