import { describe, it, expect, vi } from "vitest";
import { render } from "@testing-library/react";
import React from "react";
import WeatherDisplay from "../Tabs/WeatherDispay/WeatherDisplay";
import { WeatherContext } from "../../context/WeatherContext";

describe("WeatherDisplay snapshot test", () => {
  it("matches snapshot", () => {
    const mockState = {
      weather: {
        name: "Tashkent",
        main: {
          temp: 28,
          feels_like: 30,
          temp_min: 25,
          temp_max: 32,
        },
        weather: [
          {
            description: "clear sky",
            icon: "01d",
          },
        ],
        wind: {
          speed: 4.5, 
        },
      },
      isLoading: false,
      error: null,
      unit: "metric",
    };

    const mockDispatch = vi.fn();

    const { asFragment } = render(
      <WeatherContext.Provider value={{ state: mockState, dispatch: mockDispatch }}>
        <WeatherDisplay />
      </WeatherContext.Provider>
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
