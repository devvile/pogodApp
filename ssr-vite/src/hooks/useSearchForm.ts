// hooks/useSearchForm.ts
import { useState, useEffect, useRef } from 'react';
import type { FormEvent } from 'react';
import { useCitySearch } from '@/hooks/useCitySearch';
import { validateSearchInput, sanitizeInput, type ValidationResult } from '@/utils/SearchValidations';

interface UseSearchFormOptions {
  searchCity: string;
  setSearchCity: (city: string) => void;
  onSearch: (e: FormEvent<HTMLFormElement>) => void;
}

export const useSearchForm = ({ searchCity, setSearchCity, onSearch }: UseSearchFormOptions) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [validation, setValidation] = useState<ValidationResult>({ isValid: true, errors: [] });
  const [showValidation, setShowValidation] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const { suggestions, isLoading, searchCities } = useCitySearch();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchCity(value);
    setSelectedIndex(-1);
    setShowValidation(false); // Hide validation while typing
    
    // Validate input
    const validationResult = validateSearchInput(value);
    setValidation(validationResult);
    
    // Only search if input is valid and has enough characters
    if (validationResult.isValid && value.trim().length >= 2) {
      searchCities(value.trim());
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  };

  const handleSuggestionClick = (suggestion: any) => {
    const cityName = `${suggestion.name}, ${suggestion.country}`;
    setSearchCity(cityName);
    setIsOpen(false);
    setShowValidation(false);
    setValidation({ isValid: true, errors: [] }); // Reset validation for suggestions
    inputRef.current?.focus();
  };

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
          const validationResult = validateSearchInput(searchCity);
          if (validationResult.isValid) {
            // Sanitize/trim input before submitting
            const sanitizedInput = sanitizeInput(searchCity);
            setSearchCity(sanitizedInput);
            onSearch(e as any);
          } else {
            setShowValidation(true);
          }
        }
        break;
      case 'Escape':
        setIsOpen(false);
        setSelectedIndex(-1);
        break;
    }
  };

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const validationResult = validateSearchInput(searchCity);
    if (validationResult.isValid) {
      const sanitizedInput = sanitizeInput(searchCity);
      setSearchCity(sanitizedInput);
      setShowValidation(false);
      onSearch(e);
    } else {
      setShowValidation(true);
      setValidation(validationResult);
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

  return {
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
  };
};