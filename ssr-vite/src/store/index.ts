import { configureStore } from "@reduxjs/toolkit";
import weatherSlice from "./slices/weatherSlice";
import type { WeatherState } from "./slices/weatherSlice";

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

export type RootState = ReturnType<ReturnType<typeof createStore>["getState"]>;
export type AppDispatch = ReturnType<typeof createStore>["dispatch"];
