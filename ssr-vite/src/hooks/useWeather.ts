import { useQuery } from "@tanstack/react-query";
import type { UseQueryResult } from "@tanstack/react-query";
import { fetchCurrentWeather} from "../services/weatherApi";
import type { CurrentWeather } from "../types/weather";
import { WeatherApiError } from "../types/weather";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { getErrorMessage } from "./helpers";

export const weatherQueryKeys = {
    all: ['weather'] as const,
    current: (city: string) => ['weather', 'current', city.toLowerCase()],
    comparison: (cities: string[]) => ['weather', 'comparison', cities.map(c => c.toLowerCase()).sort()],
    complete: (city: string) => ['weather', 'complete', city.toLowerCase()] ,
  };

  export const useCurrentWeather = (city: string): UseQueryResult<CurrentWeather, WeatherApiError> => {
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

    useEffect(() => {
      if (query.isError && query.error instanceof WeatherApiError) {
        const { statusCode } = query.error;
        if (statusCode && statusCode >= 400 && statusCode < 500) {
          toast.error(getErrorMessage(query.error));
        }
        else if (statusCode && statusCode >= 500) {
          toast.error("Weather service is temporarily unavailable. Please try again later.");
        }
        else {
          toast.error("Unable to fetch weather data. Please check your connection.");
        }
      }
    }, [query.isError, query.error]);

    return query;
};