import { MapPin } from "lucide-react";
import WeatherIcon from "../WeatherIcon";
import type { CurrentWeather, ForecastData } from "@/types/weather";
import Forecasts from "./Forecasts/Forecasts";
import DataError from "../DataError";

interface MainCityCardProps {
  currentWeather: CurrentWeather | null;
  forecast: ForecastData[];
}

const MainCityWeatherCard = ({ currentWeather, forecast }: MainCityCardProps) => {
  if (!currentWeather) {
    return (
      <DataError text="No weather data available"/>
    );
  }
  return (
    <section className="mb-6">
      <div className="bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/20 shadow-2xl">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <MapPin className="text-blue-300" size={24} />
            <div>
              <h2 className="text-2xl font-bold text-white">{currentWeather.city}</h2>
              <p className="text-blue-200">{currentWeather.country}</p>
            </div>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-2 mb-2">
              <WeatherIcon type={currentWeather.icon} size={32} />
              <span className="text-5xl font-bold text-white">{currentWeather.temperature}°</span>
            </div>
            <p className="text-blue-200">{currentWeather.condition}</p>
          </div>
        </div>
        <Forecasts forecast={forecast} />
      </div>
    </section>
  );
};

export default MainCityWeatherCard;