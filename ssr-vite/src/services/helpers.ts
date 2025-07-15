import type { CurrentWeather, ForecastData, WeatherIconType, OpenWeatherForecastResponse } from '@/types/weather';

// Your existing weather condition mapping
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

// Extract current weather from forecast (first entry)
export const extractCurrentWeatherFromForecast = (data: OpenWeatherForecastResponse): CurrentWeather => {
  const current = data.list[0];
  
  return {
    city: data.city.name,
    country: data.city.country,
    temperature: Math.round(current.main.temp),
    condition: current.weather[0].description,
    humidity: current.main.humidity,
    windSpeed: Math.round(current.wind.speed * 3.6), // m/s to km/h
    visibility: 10, // Default value since forecast doesn't include this
    icon: mapWeatherCondition(current.weather[0].main, current.weather[0].icon)
  };
};

// Transform forecast data to 3 days
export const transformToForecastData = (data: OpenWeatherForecastResponse): ForecastData[] => {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  const dayAfterTomorrow = new Date(today);
  dayAfterTomorrow.setDate(today.getDate() + 2);

  // Group by date
  const byDate: { [key: string]: typeof data.list } = {};
  
  data.list.forEach(item => {
    const date = new Date(item.dt * 1000);
    const dateKey = date.toISOString().split('T')[0];
    
    if (!byDate[dateKey]) {
      byDate[dateKey] = [];
    }
    byDate[dateKey].push(item);
  });

  const result: ForecastData[] = [];
  
  // Today
  const todayKey = today.toISOString().split('T')[0];
  if (byDate[todayKey]) {
    result.push(processDayForecast(byDate[todayKey], 'Today'));
  }
  
  // Tomorrow
  const tomorrowKey = tomorrow.toISOString().split('T')[0];
  if (byDate[tomorrowKey]) {
    result.push(processDayForecast(byDate[tomorrowKey], 'Tomorrow'));
  }
  
  // Day after tomorrow
  const dayAfterKey = dayAfterTomorrow.toISOString().split('T')[0];
  if (byDate[dayAfterKey]) {
    result.push(processDayForecast(byDate[dayAfterKey], 'Day After Tomorrow'));
  }

  return result;
};

// Process one day of forecast data
const processDayForecast = (dayData: OpenWeatherForecastResponse['list'], dayName: string): ForecastData => {
  // Get temperatures
  const temps = dayData.map(item => item.main.temp);
  const minTemp = Math.min(...temps);
  const maxTemp = Math.max(...temps);
  
  // Use noon forecast or first available
  const noonForecast = dayData.find(item => {
    const hour = new Date(item.dt * 1000).getHours();
    return hour >= 11 && hour <= 13;
  }) || dayData[0];
  
  return {
    date: new Date(noonForecast.dt * 1000).toISOString().split('T')[0],
    dayName,
    temperature: {
      min: Math.round(minTemp),
      max: Math.round(maxTemp),
      current: Math.round(noonForecast.main.temp)
    },
    condition: noonForecast.weather[0].description,
    icon: mapWeatherCondition(noonForecast.weather[0].main, noonForecast.weather[0].icon),
    humidity: noonForecast.main.humidity,
    windSpeed: Math.round(noonForecast.wind.speed * 3.6)
  };
};

// Error helper
export const getErrorMessage = (error: any): string => {
  if (error?.statusCode === 404) return 'City not found';
  if (error?.statusCode === 401) return 'Invalid API key';
  if (error?.statusCode === 429) return 'Too many requests';
  return error?.message || 'Something went wrong';
};