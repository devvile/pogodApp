import { Cloud } from 'lucide-react';

function WelcomeSection() {
  return (
    <div className="text-center mb-12">
      <div className="mb-8">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-6 shadow-2xl">
          <Cloud className="text-white" size={40} />
        </div>
      </div>
      
      <h1 className="text-6xl font-bold text-white mb-4 leading-tight">
        Pogod
        <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">App</span>
      </h1>
      
      <p className="text-xl text-slate-300 mb-2 max-w-lg mx-auto leading-relaxed">
        Discover real-time weather conditions and forecasts
      </p>
      
      <p className="text-slate-400 mb-12">
        Start by searching for any city to get detailed weather information
      </p>
    </div>
  );
}

export default WelcomeSection;