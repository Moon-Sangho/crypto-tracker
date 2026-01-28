import { useMemo } from "react";
import { Link } from "react-router";
import { Heart } from "lucide-react";
import { useCoinsList } from "@/hooks/queries/use-coins-list";
import { useFavorites } from "@/hooks/use-favorites";
import { CoinList } from "@/components/coin-list";
import { EmptyState } from "@/components/empty-state";
import { LoadingSpinner } from "@/components/loading-spinner";
import { ErrorMessage } from "@/components/error-message";
import AsyncBoundary from "@/components/async-boundary";

const FavoritesContent = () => {
  const { data: allCoins } = useCoinsList();
  const { favorites, toggleFavorite, favoriteIds } = useFavorites();

  // Filter coins to only show favorites
  const favoritedCoins = useMemo(
    () => allCoins.filter((coin) => favorites[coin.id]),
    [allCoins, favorites],
  );

  const showEmpty = favoriteIds.length === 0;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Favorite Cryptocurrencies
        </h1>
        <p className="text-gray-600">
          {showEmpty
            ? "No favorites yet"
            : `You have ${favoritedCoins.length} favorite${
                favoritedCoins.length !== 1 ? "s" : ""
              }`}
        </p>
      </div>

      {showEmpty && (
        <div>
          <EmptyState
            title="No favorites yet"
            message="Add cryptocurrencies to your favorites to track them here"
            icon={<Heart size={48} className="text-gray-400" />}
          />
          <div className="flex justify-center mt-4">
            <Link
              to="/crypto"
              className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Browse Cryptocurrencies
            </Link>
          </div>
        </div>
      )}

      {favoritedCoins.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-gray-600">
              Showing {favoritedCoins.length} favorite
              {favoritedCoins.length !== 1 ? "s" : ""}
            </p>
            <Link
              to="/crypto"
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Add More →
            </Link>
          </div>
          <CoinList
            coins={favoritedCoins}
            favorites={favorites}
            onToggleFavorite={toggleFavorite}
          />
        </div>
      )}
    </div>
  );
};

const Favorites = () => (
  <AsyncBoundary
    pendingFallback={<LoadingSpinner size="lg" message="Loading your favorites..." />}
    RejectedFallbackComponent={ErrorMessage}
  >
    <FavoritesContent />
  </AsyncBoundary>
);

export default Favorites;
