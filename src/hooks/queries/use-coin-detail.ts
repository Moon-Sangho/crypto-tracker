import { useSuspenseQuery } from "@tanstack/react-query";
import { coingeckoAPI } from "@/api/coingecko";
import { queryKeys } from "./query-keys";

export const useCoinDetail = (coinId: string) => {
  return useSuspenseQuery({
    queryKey: queryKeys.coins.detail(coinId),
    queryFn: () => coingeckoAPI.getCoinDetail(coinId),
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 15, // 15 minutes
  });
};
