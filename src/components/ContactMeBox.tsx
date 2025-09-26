import React from "react";
import { useNavigate } from "react-router-dom";

interface ContactMeBoxProps {
    text?: string,
    link?: string,
    className?: string,
}

const ContactMeBox: React.FC<ContactMeBoxProps> = ({
    text = "Contact Me", 
    link = "/contact",
    className = ""
}) => {
    const navigate = useNavigate();
    return(
        <div
            onClick={() => navigate(link)}
            className={`cursor-pointer bg-zinc-100 dark:bg-zinc-800 p-2 rounded-xl hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors duration-200 w-full h-[10vh] opacity-90 flex flex-col ${className}`}
        >
            <p className="mt-auto px-2 text-right text-black dark:text-white font-medium">{text}</p>
        </div>
    )
}

export default ContactMeBox;