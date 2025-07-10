import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import { 
  Search, 
} from 'lucide-react';
import ComparisonCities from './components/ComaprisonCities';
import type { WeatherData } from '../../types/weather';
import CurrentWeatherCard from './components/CurrentWeather/CurrentWeatherCard';
import CurrentWeatherTitle from './components/CurrentWeatherTitle';
import BackButton from './components/BackButton';
import { useSelector } from 'react-redux';
import type { RootState } from '../../store';

function CityPage() {
  const weatherData:WeatherData = useSelector((state:RootState)=>state.weather);
  const { city } = useParams();
  const navigate = useNavigate();
  const [searchCity, setSearchCity] = useState('');
  const [currentWeather, setCurrentWeather] = useState(weatherData.current);
  useEffect(() => {
    if (city) {
      setCurrentWeather({
        ...currentWeather,
        city: decodeURIComponent(city),
        country: "Unknown"
      });
    }
  }, [city]);

  const handleSearch = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchCity.trim()) {
      navigate(`${encodeURIComponent(searchCity.trim())}`);
      setSearchCity('');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-purple-900">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm"></div>
        <div className="relative container mx-auto px-4 py-8">
          <BackButton/>
          <CurrentWeatherTitle title = {'Weather Dashboard' } subtitle='Stay updated with weather conditions worldwide'/>
          {/* Search Form */}
          <form onSubmit={handleSearch} className="max-w-md mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                value={searchCity}
                onChange={(e) => setSearchCity(e.target.value)}
                placeholder="Search for a city..."
                className="w-full pl-12 pr-4 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors duration-200"
              >
                Search
              </button>
            </div>
          </form>
        </div>
      </div>
      <main className="container mx-auto px-4 pb-8">
        <CurrentWeatherCard currentWeather={currentWeather}/>
        <ComparisonCities cities={weatherData.comparison}/>
      </main>
    </div>
  );
}

export default CityPage;