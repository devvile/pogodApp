// components/SearchForm.tsx
import { Search, MapPin, Loader2 } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import type { FormEvent } from 'react';
import { useCitySearch } from '../hooks/useCitySearch';

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
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Use the city search hook
  const { suggestions, isLoading, searchCities } = useCitySearch();

  // Handle input changes and trigger search
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchCity(value);
    setSelectedIndex(-1);
    
    if (value.trim().length >= 2) {
      searchCities(value.trim());
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  };

  // Handle suggestion selection
  const handleSuggestionClick = (suggestion: any) => {
    const cityName = `${suggestion.name}, ${suggestion.country}`;
    setSearchCity(cityName);
    setIsOpen(false);
    inputRef.current?.focus();
  };

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen || suggestions.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < suggestions.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0 && suggestions[selectedIndex]) {
          handleSuggestionClick(suggestions[selectedIndex]);
        } else {
          onSearch(e as any);
        }
        break;
      case 'Escape':
        setIsOpen(false);
        setSelectedIndex(-1);
        break;
    }
  };

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Suggestions dropdown component
  const SuggestionsDropdown = () => {
    if (!isOpen || (!isLoading && suggestions.length === 0)) return null;

    return (
      <div className="absolute top-full left-0 right-0 z-50 mt-1 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl shadow-2xl max-h-60 overflow-y-auto">
        {isLoading ? (
          <div className="p-4 text-center text-white">
            <Loader2 className="h-4 w-4 animate-spin mx-auto mb-2" />
            <span className="text-sm">Searching cities...</span>
          </div>
        ) : (
          suggestions.map((suggestion, index) => (
            <div
              key={`${suggestion.name}-${suggestion.country}-${suggestion.lat}-${suggestion.lon}`}
              className={`p-3 cursor-pointer border-b border-white/10 last:border-b-0 transition-colors ${
                index === selectedIndex 
                  ? 'bg-white/20 text-white' 
                  : 'text-slate-300 hover:bg-white/10 hover:text-white'
              }`}
              onClick={() => handleSuggestionClick(suggestion)}
            >
              <div className="flex items-center gap-2">
                <MapPin size={16} className="text-blue-400 flex-shrink-0" />
                <div>
                  <div className="font-medium">
                    {suggestion.name}
                  </div>
                  <div className="text-xs text-slate-400">
                    {suggestion.state ? `${suggestion.state}, ` : ''}{suggestion.country}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    );
  };

  // Primary variant (for HomePage)
  if (variant === 'primary') {
    return (
      <div className={`mb-8 ${className}`} ref={searchRef}>
        <form onSubmit={onSearch} className="relative">
          <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-2 shadow-2xl">
            <div className="flex items-center">
              <Search className="ml-6 text-slate-300" size={24} />
              <input
                ref={inputRef}
                type="text"
                value={searchCity}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                placeholder={placeholder}
                className="flex-1 px-6 py-4 bg-transparent text-white placeholder-slate-400 text-lg focus:outline-none"
                autoComplete="off"
              />
              <button
                type="submit"
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Search
              </button>
            </div>
          </div>
          <SuggestionsDropdown />
        </form>
      </div>
    );
  }

  // Secondary variant (for CityPage)
  return (
    <div className={`max-w-md mx-auto mb-8 ${className}`} ref={searchRef}>
      <form onSubmit={onSearch} className="relative">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            ref={inputRef}
            type="text"
            value={searchCity}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            className="w-full pl-12 pr-4 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300"
            autoComplete="off"
          />
          <button
            type="submit"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors duration-200"
          >
            Search
          </button>
        </div>
        <SuggestionsDropdown />
      </form>
    </div>
  );
}

export default SearchForm;