export type WeatherIconType = 'sunny' | 'cloudy' | 'partly-cloudy' | 'rainy' | 'snow' | 'thunderstorm';

// Keep your existing CurrentWeather - just add what we need
export interface CurrentWeather {
  city: string;
  country: string;
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  visibility: number;
  icon: WeatherIconType;
}

// Keep your existing ComparisonCity
export interface ComparisonCity {
  city: string;
  country: string;
  temperature: number;
  condition: string;
  icon: WeatherIconType;
  humidity: number;
  windSpeed: number;
}

// Simple forecast - just the basics
export interface ForecastData {
  date: string;
  dayName: string; // "Today", "Tomorrow", "Day After Tomorrow"
  temperature: {
    min: number;
    max: number;
    current: number;
  };
  condition: string;
  icon: WeatherIconType;
  humidity: number;
  windSpeed: number;
}

// Update WeatherData to include forecast
export interface WeatherData {
  current: CurrentWeather;
  forecast: ForecastData[]; // Added this
  comparison: ComparisonCity[];
}

export interface WeatherIconProps {
  type: WeatherIconType;
  size?: number;
}

// API response types (keep simple)
export interface OpenWeatherResponse {
  name: string;
  sys: {
    country: string;
  };
  main: {
    temp: number;
    humidity: number;
  };
  weather: Array<{
    main: string;
    description: string;
    icon: string;
  }>;
  wind: {
    speed: number;
  };
  visibility: number;
}

export interface OpenWeatherForecastResponse {
  list: Array<{
    dt: number;
    main: {
      temp: number;
      temp_min: number;
      temp_max: number;
      humidity: number;
    };
    weather: Array<{
      main: string;
      description: string;
      icon: string;
    }>;
    wind: {
      speed: number;
    };
    dt_txt: string;
  }>;
  city: {
    name: string;
    country: string;
  };
}

export interface OpenWeatherError {
  cod: string;
  message: string;
}

export class WeatherApiError extends Error {
  constructor(
    message: string,
    public code?: string,
    public statusCode?: number
  ) {
    super(message);
    this.name = 'WeatherApiError';
  }
}

export interface CitySearchResult {
  name: string;
  country: string;
  state?: string;
  lat: number;
  lon: number;
}

export interface CitySearchResponse extends Array<CitySearchResult> {}