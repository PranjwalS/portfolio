import React from "react";
// import { motion } from "framer-motion";
import Button from "../components/about/Button"

const projects = [
    {
        title: "mpos + pos system",
        explanation: "build system"
    }
]

const Projects: React.FC = () => {
    return(
        <div>
            {projects.map((proj) => (
                <div>
              <h3 className="text-green-400 font-bold text-xl">{proj.title}</h3>
              <p className="text-gray-400">{proj.explanation}</p>
              </div>
            ))}
                  <Button text="<- go back to home"/>

        </div>
        
    )
}

export default Projects;