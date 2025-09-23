import React from "react";

interface ContactBoxProps {
    className?: string,
    text?: string,
}

const ContactBox: React.FC<ContactBoxProps> = ({
    className = "",
    text = "4387734010 | singhpranjwal@gmail.com"
}) => {

    return (
        <div className={`${className} w-82 h-80 opacity-90 rounded-[12px] overflow-hidden mb-2 relative`}>
            <img
                src="/assets/cn.jpg"
                className="w-full h-full object-cover filter grayscale hover:grayscale-0 transition duration-300"
            />
            <p className="absolute bottom-2 left-2 right-2 text-white font-medium bg-black/50 px-2 py-1 rounded">
                {text}
            </p>
        </div>


    );
};

export default ContactBox;
