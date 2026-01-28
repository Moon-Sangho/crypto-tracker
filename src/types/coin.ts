export type Coin = {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number | null;
  market_cap_rank: number | null;
  fully_diluted_valuation: number | null;
  total_volume: number | null;
  high_24h: number | null;
  low_24h: number | null;
  price_change_24h: number | null;
  price_change_percentage_24h: number | null;
  market_cap_change_24h: number | null;
  market_cap_change_percentage_24h: number | null;
  circulating_supply: number | null;
  total_supply: number | null;
  max_supply: number | null;
  ath: number | null;
  atl: number | null;
  ath_change_percentage: number | null;
  atl_change_percentage: number | null;
  ath_date: string | null;
  atl_date: string | null;
  roi: {
    currency: string;
    percentage: number;
    times: number;
  } | null;
  last_updated: string;
};

export type CoinDetail = Coin & {
  description: {
    en: string;
  };
  links: {
    homepage: string[];
    blockchain_site: string[];
    official_forum_url: string[];
    chat_url: string[];
    announcement_url: string[];
    twitter_screen_name: string;
    facebook_username: string;
    bitcointalk_thread_id: number | null;
    telegram_channel_identifier: string;
    subreddit_url: string;
    repos_url: {
      github: string[];
      bitbucket: string[];
    };
  };
  categories: string[];
  sentiment_votes_up_percentage: number | null;
  sentiment_votes_down_percentage: number | null;
};

export type SearchResult = {
  id: string;
  name: string;
  symbol: string;
  market_cap_rank: number | null;
  thumb: string;
  small: string;
  large: string;
};

export type SearchResponse = {
  coins: SearchResult[];
  exchanges: unknown[];
  icos: unknown[];
  categories: unknown[];
  nfts: unknown[];
};

export type ChartData = {
  prices: Array<[number, number]>;
  market_caps: Array<[number, number]>;
  volumes: Array<[number, number]>;
};

export type FavoriteCoins = {
  [coinId: string]: boolean;
};

export type CoinGeckoDetail = {
  id: string;
  symbol: string;
  name: string;
  image?: {
    large?: string;
    small?: string;
    thumb?: string;
  };
  market_data?: {
    current_price?: Record<string, number | null>;
    market_cap?: Record<string, number | null>;
    market_cap_rank?: number | null;
    fully_diluted_valuation?: Record<string, number | null>;
    total_volume?: Record<string, number | null>;
    high_24h?: Record<string, number | null>;
    low_24h?: Record<string, number | null>;
    price_change_24h?: number | null;
    price_change_percentage_24h?: number | null;
    market_cap_change_24h?: Record<string, number | null>;
    market_cap_change_percentage_24h?: number | null;
    circulating_supply?: number | null;
    total_supply?: number | null;
    max_supply?: number | null;
    ath?: Record<string, number | null>;
    atl?: Record<string, number | null>;
    ath_change_percentage?: Record<string, number | null>;
    atl_change_percentage?: Record<string, number | null>;
    ath_date?: Record<string, string | null>;
    atl_date?: Record<string, string | null>;
  };
  market_cap_rank?: number | null;
  roi?: {
    times: number;
    currency: string;
    percentage: number;
  } | null;
  last_updated?: string;
  description?: {
    en?: string;
  };
  links?: Record<string, unknown>;
  categories?: string[];
  sentiment_votes_up_percentage?: number | null;
  sentiment_votes_down_percentage?: number | null;
};
