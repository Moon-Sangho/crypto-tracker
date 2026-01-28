import { useState, useCallback, useEffect } from "react";
import { favoritesRepository } from "@/hooks/use-favorites/favorites-repository";
import type { FavoriteCoins } from "@/types/coin";

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<FavoriteCoins>(() =>
    favoritesRepository.getFavorites(),
  );

  // Sync with localStorage changes (e.g., from other tabs)
  useEffect(() => {
    const handleStorageChange = () => {
      setFavorites(favoritesRepository.getFavorites());
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const addToFavorites = useCallback((coinId: string) => {
    const updated = favoritesRepository.addFavorite(coinId);
    setFavorites(updated);
  }, []);

  const removeFromFavorites = useCallback((coinId: string) => {
    const updated = favoritesRepository.removeFavorite(coinId);
    setFavorites(updated);
  }, []);

  const isFavorite = useCallback((coinId: string) => {
    return favoritesRepository.isFavorite(coinId);
  }, []);

  const toggleFavorite = useCallback((coinId: string) => {
    const newState = favoritesRepository.toggleFavorite(coinId);
    setFavorites(favoritesRepository.getFavorites());
    return newState;
  }, []);

  return {
    favorites,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
    toggleFavorite,
    favoriteIds: Object.keys(favorites),
  };
};
