import React from "react";
import { motion } from "framer-motion";

const Landing: React.FC = () => {
  return (
    <section className="flex flex-col items-center justify-center py-20 space-y-8">
      <motion.img
        src="/assets/placeholder.png"
        alt="Pranjwal"
        className="w-48 h-48 rounded-full border-4 border-green-400"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      />
      <motion.h1
        className="text-4xl font-bold text-green-400 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        Pranjwal Singh — 1A CS @ Waterloo
      </motion.h1>
      <motion.p
        className="text-gray-400 text-center max-w-xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        Currently hacking on crazy projects, learning insane new web dev and AI/ML
        stacks. Scroll down to see projects, skills, experience, and more.
      </motion.p>
    </section>
  );
};

export default Landing;
