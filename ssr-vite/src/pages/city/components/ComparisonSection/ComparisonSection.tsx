import ViewToggle from "./ViewToggle";
import ComparisonCities from "./ComaprisonCities";
import ComparisonTable from "./ComparisonTable/ComparisonTable";
import type { ComparisonCity, CurrentWeather } from "@/types/weather";
interface ComparisonSectionProps {
    viewMode:"cards" | "table";
    comparisonWeather: ComparisonCity[];
    setViewMode: (_mode:"cards" | "table")=> void;
    currentWeather: CurrentWeather | null
}

export const ComparisonSection = ({
  comparisonWeather,
  viewMode,
  setViewMode,
  currentWeather,
}: ComparisonSectionProps) => {
  if (comparisonWeather.length > 0 && currentWeather) {
    return (
      <>
        <div className="flex justify-between items-center mb-6">
          <div></div>
          <ViewToggle viewMode={viewMode} onToggle={setViewMode} />
        </div>
        <h3 className="text-2xl font-bold text-white mb-6 text-center">
          Compare with Other Cities
        </h3>
        {viewMode === "cards" ? (
          <ComparisonCities cities={comparisonWeather} />
        ) : (
          <ComparisonTable
            cities={comparisonWeather}
            baseCity={currentWeather}
          />
        )}
      </>
    );
  } else {
    return <></>;
  }
};

export default ComparisonSection;
