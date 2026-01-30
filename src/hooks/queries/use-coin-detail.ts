import { useSuspenseQuery } from "@tanstack/react-query";
import { coingeckoApi } from "@/api/coingekco-api";
import type { CoinDetail, CoinGeckoDetail } from "@/types/coin";
import { queryKeys } from "./query-keys";

/**
 * Transform CoinGecko API response to application CoinDetail type
 */
export const transformCoinDetailResponse = (
  data: CoinGeckoDetail,
): CoinDetail => {
  return {
    id: data.id,
    symbol: data.symbol,
    name: data.name,
    image: data.image?.large || data.image?.small || "",
    current_price: data.market_data?.current_price?.usd ?? 0,
    market_cap: data.market_data?.market_cap?.usd ?? null,
    market_cap_rank: data.market_cap_rank ?? null,
    fully_diluted_valuation:
      data.market_data?.fully_diluted_valuation?.usd ?? null,
    total_volume: data.market_data?.total_volume?.usd ?? null,
    high_24h: data.market_data?.high_24h?.usd ?? null,
    low_24h: data.market_data?.low_24h?.usd ?? null,
    price_change_24h: data.market_data?.price_change_24h ?? null,
    price_change_percentage_24h:
      data.market_data?.price_change_percentage_24h ?? null,
    market_cap_change_24h: data.market_data?.market_cap_change_24h?.usd ?? null,
    market_cap_change_percentage_24h:
      data.market_data?.market_cap_change_percentage_24h ?? null,
    circulating_supply: data.market_data?.circulating_supply ?? null,
    total_supply: data.market_data?.total_supply ?? null,
    max_supply: data.market_data?.max_supply ?? null,
    ath: data.market_data?.ath?.usd ?? null,
    atl: data.market_data?.atl?.usd ?? null,
    ath_change_percentage: data.market_data?.ath_change_percentage?.usd ?? null,
    atl_change_percentage: data.market_data?.atl_change_percentage?.usd ?? null,
    ath_date: data.market_data?.ath_date?.usd ?? null,
    atl_date: data.market_data?.atl_date?.usd ?? null,
    roi: data.roi ?? null,
    last_updated: data.last_updated ?? "",
    description: {
      en: data.description?.en ?? "",
    },
    links: (data.links as CoinDetail["links"]) || {
      homepage: [],
      blockchain_site: [],
      official_forum_url: [],
      chat_url: [],
      announcement_url: [],
      twitter_screen_name: "",
      facebook_username: "",
      bitcointalk_thread_id: null,
      telegram_channel_identifier: "",
      subreddit_url: "",
      repos_url: {
        github: [],
        bitbucket: [],
      },
    },
    categories: data.categories || [],
    sentiment_votes_up_percentage: data.sentiment_votes_up_percentage ?? null,
    sentiment_votes_down_percentage:
      data.sentiment_votes_down_percentage ?? null,
  };
};

/**
 * Get detailed information about a specific coin
 */
export const getCoinDetail = async (coinId: string) => {
  const response = await coingeckoApi.get(`/coins/${coinId}`, {
    params: {
      localization: false,
      tickers: false,
      market_data: true,
      community_data: false,
      developer_data: false,
    },
  });
  return transformCoinDetailResponse(response.data);
};

export const useCoinDetail = (coinId: string) =>
  useSuspenseQuery({
    queryKey: queryKeys.coins.detail(coinId),
    queryFn: () => getCoinDetail(coinId),
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 15, // 15 minutes
  });
