export const weatherQueryKeys = {
    all: ['weather'] as const,
    current: (city: string) => ['weather', 'current', city.toLowerCase()] as const,
    comparison: (cities: string[]) => ['weather', 'comparison', cities.map(c => c.toLowerCase()).sort()] as const,
    complete: (city: string) => ['weather', 'complete', city.toLowerCase()] as const,
  };