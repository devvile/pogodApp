import { configureStore } from "@reduxjs/toolkit";
import weatherSlice from "./slices/weatherSlice";
import type { CurrentWeather, ComparisonCity } from "../types";

interface WeatherState {
  current: CurrentWeather;
  comparison: ComparisonCity[];
}
interface PreloadState {
  weather: WeatherState;
}

export const createStore = (preloadedState: PreloadState) => {
  return configureStore({
    reducer: {
      weather: weatherSlice,
    },
    preloadedState,
  });
};

// Export types
export type RootState = ReturnType<ReturnType<typeof createStore>["getState"]>;
export type AppDispatch = ReturnType<typeof createStore>["dispatch"];
