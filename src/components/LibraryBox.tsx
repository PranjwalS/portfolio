import React from "react";
import { useNavigate } from "react-router-dom";

interface LibraryBoxProps{
    text?: string,
    className?: string,
    link?: string,
}

const LibraryBox: React.FC<LibraryBoxProps> = ({
    text = "visit library?",
    className = "",
    link = "/library",
}) => {
    const navigate = useNavigate();

    return (
    <div
      onClick={() => navigate(link)}
      className={`cursor-pointer bg-zinc-100 dark:bg-zinc-800 p-4 rounded-xl hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors duration-200 w-82 h-38 opacity-90 ${className}`}
    >
      <p className="text-black dark:text-white font-medium">{text}</p>
    </div>
    )
}

export default LibraryBox;