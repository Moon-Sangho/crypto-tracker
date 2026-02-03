import { http, HttpResponse } from "msw";
import type { SearchResponse, ChartData } from "../types/coin";
import { COINGECKO_API_BASE_URL } from "@/api/coingekco-api";
import coins from "./response/coins.json";
import coinDetail from "./response/coin-detail.json";

export const handlers = [
  http.get(`${COINGECKO_API_BASE_URL}/coins/markets`, () => {
    return HttpResponse.json(coins);
  }),

  http.get(`${COINGECKO_API_BASE_URL}/search`, ({ request }) => {
    const url = new URL(request.url);
    const query = url.searchParams.get("query")?.toLowerCase() || "";

    const filtered = coins
      .filter(
        (coin) =>
          coin.name.toLowerCase().includes(query) ||
          coin.symbol.toLowerCase().includes(query),
      )
      .map((coin) => ({
        id: coin.id,
        name: coin.name,
        symbol: coin.symbol,
        market_cap_rank: coin.market_cap_rank,
        thumb: coin.image,
        small: coin.image,
        large: coin.image,
      }));

    const response: SearchResponse = {
      coins: filtered,
      exchanges: [],
      icos: [],
      categories: [],
      nfts: [],
    };

    return HttpResponse.json(response);
  }),

  http.get(`${COINGECKO_API_BASE_URL}/coins/:coinId`, ({ params }) => {
    const coin = coins.find((c) => c.id === params.coinId);

    if (!coin) {
      return HttpResponse.json(
        { status: { error_code: 1006, error_message: "coin not found" } },
        { status: 404 },
      );
    }

    // Return CoinDetail structure with data based on coinId
    const detailData = {
      ...coinDetail,
      id: coin.id,
      symbol: coin.symbol,
      name: coin.name,
      image: {
        large: coin.image,
        small: coin.image,
        thumb: coin.image,
      },
      current_price: coin.current_price,
      market_cap: coin.market_cap,
      high_24h: coin.high_24h,
      low_24h: coin.low_24h,
      ath: coin.ath,
      atl: coin.atl,
      market_cap_rank: coin.market_cap_rank,
    };

    return HttpResponse.json(detailData);
  }),

  http.get(`${COINGECKO_API_BASE_URL}/coins/:coinId/market_chart`, () => {
    const chartData: ChartData = {
      prices: Array.from({ length: 365 }, (_, i) => [
        new Date(2023, 0, 1 + i).getTime(),
        30000 + Math.sin(i / 50) * 5000 + Math.random() * 2000,
      ]),
      market_caps: [],
      volumes: [],
    };

    return HttpResponse.json(chartData);
  }),
];
