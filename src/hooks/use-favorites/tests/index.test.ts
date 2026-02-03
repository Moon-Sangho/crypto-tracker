import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useFavorites } from "@/hooks/use-favorites";

describe("useFavorites", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it("should initialize with empty favorites", () => {
    const { result } = renderHook(() => useFavorites());

    expect(result.current.favorites).toEqual({});
    expect(result.current.favoriteIds).toEqual([]);
  });

  it("should add coin to favorites", () => {
    const { result } = renderHook(() => useFavorites());

    act(() => {
      result.current.addToFavorites("bitcoin");
    });

    expect(result.current.isFavorite("bitcoin")).toBe(true);
    expect(result.current.favoriteIds).toContain("bitcoin");
  });

  it("should remove coin from favorites", () => {
    const { result } = renderHook(() => useFavorites());

    act(() => {
      result.current.addToFavorites("bitcoin");
    });

    expect(result.current.isFavorite("bitcoin")).toBe(true);

    act(() => {
      result.current.removeFromFavorites("bitcoin");
    });

    expect(result.current.isFavorite("bitcoin")).toBe(false);
    expect(result.current.favoriteIds).not.toContain("bitcoin");
  });

  it("should toggle favorite status", () => {
    const { result } = renderHook(() => useFavorites());

    act(() => {
      const added = result.current.toggleFavorite("bitcoin");
      expect(added).toBe(true);
    });

    expect(result.current.isFavorite("bitcoin")).toBe(true);

    act(() => {
      const removed = result.current.toggleFavorite("bitcoin");
      expect(removed).toBe(false);
    });

    expect(result.current.isFavorite("bitcoin")).toBe(false);
  });

  it("should persist favorites to localStorage", () => {
    const { result } = renderHook(() => useFavorites());

    act(() => {
      result.current.addToFavorites("bitcoin");
      result.current.addToFavorites("ethereum");
    });

    const stored = localStorage.getItem("cryptocurrency_favorites");
    expect(stored).toBeDefined();
    const parsed = JSON.parse(stored!);
    expect(parsed).toEqual({
      bitcoin: true,
      ethereum: true,
    });
  });

  it("should load favorites from localStorage on mount", () => {
    // Pre-populate localStorage
    localStorage.setItem(
      "cryptocurrency_favorites",
      JSON.stringify({ bitcoin: true, ethereum: true }),
    );

    const { result } = renderHook(() => useFavorites());

    expect(result.current.favorites).toEqual({
      bitcoin: true,
      ethereum: true,
    });
    expect(result.current.favoriteIds).toContain("bitcoin");
    expect(result.current.favoriteIds).toContain("ethereum");
  });

  it("should handle multiple favorite operations", () => {
    const { result } = renderHook(() => useFavorites());

    act(() => {
      result.current.addToFavorites("bitcoin");
      result.current.addToFavorites("ethereum");
      result.current.addToFavorites("cardano");
    });

    expect(result.current.favoriteIds).toHaveLength(3);

    act(() => {
      result.current.removeFromFavorites("ethereum");
    });

    expect(result.current.favoriteIds).toHaveLength(2);
    expect(result.current.isFavorite("ethereum")).toBe(false);
  });
});
