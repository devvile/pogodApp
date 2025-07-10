import { Search } from 'lucide-react';
import type { FormEvent } from 'react';

interface SearchFormProps {
  searchCity: string;
  setSearchCity: (city: string) => void;
  onSearch: (e: FormEvent<HTMLFormElement>) => void;
  variant?: 'primary' | 'secondary';
  placeholder?: string;
  className?: string;
}

function SearchForm({ 
  searchCity, 
  setSearchCity, 
  onSearch, 
  variant = 'primary',
  placeholder = "Enter city name (e.g., New York, London, Tokyo)",
  className = ""
}: SearchFormProps) {
  
  // Primary variant (for HomePage)
  if (variant === 'primary') {
    return (
      <div className={`mb-8 ${className}`}>
        <form onSubmit={onSearch} className="relative">
          <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-2 shadow-2xl">
            <div className="flex items-center">
              <Search className="ml-6 text-slate-300" size={24} />
              <input
                type="text"
                value={searchCity}
                onChange={(e) => setSearchCity(e.target.value)}
                placeholder={placeholder}
                className="flex-1 px-6 py-4 bg-transparent text-white placeholder-slate-400 text-lg focus:outline-none"
              />
              <button
                type="submit"
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Search
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }

  // Secondary variant (for CityPage)
  return (
    <form onSubmit={onSearch} className={`max-w-md mx-auto mb-8 ${className}`}>
      <div className="relative">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        <input
          type="text"
          value={searchCity}
          onChange={(e) => setSearchCity(e.target.value)}
          placeholder={placeholder}
          className="w-full pl-12 pr-4 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300"
        />
        <button
          type="submit"
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors duration-200"
        >
          Search
        </button>
      </div>
    </form>
  );
}

export default SearchForm;