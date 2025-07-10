import type { LucideIcon } from "lucide-react";

interface CurrentWeatherStatsCardProps {
  cardValue: string;
  cardTitle: string;
  cardIcon: LucideIcon;
}

const CurrentWeatherStatsCard = ({
  cardValue,
  cardTitle,
  cardIcon: Icon,
}: CurrentWeatherStatsCardProps) => {
  return (
    <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm border border-white/10">
      <div className="flex items-center gap-3 mb-2">
        <Icon className="text-blue-300" size={20} />
        <span className="text-blue-200">{cardTitle}</span>
      </div>
      <p className="text-2xl font-bold text-white">{cardValue}</p>
    </div>
  );
};

export default CurrentWeatherStatsCard;
