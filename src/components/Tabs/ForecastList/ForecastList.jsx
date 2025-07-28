import React from "react";
import { useWeather } from "../../../context/WeatherContext";
import ForecastItem from "./ForecastItem";
import { useForecast } from "../../../hooks/useForecast";
import { groupForecastByDay } from "../../../utils/groupForecastByDays";

const ForecastList = () => {
  useForecast();
  const { state } = useWeather();

  const filteredForecast = groupForecastByDay(state.forecast)
  if (state.isLoading) return (
    <div className="flex items-center justify-center h-50">
        <div className="w-10 h-10 border-4 border-dashed rounded-full animate-spin border-blue-500"></div>
        <span className="ml-3 text-blue-500 font-medium text-lg">
          Loading...
        </span>
      </div>
  );
  if (state.error) return <p className="text-red-500 text-center p-4">{state.error}</p>;

  return (
   <>
   <h1>The 5-day foreacst of weather {state.city}</h1>
    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 p-4">
      {filteredForecast.map((item) => (
        <ForecastItem key={item.dt} data={item} />
      ))}
    </div>
   </>
  );
};

export default ForecastList;
