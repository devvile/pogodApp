import { useState, useEffect, useRef } from 'react';
import type { FormEvent } from 'react';
import { useCitySearch } from '@/hooks/useCitySearch';

interface UseSearchFormOptions {
 // searchCity: string;
  setSearchCity: (city: string) => void;
  onSearch: (e: FormEvent<HTMLFormElement>) => void;
}

export const useSearchForm = ({ setSearchCity, onSearch }: UseSearchFormOptions) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const { suggestions, isLoading, searchCities } = useCitySearch();

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

  const handleSuggestionClick = (suggestion: any) => {
    const cityName = `${suggestion.name}, ${suggestion.country}`;
    setSearchCity(cityName);
    setIsOpen(false);
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

  return {
    isOpen,
    selectedIndex,
    searchRef,
    inputRef,
    suggestions,
    isLoading,
    handleInputChange,
    handleSuggestionClick,
    handleKeyDown,
  };
};