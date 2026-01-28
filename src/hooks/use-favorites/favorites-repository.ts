import type { FavoriteCoins } from "@/types/coin";

export const favoritesRepository = {
  FAVORITES_KEY: "cryptocurrency_favorites" as const,

  /**
   * Get all favorite coins from localStorage
   */
  getFavorites(): FavoriteCoins {
    try {
      const stored = localStorage.getItem(this.FAVORITES_KEY);
      return stored ? JSON.parse(stored) : {};
    } catch {
      console.error("Failed to parse favorites from localStorage");
      return {};
    }
  },

  /**
   * Add a coin to favorites
   */
  addFavorite(coinId: string): FavoriteCoins {
    const favorites = this.getFavorites();
    favorites[coinId] = true;
    localStorage.setItem(this.FAVORITES_KEY, JSON.stringify(favorites));
    return favorites;
  },

  /**
   * Remove a coin from favorites
   */
  removeFavorite(coinId: string): FavoriteCoins {
    const favorites = this.getFavorites();
    delete favorites[coinId];
    localStorage.setItem(this.FAVORITES_KEY, JSON.stringify(favorites));
    return favorites;
  },

  /**
   * Check if a coin is in favorites
   */
  isFavorite(coinId: string): boolean {
    const favorites = this.getFavorites();
    return favorites[coinId] === true;
  },

  /**
   * Toggle favorite status of a coin
   */
  toggleFavorite(coinId: string): boolean {
    const isFav = this.isFavorite(coinId);
    if (isFav) {
      this.removeFavorite(coinId);
      return false;
    } else {
      this.addFavorite(coinId);
      return true;
    }
  },

  /**
   * Clear all favorites
   */
  clearFavorites(): void {
    localStorage.removeItem(this.FAVORITES_KEY);
  },
};
