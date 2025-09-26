import React from "react";

interface StackBoxProps {
    text?: string,
    className?: string,
}

const StackBox: React.FC<StackBoxProps> = ({
    text = "TECH STACK ANIMATION HERE",
    className = ""
}) => {
    

    return (
        <div
            className={`cursor-pointer bg-zinc-100 dark:bg-zinc-800 p-4 rounded-xl transition-colors duration-200 w-full h-[21vh] opacity-90 ${className}`}
        >
            <p className="text-black dark:text-white font-medium">{text}</p>
        </div>
    )
}


export default StackBox;