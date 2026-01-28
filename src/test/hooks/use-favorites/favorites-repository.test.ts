import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { favoritesRepository } from "@/hooks/use-favorites/favorites-repository";

describe("Storage utilities", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
  });

  describe("getFavorites", () => {
    it("should return empty object when no favorites exist", () => {
      expect(favoritesRepository.getFavorites()).toEqual({});
    });

    it("should retrieve saved favorites", () => {
      favoritesRepository.addFavorite("bitcoin");
      favoritesRepository.addFavorite("ethereum");
      expect(favoritesRepository.getFavorites()).toEqual({
        bitcoin: true,
        ethereum: true,
      });
    });

    it("should return empty object on localStorage error", () => {
      localStorage.setItem("cryptocurrency_favorites", "invalid json");
      expect(favoritesRepository.getFavorites()).toEqual({});
    });
  });

  describe("addFavorite", () => {
    it("should add a coin to favorites", () => {
      const result = favoritesRepository.addFavorite("bitcoin");
      expect(result).toEqual({ bitcoin: true });
      expect(favoritesRepository.isFavorite("bitcoin")).toBe(true);
    });

    it("should add multiple coins", () => {
      favoritesRepository.addFavorite("bitcoin");
      const result = favoritesRepository.addFavorite("ethereum");
      expect(result).toEqual({
        bitcoin: true,
        ethereum: true,
      });
    });

    it("should not duplicate coins", () => {
      favoritesRepository.addFavorite("bitcoin");
      const result = favoritesRepository.addFavorite("bitcoin");
      expect(Object.keys(result)).toHaveLength(1);
    });
  });

  describe("removeFavorite", () => {
    it("should remove a coin from favorites", () => {
      favoritesRepository.addFavorite("bitcoin");
      const result = favoritesRepository.removeFavorite("bitcoin");
      expect(result).toEqual({});
      expect(favoritesRepository.isFavorite("bitcoin")).toBe(false);
    });

    it("should handle removing non-existent coin", () => {
      const result = favoritesRepository.removeFavorite("bitcoin");
      expect(result).toEqual({});
    });
  });

  describe("isFavorite", () => {
    it("should return true for favorited coins", () => {
      favoritesRepository.addFavorite("bitcoin");
      expect(favoritesRepository.isFavorite("bitcoin")).toBe(true);
    });

    it("should return false for non-favorited coins", () => {
      expect(favoritesRepository.isFavorite("bitcoin")).toBe(false);
    });
  });

  describe("toggleFavorite", () => {
    it("should add coin when not favorited", () => {
      const result = favoritesRepository.toggleFavorite("bitcoin");
      expect(result).toBe(true);
      expect(favoritesRepository.isFavorite("bitcoin")).toBe(true);
    });

    it("should remove coin when already favorited", () => {
      favoritesRepository.addFavorite("bitcoin");
      const result = favoritesRepository.toggleFavorite("bitcoin");
      expect(result).toBe(false);
      expect(favoritesRepository.isFavorite("bitcoin")).toBe(false);
    });
  });

  describe("clearFavorites", () => {
    it("should clear all favorites", () => {
      favoritesRepository.addFavorite("bitcoin");
      favoritesRepository.addFavorite("ethereum");
      favoritesRepository.clearFavorites();
      expect(favoritesRepository.getFavorites()).toEqual({});
    });
  });
});
