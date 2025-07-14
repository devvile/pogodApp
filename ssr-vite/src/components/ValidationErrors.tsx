import { AlertCircle } from 'lucide-react';

interface ValidationErrorsProps {
  errors: string[];
  show: boolean;
}

export const ValidationErrors = ({ errors, show }: ValidationErrorsProps) => {
  if (!show || errors.length === 0) return null;

  return (
    <div className="mt-2 p-3 bg-red-500/10 border border-red-500/20 rounded-lg backdrop-blur-sm">
      <div className="flex items-start gap-2">
        <AlertCircle className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
        <div className="text-sm">
          {errors.length === 1 ? (
            <p className="text-red-300">{errors[0]}</p>
          ) : (
            <ul className="space-y-1">
              {errors.map((error, index) => (
                <li key={index} className="text-red-300">
                  {error}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};