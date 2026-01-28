import { useSuspenseQuery } from "@tanstack/react-query";
import { coingeckoAPI } from "@/api/coingecko";
import { queryKeys } from "./query-keys";

export const useCoinSearch = (query: string) => {
  return useSuspenseQuery({
    queryKey: queryKeys.coins.searches(query),
    queryFn: () => coingeckoAPI.searchCoins(query),
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 10, // 10 minutes
  });
};
