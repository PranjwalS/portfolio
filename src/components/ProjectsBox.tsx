import React from "react";
import { useNavigate } from "react-router-dom";

interface ProjectsBoxProps {
    text?: string,
    link?: string,
    className?: string,
}


const ProjectsBox: React.FC<ProjectsBoxProps> = ({
    text = "Projects and Skills",
    link = "/projects",
    className = ""
}) => {
    const navigate = useNavigate();
    return (
        <div className="flex items-stretch gap-2 h-full">
            <img
                src="/assets/ofudacopy.jpg"
                alt="Pattern"
                className="flex-none w-[12vh] h-full opacity-80 rounded-md filter grayscale dark:brightness-50 dark:contrast-125 dark:hover:grayscale-0 dark:hover:brightness-70 hover:grayscale-0 transition duration-300"
            />

            <div
                onClick={() => navigate(link)}
                className={`cursor-pointer bg-zinc-100 dark:bg-zinc-800 p-4 rounded-xl 
                hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors opacity-90 duration-200 
                flex-1 flex flex-col ${className}`}
            >
                <p className="text-right mt-auto px-2 pb-1 text-black dark:text-white font-medium">
                    {text}
                </p>
            </div>
        </div>
    )
}



export default ProjectsBox;