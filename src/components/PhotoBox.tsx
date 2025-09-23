import React from "react";

interface PhotoBoxProps {
  className?: string;
}

const PhotoBox: React.FC<PhotoBoxProps> = ({
  className = "",
}) => {

  return (
    <div
      className={`${className} w-82 h-80 opacity-90 rounded-[12px] overflow-hidden mb-2`}
    >
      <img
        src="/assets/placeholder.png"
        className="w-full h-full object-cover filter grayscale hover:grayscale-0 transition duration-300"
      />
    </div>

  );
};

export default PhotoBox;
