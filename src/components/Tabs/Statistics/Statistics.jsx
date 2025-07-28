import React, { useEffect } from "react";
import { useWeather } from "../../../context/WeatherContext";
import { calculateDailyAverage } from "../../../utils/forecstAverageDaily";
import { calculateMinMaxAvg } from "../../../utils/calculateMaxMinAvg";
import ChartWeatherData from "./ChartWeatherData";

const Statistics = () => {
  const { state } = useWeather();

  if (state.isLoading || !state.forecast || state.forecast.length === 0) {
    return (
      <div className="flex items-center justify-center h-50">
        <div className="w-10 h-10 border-4 border-dashed rounded-full animate-spin border-blue-500"></div>
        <span className="ml-3 text-blue-500 font-medium text-lg">
          Loading...
        </span>
      </div>
    );
  }
  if (state.error) {
    return <div className="text-center p-6 text-red-500">{state.error}</div>;
  }

  if (!state.forecast || state.forecast.length === 0) {
    return (
      <div className="text-center p-6 text-red-500">
        No statistics available
      </div>
    );
  }

  const dailyAverages = calculateDailyAverage(state.forecast);
  const chartWidth = 600
  const chartHeight = 200
  const padding = 30
  const temps = dailyAverages.map((d) => d.avgTemp);
  const maxTemp = Math.max(...temps);
  const minTemp = Math.min(...temps);
  const tempRange = maxTemp - minTemp || 1;

  const points = dailyAverages.map((d, i) => {
    const x =
      padding + (i * (chartWidth - 2 * padding)) / (dailyAverages.length - 1);
    const y =
      chartHeight -
      padding -
      ((d.avgTemp - minTemp) / tempRange) * (chartHeight - 2 * padding);
    return { ...d, x, y };
  });

  const pathData = points
    .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x},${p.y}`)
    .join(" ");

  const { max, min, avg } = calculateMinMaxAvg(state.forecast);
  const Symbol = state.unit === "metric" ? "°C" : "°F";
  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">
        
         Daily Average Temperature Trend of {state.city}
      </h2>
      <div className="overflow-x-auto">
        <ChartWeatherData
          points={points}
          padding={padding}
          chartWidth={chartWidth}
          chartHeight={chartHeight}
          pathData={pathData}
          minTemp={minTemp}
          maxTemp={maxTemp}
          unitSymbol={Symbol}
        />
      </div>
      <p className="text-gray-600 text-sm mt-4">
        This line graph shows the **daily average temperatures** for the
        upcoming days, based on the 3-hour interval forecast data.
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-2 mt-5 gap-4 mb-6">
        <div className="bg-blue-100 text-blue-800 dark:bg-blue-900  rounded-xl px-4 py-3  text-center shadow">
          <p className="text-sm  text-[#212529] dark:text-[#f8f9fa]">
            Min Temp
          </p>
          <p className="text-xl font-bold text-[#212529] dark:text-[#f8f9fa]">
            {min}
            {Symbol}
          </p>
        </div>
        <div className="bg-red-100 text-red-800 rounded-xl px-4 py-3 dark:bg-red-900  text-center shadow">
          <p className="text-sm text-[#212529] dark:text-[#f8f9fa]">Max Temp</p>
          <p className="text-xl font-bold text-[#212529] dark:text-[#f8f9fa]">
            {max}
            {Symbol}
          </p>
        </div>
        <div className="bg-green-100 text-green-800 rounded-xl px-4 py-3 	dark:bg-green-900  text-center shadow">
          <p className="text-sm text-[#212529] dark:text-[#f8f9fa]">Avg Temp</p>
          <p className="text-xl text-[#212529] dark:text-[#f8f9fa] font-bold">
            {avg}
            {Symbol}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
