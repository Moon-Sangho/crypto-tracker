/**
 * Query key factory for React Query
 * Centralizes all query key definitions for consistency and type safety
 */
export const queryKeys = {
  coins: {
    all: ["coins"] as const,
    lists: () => [...queryKeys.coins.all, "list"] as const,
    list: (page: number = 1) =>
      [...queryKeys.coins.lists(), { page }] as const,
    details: () => [...queryKeys.coins.all, "detail"] as const,
    detail: (id: string) => [...queryKeys.coins.details(), id] as const,
    charts: () => [...queryKeys.coins.all, "chart"] as const,
    chart: (id: string, days: number = 365) =>
      [...queryKeys.coins.charts(), id, days] as const,
    search: () => [...queryKeys.coins.all, "search"] as const,
    searches: (query: string) =>
      [...queryKeys.coins.search(), query] as const,
  },
} as const;
