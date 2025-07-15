import type { CurrentWeather, ForecastData, WeatherIconType, OpenWeatherForecastResponse } from '@/types/weather';

// Weather condition mapping
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

// Extract current weather from forecast
export const extractCurrentWeatherFromForecast = (data: OpenWeatherForecastResponse): CurrentWeather => {
  const current = data.list[0];
  
  return {
    city: data.city.name,
    country: data.city.country,
    temperature: Math.round(current.main.temp),
    condition: current.weather[0].description,
    humidity: current.main.humidity,
    windSpeed: Math.round(current.wind.speed * 3.6),
    visibility: 10,
    icon: mapWeatherCondition(current.weather[0].main, current.weather[0].icon)
  };
};

// Get city date using timezone from API
const getCityDate = (utcTimestamp: number, cityTimezoneOffset: number): Date => {
  return new Date((utcTimestamp + cityTimezoneOffset) * 1000);
};

// Get date key in city's timezone
const getCityDateKey = (utcTimestamp: number, cityTimezoneOffset: number): string => {
  const cityDate = getCityDate(utcTimestamp, cityTimezoneOffset);
  const year = cityDate.getUTCFullYear();
  const month = String(cityDate.getUTCMonth() + 1).padStart(2, '0');
  const day = String(cityDate.getUTCDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

// Create "Today" forecast from current weather when API data is missing
const createTodayFromCurrent = (data: OpenWeatherForecastResponse, todayKey: string): ForecastData => {
  const current = data.list[0];
  
  return {
    date: todayKey,
    dayName: 'Today',
    temperature: {
      min: Math.round(current.main.temp),
      max: Math.round(current.main.temp),
      current: Math.round(current.main.temp)
    },
    condition: current.weather[0].description,
    icon: mapWeatherCondition(current.weather[0].main, current.weather[0].icon),
    humidity: current.main.humidity,
    windSpeed: Math.round(current.wind.speed * 3.6)
  };
};

// Transform forecast data to 3 days with proper timezone handling
export const transformToForecastData = (data: OpenWeatherForecastResponse): ForecastData[] => {
  const cityTimezoneOffset = data.city.timezone;
  
  // Get current time in city's timezone
  const nowUtc = Math.floor(Date.now() / 1000);
  const cityNow = getCityDate(nowUtc, cityTimezoneOffset);
  
  // Calculate today, tomorrow, day after tomorrow
  const today = new Date(cityNow);
  today.setUTCHours(0, 0, 0, 0);
  
  const tomorrow = new Date(today);
  tomorrow.setUTCDate(today.getUTCDate() + 1);
  
  const dayAfterTomorrow = new Date(today);
  dayAfterTomorrow.setUTCDate(today.getUTCDate() + 2);
  
  const todayKey = today.toISOString().split('T')[0];
  const tomorrowKey = tomorrow.toISOString().split('T')[0];
  const dayAfterKey = dayAfterTomorrow.toISOString().split('T')[0];

  // Group by date using city's timezone
  const byDate: { [key: string]: typeof data.list } = {};
  
  data.list.forEach(item => {
    const dateKey = getCityDateKey(item.dt, cityTimezoneOffset);
    
    if (!byDate[dateKey]) {
      byDate[dateKey] = [];
    }
    byDate[dateKey].push(item);
  });

  const result: ForecastData[] = [];
  
  // Today - use current weather if no forecast data available
  if (byDate[todayKey]) {
    result.push(processDayForecast(byDate[todayKey], 'Today', cityTimezoneOffset));
  } else {
    result.push(createTodayFromCurrent(data, todayKey));
  }
  
  // Tomorrow
  if (byDate[tomorrowKey]) {
    result.push(processDayForecast(byDate[tomorrowKey], 'Tomorrow', cityTimezoneOffset));
  }
  
  // Day after tomorrow
  if (byDate[dayAfterKey]) {
    result.push(processDayForecast(byDate[dayAfterKey], 'Day After Tomorrow', cityTimezoneOffset));
  }

  return result;
};

// Process one day of forecast data
const processDayForecast = (
  dayData: OpenWeatherForecastResponse['list'], 
  dayName: string,
  cityTimezoneOffset: number
): ForecastData => {
  // Get min/max temperatures for the day
  const temps = dayData.map(item => item.main.temp);
  const minTemp = Math.min(...temps);
  const maxTemp = Math.max(...temps);
  
  // Use noon forecast or first available
  const noonForecast = dayData.find(item => {
    const cityTime = getCityDate(item.dt, cityTimezoneOffset);
    const hour = cityTime.getUTCHours();
    return hour >= 11 && hour <= 13;
  }) || dayData[0];
  
  const forecastDate = getCityDateKey(noonForecast.dt, cityTimezoneOffset);
  
  return {
    date: forecastDate,
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