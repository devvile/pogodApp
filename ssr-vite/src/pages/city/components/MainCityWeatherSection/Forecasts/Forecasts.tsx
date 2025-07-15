import DataError from "../../DataError";
import ForecastDailyCard from "./ForecastDailyCard";
import type { ForecastData } from "@/types/weather";

interface ForecastsProps {
  forecast: ForecastData[];
}

const Forecasts = ({ forecast }: ForecastsProps) => {
  if (!forecast || forecast.length === 0) {
    return <DataError text="No forecast data available" />;
  }

  return (
    <div className="mt-8 pt-6 border-t border-white/20">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {forecast.map((day, index) => (
          <ForecastDailyCard 
            key={day.date} 
            day={day} 
            isToday={index === 0} 
          />
        ))}
      </div>
    </div>
  );
};

export default Forecasts;