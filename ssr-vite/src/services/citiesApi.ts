import { API_KEY } from "@/const/config";
import { CITIES_OPTIONS_URL } from "@/const/config";
import type { CitySearchResponse, CitySearchResult } from "@/types/weather";

export const fetchCitiesSuggestions = async (
  query: string
): Promise<CitySearchResponse> => {
  if (!query || query.trim().length < 3) {
    return [];
  }
  try {
    const response = await fetch(
      `${CITIES_OPTIONS_URL}q=${encodeURIComponent(
        query
      )}&limit=4&appid=${API_KEY}`
    );
    if (!response.ok) {
      throw new Error(
        `Failed to fetch city suggestions: ${response.statusText}`
      );
    }
    const data: CitySearchResult[] = await response.json();
    const uniqueCities = data.filter(
      (city, index, self) =>
        city.name &&
        self.findIndex(
          (c) => c.name === city.name && c.country === city.country
        ) === index
    );

    return uniqueCities;
  } catch (error) {
    console.error("Error fetching city suggestions:", error);
    return [];
  }
};
