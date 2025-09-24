import React from "react";
// import { useNavigate } from "react-router-dom";

interface CVBoxProps {
    text?: string,
    className?: string,
    link?: string,
}

const CVBox: React.FC<CVBoxProps> = ({
    text = "Resume",
    className = "",
    link = "./assets/cv.pdf"

}) => {
    return (
        <a
            href={link}
            download
            className={`block cursor-pointer bg-zinc-100 dark:bg-zinc-800 p-4 rounded-xl 
                 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors duration-200 
                 w-full h-[10vh] opacity-90 ${className}`}
        >
            <p className="text-black dark:text-white font-medium">{text}</p>
        </a>
    )
}

export default CVBox;