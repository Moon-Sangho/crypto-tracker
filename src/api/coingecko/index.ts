import { apiClient } from "../axios-instance";
import type { Coin, SearchResponse, ChartData } from "@/types/coin";
import { transformCoinDetailResponse } from "./utils";

const MARKET_CHART_DAYS = 365;

export const coingeckoAPI = {
  /**
   * Get top 50 cryptocurrencies by market cap
   */
  async getMarketList(page = 1) {
    const response = await apiClient.get<Coin[]>("/coins/markets", {
      params: {
        vs_currency: "usd",
        order: "market_cap_desc",
        per_page: 50,
        page,
        sparkline: false,
      },
    });
    return response.data;
  },

  /**
   * Search for cryptocurrencies
   */
  async searchCoins(query: string) {
    const response = await apiClient.get<SearchResponse>("/search", {
      params: {
        query,
      },
    });
    return response.data;
  },

  /**
   * Get detailed information about a specific coin
   */
  async getCoinDetail(coinId: string) {
    const response = await apiClient.get(`/coins/${coinId}`, {
      params: {
        localization: false,
        tickers: false,
        market_data: true,
        community_data: false,
        developer_data: false,
      },
    });
    return transformCoinDetailResponse(response.data);
  },

  /**
   * Get historical price data for a coin
   */
  async getCoinChart(coinId: string, days = MARKET_CHART_DAYS) {
    const response = await apiClient.get<ChartData>(
      `/coins/${coinId}/market_chart`,
      {
        params: {
          vs_currency: "usd",
          days,
        },
      },
    );
    return response.data;
  },

  /**
   * Get current price of coins
   */
  async getCoinsPrice(ids: string[]) {
    const response = await apiClient.get<Record<string, { usd: number }>>(
      "/simple/price",
      {
        params: {
          ids: ids.join(","),
          vs_currencies: "usd",
        },
      },
    );
    return response.data;
  },
};
