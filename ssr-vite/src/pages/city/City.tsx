import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import Loader from "@/components/Loader";
import { useCompleteWeather, useWeatherState } from "@/hooks/useWeather";
import { setSelectedCity } from "@/store/slices/weatherSlice";
import QueryError from "./components/QueryError";
import ContentCard from "@/components/ui/ContentCard";
import MainCityWeatherCard from "./components/MainCityWeatherSection/MainCityWeatherCard";
import CityPageHeader from "./components/CityPageHeader";
import ComparisonSection from "./components/ComparisonSection/ComparisonSection";

function CityPage() {
  const { city } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchCity, setSearchCity] = useState("");
  const [viewMode, setViewMode] = useState<"cards" | "table">("cards");

  if (!city) {
    navigate("/");
    return null;
  }

  const decodedCity = decodeURIComponent(city);

  // Hooks
  const {
    isLoading: queryLoading,
    error: queryError,
    refetch,
  } = useCompleteWeather(decodedCity);

  const {
    currentWeather,
    forecast,
    comparisonWeather,
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

  if (reduxError || queryError) {
    return (
      <QueryError
        error={reduxError || queryError}
        onTryAgain={() => refetch()}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div>
        <CityPageHeader
          searchCity={searchCity}
          onSearch={handleSearch}
          setSearchCity={setSearchCity}
        />
        <main className="container mx-auto px-4 pb-8">
          <MainCityWeatherCard
            currentWeather={currentWeather}
            forecast={forecast}
          />
          <ComparisonSection
            viewMode={viewMode}
            comparisonWeather={comparisonWeather}
            setViewMode={setViewMode}
            currentWeather={currentWeather}
          />
        </main>
      </div>
    </div>
  );
}

export default CityPage;
