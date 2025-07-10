import type {CurrentWeather, ComparisonCity, WeatherIconType} from '../types/weather';
import type {OpenWeatherResponse } from '../types/weather';

// Helper function to map OpenWeather condition to our icon system
export const mapWeatherCondition = (condition: string, icon: string): WeatherIconType => {
    const conditionMap: Record<string, WeatherIconType> = {
      'Clear': 'sunny',
      'Clouds': icon.includes('n') ? 'cloudy' : 'partly-cloudy',
      'Rain': 'rainy',
      'Drizzle': 'rainy',
      'Thunderstorm': 'thunderstorm',
      'Snow': 'snow',
      'Mist': 'cloudy',
      'Smoke': 'cloudy',
      'Haze': 'cloudy',
      'Dust': 'cloudy',
      'Fog': 'cloudy',
      'Sand': 'cloudy',
      'Ash': 'cloudy',
      'Squall': 'thunderstorm',
      'Tornado': 'thunderstorm',
    };
    
    return conditionMap[condition] || 'partly-cloudy';
  };

// Transform OpenWeather response to our CurrentWeather type
 export const transformToCurrentWeather = (data: OpenWeatherResponse): CurrentWeather => ({
    city: data.name,
    country: data.sys.country,
    temperature: Math.round(data.main.temp),
    condition: data.weather[0].description,
    humidity: data.main.humidity,
    windSpeed: Math.round(data.wind.speed * 3.6), // Convert m/s to km/h
    visibility: Math.round(data.visibility / 1000), // Convert m to km
    icon: mapWeatherCondition(data.weather[0].main, data.weather[0].icon)
  });
  
  // Transform OpenWeather response to our ComparisonCity type
 export const transformToComparisonCity = (data: OpenWeatherResponse): ComparisonCity => ({
    city: data.name,
    country: data.sys.country,
    temperature: Math.round(data.main.temp),
    condition: data.weather[0].description,
    icon: mapWeatherCondition(data.weather[0].main, data.weather[0].icon)
  });