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

export interface ComparisonCitiesProps {
  cities: ComparisonCity[];
}