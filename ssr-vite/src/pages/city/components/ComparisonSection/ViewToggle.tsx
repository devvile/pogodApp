// components/ViewToggle.tsx
import { Grid, Table } from "lucide-react";

interface ViewToggleProps {
  viewMode: "cards" | "table";
  onToggle: (mode: "cards" | "table") => void;
  className?: string;
}

const ViewToggle = ({
  viewMode,
  onToggle,
  className = "",
}: ViewToggleProps) => {
  const isTableView = viewMode === "table";

  const handleToggle = () => {
    onToggle(isTableView ? "cards" : "table");
  };

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div
        className={`flex items-center gap-2 transition-colors duration-200 ${
          !isTableView ? "text-white" : "text-gray-400"
        }`}
      >
        <Grid size={18} />
        <span className="text-sm font-medium">Cards</span>
      </div>
      <button
        onClick={handleToggle}
        className="relative inline-flex h-6 w-11 items-center rounded-full bg-white/20 backdrop-blur-sm border border-white/30 transition-colors duration-200 hover:bg-white/25 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-gray-900"
        role="switch"
        aria-checked={isTableView}
        aria-label={`Switch to ${isTableView ? "cards" : "table"} view`}
      >
        <span className="sr-only">Toggle view mode</span>
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-lg transition-transform duration-200 ease-in-out ${
            isTableView ? "translate-x-6" : "translate-x-1"
          }`}
        />
      </button>
      <div
        className={`flex items-center gap-2 transition-colors duration-200 ${
          isTableView ? "text-white" : "text-gray-400"
        }`}
      >
        <Table size={18} />
        <span className="text-sm font-medium">Table</span>
      </div>
    </div>
  );
};

export default ViewToggle;
