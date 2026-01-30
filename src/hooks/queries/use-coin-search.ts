import { useSuspenseQuery } from "@tanstack/react-query";
import { coingeckoApi } from "@/api/coingekco-api";
import type { SearchResponse } from "@/types/coin";
import { queryKeys } from "./query-keys";

/**
 * Search for cryptocurrencies
 */
export const searchCoins = async (query: string) =>
  (
    await coingeckoApi.get<SearchResponse>("/search", {
      params: {
        query,
      },
    })
  ).data;

export const useCoinSearch = (query: string) =>
  useSuspenseQuery({
    queryKey: queryKeys.coins.searches(query),
    queryFn: () => searchCoins(query),
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 10, // 10 minutes
  });
