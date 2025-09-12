import React from "react";
import { NavLink } from "react-router-dom";

const Header: React.FC = () => {
  const links = [
    { name: "Home", path: "/" },
    { name: "Projects/Skills", path: "/projects" },
    { name: "Experience", path: "/experience" },
    { name: "About Me", path: "/about" },
    { name: "Library", path: "/library" },
  ];

  return (
    <header className="bg-black border-b border-gray-800 p-4 sticky top-0 z-50">
      <nav className="flex justify-center space-x-8">
        {links.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            className={({ isActive }) =>
              `text-lg font-semibold ${
                isActive ? "text-green-400" : "text-gray-400 hover:text-green-400"
              } transition-colors`
            }
          >
            {link.name}
          </NavLink>
        ))}
      </nav>
    </header>
  );
};

export default Header;
