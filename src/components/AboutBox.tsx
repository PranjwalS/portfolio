import React from "react";
import { useNavigate } from "react-router-dom"; // If you use React Router

interface AboutBoxProps {
  text?: string;
  link?: string;
  className?: string;
}

const AboutBox: React.FC<AboutBoxProps> = ({
  text = "UW BCS HC 1A STUDENT FROM MONTREAL. AND HOLY YAPPP",
  link = "/about",
  className = "",
}) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(link)}
      className={`cursor-pointer bg-zinc-100 dark:bg-zinc-800 p-4 rounded-xl hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors duration-200 w-full h-[55vh] opacity-90 ${className}`}
    >
      <p className="pt-4 text-black dark:text-white font-medium">{text}</p>
    </div>
  );
};

export default AboutBox;
