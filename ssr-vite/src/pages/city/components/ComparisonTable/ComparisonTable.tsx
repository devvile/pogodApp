import { useNavigate } from 'react-router';
import { ComparisonRow } from './ComparisonRow';
import  ComparisonLegend  from './ComparisonLegend';
import type { ComparisonCity, CurrentWeather } from '@/types/weather';
import { calculateRelativeValue } from './helpers';

export interface ComparisonTableProps {
  cities: ComparisonCity[];
  baseCity: CurrentWeather;
}

const ComparisonTable = ({ cities, baseCity }: ComparisonTableProps) => {
  const navigate = useNavigate();

  const handleCityClick = (cityName: string) => {
    navigate(`/${encodeURIComponent(cityName)}`);
  };

  if (cities.length === 0) {
    return (
      <div className="text-center text-gray-300 p-4">
        No comparison cities available
      </div>
    );
  }
  const regularThStyling = 'text-center p-4 text-white font-semibold'
  
  return (
    <div className="mb-8">
      <div className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/20 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-white/10 border-b border-white/20">
                <th className={` text-left ${regularThStyling}`}>City</th>
                <th className={` text-center ${regularThStyling}`}>Weather</th>
                <th className={` text-center ${regularThStyling}`}>Temperature</th>
                <th className={` text-center ${regularThStyling}`}>Difference</th>
                <th className={` text-center ${regularThStyling}`}>Humidity</th>
                <th className={` text-center ${regularThStyling}`}>Wind Speed</th>
              </tr>
            </thead>
            <tbody>
              {cities.map((city, index) => (
                <ComparisonRow
                  key={index}
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
    </div>
  );
};

export default ComparisonTable;