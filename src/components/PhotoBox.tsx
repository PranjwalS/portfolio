import React from "react";

const PhotoBox: React.FC = () => {
  return (
    <div className="col-span-2 row-span-2 bg-gradient-to-tr from-gray-900 to-gray-800 p-4 rounded-xl flex flex-col items-center justify-center text-center">
      <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-700 rounded-lg border-2 border-dashed border-gray-600 flex flex-col items-center justify-center min-h-[400px]">
        <div className="text-6xl opacity-30">📸</div>
        <p className="text-gray-500 mt-2">
          Prom photo will go here<br />Looking sharp and professional!
        </p>
      </div>
    </div>
  );
};

export default PhotoBox;
