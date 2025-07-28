import React, { createContext, useContext, useEffect, useReducer } from "react";
import { initialState, weatherReducer } from "../reducers/weatherReducer";
import { useWeatherData } from "../hooks/useWeatherData";

export const WeatherContext = createContext();

const WeatherProvider = ({ children }) => {
  const [state, dispatch] = useReducer(weatherReducer, {
    ...initialState,
    unit: localStorage.getItem("unit") || initialState.unit
  });

    useEffect(() => {
    localStorage.setItem("unit", state.unit);
  }, [state.unit]);
  useWeatherData(state, dispatch)
  return (
    <WeatherContext.Provider value={{state, dispatch}}>
        {children}
    </WeatherContext.Provider>
  )
};

export const useWeather = () => useContext(WeatherContext)
export default WeatherProvider;