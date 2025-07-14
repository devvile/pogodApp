import { MapPin, Loader2 } from 'lucide-react';

interface Suggestion {
    name: string;
    country: string;
    state?: string;
    lat: number;
    lon: number;
  }
  
  interface SuggestionsDropdownProps {
    isOpen: boolean;
    isLoading: boolean;
    suggestions: Suggestion[];
    selectedIndex: number;
    onSuggestionClick: (suggestion: Suggestion) => void;
  }

const SuggestionsDropdown=({isOpen,isLoading,suggestions,selectedIndex,onSuggestionClick}:SuggestionsDropdownProps)=>{
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
              onClick={() => onSuggestionClick(suggestion)}
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

export default SuggestionsDropdown;