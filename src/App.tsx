/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
// import Header from "./components/Header";

const App: React.FC = () => {
  const [theme, setTheme] = useState('light');
  const location = useLocation();

  const isLandingPage = location.pathname === '/' || location.pathname === '/landing';

  return (
    <div className={theme === 'dark' ? 'dark' : ''}>
      <div className={`flex flex-col bg-white dark:bg-zinc-900 text-black dark:text-white ${isLandingPage
        ? 'h-screen overflow-hidden'
        : 'min-h-screen'
        } relative overflow-hidden`}>

        {/* <Header theme={theme} setTheme={setTheme} /> */}
        <main className={isLandingPage ? 'flex-1 overflow-hidden' : 'flex-1'}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default App;