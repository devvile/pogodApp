import { Search } from 'lucide-react';
import type { FormEvent } from 'react';

interface SearchFormProps {
  searchCity: string;
  setSearchCity: (city: string) => void;
  onSearch: (e: FormEvent<HTMLFormElement>) => void;
}

function SearchForm({ searchCity, setSearchCity, onSearch }: SearchFormProps) {
  return (
    <div className="mb-8">
      <form onSubmit={onSearch} className="relative">
          <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-2 shadow-2xl">
            <div className="flex items-center">
              <Search className="ml-6 text-slate-300" size={24} />
              <input
                type="text"
                value={searchCity}
                onChange={(e) => setSearchCity(e.target.value)}
                placeholder="Enter city name (e.g., New York, London, Tokyo)"
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

export default SearchForm;