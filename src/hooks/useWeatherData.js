import { useEffect } from "react";
import axios from "axios";

export function useWeatherData(state, dispatch) {

  useEffect(() => {
    if (!state.city) return;
    const fetchData = async () => {
      dispatch({ type: "FETCH_WEATHER" });
      const API_KEY = import.meta.env.VITE_API_ID
      try {
        const res = await axios(
          `https://api.openweathermap.org/data/2.5/weather?q=${
            state.city
          }&units=${state.unit}&appid=${API_KEY}`
        );
        dispatch({type: "FETCH_SUCCESS", payload: res.data})
      } catch (error) {
        dispatch({ type: "FETCH_ERROR", payload: error.message });
      }
    };
    fetchData()
  }, [state.city, state.unit]);
}
