import React from "react";

interface IconsBoxProps {
    className?: string
}

const IconsBox: React.FC<IconsBoxProps> = ({
    className = ""
}) => {
    return (

        <div className={`flex gap-2 ${className}`}>
            <a
                href="https://github.com/Pranjwals"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center 
                   bg-zinc-200 dark:bg-zinc-800 rounded-xl 
                   hover:bg-zinc-200 dark:hover:bg-zinc-700 
                   transition-colors duration-200 
                   w-20 h-20 opacity-90"
            >
                <img
                    src="/assets/icons/github.svg"
                    className="w-full h-full p-4 filter grayscale hover:grayscale-0 transition duration-300"
                />
            </a>

            <a
                href="https://www.instagram.com/pranjwal__repr__/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center 
                   bg-zinc-200 dark:bg-zinc-800 rounded-xl 
                   hover:bg-zinc-200 dark:hover:bg-zinc-700 
                   transition-colors duration-200 
                   w-20 h-20 opacity-90"
            >
                <img
                    src="/assets/icons/instagram.png"
                    className="w-full h-full p-5 filter grayscale hover:grayscale-0 transition duration-300"
                />
            </a>

            <a
                href="https://www.linkedin.com/in/pranjwal-singh-01979b242/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center 
                   bg-zinc-200 dark:bg-zinc-800 rounded-xl 
                   hover:bg-zinc-200 dark:hover:bg-zinc-700 
                   transition-colors duration-200 
                   w-20 h-20 opacity-90"
            >
                <img
                    src="/assets/icons/linkedin.png"
                    className="w-full h-full p-5 filter grayscale hover:grayscale-0 transition duration-300"
                />
            </a>
        </div>
    )
}

export default IconsBox;