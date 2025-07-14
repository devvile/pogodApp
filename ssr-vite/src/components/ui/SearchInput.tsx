import { Search } from 'lucide-react';
import { forwardRef } from 'react';

interface SearchInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
  placeholder: string;
  variant: 'primary' | 'secondary';
  hasError?: boolean;
}

export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  ({ value, onChange, onKeyDown, placeholder, variant, hasError = false }, ref) => {
    if (variant === 'primary') {
      return (
        <div className="flex items-center">
          <Search className="ml-6 text-slate-300" size={24} />
          <input
            ref={ref}
            type="text"
            value={value}
            onChange={onChange}
            onKeyDown={onKeyDown}
            placeholder={placeholder}
            className={`flex-1 px-6 py-4 bg-transparent text-white placeholder-slate-400 text-lg focus:outline-none ${
              hasError ? 'border-red-500' : ''
            }`}
            autoComplete="off"
          />
          <button
            type="submit"
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            Search
          </button>
        </div>
      );
    }

    return (
      <div className="relative">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        <input
          ref={ref}
          type="text"
          value={value}
          onChange={onChange}
          onKeyDown={onKeyDown}
          placeholder={placeholder}
          className={`w-full pl-12 pr-4 py-3 bg-white/10 backdrop-blur-md border rounded-xl text-white placeholder-gray-300 focus:outline-none transition-all duration-300 ${
            hasError 
              ? 'border-red-500 focus:ring-2 focus:ring-red-400' 
              : 'border-white/20 focus:ring-2 focus:ring-blue-400 focus:border-transparent'
          }`}
          autoComplete="off"
        />
        <button
          type="submit"
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors duration-200"
        >
          Search
        </button>
      </div>
    );
  }
);