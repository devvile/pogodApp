import {
  CityNameCell,
  WeatherCell,
  MetricCell,
  RelativeDifferenceCell,
  type RelativeValue, Cell
} from "./CellsTemplates";
import type { ComparisonCity, CurrentWeather } from "@/types/weather";

interface ComparisonRowProps {
  city: ComparisonCity;
  baseCity: CurrentWeather;
  onCityClick: (cityName: string) => void;
  calculateRelativeValue: (value: number, baseValue: number) => RelativeValue;
}
//Comparison Table row formatting
export const ComparisonRow = ({
  city,
  baseCity,
  onCityClick,
  calculateRelativeValue,
}: ComparisonRowProps) => {
  const isBaseCity = city.city === baseCity.city;
  const tempRelative = calculateRelativeValue(
    city.temperature,
    baseCity.temperature
  );
  const humidityRelative = calculateRelativeValue(
    city.humidity ?? 0,
    baseCity.humidity ?? 0
  );
  const windRelative = calculateRelativeValue(
    city.windSpeed ?? 0,
    baseCity.windSpeed ?? 0
  );

  return (
    <tr
      className={`border-b border-white/10 hover:bg-white/10 transition-colors cursor-pointer group ${
        isBaseCity ? "bg-blue-500/20" : ""
      }`}
      onClick={() => onCityClick(city.city)}
    >
      <td className="p-4">
        <CityNameCell
          cityName={city.city}
          country={city.country}
          isBaseCity={isBaseCity}
        />
      </td>
      <Cell>
        <WeatherCell icon={city.icon} condition={city.condition} />
      </Cell>
      <Cell>
        <span className="text-xl font-bold text-white">
          {city.temperature}°
        </span>
      </Cell>
      <Cell>
        {isBaseCity ? (
          <RelativeDifferenceCell relative={tempRelative} isBaseCity={true} />
        ) : (
          <RelativeDifferenceCell relative={tempRelative} isBaseCity={false} />
        )}
      </Cell>
      <Cell>
        <MetricCell
          value={city.humidity}
          unit="%"
          relative={humidityRelative}
          showComparison={
            !isBaseCity &&
            city.humidity !== undefined &&
            baseCity.humidity !== undefined
          }
          showDecimals={true}
        />
      </Cell>
      <Cell>
        <MetricCell
          value={city.windSpeed}
          unit=" km/h"
          relative={windRelative}
          showComparison={
            !isBaseCity &&
            city.windSpeed !== undefined &&
            baseCity.windSpeed !== undefined
          }
          showDecimals={true}
        />
      </Cell>
    </tr>
  );
};
