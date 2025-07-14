import { Droplets, Wind, Eye } from "lucide-react";

import type { CurrentWeather } from "@/types/weather";
import CurrentWeatherStatsCard from "./CurrentWeatherStatsCard";

interface CurrentWeatherStatsProps {
  currentWeather: CurrentWeather;
}

const CurrentWeatherStats = ({ currentWeather }: CurrentWeatherStatsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
      <CurrentWeatherStatsCard
        cardTitle="Humidity"
        cardValue={`${currentWeather.humidity}%`}
        cardIcon={Droplets}
      />

      <CurrentWeatherStatsCard
        cardTitle="Wind Speed"
        cardValue={`${currentWeather.windSpeed} km/h`}
        cardIcon={Wind}
      />
      <CurrentWeatherStatsCard
        cardTitle="Visibility"
        cardValue={`${currentWeather.visibility} km`}
        cardIcon={Eye}
      />
    </div>
  );
};

export default CurrentWeatherStats;
