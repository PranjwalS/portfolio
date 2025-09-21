import React from "react";
import AboutBox from "../components/AboutBox"
import LibraryBox from "../components/LibraryBox"
import StackBox from "../components/StackBox"
import PhotoBox from "../components/PhotoBox"

const Landing: React.FC = () => {
  return (
    <section className="flex w-screen h-screen overflow-hidden">
<h1 className="absolute top-0 inset-x-0 text-center text-[9rem] font-bold text-black dark:text-white opacity-100 select-none pointer-events-none">
        Pranjwal Singh
      </h1>
      <div className="relative h-screen">
        <AboutBox className="absolute top-15 left-5" />
      </div>
      <div className="relative h-screen">
        <LibraryBox className="absolute top-97 left-5" />
      </div>
      <div className="relative h-screen">
        <StackBox className="absolute top-15 left-89" />
      </div>
      <div className="relative h-screen">
        <PhotoBox className="absolute top-55 left-89" />
      </div>
    </section >
  );
};

export default Landing;
