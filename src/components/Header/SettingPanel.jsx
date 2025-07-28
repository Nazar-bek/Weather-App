import { Moon, RefreshCcw, Sun } from "lucide-react";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useWeather } from "../../context/WeatherContext";
import { throttle } from "../../utils/throttle";

const SettingPanel = ({ onRefresh, onClose, toogleThemee }) => {
  const { state, dispatch } = useWeather();

  const panelRef = useRef(null)

  const handleToggle = () => {
    dispatch({ type: "TOGGLE_UNIT" });
  };
  const [active, setActive] = useState("");
  const handleChange = () => {
    toogleThemee();
    const newSaved = localStorage.getItem("theme");
    setActive(newSaved);
  };

  const throttledRefresh = useMemo(
    () => throttle(onRefresh, 5000),
    [onRefresh]
  );

  useEffect(() => {
  const handleClickOutside = (e) => {
    if (panelRef.current && !panelRef.current.contains(e.target)) {
      onClose(); 
    }
  };

  document.addEventListener("click", handleClickOutside);
  return () => {
    document.removeEventListener("click", handleClickOutside);
  };
}, [onClose]);


  return (
    <div ref={panelRef} className="p-4 space-y-3">
      <div>
        <label className="text-gray-700 dark:text-gray-200 block mb-1">
          Units
        </label>
        <button
          onClick={handleToggle}
          className="w-full bg-gray-100 dark:bg-gray-600 text-gray-800 dark:text-white rounded px-2 py-1"
        >
          Switch to {state.unit === "metric" ? "°F" : "°C"}
        </button>
      </div>

      <div>
        <label className="text-gray-700 dark:text-gray-200 block mb-1">
          Theme
        </label>
        <button
          onClick={handleChange}
          className="w-full flex items-center justify-center gap-1  bg-gray-100 dark:bg-gray-600 text-gray-800 dark:text-white rounded px-2 py-1"
        >
          Switch to {active === "dark" ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>
      <div>
        <button
          onClick={throttledRefresh}
          className="w-full flex justify-center bg-blue-500 hover:bg-blue-600 text-white rounded px-2 py-1"
        >
          <RefreshCcw />
        </button>
      </div>
    </div>
  );
};

export default SettingPanel;
