import { Routes, Route, Link } from "react-router-dom";
import Landing from "./pages/Landing";
import Projects from "./pages/Projects";
import Experience from "./pages/Experience";
import About from "./pages/About";
import Library from "./pages/Library";

function App() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Navbar */}
      <nav className="flex gap-6 p-4 bg-gray-800 shadow-lg">
        <Link to="/" className="hover:text-blue-400">Landing</Link>
        <Link to="/projects" className="hover:text-blue-400">Projects</Link>
        <Link to="/experience" className="hover:text-blue-400">Experience</Link>
        <Link to="/about" className="hover:text-blue-400">About</Link>
        <Link to="/library" className="hover:text-blue-400">Library</Link>
      </nav>

      {/* Routes */}
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/experience" element={<Experience />} />
        <Route path="/about" element={<About />} />
        <Route path="/library" element={<Library />} />
      </Routes>
    </div>
  );
}

export default App;
