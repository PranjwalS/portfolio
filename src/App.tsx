import React, { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./components/Header";

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

        <div
          className="fixed inset-0 pointer-events-none z-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='a'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='2.5' numOctaves='8' /%3E%3CfeColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23a)' opacity='1'/%3E%3C/svg%3E")`,
            opacity: theme === 'dark' ? 1 : 0.15,
            backgroundRepeat: 'repeat',
            backgroundSize: '200px 200px'
          }}
        />

        <Header theme={theme} setTheme={setTheme} />
        <main className={isLandingPage ? 'flex-1 overflow-hidden' : 'flex-1'}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default App;