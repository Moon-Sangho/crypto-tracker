import { useSuspenseQuery } from "@tanstack/react-query";
import { coingeckoApi } from "@/api/coingekco-api";
import type { ChartData } from "@/types/coin";
import { queryKeys } from "./query-keys";

const MARKET_CHART_DAYS = 365;

/**
 * Get historical price data for a coin
 */
export const getCoinChart = async (coinId: string, days = MARKET_CHART_DAYS) =>
  (
    await coingeckoApi.get<ChartData>(`/coins/${coinId}/market_chart`, {
      params: {
        vs_currency: "usd",
        days,
      },
    })
  ).data;

export const useCoinChart = (coinId: string, days = MARKET_CHART_DAYS) =>
  useSuspenseQuery({
    queryKey: queryKeys.coins.chart(coinId, days),
    queryFn: () => getCoinChart(coinId, days),
    staleTime: 1000 * 60 * 30, // 30 minutes
    gcTime: 1000 * 60 * 60, // 1 hour
  });
