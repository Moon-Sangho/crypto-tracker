import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router";
import { CoinCard } from "@/components/coin-card";
import type { Coin } from "@/types/coin";

const mockCoin: Coin = {
  id: "bitcoin",
  symbol: "btc",
  name: "Bitcoin",
  image: "https://example.com/bitcoin.png",
  current_price: 42000,
  market_cap: 823000000000,
  market_cap_rank: 1,
  fully_diluted_valuation: 883000000000,
  total_volume: 28000000000,
  high_24h: 43000,
  low_24h: 41000,
  price_change_24h: 1200,
  price_change_percentage_24h: 2.94,
  market_cap_change_24h: 24500000000,
  market_cap_change_percentage_24h: 3.07,
  circulating_supply: 21000000,
  total_supply: 21000000,
  max_supply: 21000000,
  ath: 69000,
  atl: 67,
  ath_change_percentage: -39.13,
  atl_change_percentage: 62687.57,
  ath_date: "2021-11-10T14:24:11.849Z",
  atl_date: "2013-07-06T00:00:00.000Z",
  roi: null,
  last_updated: "2024-01-15T10:00:00Z",
};

const renderCoinCard = (props?: Partial<React.ComponentProps<typeof CoinCard>>) => {
  return render(
    <BrowserRouter>
      <CoinCard coin={mockCoin} {...props} />
    </BrowserRouter>
  );
};

describe("CoinCard", () => {
  it("should display coin name and symbol", () => {
    const { container } = renderCoinCard();
    expect(screen.getByText("Bitcoin")).toBeInTheDocument();
    expect(container.textContent).toContain("btc");
  });

  it("should display formatted price", () => {
    renderCoinCard();
    expect(screen.getByText("$42,000.00")).toBeInTheDocument();
  });

  it("should display price change percentage", () => {
    renderCoinCard();
    expect(screen.getByText("+2.94%")).toBeInTheDocument();
  });

  it("should display market cap rank", () => {
    renderCoinCard();
    expect(screen.getByText("Rank #1")).toBeInTheDocument();
  });

  it("should display coin image", () => {
    renderCoinCard();
    const img = screen.getByAltText("Bitcoin");
    expect(img).toHaveAttribute("src", "https://example.com/bitcoin.png");
  });

  it("should show favorite button when handler provided", () => {
    const mockHandler = vi.fn();
    renderCoinCard({ onToggleFavorite: mockHandler });
    const favoriteBtn = screen.getByRole("button", { name: /add to favorites/i });
    expect(favoriteBtn).toBeInTheDocument();
  });

  it("should show filled heart when favorite", () => {
    const mockHandler = vi.fn();
    renderCoinCard({ isFavorite: true, onToggleFavorite: mockHandler });
    const favoriteBtn = screen.getByRole("button", { name: /remove from favorites/i });
    expect(favoriteBtn).toBeInTheDocument();
  });

  it("should call toggle handler when favorite button clicked", () => {
    const mockHandler = vi.fn();
    renderCoinCard({ onToggleFavorite: mockHandler });
    const favoriteBtn = screen.getByRole("button", { name: /add to favorites/i });
    favoriteBtn.click();
    expect(mockHandler).toHaveBeenCalledWith("bitcoin");
  });

  it("should handle negative price change", () => {
    const negativeCoin: Coin = { ...mockCoin, price_change_percentage_24h: -5.2 };
    renderCoinCard({ coin: negativeCoin });
    expect(screen.getByText("-5.20%")).toBeInTheDocument();
  });
});
