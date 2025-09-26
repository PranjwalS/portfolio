import React from "react";
import { useNavigate } from "react-router-dom";

interface ExperienceBoxProps {
    text?: string,
    link?: string,
    className?: string,
}


const ExperienceBox: React.FC<ExperienceBoxProps> = ({
    text = "Experience and Education",
    link = "/experience",
    className = ""
}) => {
    const navigate = useNavigate();
    return (
        <div className="flex items-stretch gap-2 h-full">

            <div
                onClick={() => navigate(link)}
                className={`cursor-pointer bg-zinc-100 dark:bg-zinc-800 p-4 rounded-xl hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors duration-200 flex-1 opacity-90 flex flex-col ${className}`}
            >
                <p className="mt-auto px-2 pb-1 text-black dark:text-white font-medium">{text}</p>
            </div>

            <img
                src="/assets/ofudacopy.jpg"
                alt="Pattern"
                className="flex-none h-full w-[12vh] rounded-md filter grayscale dark:brightness-50 dark:contrast-125 dark:hover:grayscale-0 dark:hover:brightness-70 hover:grayscale-0 transition duration-300 "/>
        </div>
    )
}


export default ExperienceBox;