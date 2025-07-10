import { useNavigate } from 'react-router';
import type { ComparisonCity} from '../../../types/weather';
import WeatherIcon from './WeatherIcon';

export interface ComparisonCitiesProps {
  cities: ComparisonCity[];
}

const ComparisonCities = ({ cities }:ComparisonCitiesProps) => {
  const navigate = useNavigate();

  const handleCityClick = (cityName:string) => {
    navigate(`/${encodeURIComponent(cityName)}`);
  };

  return (
    <div>
      <h3 className="text-2xl font-bold text-white mb-6 text-center">Compare with Other Cities</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {cities.map((city, index) => (
          <div
            key={index}
            className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105 cursor-pointer group"
            onClick={() => handleCityClick(city.city)}
          >
            <div className="text-center">
              <div className="flex justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
                <WeatherIcon type={city.icon} size={32} />
              </div>
              <h4 className="text-lg font-semibold text-white mb-1">{city.city}</h4>
              <p className="text-blue-200 text-sm mb-3">{city.country}</p>
              <div className="text-3xl font-bold text-white mb-2">{city.temperature}°</div>
              <p className="text-blue-200 text-sm">{city.condition}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ComparisonCities;