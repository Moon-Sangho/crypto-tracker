import axios from "axios";

const API_BASE_URL = "https://api.coingecko.com/api/v3";

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

// Add response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 429) {
      console.warn("Rate limited by CoinGecko API");
    }
    return Promise.reject(error);
  }
);
