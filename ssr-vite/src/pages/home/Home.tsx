import { useState } from "react";
import { useNavigate } from "react-router";
import { SearchForm, LazyHydrate, ContentCard } from "@/components";
import WelcomeSection from "./components/WelcomeSection";

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
    <LazyHydrate>
    <ContentCard>
      <div className="relative z-10 w-full max-w-2xl mx-auto px-4">
        <WelcomeSection />
          <SearchForm
            variant="primary"
            searchCity={searchCity}
            setSearchCity={setSearchCity}
            onSearch={handleSearch}
            placeholder="Enter city name (e.g., New York, London, Tokyo)"
          />
      </div>
    </ContentCard>
    </LazyHydrate>
  );
}

export default HomePage;
