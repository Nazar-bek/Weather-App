import { describe, expect, it } from "vitest";
import { weatherReducer, initialState } from "../../reducers/weatherReducer";


describe("weatherReducer - TOGGLE_UNIT", () => {
  it("toggles from metric to imperial", () => {
    const action = { type: "TOGGLE_UNIT" };
    const newState = weatherReducer(initialState, action);
    expect(newState.unit).toBe("imperial");
  });

  it("toggles from imperial to metric", () => {
    const action = { type: "TOGGLE_UNIT" };
    const state = { ...initialState, unit: "imperial" };
    const newState = weatherReducer(state, action);
    expect(newState.unit).toBe("metric");
  });
});
