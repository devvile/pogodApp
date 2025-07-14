import { WeatherApiError } from "@/types/weather";

export const getErrorMessage = (error: WeatherApiError): string => {
    if (!error.statusCode) return error.message || "Failed to fetch weather data";
    
    switch (error.statusCode) {
      case 400:
        return "Invalid city name. Please check your input.";
      case 401:
        return "Weather service authentication failed.";
      case 429:
        return "Too many requests. Please wait a moment and try again.";
      default:
        return error.message || "Failed to fetch weather data.";
    }
  };