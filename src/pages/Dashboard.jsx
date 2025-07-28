import { useState } from "react";
import Tabs from "../components/Tabs/Tabs";
import WeatherDisplay from "../components/Tabs/WeatherDispay/WeatherDisplay";
import ForecastList from "../components/Tabs/ForecastList/ForecastList";
import CitySelector from "../components/CitySelector";
import { useWeather } from "../context/WeatherContext";
import FadeTransition from "../components/FadeTransition";
import Header from "../components/Header/Header";
import Statistics from "../components/Tabs/Statistics/Statistics";
import { useForecast } from "../hooks/useForecast";

export default function Dashboard() {
  const { state, dispatch } = useWeather();
  useForecast()
  return (
    <div className="max-w-[800px] mx-auto  bg-[#f8f9fa] dark:text-gray-100 dark:bg-[#212529]  text-[#212529]  rounded-md shadow-lg">
      <Header />
      <Tabs
        onTabChange={(tab) => dispatch({ type: "CHANGE_TAB", payload: tab })}
      />
      <CitySelector
        onCityChange={(city) =>
          dispatch({ type: "CHANGE_CITY", payload: city })
        }
        dispatch={dispatch}
        
      />
      <FadeTransition key={state.currentTab} dependency={state.currentTab}>
        <div className="p-4">
          {state.currentTab === "Current Weather" && <WeatherDisplay />}
          {state.currentTab === "Forecast" && <ForecastList />}
          {state.currentTab === "Statistics" && <Statistics/>}
        </div>
      </FadeTransition>
    </div>
  );
}
