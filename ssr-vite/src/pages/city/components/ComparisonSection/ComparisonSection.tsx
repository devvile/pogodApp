import ViewToggle from "./ViewToggle";
import ComparisonCities from "./ComaprisonCities";
import ComparisonTable from "./ComparisonTable/ComparisonTable";
import DataError from "../DataError";
import type { ComparisonCity, CurrentWeather } from "@/types/weather";

interface ComparisonSectionProps {
  viewMode: "cards" | "table";
  comparisonWeather: ComparisonCity[];
  setViewMode: (mode: "cards" | "table") => void;
  currentWeather: CurrentWeather | null;
}

const ComparisonSection = ({
  comparisonWeather,
  viewMode,
  setViewMode,
  currentWeather,
}: ComparisonSectionProps) => {
  if (!currentWeather) {
    return <DataError text="Current weather data required for comparison" />;
  }

  if (!comparisonWeather || comparisonWeather.length === 0) {
    return <DataError text="No comparison cities available" />;
  }

  return (
    <section className="mt-8">
      <div className="flex justify-between items-center mb-6">
        <div></div>
        <ViewToggle viewMode={viewMode} onToggle={setViewMode} />
      </div>
      <h2 className="text-2xl font-bold text-white mb-6 text-center">
        Compare with Other Cities
      </h2>
      {viewMode === "cards" ? (
        <ComparisonCities cities={comparisonWeather} />
      ) : (
        <ComparisonTable cities={comparisonWeather} baseCity={currentWeather} />
      )}
    </section>
  );
};

export default ComparisonSection;
