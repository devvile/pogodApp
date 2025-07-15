import BackButton from "@/components/ui/BackButton";
import { SearchForm } from "@/components";
import CurrentWeatherTitle from "./CurrentWeatherTitle";

interface CitypPageHeaderProps {
    searchCity:string;
    setSearchCity:(_city:string)=> void;
    onSearch: (e:React.FormEvent<HTMLFormElement>)=> void;
}

const CityPageHeader = ({searchCity, setSearchCity, onSearch}: CitypPageHeaderProps) => {
  return (
    <div className="relative container mx-auto px-4 py-6">
      <BackButton action="home" />
      <CurrentWeatherTitle
        title="Weather Dashboard"
        subtitle="Stay updated with weather conditions worldwide"
      />
      <SearchForm
        variant="secondary"
        searchCity={searchCity}
        setSearchCity={setSearchCity}
        onSearch={onSearch}
        placeholder="Search for a city..."
      />
    </div>
  );
};

export default CityPageHeader;
