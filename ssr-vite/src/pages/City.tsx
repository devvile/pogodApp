import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import { 
  Search, 
  MapPin, 
  Thermometer, 
  Droplets, 
  Wind, 
  Eye, 
  Sun, 
  Cloud, 
  CloudRain,
  CloudSnow,
  Zap,
  ArrowLeft
} from 'lucide-react';

// Mock weather data
const weatherData = {
  current: {
    city: "New York",
    country: "USA",
    temperature: 24,
    condition: "Partly Cloudy",
    humidity: 65,
    windSpeed: 12,
    visibility: 10,
    icon: "partly-cloudy"
  },
  comparison: [
    {
      city: "London",
      country: "UK",
      temperature: 18,
      condition: "Rainy",
      icon: "rainy"
    },
    {
      city: "Tokyo",
      country: "Japan",
      temperature: 28,
      condition: "Sunny",
      icon: "sunny"
    },
    {
      city: "Sydney",
      country: "Australia",
      temperature: 22,
      condition: "Cloudy",
      icon: "cloudy"
    },
    {
      city: "Mumbai",
      country: "India",
      temperature: 32,
      condition: "Thunderstorm",
      icon: "thunderstorm"
    },
    {
      city: "Moscow",
      country: "Russia",
      temperature: -2,
      condition: "Snow",
      icon: "snow"
    }
  ]
};

const WeatherIcon = ({ type, size = 24 }) => {
  const icons = {
    sunny: <Sun size={size} className="text-yellow-500" />,
    cloudy: <Cloud size={size} className="text-gray-500" />,
    'partly-cloudy': <Cloud size={size} className="text-gray-400" />,
    rainy: <CloudRain size={size} className="text-blue-500" />,
    snow: <CloudSnow size={size} className="text-blue-200" />,
    thunderstorm: <Zap size={size} className="text-purple-500" />
  };
  return icons[type] || <Sun size={size} className="text-yellow-500" />;
};

function CityPage() {
  const { city } = useParams();
  const navigate = useNavigate();
  const [searchCity, setSearchCity] = useState('');
  const [currentWeather, setCurrentWeather] = useState(weatherData.current);

  useEffect(() => {
    if (city) {
      // Simulate updating weather data based on the city parameter
      setCurrentWeather({
        ...currentWeather,
        city: decodeURIComponent(city),
        country: "Unknown"
      });
    }
  }, [city]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchCity.trim()) {
      navigate(`/weather/${encodeURIComponent(searchCity.trim())}`);
      setSearchCity('');
    }
  };

  const handleBackToHome = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-purple-900">
      {/* Header with Search */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm"></div>
        <div className="relative container mx-auto px-4 py-8">
          {/* Back Button */}
          <button
            onClick={handleBackToHome}
            className="flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors duration-200"
          >
            <ArrowLeft size={20} />
            <span>Back to Home</span>
          </button>

          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-2">Weather Dashboard</h1>
            <p className="text-blue-200">Stay updated with weather conditions worldwide</p>
          </div>
          
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

      <div className="container mx-auto px-4 pb-8">
        {/* Current Weather Highlight */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/20 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <MapPin className="text-blue-300" size={24} />
                <div>
                  <h2 className="text-2xl font-bold text-white">{currentWeather.city}</h2>
                  <p className="text-blue-200">{currentWeather.country}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-2 mb-2">
                  <WeatherIcon type={currentWeather.icon} size={32} />
                  <span className="text-5xl font-bold text-white">{currentWeather.temperature}°</span>
                </div>
                <p className="text-blue-200">{currentWeather.condition}</p>
              </div>
            </div>
            
            {/* Weather Details */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm border border-white/10">
                <div className="flex items-center gap-3 mb-2">
                  <Droplets className="text-blue-300" size={20} />
                  <span className="text-blue-200">Humidity</span>
                </div>
                <p className="text-2xl font-bold text-white">{currentWeather.humidity}%</p>
              </div>
              
              <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm border border-white/10">
                <div className="flex items-center gap-3 mb-2">
                  <Wind className="text-blue-300" size={20} />
                  <span className="text-blue-200">Wind Speed</span>
                </div>
                <p className="text-2xl font-bold text-white">{currentWeather.windSpeed} km/h</p>
              </div>
              
              <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm border border-white/10">
                <div className="flex items-center gap-3 mb-2">
                  <Eye className="text-blue-300" size={20} />
                  <span className="text-blue-200">Visibility</span>
                </div>
                <p className="text-2xl font-bold text-white">{currentWeather.visibility} km</p>
              </div>
            </div>
          </div>
        </div>

        {/* Comparison Cities */}
        <div>
          <h3 className="text-2xl font-bold text-white mb-6 text-center">Compare with Other Cities</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {weatherData.comparison.map((city, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105 cursor-pointer group"
                onClick={() => navigate(`/weather/${encodeURIComponent(city.city)}`)}
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
      </div>
    </div>
  );
}

export default CityPage;