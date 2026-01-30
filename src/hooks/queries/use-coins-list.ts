import { useSuspenseQuery } from "@tanstack/react-query";
import { coingeckoApi } from "@/api/coingekco-api";
import type { Coin } from "@/types/coin";
import { queryKeys } from "./query-keys";

/**
 * Fetch top 50 cryptocurrencies by market cap
 */
export const getMarketList = async (page = 1) =>
  (
    await coingeckoApi.get<Coin[]>("/coins/markets", {
      params: {
        vs_currency: "usd",
        order: "market_cap_desc",
        per_page: 50,
        page,
        sparkline: false,
      },
    })
  ).data;

export const useCoinsList = (page = 1) =>
  useSuspenseQuery({
    queryKey: queryKeys.coins.list(page),
    queryFn: () => getMarketList(page),
    staleTime: 1000 * 60, // 1 minute
    gcTime: 1000 * 60 * 5, // 5 minutes
  });
