import React from "react";
import { useNavigate } from "react-router-dom";

interface ExperienceBoxProps {
    text?: string,
    link?: string,
    className?: string,
}


const ExperienceBox: React.FC<ExperienceBoxProps> = ({
    text = "Experience and Education spot here",
    link = "/experience",
    className = ""
}) => {
    const navigate = useNavigate();
    return (
        <div
            onClick={() => navigate(link)}
            className={`cursor-pointer bg-zinc-100 dark:bg-zinc-800 p-4 rounded-xl hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors duration-200 w-full h-[40vh] opacity-90 ${className}`}
        >
            <p className="text-black dark:text-white font-medium">{text}</p>
        </div>
    )
}


export default ExperienceBox;