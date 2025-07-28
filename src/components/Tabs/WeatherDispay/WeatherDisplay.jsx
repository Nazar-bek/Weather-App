import React from "react";
import { useWeather } from "../../../context/WeatherContext";

const WeatherDisplay = () => {
  const { state } = useWeather();
  const { weather, isLoading, error } = state;
  const unitSymbol = state.unit === "metric" ? "°C" : "°F";

  if (isLoading)
    return (
      <div className="flex items-center justify-center h-52">
        <div className="w-10 h-10 border-4 border-dashed rounded-full animate-spin border-blue-500"></div>
        <span className="ml-3 text-blue-500 font-medium text-lg">
          Loading...
        </span>
      </div>
    );

  if (error)
    return (
      <div className="flex items-center justify-center">
        <p className="text-red-500">{error}</p>
      </div>
    );

  if (!weather) return null;

  return (
    <div className="max-w-md mx-auto p-6 rounded-2xl shadow-lg bg-white dark:bg-[#1c1f23] text-gray-800 dark:text-gray-100 space-y-4">
      <h2 className="text-3xl font-bold">{weather.name}</h2>
      <p className="text-lg capitalize text-gray-600 dark:text-gray-300">
        {weather.weather[0].description}
      </p>

      <div className="flex justify-center">
        <img
          src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
          alt={weather.name}
          className="w-24 h-24"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-center">
        <div className="bg-gray-100 dark:bg-[#2a2e33] rounded-xl p-4">
          <p className="font-medium text-lg">
            {Math.floor(weather.main.temp)}
            {unitSymbol}
          </p>
          <p className="text-gray-500 dark:text-gray-400">Temperature</p>
        </div>
        <div className="bg-gray-100 dark:bg-[#2a2e33] rounded-xl p-4">
          <p className="font-medium text-lg">{weather.main.humidity}%</p>
          <p className="text-gray-500 dark:text-gray-400">Humidity</p>
        </div>
        <div className="bg-gray-100 dark:bg-[#2a2e33] rounded-xl p-4">
          <p className="font-medium text-lg">{weather.wind.speed} m/s</p>
          <p className="text-gray-500 dark:text-gray-400">Wind</p>
        </div>
      </div>
    </div>
  );
};

export default WeatherDisplay;
