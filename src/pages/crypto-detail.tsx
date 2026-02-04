import { useParams, Link } from "react-router";
import { Heart, ChevronLeft } from "lucide-react";
import { useCoinDetail } from "@/hooks/queries/use-coin-detail";
import { useCoinChart } from "@/hooks/queries/use-coin-chart";
import { useFavorites } from "@/hooks/use-favorites";
import { PriceChart } from "@/components/price-chart";
import { LoadingSpinner } from "@/components/loading-spinner";
import { ErrorMessage } from "@/components/error-message";
import AsyncBoundary from "@/components/async-boundary";
import {
  formatPrice,
  formatLargeNumber,
  formatPercentage,
  formatDate,
} from "@/utils/format";

const CryptoDetailContent = () => {
  const { coinId } = useParams<{ coinId: string }>();

  const { data: coin } = useCoinDetail(coinId!);
  const { data: chartData } = useCoinChart(coinId!);
  const { isFavorite, toggleFavorite } = useFavorites();

  // Validate coinId after hooks
  if (!coinId) {
    return <ErrorMessage message="Coin ID is required" />;
  }

  const isFav = isFavorite(coin.id);
  const priceChange = coin.price_change_percentage_24h ?? 0;
  const isPositive = priceChange >= 0;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <Link
          to="/crypto"
          className="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1 mb-4"
        >
          <ChevronLeft size={20} />
          Back to List
        </Link>

        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            <img src={coin.image} alt={coin.name} className="w-16 h-16" />
            <div>
              <h1 className="text-4xl font-bold text-gray-900">{coin.name}</h1>
              <p className="text-gray-600 uppercase">{coin.symbol}</p>
            </div>
          </div>

          <button
            onClick={() => toggleFavorite(coin.id)}
            className="transition-colors hover:text-red-500"
            aria-label={isFav ? "Remove from favorites" : "Add to favorites"}
          >
            <Heart
              size={32}
              className={isFav ? "fill-red-500 text-red-500" : "text-gray-400"}
            />
          </button>
        </div>
      </div>

      {/* Price Chart */}
      {chartData && (
        <div className="rounded-lg bg-white border border-gray-200 p-6">
          <PriceChart data={chartData} />
        </div>
      )}

      {/* Price Info */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
        <div className="rounded-lg bg-white border border-gray-200 p-6">
          <p className="text-gray-600 text-sm mb-1">Current Price</p>
          <p className="text-3xl font-bold text-gray-900">
            {formatPrice(coin.current_price)}
          </p>
          <p
            className={`text-lg font-medium mt-2 ${
              isPositive ? "text-green-600" : "text-red-600"
            }`}
          >
            {formatPercentage(priceChange)}
          </p>
          <p className="text-xs text-gray-600 mt-2">24h Change</p>
        </div>

        <div className="rounded-lg bg-white border border-gray-200 p-6">
          <p className="text-gray-600 text-sm mb-1">Market Cap</p>
          <p className="text-3xl font-bold text-gray-900">
            {formatLargeNumber(coin.market_cap)}
          </p>
          {coin.market_cap_rank && (
            <p className="text-gray-600 text-sm mt-2">
              Rank #{coin.market_cap_rank}
            </p>
          )}
        </div>
      </div>

      {/* Additional Stats */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-3">
        <div className="rounded-lg bg-white border border-gray-200 p-6">
          <p className="text-gray-600 text-sm mb-2">24h High</p>
          <p className="text-2xl font-bold text-gray-900">
            {formatPrice(coin.high_24h)}
          </p>
        </div>

        <div className="rounded-lg bg-white border border-gray-200 p-6">
          <p className="text-gray-600 text-sm mb-2">24h Low</p>
          <p className="text-2xl font-bold text-gray-900">
            {formatPrice(coin.low_24h)}
          </p>
        </div>

        <div className="rounded-lg bg-white border border-gray-200 p-6">
          <p className="text-gray-600 text-sm mb-2">Total Volume</p>
          <p className="text-2xl font-bold text-gray-900">
            {formatLargeNumber(coin.total_volume)}
          </p>
        </div>
      </div>

      {/* All-Time Highs/Lows */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
        <div className="rounded-lg bg-white border border-gray-200 p-6">
          <p className="text-gray-600 text-sm mb-2">All-Time High</p>
          <p className="text-2xl font-bold text-gray-900 mb-1">
            {formatPrice(coin.ath)}
          </p>
          <p
            className={`text-sm font-medium ${
              (coin.ath_change_percentage ?? 0) < 0
                ? "text-red-600"
                : "text-green-600"
            }`}
          >
            {formatPercentage(coin.ath_change_percentage)}
          </p>
          {coin.ath_date && (
            <p className="text-xs text-gray-600 mt-2">
              {formatDate(coin.ath_date)}
            </p>
          )}
        </div>

        <div className="rounded-lg bg-white border border-gray-200 p-6">
          <p className="text-gray-600 text-sm mb-2">All-Time Low</p>
          <p className="text-2xl font-bold text-gray-900 mb-1">
            {formatPrice(coin.atl)}
          </p>
          <p className="text-sm font-medium text-green-600">
            {formatPercentage(coin.atl_change_percentage)}
          </p>
          {coin.atl_date && (
            <p className="text-xs text-gray-600 mt-2">
              {formatDate(coin.atl_date)}
            </p>
          )}
        </div>
      </div>

      {/* Description */}
      {coin.description?.en && (
        <div className="rounded-lg bg-white border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">About</h2>
          <p className="text-gray-700 leading-relaxed">{coin.description.en}</p>
        </div>
      )}
    </div>
  );
};

const CryptoDetail = () => (
  <AsyncBoundary
    pendingFallback={<LoadingSpinner size="lg" message="Loading cryptocurrency details..." />}
    RejectedFallbackComponent={ErrorMessage}
  >
    <CryptoDetailContent />
  </AsyncBoundary>
);

export default CryptoDetail;
