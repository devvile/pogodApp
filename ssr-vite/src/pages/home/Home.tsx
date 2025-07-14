import { useState } from "react";
import { useNavigate } from "react-router";

import SearchForm from "@/components/shared/SearchForm";
import WelcomeSection from "./components/WelcomeSection";
import Loader from "@/components/Loader";
import LazyHydrate from "@/components/LazyHydrate";

function HomePage() {
  const navigate = useNavigate();
  const [searchCity, setSearchCity] = useState("");

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchCity.trim()) {
      navigate(`/${encodeURIComponent(searchCity.trim())}`);
      setSearchCity("");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900 flex items-center justify-center">
      <div className="relative z-10 w-full max-w-2xl mx-auto px-4">
        <WelcomeSection />
        <LazyHydrate fallback={<Loader />}>
          <SearchForm
            variant="primary"
            searchCity={searchCity}
            setSearchCity={setSearchCity}
            onSearch={handleSearch}
            placeholder="Enter city name (e.g., New York, London, Tokyo)"
          />
        </LazyHydrate>
      </div>
    </div>
  );
}

export default HomePage;