import { Search } from "lucide-react";
import { forwardRef } from "react";
import type { ForwardedRef } from "react";

interface SearchInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
  placeholder: string;
  variant: "primary" | "secondary";
  hasError?: boolean;
}

export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  (
    { value, onChange, onKeyDown, placeholder, variant },
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    if (variant === "primary") {
      return (
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center bg-white/2 backdrop-blur-md border border-white/20 rounded-xl sm:rounded-2xl overflow-hidden">
          <div className="flex items-center flex-1 min-w-0">
            <Search
              className="ml-4 sm:ml-6 text-slate-300 flex-shrink-0"
              size={20}
            />
            <input
              ref={ref}
              type="text"
              value={value}
              onChange={onChange}
              onKeyDown={onKeyDown}
              placeholder={placeholder}
              className="flex-1 px-3 sm:px-6 py-4 bg-transparent text-white placeholder-slate-400 text-base sm:text-lg focus:outline-none min-w-0"
              autoComplete="off"
            />
          </div>

          <button
            type="submit"
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-6 sm:px-8 py-3 sm:py-4 font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl
                     // Mobile specific styles
                     mx-2 mb-2 rounded-lg sm:mx-0 sm:mb-0 sm:rounded-none
                     // Desktop styles
                     sm:rounded-r-xl"
          >
            Search
          </button>
        </div>
      );
    }

    return (
      <div className="relative">
        <Search
          className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
          size={20}
        />
        <input
          ref={ref}
          type="text"
          value={value}
          onChange={onChange}
          onKeyDown={onKeyDown}
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
    );
  }
);
