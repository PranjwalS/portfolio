import React from "react";

interface ContactItemProps {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  onClick?: () => void;
}

const ContactItem: React.FC<ContactItemProps> = ({ icon, title, subtitle, onClick }) => {
  return (
    <div
      className="flex flex-row items-center gap-4 bg-gradient-to-tr from-gray-800 to-gray-900 p-4 rounded-lg border border-white/10 cursor-pointer hover:translate-x-1 hover:bg-gradient-to-tr hover:from-gray-700 hover:to-gray-800 transition"
      onClick={onClick}
    >
      <div className="w-10 h-10 flex items-center justify-center rounded-lg text-xl bg-gradient-to-tr from-green-600 to-green-800">
        {icon}
      </div>
      <div>
        <h4 className="text-sm font-medium">{title}</h4>
        <p className="text-gray-400 text-xs">{subtitle}</p>
      </div>
    </div>
  );
};

export default ContactItem;
