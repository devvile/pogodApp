import type { WeatherData, ComparisonCity, ForecastData } from '@/types/weather';
import type { OpenWeatherError, OpenWeatherForecastResponse } from '@/types/weather';
import { WeatherApiError } from '@/types/weather';
import { BASE_URL, API_KEY } from '@/const/config';
import { transformToForecastData, extractCurrentWeatherFromForecast } from './helpers';
import { DEFAULT_COMPARISON_CITIES } from '@/const/config';

if (!API_KEY) {
  throw new Error('OpenWeather API key is required. Please set REACT_APP_OPENWEATHER_API_KEY in your environment variables.');
}

// Main function: Get everything from forecast API
export const fetchCompleteWeatherData = async (city: string): Promise<WeatherData> => {
  try {
    const response = await fetch(
      `${BASE_URL}/forecast?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`
    );
    
    if (!response.ok) {
      const errorData: OpenWeatherError = await response.json();
      throw new WeatherApiError(
        errorData.message || 'Failed to fetch weather data',
        errorData.cod,
        response.status
      );
    }
    
    const data: OpenWeatherForecastResponse = await response.json();
    
    // Get current weather from forecast
    const current = extractCurrentWeatherFromForecast(data);
    
    // Get 3-day forecast
    const forecast = transformToForecastData(data);
    
    // Get comparison cities (simple version)
    const comparison = await fetchComparisonWeather(DEFAULT_COMPARISON_CITIES);
    
    return {
      current,
      forecast,
      comparison
    };
  } catch (error) {
    if (error instanceof WeatherApiError) {
      throw error;
    }
    throw new WeatherApiError('Failed to fetch weather data');
  }
};

// Simple comparison weather (without forecast)
export const fetchComparisonWeather = async (cities: string[]): Promise<ComparisonCity[]> => {
  try {
    const promises = cities.map(async city => {
      try {
        const response = await fetch(
          `${BASE_URL}/forecast?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`
        );
        
        if (!response.ok) throw new Error(`Failed for ${city}`);
        
        const data: OpenWeatherForecastResponse = await response.json();
        return extractComparisonCityFromForecast(data);
      } catch (error) {
        console.warn(`Failed to fetch weather for ${city}:`, error);
        return null;
      }
    });
    
    const results = await Promise.allSettled(promises);
    
    return results
      .filter((result): result is PromiseFulfilledResult<ComparisonCity> => 
        result.status === 'fulfilled' && result.value !== null
      )
      .map(result => result.value);
  } catch (error) {
    throw new WeatherApiError('Failed to fetch comparison weather data');
  }
};

// Just forecast
export const fetchThreeDayForecast = async (city: string): Promise<ForecastData[]> => {
  try {
    const response = await fetch(
      `${BASE_URL}/forecast?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`
    );
    
    if (!response.ok) {
      const errorData: OpenWeatherError = await response.json();
      throw new WeatherApiError(errorData.message || 'Failed to fetch forecast data');
    }
    
    const data: OpenWeatherForecastResponse = await response.json();
    return transformToForecastData(data);
  } catch (error) {
    if (error instanceof WeatherApiError) throw error;
    throw new WeatherApiError('Failed to fetch forecast data');
  }
};

// Helper to extract comparison city from forecast
const extractComparisonCityFromForecast = (data: OpenWeatherForecastResponse): ComparisonCity => {
  const current = data.list[0];
  
  return {
    city: data.city.name,
    country: data.city.country,
    temperature: Math.round(current.main.temp),
    condition: current.weather[0].description,
    icon: mapWeatherCondition(current.weather[0].main, current.weather[0].icon),
    humidity: current.main.humidity,
    windSpeed: Math.round(current.wind.speed * 3.6)
  };
};

// Simple weather condition mapping
const mapWeatherCondition = (condition: string, icon: string): 'sunny' | 'cloudy' | 'partly-cloudy' | 'rainy' | 'snow' | 'thunderstorm' => {
  const conditionMap: Record<string, 'sunny' | 'cloudy' | 'partly-cloudy' | 'rainy' | 'snow' | 'thunderstorm'> = {
    'Clear': 'sunny',
    'Clouds': icon.includes('n') ? 'cloudy' : 'partly-cloudy',
    'Rain': 'rainy',
    'Drizzle': 'rainy',
    'Thunderstorm': 'thunderstorm',
    'Snow': 'snow',
    'Mist': 'cloudy',
    'Fog': 'cloudy',
  };
  
  return conditionMap[condition] || 'partly-cloudy';
};