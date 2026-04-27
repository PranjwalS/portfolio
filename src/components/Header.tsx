import React, { useState, useEffect } from "react";
import { LuSun, LuMoon } from "react-icons/lu";

interface HeaderProps {
  student?: string;
  role?: string;
  theme: string;
  setTheme: (theme: string) => void;
}

const Header: React.FC<HeaderProps> = ({
  student = "UW BCS HC 1A Student",
  role = "Full Stack Web/App Dev",
  theme,
  setTheme,
}) => {
  const [location, setLocation] = useState("...");
  const [weather, setWeather] = useState("--°C");
  const [time, setTime] = useState(
    new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  );

  // ⏱ time updater
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(
        new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })
      );
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  // 🌍 location + weather
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("https://ipapi.co/json/");
        const data = await res.json();

        if (!data || !data.latitude || !data.longitude) {
          throw new Error("Invalid location data");
        }

        setLocation(data.city || "Unknown");

        const weatherRes = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${data.latitude}&longitude=${data.longitude}&current_weather=true`
        );
        const weatherData = await weatherRes.json();

        if (weatherData?.current_weather?.temperature !== undefined) {
          setWeather(
            `${Math.round(weatherData.current_weather.temperature)}°C`
          );
        } else {
          setWeather("N/A");
        }
      } catch (err) {
        console.error("Fetch error:", err);
        setLocation("Unknown");
        setWeather("N/A");
      }
    };

    fetchData();
  }, []);

  return (
    <header
      className="w-full flex items-center justify-between px-6"
      style={{
        height: "var(--header-h)",
        background: "var(--bg)",
        color: "var(--text)",
        fontSize: "var(--fs-ui)",
        borderBottom: "1px solid var(--border)",
      }}
    >
      {/* LEFT */}
      <div className="flex items-center gap-8">
        <span>{student}</span>
        <span>{role}</span>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-6">
        <span>
          {location} ⋅ {time} ⋅ {weather}
        </span>

        {/* Theme switch */}
        <div
          style={{
            display: "flex",
            gap: "4px",
            background: "var(--border)",
            borderRadius: "8px",
            padding: "4px",
          }}
        >
          <button
            onClick={() => setTheme("light")}
            style={{
              background: theme === "light" ? "var(--primary)" : "transparent",
              border: "none",
              padding: "6px",
              borderRadius: "6px",
              cursor: "pointer",
              color: theme === "light" ? "#000" : "var(--text)",
            }}
          >
            <LuSun />
          </button>

          <button
            onClick={() => setTheme("dark")}
            style={{
              background: theme === "dark" ? "var(--primary)" : "transparent",
              border: "none",
              padding: "6px",
              borderRadius: "6px",
              cursor: "pointer",
              color: theme === "dark" ? "#000" : "var(--text)",
            }}
          >
            <LuMoon />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;