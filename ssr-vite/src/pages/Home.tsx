import {useState, type FormEvent } from "react";
import { useNavigate } from "react-router";
import SearchForm from "../components/SearchForm";
import WelcomeSection from "../components/WelcomeSection";
import Loader from "../components/Loader";
import LazyHydrate from "../components/LazyHydrate";
function HomePage() {
  const [searchCity, setSearchCity] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e:FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchCity.trim()) {
      navigate(`${encodeURIComponent(searchCity.trim())}`);
      setSearchCity("");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900 flex items-center justify-center">
      <div className="relative z-10 w-full max-w-2xl mx-auto px-4">
        <WelcomeSection />
        <LazyHydrate fallback={<Loader/>}>
          <SearchForm
            searchCity={searchCity}
            setSearchCity={setSearchCity}
            onSearch={handleSearch}
          />
        </LazyHydrate>
      </div>
    </div>
  );
}

export default HomePage;
