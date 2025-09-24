import React from "react";
import AboutBox from "../components/AboutBox"
import LibraryBox from "../components/LibraryBox"
import StackBox from "../components/StackBox"
import PhotoBox from "../components/PhotoBox"
import ExperienceBox from "../components/ExperienceBox";
import ProjectsBox from "../components/ProjectsBox";
import ContactBox from "../components/ContactBox";
import CVBox from "../components/CVBox";
import IconsBox from "../components/IconsBox";

const Landing: React.FC = () => {
  return (
    // <section className="flex w-screen h-screen overflow-hidden">
    <section className="grid grid-cols-4 py-10 w-screen h-screen overflow-hidden">
      <h1 className="absolute top-0 inset-x-0 text-center text-[8rem] font-bold text-black dark:text-white opacity-100 select-none pointer-events-none">
        Pranjwal Singh
      </h1>
      <div className="flex flex-col gap-y-2 px-2">
        <AboutBox />
        <LibraryBox />
      </div>

      <div className="flex flex-col gap-y-2 ">
        <StackBox />
        <PhotoBox />
      </div>

      <div className="flex flex-col gap-y-2 px-2">
        <ExperienceBox />
        <ProjectsBox />
      </div>

      <div className="flex flex-col">
        <ContactBox />
        <CVBox />
        <IconsBox className="p-2" />
      </div>
    </section>

  );
};

export default Landing;
