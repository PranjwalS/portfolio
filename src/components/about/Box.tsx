import React from "react";

interface RectangleProps {
    text: string;
    color?: string;
}

const Box: React.FC<RectangleProps> = ({
    text, 
    color = "bg-green-600 hover:bg-blue-500"
}) => {
    return(
        <button
        className={`${color} `}>
        {text}
        </button>
    )
}

export default Box