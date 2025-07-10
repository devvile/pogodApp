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
}

export interface WeatherData {
  current: CurrentWeather;
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