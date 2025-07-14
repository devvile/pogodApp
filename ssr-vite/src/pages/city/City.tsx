import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import SearchForm from "@/components/shared/SearchForm";
import ComparisonCities from "./components/ComaprisonCities";
import ComparisonTable from "./components/ComparisonTable/ComparisonTable";
import CurrentWeatherCard from "./components/CurrentWeather/CurrentWeatherCard";
import CurrentWeatherTitle from "./components/CurrentWeather/CurrentWeatherTitle";
import BackButton from "@/components/ui/BackButton";
import Loader from "@/components/Loader";
import ViewToggle from "./components/ViewToggle";
import { useCompleteWeather, useWeatherState } from "@/hooks/useWeather";
import { setSelectedCity } from "@/store/slices/weatherSlice";
import type { RootState } from "@/store";
import type { WeatherState } from "@/store/slices/weatherSlice";
import QueryError from "./components/QueryError";
import ContentCard from "@/components/ui/ContentCard";

function CityPage() {
  const weatherData: WeatherState = useSelector(
    (state: RootState) => state.weather
  );
  const { city } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchCity, setSearchCity] = useState("");
  const [viewMode, setViewMode] = useState<"cards" | "table">("cards");

  if (!city) {
    navigate("/");
    return;
  }

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
      <ContentCard>
        <Loader />
      </ContentCard>
    );
  }

  if (reduxError || queryError)
    return (
      <QueryError
        error={reduxError || queryError}
        onTryAgain={() => refetch()}
      />
    );

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

          {weatherData.comparisonWeather.length > 0 && currentWeather && (
            <>
              <div className="flex justify-between items-center mb-6">
                <div></div>
                <ViewToggle viewMode={viewMode} onToggle={setViewMode} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-6 text-center">
                Compare with Other Cities
              </h3>
              {viewMode === "cards" ? (
                <ComparisonCities cities={weatherData.comparisonWeather} />
              ) : (
                <ComparisonTable
                  cities={weatherData.comparisonWeather}
                  baseCity={currentWeather}
                />
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
}

export default CityPage;
