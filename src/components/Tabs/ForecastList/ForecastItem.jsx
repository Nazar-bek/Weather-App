import React from "react";
import { useWeather } from "../../../context/WeatherContext";

const ForecastItem = ({ data }) => {
  const { dt_txt, main, weather } = data;
  const date = new Date(dt_txt).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
  console.log(weather);
  const { state } = useWeather();

  const unitSymbol = state.unit === "metric" ? "°C" : "°F";
  const forcedIcon = weather[0].icon.replace("n", "d");
  const icon = `https://openweathermap.org/img/wn/${forcedIcon}@2x.png`;

  return (
    <div className="bg-white rounded-xl p-4 shadow-md text-center  dark:text-gray-1 dark:bg-[#212529] dark:border">
      <p className="font-medium">{date}</p>
      <img src={icon} alt={weather[0].description} className="mx-auto w-16" />
      <p className="text-sm capitalize">{weather[0].description}</p>
      <p className="text-xl font-semibold">{Math.round(main.temp)}{unitSymbol}</p>
    </div>
  );
};

export default ForecastItem;
