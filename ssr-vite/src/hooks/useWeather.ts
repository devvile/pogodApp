import { useQuery } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { 
  fetchCurrentWeather, 
  fetchComparisonWeather, 
  fetchCompleteWeatherData 
} from "../services/weatherApi";
import { weatherQueryKeys } from "./weatherQueryKeys";
import { 
  setWeatherData, 
  setCurrentWeather, 
  setComparisonWeatherData,
  setWeatherLoading, 
  setWeatherError,
  clearWeatherError 
} from "@/store/slices/weatherSlice";
import { WeatherApiError } from "@/types/weather";
import type { RootState } from "@/store";
import toast from "react-hot-toast";
import { getErrorMessage } from "./helpers";

// Hook for current weather that updates Redux
export const useCurrentWeather = (city: string) => {
  const dispatch = useDispatch();
  
  const query = useQuery({
    queryKey: weatherQueryKeys.current(city),
    queryFn: () => fetchCurrentWeather(city),
    enabled: !!city && city.trim().length > 0,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    retry: (failureCount, error) => {
      if (error instanceof WeatherApiError && error.statusCode && error.statusCode >= 400 && error.statusCode < 500) {
        return false;
      }
      return failureCount < 3;
    },
  });

  // Update Redux when query state changes
  useEffect(() => {
    dispatch(setWeatherLoading(query.isLoading));
  }, [query.isLoading, dispatch]);

  useEffect(() => {
    if (query.data) {
      dispatch(setCurrentWeather(query.data));
      dispatch(clearWeatherError());
    }
  }, [query.data, dispatch]);

  useEffect(() => {
    if (query.error) {
      dispatch(setWeatherError(query.error.message));
      
      // Show toast notifications
      if (query.error instanceof WeatherApiError) {
        const { statusCode } = query.error;
        if (statusCode && statusCode >= 400 && statusCode < 500) {
          toast.error(getErrorMessage(query.error));
        } else if (statusCode && statusCode >= 500) {
          toast.error("Weather service is temporarily unavailable. Please try again later.");
        } else {
          toast.error("Unable to fetch weather data. Please check your connection.");
        }
      }
    }
  }, [query.error, dispatch]);

  return query;
};

// Hook for comparison weather that updates Redux
export const useComparisonWeather = (cities?: string[]) => {
  const dispatch = useDispatch();
  const { comparisonCities } = useSelector((state: RootState) => state.weather);
  const citiesToFetch = cities || comparisonCities;

  const query = useQuery({
    queryKey: weatherQueryKeys.comparison(citiesToFetch),
    queryFn: () => fetchComparisonWeather(citiesToFetch),
    enabled: citiesToFetch.length > 0,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    retry: 2,
    retryDelay: 1000,
  });

  // Update Redux when query state changes
  useEffect(() => {
    if (query.data) {
      dispatch(setComparisonWeatherData(query.data));
    }
  }, [query.data, dispatch]);

  useEffect(() => {
    if (query.error) {
      toast.error("Some comparison cities failed to load");
    }
  }, [query.error]);

  return query;
};

// Hook for complete weather data that updates Redux
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
      
      // Show toast notifications
      if (query.error instanceof WeatherApiError) {
        const { statusCode } = query.error;
        if (statusCode && statusCode >= 400 && statusCode < 500) {
          toast.error(getErrorMessage(query.error));
        } else if (statusCode && statusCode >= 500) {
          toast.error("Weather service is temporarily unavailable. Please try again later.");
        } else {
          toast.error("Unable to fetch weather data. Please check your connection.");
        }
      }
    }
  }, [query.error, dispatch]);

  return query;
};

// Selector hooks for easy access to Redux state
export const useWeatherState = () => {
  return useSelector((state: RootState) => ({
    currentWeather: state.weather.currentWeather,
    comparisonWeather: state.weather.comparisonWeather,
    isLoading: state.weather.isLoading,
    error: state.weather.error,
  }));
};

export const useWeatherUIState = () => {
  return useSelector((state: RootState) => ({
    comparisonCities: state.weather.comparisonCities,
    selectedCity: state.weather.selectedCity,
  }));
};