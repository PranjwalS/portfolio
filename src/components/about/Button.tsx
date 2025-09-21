import React from "react";
import { useNavigate } from "react-router-dom"; // If you use React Router

interface ButtonProps {
  text: string;
  color?: string;        // Background + hover
  fontClass?: string;    // Font style
  size?: string;         // Padding / text size
  rounded?: string;      // Border radius
    link?: string;

}

const Button: React.FC<ButtonProps> = ({
  text,
  color = "bg-green-600 hover:bg-green-500",
  fontClass = "font-sans",
  size = "px-4 py-2 text-sm",
  rounded = "rounded-md",
  link = "/"
}) => {
    const navigate = useNavigate();
  
  return (
    <button
      className={`${color} ${fontClass} ${size} ${rounded} transition-all duration-200`}
      onClick={() => navigate(link)}
    >
      {text}
    </button>
  );
};

export default Button;
