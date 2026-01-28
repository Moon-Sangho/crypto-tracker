import type { ChartData } from "@/types/coin";

interface PriceChartProps {
  data: ChartData;
  title?: string;
}

export const PriceChart = ({
  data,
  title = "Price Chart (1 Year)",
}: PriceChartProps) => {
  if (!data.prices || data.prices.length === 0) {
    return <div className="text-center text-gray-500">No chart data available</div>;
  }

  const prices = data.prices.map((p) => p[1]);
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);
  const range = maxPrice - minPrice;

  // Normalize prices to 0-100 scale
  const normalizedPrices = prices.map((p) => ((p - minPrice) / range) * 100);

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
      <div className="rounded-lg bg-gray-50 p-4">
        <svg
          viewBox="0 0 1000 200"
          className="w-full h-48"
          preserveAspectRatio="none"
        >
          {/* Grid lines */}
          {[0, 25, 50, 75, 100].map((y) => (
            <line
              key={`grid-${y}`}
              x1="0"
              y1={y * 2}
              x2="1000"
              y2={y * 2}
              stroke="#e5e7eb"
              strokeWidth="1"
            />
          ))}

          {/* Price line */}
          <polyline
            points={normalizedPrices
              .map((p, i) => {
                const x = (i / (normalizedPrices.length - 1)) * 1000;
                const y = 200 - p * 2;
                return `${x},${y}`;
              })
              .join(" ")}
            fill="none"
            stroke="#3b82f6"
            strokeWidth="2"
            vectorEffect="non-scaling-stroke"
          />

          {/* Gradient fill under line */}
          <defs>
            <linearGradient id="priceGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" style={{ stopColor: "#3b82f6", stopOpacity: 0.3 }} />
              <stop
                offset="100%"
                style={{ stopColor: "#3b82f6", stopOpacity: 0.05 }}
              />
            </linearGradient>
          </defs>
          <polygon
            points={`0,200 ${normalizedPrices
              .map((p, i) => {
                const x = (i / (normalizedPrices.length - 1)) * 1000;
                const y = 200 - p * 2;
                return `${x},${y}`;
              })
              .join(" ")} 1000,200`}
            fill="url(#priceGradient)"
          />
        </svg>

        {/* Price range */}
        <div className="mt-4 flex justify-between text-xs text-gray-600">
          <div>
            <p className="font-medium">Low</p>
            <p>${minPrice.toFixed(2)}</p>
          </div>
          <div className="text-right">
            <p className="font-medium">High</p>
            <p>${maxPrice.toFixed(2)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
