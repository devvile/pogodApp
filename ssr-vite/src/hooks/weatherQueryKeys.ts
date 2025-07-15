export const weatherQueryKeys = {
  all: ['weather'] as const,
  complete: (city: string) => ['weather', 'complete', city.toLowerCase()] as const,
  forecast: (city: string) => ['weather', 'forecast', city.toLowerCase()] as const,
  comparison: (cities: string[]) => ['weather', 'comparison', cities.map(c => c.toLowerCase()).sort()] as const,
};