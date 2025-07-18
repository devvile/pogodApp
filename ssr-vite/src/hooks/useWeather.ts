import { useQuery } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "@reduxjs/toolkit";
import { useEffect } from "react";
import { 
  fetchCompleteWeatherData,
} from "../services/weatherApi";
import { weatherQueryKeys } from "./weatherQueryKeys";
import { 
  setWeatherData, 
  setWeatherLoading, 
  setWeatherError,
  clearWeatherError 
} from "@/store/slices/weatherSlice";
import { WeatherApiError } from "@/types/weather";
import type { RootState } from "@/store";
import toast from "react-hot-toast";
import { getErrorMessage } from "./helpers";

const selectWeatherState = (state: RootState) => state.weather;
const selectWeatherData = createSelector(
  [selectWeatherState],
  (weather) => ({
    currentWeather: weather.currentWeather,
    forecast: weather.forecast,
    comparisonWeather: weather.comparisonWeather,
    isLoading: weather.isLoading,
    error: weather.error,
  })
);

const selectWeatherUIState = createSelector(
  [selectWeatherState],
  (weather) => ({
    comparisonCities: weather.comparisonCities,
    selectedCity: weather.selectedCity,
  })
);

// Main hook - gets everything (current + forecast + comparison)
export const useCompleteWeather = (city: string) => {
  const dispatch = useDispatch();
  
  const query = useQuery({
    queryKey: weatherQueryKeys.complete(city),
    queryFn: () => fetchCompleteWeatherData(city),
    enabled: !!city && city.trim().length > 0,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    retry: (failureCount, error) => {
      if (error instanceof WeatherApiError && error.statusCode && error.statusCode >= 400 && error.statusCode < 500) {
        return false;
      }
      return failureCount < 3;
    },
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });

  // Update Redux when query state changes
  useEffect(() => {
    dispatch(setWeatherLoading(query.isLoading));
  }, [query.isLoading, dispatch]);

  useEffect(() => {
    if (query.data) {
      dispatch(setWeatherData(query.data));
      dispatch(clearWeatherError());
    }
  }, [query.data, dispatch]);

  useEffect(() => {
    if (query.error) {
      dispatch(setWeatherError(query.error.message));
      
      if (query.error instanceof WeatherApiError) {
        toast.error(getErrorMessage(query.error));
      } else {
        toast.error("Unable to fetch weather data. Please check your connection.");
      }
    }
  }, [query.error, dispatch]);

  return query;
};

// Selector hooks for easy access to Redux state
export const useWeatherState = () => {
  return useSelector(selectWeatherData);
};

export const useWeatherUIState = () => {
  return useSelector(selectWeatherUIState);
};