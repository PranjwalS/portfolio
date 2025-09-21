import React, { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./components/Header";

const App: React.FC = () => {
  const [theme, setTheme] = useState('light');
  const location = useLocation();
  
  // Check if we're on the landing page (adjust the path as needed)
  const isLandingPage = location.pathname === '/' || location.pathname === '/landing';

  return (
    <div className={theme === 'dark' ? 'dark' : ''}>
      <div className={`flex flex-col bg-white dark:bg-black text-black dark:text-white ${
        isLandingPage 
          ? 'h-screen overflow-hidden' 
          : 'min-h-screen'
      }`}>
        <Header theme={theme} setTheme={setTheme} />
        <main className={isLandingPage ? 'flex-1 overflow-hidden' : 'flex-1'}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default App;