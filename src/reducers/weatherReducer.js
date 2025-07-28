export const initialState = {
  currentTab: "Current Weather",
  city: "London",
  weather: null,
  isLoading: false,
  error: null,
  unit: "metric",
  forecast: [],
};

export function weatherReducer(state, action) {
  switch (action.type) {
    case "FETCH_WEATHER":
      return { ...state, isLoading: true, error: null };
    case "FETCH_SUCCESS":
      return {
        ...state,
        isLoading: false,
        weather: action.payload,
        city: action.payload.name,
      };
    case "FETCH_ERROR":
      return { ...state, isLoading: false, error: action.payload };
    case "CHANGE_CITY":
      return { ...state, city: action.payload };
    case "TOGGLE_UNIT":
      return {
        ...state,
        unit: state.unit === "metric" ? "imperial" : "metric",
      };
    case "CHANGE_TAB":
      return { ...state, currentTab: action.payload };
    case "CLEAR_ERROR":
      return { ...state, error: null };
    case "FETCH_FORECAST":
      return { ...state, forecast: [], isLoading: true, error: null };
    case "FETCH_FORECAST_SUCCESS":
      return { ...state, forecast: action.payload, isLoading: false };
    case "FETCH_FORECAST_ERROR":
      return { ...state, isLoading: false, error: action.payload };
    case "SET_ERROR":
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case "CLEAR_ERROR":
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
}
