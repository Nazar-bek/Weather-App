import axios from "axios";

export async function refreshWeather(dispatch, city, unit) {

    const selectedCity = city || localStorage.getItem("lastCity")
  if (!selectedCity) return;

  dispatch({ type: "FETCH_WEATHER" });
  dispatch({ type: "FETCH_FORECAST" });
  const apiKey = import.meta.env.VITE_API_ID;

  const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit}&appid=${apiKey}`;
  const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=${unit}&lang=en`;

  try {
    const [weatherRes, forecastRes] = await Promise.all([
      axios(weatherUrl),
      axios(forecastUrl),
    ]);

    const weatherData = weatherRes.data;
    const forecastData = forecastRes.data;

    dispatch({ type: "FETCH_SUCCESS" , payload: weatherData});
    dispatch({ type: "FETCH_FORECAST_SUCCESS", payload: forecastData.list });
  } catch (error) {
    const errorMessage = error.res?.data?.message || error.message;
    dispatch({ type: "FETCH_ERROR", payload: errorMessage });
    dispatch({ type: "FETCH_FORECAST_ERROR", payload: errorMessage });  
  }
}
