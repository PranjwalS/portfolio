import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Landing from "../pages/Landing";
import Experience from "../pages/Experience";
import About from "../pages/About";
import Library from "../pages/Library";
import Projects from "../pages/Projects"

export const router = createBrowserRouter([
  {
    path:"/",
    element: <App />,
    children: [
      { index: true, element: <Landing />},
      { path: "about", element: <About />},
      { path: "experience", element: <Experience />},
      { path: "library", element: <Library />},
      { path: "projects", element: <Projects />}
    ],
  },
]);