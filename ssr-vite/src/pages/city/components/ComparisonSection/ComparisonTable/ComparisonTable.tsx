import { useNavigate } from "react-router";
import { ComparisonRow } from "./ComparisonRow";
import ComparisonLegend from "./ComparisonLegend";
import DataError from "../../DataError";
import type { ComparisonCity, CurrentWeather } from "@/types/weather";
import { calculateRelativeValue } from "./helpers";

export interface ComparisonTableProps {
  cities: ComparisonCity[];
  baseCity: CurrentWeather;
}

const ComparisonTable = ({ cities, baseCity }: ComparisonTableProps) => {
  const navigate = useNavigate();

  const handleCityClick = (cityName: string) => {
    navigate(`/${encodeURIComponent(cityName)}`);
  };

  if (!cities || cities.length === 0) {
    return <DataError text="No comparison cities available" />;
  }

  const headerCellClass = "p-4 text-white font-semibold";
  const leftAlignedHeader = `text-left ${headerCellClass}`;
  const centerAlignedHeader = `text-center ${headerCellClass}`;

  return (
    <section className="mb-8">
      <div className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/20 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full" role="table" aria-label="Weather comparison table">
            <thead>
              <tr className="bg-white/10 border-b border-white/20">
                <th className={leftAlignedHeader} scope="col">
                  City
                </th>
                <th className={centerAlignedHeader} scope="col">
                  Weather
                </th>
                <th className={centerAlignedHeader} scope="col">
                  Temperature
                </th>
                <th className={centerAlignedHeader} scope="col">
                  Difference
                </th>
                <th className={centerAlignedHeader} scope="col">
                  Humidity
                </th>
                <th className={centerAlignedHeader} scope="col">
                  Wind Speed
                </th>
              </tr>
            </thead>
            <tbody>
              {cities.map((city) => (
                <ComparisonRow
                  key={`${city.city}-${city.country}`}
                  city={city}
                  baseCity={baseCity}
                  onCityClick={handleCityClick}
                  calculateRelativeValue={calculateRelativeValue}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <ComparisonLegend />
    </section>
  );
};

export default ComparisonTable;