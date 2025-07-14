import { ArrowUp, ArrowDown, Minus } from 'lucide-react';

const ComparisonLegend = () => {
  return (
    <div className="mt-4 text-center">
      <div className="flex items-center justify-center gap-6 text-sm text-gray-300">
        <div className="flex items-center gap-2">
          <ArrowUp size={14} className="text-red-400" />
          <span>Higher than baseline</span>
        </div>
        <div className="flex items-center gap-2">
          <ArrowDown size={14} className="text-blue-400" />
          <span>Lower than baseline</span>
        </div>
        <div className="flex items-center gap-2">
          <Minus size={14} className="text-gray-300" />
          <span>Same as baseline</span>
        </div>
      </div>
    </div>
  );
};

export default ComparisonLegend;