import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Landing from "../pages/Landing";
import Projects from "../pages/Projects";
import Experience from "../pages/Experience";
import About from "../pages/About";
import Library from "../pages/Library";


export const router = createBrowserRouter([
  {
    path:"/",
    element: <App />,
    children: [
      { index: true, element: <Landing />},
      { path: "projects", element: <Projects />},
      { path: "about", element: <About />},
      { path: "experience", element: <Experience />},
      { path: "library", element: <Library />}
    ],
  },
]);