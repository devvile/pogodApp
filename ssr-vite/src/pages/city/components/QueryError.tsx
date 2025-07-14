import BackButton from "@/components/ui/BackButton";

interface QueryErrorProps {
  error: string | null | Error;
  onTryAgain: () => void;
}

const QueryError = ({ error, onTryAgain }: QueryErrorProps) => {
  // Convert error to string for display
  const getErrorMessage = (error: string | null | Error): string => {
    if (!error) return 'An unknown error occurred';
    if (typeof error === 'string') return error;
    if (error instanceof Error) return error.message;
    return 'An unexpected error occurred';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900 flex items-center justify-center">
      <div className="text-center text-white max-w-md">
        <h2 className="text-2xl font-bold mb-4">Weather data unavailable</h2>
        <p className="text-slate-300 mb-6">{getErrorMessage(error)}</p>
        <div className="flex gap-4 justify-center">
          <button
            onClick={() => onTryAgain()}
            className="bg-purple-800 hover:bg-purple-600 text-white px-6 py-2 rounded-lg transition-colors"
          >
            Try Again
          </button>
          <BackButton variant="outlined" action="home" className="mb-0" />
        </div>
      </div>
    </div>
  );
};

export default QueryError;