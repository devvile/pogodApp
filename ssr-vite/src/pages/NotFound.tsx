import { CloudOff } from 'lucide-react';
import BackButton from '../components/ui/BackButton';

function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900 flex items-center justify-center px-4">
      <div className="text-center max-w-2xl mx-auto">
        {/* Weather Icon */}
        <div className="mb-2">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-6 shadow-2xl">
          <CloudOff className="text-white" size={40} />
        </div>
        </div>
        <div className="mb-8">
          <h1 className="text-8xl font-bold text-white mb-4 leading-tight">
            4
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">0</span>
            4
          </h1>       
          <h2 className="text-3xl font-bold text-white mb-4">
            Weather Forecast Not Found
          </h2>
          <p className="text-xl text-slate-300 mb-6 max-w-lg mx-auto leading-relaxed">
            Looks like this location has drifted off our weather map. The page you're looking for doesn't exist.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <BackButton 
            variant="outlined" 
            action="back" 
            className="mb-0"
          />
          
          <BackButton 
            variant="filled" 
            action="home" 
            className="mb-0"
          />
        </div>
      </div>
    </div>
  );
}

export default NotFound;