import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";

import SearchForm from "../../components/shared/SearchForm";
import ComparisonCities from "./components/ComaprisonCities";
import CurrentWeatherCard from "./components/CurrentWeather/CurrentWeatherCard";
import CurrentWeatherTitle from "./components/CurrentWeatherTitle";
import BackButton from "../../components/ui/BackButton";
import Loader from "../../components/Loader";

import { useCompleteWeather, useWeatherState } from "../../hooks/useWeather";
import { setSelectedCity } from "../../store/slices/weatherSlice";
import type { RootState } from "../../store";
import type { WeatherState } from "../../store/slices/weatherSlice";

function CityPage() {
  const weatherData: WeatherState = useSelector(
    (state: RootState) => state.weather
  );
  const { city } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchCity, setSearchCity] = useState("");

  if (!city) {
    navigate("/");
    return;
  } // redirect to home for empty city

  const decodedCity = decodeURIComponent(city);
  const {
    isLoading: queryLoading,
    error: queryError,
    refetch,
  } = useCompleteWeather(decodedCity);

  // Get weather data from Redux (updated by the hook above)
  const {
    currentWeather,
    isLoading: reduxLoading,
    error: reduxError,
  } = useWeatherState();

  useEffect(() => {
    dispatch(setSelectedCity(decodedCity));
  }, [decodedCity, dispatch]);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchCity.trim()) {
      navigate(`/${encodeURIComponent(searchCity.trim())}`);
      setSearchCity("");
    }
  };

  const isLoading = queryLoading || reduxLoading;
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900 flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (reduxError || queryError) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900 flex items-center justify-center">
        <div className="text-center text-white max-w-md">
          <h2 className="text-2xl font-bold mb-4">Weather data unavailable</h2>
          <p className="text-slate-300 mb-6">{reduxError}</p>
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => refetch()}
              className="bg-purple-800 hover:bg-purple-600 text-white px-6 py-2 rounded-lg transition-colors"
            >
              Try Again
            </button>
            <BackButton variant="outlined" action="home" className="mb-0" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div>
        <div className="relative container mx-auto px-4 py-8">
          <BackButton action="home" />
          <CurrentWeatherTitle
            title={"Weather Dashboard"}
            subtitle="Stay updated with weather conditions worldwide"
          />
          <SearchForm
            variant="secondary"
            searchCity={searchCity}
            setSearchCity={setSearchCity}
            onSearch={handleSearch}
            placeholder="Search for a city..."
          />
        </div>
        <main className="container mx-auto px-4 pb-8">
          {currentWeather && (
            <CurrentWeatherCard currentWeather={currentWeather} />
          )}
          <ComparisonCities cities={weatherData.comparisonWeather} />
        </main>
      </div>
    </div>
  );
}

export default CityPage;