import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router";
import { CoinCard } from "@/components/coin-card";
import type { Coin } from "@/types/coin";
import coin from "@/__mocks__/response/coin.json";

const renderCoinCard = (
  props?: Partial<React.ComponentProps<typeof CoinCard>>,
) => {
  return render(
    <BrowserRouter>
      <CoinCard coin={coin} {...props} />
    </BrowserRouter>,
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
    expect(img).toHaveAttribute("src", "https://assets.coingecko.com/coins/images/1/large/bitcoin.png");
  });

  it("should show favorite button when handler provided", () => {
    const mockHandler = vi.fn();
    renderCoinCard({ onToggleFavorite: mockHandler });
    const favoriteBtn = screen.getByRole("button", {
      name: /add to favorites/i,
    });
    expect(favoriteBtn).toBeInTheDocument();
  });

  it("should show filled heart when favorite", () => {
    const mockHandler = vi.fn();
    renderCoinCard({ isFavorite: true, onToggleFavorite: mockHandler });
    const favoriteBtn = screen.getByRole("button", {
      name: /remove from favorites/i,
    });
    expect(favoriteBtn).toBeInTheDocument();
  });

  it("should call toggle handler when favorite button clicked", () => {
    const mockHandler = vi.fn();
    renderCoinCard({ onToggleFavorite: mockHandler });
    const favoriteBtn = screen.getByRole("button", {
      name: /add to favorites/i,
    });
    favoriteBtn.click();
    expect(mockHandler).toHaveBeenCalledWith("bitcoin");
  });

  it("should handle negative price change", () => {
    const negativeCoin: Coin = {
      ...coin,
      price_change_percentage_24h: -5.2,
    };
    renderCoinCard({ coin: negativeCoin });
    expect(screen.getByText("-5.20%")).toBeInTheDocument();
  });
});
