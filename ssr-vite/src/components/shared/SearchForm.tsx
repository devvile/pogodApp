import type { FormEvent } from 'react';
import { useSearchForm } from '@/hooks/useSearchForm';
import { SearchInput } from '../ui/SearchInput';
import  SuggestionsDropdown  from './SuggestionsDropdown';
import { ValidationErrors } from '../ValidationErrors';

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
  const {
    isOpen,
    selectedIndex,
    searchRef,
    inputRef,
    suggestions,
    isLoading,
    validation,
    showValidation,
    handleInputChange,
    handleSuggestionClick,
    handleKeyDown,
    handleFormSubmit,
  } = useSearchForm({ searchCity, setSearchCity, onSearch });

  const containerClass = variant === 'primary' 
    ? `mb-8 ${className}`
    : `max-w-md mx-auto mb-8 ${className}`;

  const formContainerClass = variant === 'primary'
    ? "relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-2 shadow-2xl"
    : "relative";

  return (
    <div className={containerClass} ref={searchRef}>
      <form onSubmit={handleFormSubmit} className="relative">
        <div className={formContainerClass}>
          <SearchInput
            ref={inputRef}
            value={searchCity}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            variant={variant}
            hasError={showValidation && !validation.isValid}
          />
        </div>
        <SuggestionsDropdown
          isOpen={isOpen}
          isLoading={isLoading}
          suggestions={suggestions}
          selectedIndex={selectedIndex}
          onSuggestionClick={handleSuggestionClick}
        />
        <ValidationErrors 
          errors={validation.errors} 
          show={showValidation && !validation.isValid} 
        />
      </form>
    </div>
  );
}

export default SearchForm;