import { Wind, Droplets } from "lucide-react";

interface WeatherDetailsTileProps {
  type: "wind" | "humidity";
  value: number;
}

const WeatherDetailsTile = ({ type, value }: WeatherDetailsTileProps) => {
  const config = {
    humidity: {
      icon: Droplets,
      label: "Humidity",
      unit: "%",
    },
    wind: {
      icon: Wind,
      label: "Wind",
      unit: " km/h",
    },
  };

  const { icon: Icon, label, unit } = config[type];

  return (
    <div className="flex items-center justify-between p-2 bg-white/10 rounded-lg">
      <div className="flex items-center gap-2">
        <Icon className="text-blue-300" size={16} />
        <span className="text-sm text-blue-200">{label}</span>
      </div>
      <span className="text-sm font-semibold text-white">
        {value}{unit}
      </span>
    </div>
  );
};

export default WeatherDetailsTile;