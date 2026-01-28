import { useSuspenseQuery } from "@tanstack/react-query";
import { coingeckoAPI } from "@/api/coingecko";
import { queryKeys } from "./query-keys";

export const useCoinChart = (coinId: string, days = 365) => {
  return useSuspenseQuery({
    queryKey: queryKeys.coins.chart(coinId, days),
    queryFn: () => coingeckoAPI.getCoinChart(coinId, days),
    staleTime: 1000 * 60 * 30, // 30 minutes
    gcTime: 1000 * 60 * 60, // 1 hour
  });
};
