import { MapPin } from "lucide-react";
import WeatherIcon from "../WeatherIcon";
import ForecastCard from "./ForcastCard";
import type { CurrentWeather, ForecastData } from "@/types/weather";

interface MainCityCardProps {
  currentWeather: CurrentWeather | null;
  forecast: ForecastData[];
}

const MainCityWeatherCard = ({ currentWeather, forecast }: MainCityCardProps) => {
  if(forecast && currentWeather) {
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
          {forecast && forecast.length > 0 && (
            <div className="mt-8 pt-6 border-t border-white/20">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {forecast.map((day, index) => (
                  <ForecastCard 
                    key={day.date} 
                    day={day} 
                    isToday={index === 0} 
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    );
  }else{
    return <></>
  }
};

export default MainCityWeatherCard;