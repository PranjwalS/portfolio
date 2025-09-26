import React from "react";
import { useNavigate } from "react-router-dom";

interface LibraryBoxProps {
  text?: string,
  className?: string,
  link?: string,
}

const LibraryBox: React.FC<LibraryBoxProps> = ({
  text = "Library",
  className = "",
  link = "/library",
}) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(link)}
      className={`cursor-pointer bg-zinc-100 dark:bg-zinc-800 p-2 rounded-xl 
              hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors duration-200 
              w-full h-[14vh] opacity-90 flex flex-col ${className}`}
    >
      <p className="mt-auto text-black px-2 dark:text-white font-medium">{text}</p>
    </div>

  )
}

export default LibraryBox;