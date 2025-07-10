import type { WeatherData,CurrentWeather, ComparisonCity }from '../types/weather';
import type {OpenWeatherError, OpenWeatherResponse } from '../types/weather';
import { WeatherApiError } from '../types/weather';
import { BASE_URL, API_KEY } from '../const/config';
import { transformToComparisonCity,transformToCurrentWeather } from './helpers';

if (!API_KEY) {
    throw new Error('OpenWeather API key is required. Please set REACT_APP_OPENWEATHER_API_KEY in your environment variables.');
}


export const fetchCurrentWeather = async (city: string): Promise<CurrentWeather> => {
    try {
      const response = await fetch(
        `${BASE_URL}/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`
      );
      
      if (!response.ok) {
        const errorData: OpenWeatherError = await response.json();
        throw new WeatherApiError(
          errorData.message || 'Failed to fetch weather data',
          errorData.cod,
          response.status
        );
      }
      
      const data: OpenWeatherResponse = await response.json();
      return transformToCurrentWeather(data);
    } catch (error) {
      if (error instanceof WeatherApiError) {
        throw error;
      }
      
      // Handle network errors or other unexpected errors
      throw new WeatherApiError(
        'Network error: Unable to fetch weather data. Please check your connection.',
        'NETWORK_ERROR'
      );
    }
  };
  
  // Fetch weather for multiple cities (for comparison)
  export const fetchComparisonWeather = async (cities: string[]): Promise<ComparisonCity[]> => {
    try {
      const promises = cities.map(city => 
        fetch(`${BASE_URL}/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`)
          .then(response => {
            if (!response.ok) {
              throw new WeatherApiError(`Failed to fetch weather for ${city}`, undefined, response.status);
            }
            return response.json();
          })
          .then(transformToComparisonCity)
          .catch(error => {
            console.warn(`Failed to fetch weather for ${city}:`, error);
            // Return null for failed cities - we'll filter them out
            return null;
          })
      );
      
      const results = await Promise.allSettled(promises);
      
      // Filter out failed requests and return successful ones
      return results
        .filter((result): result is PromiseFulfilledResult<ComparisonCity> => 
          result.status === 'fulfilled' && result.value !== null
        )
        .map(result => result.value);
    } catch (error) {
      throw new WeatherApiError(
        'Failed to fetch comparison weather data',
        'COMPARISON_ERROR'
      );
    }
  };
  
  // Default comparison cities (you can make this configurable later)
  export const DEFAULT_COMPARISON_CITIES = [
    'London',
    'Tokyo', 
    'Sydney',
    'Mumbai',
    'Moscow'
  ];
  
  // Fetch complete weather data (current + comparison)
  export const fetchCompleteWeatherData = async (city: string): Promise<WeatherData> => {
    try {
      const [currentWeather, comparisonCities] = await Promise.all([
        fetchCurrentWeather(city),
        fetchComparisonWeather(DEFAULT_COMPARISON_CITIES)
      ]);
      
      return {
        current: currentWeather,
        comparison: comparisonCities
      };
    } catch (error) {
      if (error instanceof WeatherApiError) {
        throw error;
      }
      throw new WeatherApiError('Failed to fetch complete weather data');
    }
  };