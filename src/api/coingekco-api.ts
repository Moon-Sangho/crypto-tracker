import { createApiClient } from "./create-api-client";

const API_BASE_URL = "https://api.coingecko.com/api/v3";

export const coingeckoApi = createApiClient({
  baseURL: API_BASE_URL,
  interceptors: {
    response: {
      onFulfilled: (response) => response,
      onRejected: (error) => {
        if (error.response?.status === 429) {
          console.warn("Rate limited by CoinGecko API");
        }
        return Promise.reject(error);
      },
    },
  },
});
