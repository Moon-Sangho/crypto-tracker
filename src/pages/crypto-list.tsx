import { useState, useCallback } from "react";
import { useCoinsList } from "@/hooks/queries/use-coins-list";
import { useFavorites } from "@/hooks/use-favorites";
import { CoinList } from "@/components/coin-list";
import { SearchBar } from "@/components/search-bar";
import { EmptyState } from "@/components/empty-state";
import { LoadingSpinner } from "@/components/loading-spinner";
import { ErrorMessage } from "@/components/error-message";
import AsyncBoundary from "@/components/async-boundary";

const CryptoListContent = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { data: coins } = useCoinsList();
  const { favorites, toggleFavorite } = useFavorites();

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  const filteredCoins = coins.filter(
    (coin) =>
      coin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      coin.symbol.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const showEmptyState = filteredCoins.length === 0 && searchQuery !== "";

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Top Cryptocurrencies
        </h1>
        <p className="text-gray-600">
          Track the top 50 cryptocurrencies by market cap
        </p>
      </div>

      <SearchBar onSearch={handleSearch} />

      {showEmptyState && (
        <EmptyState
          title="No coins found"
          message={`No cryptocurrency matches "${searchQuery}"`}
          action={{
            label: "Clear Search",
            onClick: () => setSearchQuery(""),
          }}
        />
      )}

      {filteredCoins.length > 0 && (
        <CoinList
          coins={filteredCoins}
          favorites={favorites}
          onToggleFavorite={toggleFavorite}
        />
      )}
    </div>
  );
};

const CryptoList = () => (
  <AsyncBoundary
    pendingFallback={<LoadingSpinner size="lg" message="Loading cryptocurrencies..." />}
    RejectedFallbackComponent={ErrorMessage}
  >
    <CryptoListContent />
  </AsyncBoundary>
);

export default CryptoList;
