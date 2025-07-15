import WeatherIcon from "../WeatherIcon";
import WeatherDetailsTile from "./DailyWeatherDetailsTile";
import type { ForecastData } from "@/types/weather";

interface ForecastCardProps {
  day: ForecastData;
  isToday?: boolean;
}

const ForecastCard = ({ day, isToday = false }: ForecastCardProps) => {
  return (
    <div
      className={`
        bg-gradient-to-br from-purple/2 to-white/1 backdrop-blur-lg rounded-xl p-6 
        border border-white/3 shadow-xl text-white transition-all duration-300 hover:scale-105 hover:shadow-2xl
        ${isToday ? 'ring-2 ring-blue-400/50' : ''}
      `}
    >
      <div className="text-center mb-4">
        <h4 className="text-lg font-bold text-white mb-1">{day.dayName}</h4>
        <p className="text-sm text-blue-200 opacity-75">
          {new Date(day.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
        </p>
      </div>
      <div className="text-center mb-6">
        <div className="flex justify-center mb-3">
          <WeatherIcon type={day.icon} size={48} />
        </div>
        <div className="flex items-center justify-center gap-2 mb-2">
          <span className="text-3xl font-bold text-white">{day.temperature.max}°</span>
          <span className="text-xl text-blue-200 opacity-75">{day.temperature.min}°</span>
        </div>
        <p className="text-blue-200 capitalize font-medium">{day.condition}</p>
      </div>
      <div className="space-y-3">
        <WeatherDetailsTile type="humidity" value={day.humidity} />
        <WeatherDetailsTile type="wind" value={day.windSpeed} />
      </div>

    </div>
  );
};

export default ForecastCard;