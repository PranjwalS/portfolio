import React, { useState, useEffect } from "react";
import { LuSun, LuMoon } from "react-icons/lu"


interface HeaderProps {
  student?: string,
  role?: string,
  theme: string,
  setTheme: (theme: string) => void
}



const Header: React.FC<HeaderProps> = ({
  student = "UW BCS HC 1A Student",
  role = "Full Stack Web/App Dev",
  theme,
  setTheme,
}) => {


  const [location, setLocation] = useState("Loading...");
  const [weather, setWeather] = useState("0°C");
  const [time, setTime] = useState(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));


  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    }, 60000); // 1 minute 
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchCityAndWeather = async () => {
      try {
        const res = await fetch("https://ipapi.co/json/");
        const data = await res.json();
        const city = `${data.city}`;
        setLocation(city);

        // Fetch weather for that lat/lon 
        const weatherRes = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${data.latitude}&longitude=${data.longitude}&current_weather=true`);
        const weatherData = await weatherRes.json();
        setWeather(`${Math.round(weatherData.current_weather.temperature)}°C`);
      } catch (err) {
        console.error("Error fetching location/weather:", err);
        setLocation("Unknown");
        setWeather("N/A");
      }
    };
    fetchCityAndWeather();
  }, []);


  return (
    <header className="w-full h-20 bg-white dark:bg-black text-black dark:text-white px-6 font-sans flex font-sans font-medium items-center justify-between" >
      <div className="flex items-center gap-28">
        <span>{student}</span>
        <span>{role}</span>
      </div>

      <div className="flex items-center gap-6">
        <span>{location} ⋅ {time} ⋅ {weather}</span>

        <div className="flex items-center">
          <div className="bg-white border dark:bg-black p-2 rounded-xl flex  gap-x-2"> 
            <button
              onClick={() => setTheme('light')} 
              className={`bg-transparent p-2 hover:bg-zinc-200 dark:hover:bg-zinc-100/10 rounded-lg text-black dark:text-white ${theme === 'light' ? 'bg-zinc-300 dark:bg-zinc-600' : ''}`}>
              <LuSun />
            </button>
            <button
              onClick={() => setTheme('dark')} 
              className={`bg-transparent p-2 hover:bg-zinc-200 dark:hover:bg-zinc-100/10 rounded-lg text-black dark:text-white ${theme === 'dark' ? 'bg-zinc-300 dark:bg-zinc-600' : ''}`}>
              <LuMoon />
            </button>
          </div>
        </div>
        
      </div>
    </header>
  )
}

export default Header;