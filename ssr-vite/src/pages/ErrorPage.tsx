import { AlertTriangle, RefreshCw } from 'lucide-react';
import BackButton from '../components/ui/BackButton';

function ErrorPage() {
  const handleRetry = () => {
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900 flex items-center justify-center px-4">
      <div className="text-center max-w-2xl mx-auto">
        {/* Error Icon */}
        <div className="mb-2">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-900 to-purple-900 rounded-full mb-6 shadow-2xl">
            <AlertTriangle className="text-white" size={40} />
          </div>
        </div>
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-white mb-4">
            Something Went Wrong
          </h2>
          <p className="text-xl text-slate-300 mb-6 max-w-lg mx-auto leading-relaxed">
           Unexpected Error occured please try again...
          </p>
        </div>
        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <button
            onClick={handleRetry}
            className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-900 to-purple-900 hover:from-purple-800 hover:to-purple-900 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
          >
            <RefreshCw size={20} />
            Try Again
          </button>
          <BackButton 
            variant="outlined" 
            action="home" 
            className="mb-0"
          />
        </div>
      </div>
    </div>
  );
}

export default ErrorPage;