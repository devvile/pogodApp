import { useQuery } from "@tanstack/react-query";
import { useState, useCallback } from "react";
import { fetchCitiesSuggestions } from "@/services/citiesApi";

export const useCitySearch = () => {
    const [_searchQuery, setSearchQuery] = useState('');
    const [debouncedQuery, setDebouncedQuery] = useState('');
  
    // Debounced search to avoid too many API calls
    const searchCities = useCallback((query: string) => {
      setSearchQuery(query);
      const timeoutId = setTimeout(() => {
        setDebouncedQuery(query);
      }, 300); 
  
      return () => clearTimeout(timeoutId);
    }, []);
  
    const { 
      data: suggestions = [], 
      isLoading, 
      error 
    } = useQuery({
      queryKey: ['citySearch', debouncedQuery],
      queryFn: () => fetchCitiesSuggestions(debouncedQuery),
      enabled: debouncedQuery.trim().length >= 2,
      staleTime: 5 * 60 * 1000, // Cache for 5 minutes
      gcTime: 10 * 60 * 1000,   // Keep in cache for 10 minutes
      retry: 1, // Only retry once for city search
    });
  
    return {
      suggestions,
      isLoading,
      error,
      searchCities,
    };
  };