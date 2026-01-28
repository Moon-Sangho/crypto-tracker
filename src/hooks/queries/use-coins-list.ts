import { useSuspenseQuery } from "@tanstack/react-query";
import { coingeckoAPI } from "@/api/coingecko";
import { queryKeys } from "./query-keys";

export const useCoinsList = (page = 1) => {
  return useSuspenseQuery({
    queryKey: queryKeys.coins.list(page),
    queryFn: () => coingeckoAPI.getMarketList(page),
    staleTime: 1000 * 60, // 1 minute
    gcTime: 1000 * 60 * 5, // 5 minutes
  });
};
