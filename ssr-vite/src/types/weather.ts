export type WeatherIconType = 'sunny' | 'cloudy' | 'partly-cloudy' | 'rainy' | 'snow' | 'thunderstorm';

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

export interface ComparisonCity {
  city: string;
  country: string;
  temperature: number;
  condition: string;
  icon: WeatherIconType;
  humidity: number;
  windSpeed: number;
}


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

export interface WeatherData {
  current: CurrentWeather;
  forecast: ForecastData[]; 
  comparison: ComparisonCity[];
}

export interface WeatherIconProps {
  type: WeatherIconType;
  size?: number;
}

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