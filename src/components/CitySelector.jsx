import React, { useState, useMemo, useEffect } from "react";
import { debounce } from "../utils/debounce";
import { useWeather } from "../context/WeatherContext";

const defaultCities = ["Cairo", "London", "Tokyo", "New York", "Sydney"];

const CitySelector = ({ onCityChange, dispatch }) => {
  const [inputValue, setInputValue] = useState(""); 
  const [searchTerm, setSearchTerm] = useState(""); 
  const {state} = useWeather()

  const debouncedSetSearchTerm = useMemo(
    () => debounce(setSearchTerm, 700),
    []
  );

  useEffect(() => {
    debouncedSetSearchTerm(inputValue); 
  }, [inputValue, debouncedSetSearchTerm]);

  const filteredCities = defaultCities.filter((city) =>
    city.toLowerCase().includes(searchTerm.trim().toLowerCase())
  );

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    dispatch({ type: "CLEAR_ERROR" });
  };

  const handleCitySelect = (city) => {
    dispatch({ type: "CLEAR_ERROR" });
    onCityChange(city);
    setInputValue("");
    setSearchTerm("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      const match = defaultCities.find(
        (city) => city.toLowerCase() === inputValue.toLowerCase()
      );
      if (match) {
        handleCitySelect(match);
      } else {
        dispatch({
          type: "SET_ERROR",
          payload: "City not found. Please try another.",
        });
      }
    }
  };

  return (
    <div className="mb-4">
      <input
        type="text"
        placeholder="Search by city name..."
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        className="border p-2 rounded w-full"
      />

      {inputValue.length > 0 && (
        <ul className="mt-2 border rounded bg-white shadow-md max-h-40 overflow-auto">
          {filteredCities.map((city) => (
            <li
              key={city}
              onClick={() => handleCitySelect(city)}
              className="cursor-pointer p-2 hover:bg-gray-100 dark:hover:bg-[#292e33] dark:bg-[#212529]"
            >
              {city}
            </li>
          ))}
          {filteredCities.length === 0 && (
            <li className="p-2 text-gray-500 dark:hover:bg-[#292e33] dark:bg-[#212529] cursor-pointer">{state.error || "City not found"}</li>
          )}
        </ul>
      )}
    </div>
  );
};

export default CitySelector;
