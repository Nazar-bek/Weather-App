import { useEffect } from "react";
import { useWeather } from "../context/WeatherContext";
import axios from "axios";

export function useForecast() {
  const { state, dispatch } = useWeather();
  const { city, unit } = state;

  useEffect(() => {
    if (!city) return;
    const fetchForecast = async () => {
      dispatch({ type: "FETCH_FORECAST" });
      const API_KEY = import.meta.env.VITE_API_ID
      try {
        const res = await axios(
          `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=${unit}&lang=en`
        );        
        dispatch({ type: "FETCH_FORECAST_SUCCESS", payload: res.data.list });
      } catch (err) {
        dispatch({ type: "FETCH_FORECAST_ERROR", payload: err.message });
      }
    };

    fetchForecast();  
  }, [city, unit]);
}
