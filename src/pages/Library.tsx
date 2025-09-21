import React from "react";
import Button from "../components/about/Button";

const Library: React.FC = () => {
  const blogs = [
    "Blog Post 1",
    "Essay on AI",
    "Creative Writing Sample",
    "Tech Analysis 101",
  ];

  return (
    <section className="p-8 space-y-6 max-w-4xl mx-auto">
      <h2 className="text-3xl text-green-400 font-bold">Library (Coming Soon)</h2>
      <p className="text-gray-400">Gamified pixel library with essays and blogs coming soon.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {blogs.map((b) => (
          <div key={b} className="bg-gray-900 p-4 rounded shadow hover:bg-gray-800 transition">
            {b}
          </div>
        ))}
      </div>
      <button className="mt-6 bg-gray-700 text-gray-500 px-4 py-2 rounded cursor-not-allowed opacity-70">
        Enter the Pixel Library
      </button>
      <Button text="<- go back"/>
    </section>
  );
};

export default Library;
