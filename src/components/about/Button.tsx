import React from "react";

interface ButtonProps {
  text: string;
  onClick: () => void;
  color?: string;        // Background + hover
  fontClass?: string;    // Font style
  size?: string;         // Padding / text size
  rounded?: string;      // Border radius
}

const Button: React.FC<ButtonProps> = ({
  text,
  onClick,
  color = "bg-green-600 hover:bg-green-500",
  fontClass = "font-sans",
  size = "px-4 py-2 text-sm",
  rounded = "rounded-md",
}) => {
  return (
    <button
      className={`${color} ${fontClass} ${size} ${rounded} transition-all duration-200`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
