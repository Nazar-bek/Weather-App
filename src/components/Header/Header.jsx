import { useState, useEffect } from "react";
import { Settings } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import SettingPanel from "./SettingPanel";
import { refreshWeather } from "../../utils/refreshWeather";
import { useWeather } from "../../context/WeatherContext";
import Logo from "../../assets/WeatherLogo.svg"
export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const {state, dispatch} = useWeather()

  const toggleTheme = () => {
    const html = document.documentElement;
    const isDark = html.classList.contains("dark");

    if (isDark) {
      html.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      html.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
    }
  }, []);

  const handleRefresh = () => {
    refreshWeather(dispatch, state.city, state.unit)
    console.log("Refresh clicked");
    setIsOpen(false);
  };

  return (
    <header className="flex items-center justify-between p-4 shadow-md bg-white dark:bg-[#0d6efd] relative">
      <div className="flex items-center gap-1">
        <p>
          <img className="w-10" src={Logo} alt="Logo" />
        </p>
        <h1 className="text-xl font-bold text-gray-800 dark:text-white">
         Weather App
      </h1>
      </div>

      <div className="relative">
        <button
          onClick={(e) =>{
            e.stopPropagation()
             setIsOpen((prev) => !prev)
          } 
         }
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition"
        >
          <Settings
            size={24}
            className="text-gray-700 cursor-pointer dark:text-white"
          />
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg shadow-md z-50"
            >
              <SettingPanel
                onRefresh={handleRefresh}
                onClose={() => setIsOpen(!isOpen)}
              toogleThemee={toggleTheme}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
