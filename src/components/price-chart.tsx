import { useRef, useState, useLayoutEffect } from "react";
import type { ChartData } from "@/types/coin";
import { formatPrice, formatDateWithTimeZone } from "@/utils/format";

type PriceChartProps = {
  data: ChartData;
  title?: string;
};

type TooltipState = {
  visible: boolean;
  clientX: number;
  index: number;
  price: number;
  timestamp: number;
};

// Chart configuration constants
const CHART_CONSTANTS = {
  SVG_WIDTH: 1000,
  SVG_HEIGHT: 200,
  GRID_PERCENTAGES: [0, 25, 50, 75, 100] as const,
  TOOLTIP_LEFT_EDGE_THRESHOLD: 15,
  TOOLTIP_RIGHT_EDGE_THRESHOLD: 85,
  Y_AXIS_LABEL_COUNT: 4,
} as const;

// Decimal place thresholds for price formatting based on range
const DECIMAL_RANGE_THRESHOLDS = {
  VERY_SMALL: { threshold: 0.001, decimals: 5 },
  SMALL: { threshold: 0.01, decimals: 4 },
  MEDIUM: { threshold: 0.1, decimals: 3 },
  LARGE: { threshold: 1, decimals: 2 },
} as const;

export const PriceChart = ({
  data,
  title = "Price Chart (1 Year)",
}: PriceChartProps) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const isPointerDown = useRef(false);
  const [tooltip, setTooltip] = useState<TooltipState>({
    visible: false,
    clientX: 0,
    index: -1,
    price: 0,
    timestamp: 0,
  });
  const [tooltipPosition, setTooltipPosition] = useState({
    leftPercent: 0,
    translateClass: "translate-x-[-50%]",
  });

  // Tooltip 위치 계산 (ref 접근은 effect에서)
  useLayoutEffect(() => {
    if (tooltip.visible && svgRef.current) {
      const svg = svgRef.current;
      const rect = svg.getBoundingClientRect();
      const relativeX = tooltip.clientX - rect.left;
      const leftPercent = (relativeX / rect.width) * 100;

      let translateClass = "translate-x-[-50%]";
      if (leftPercent < CHART_CONSTANTS.TOOLTIP_LEFT_EDGE_THRESHOLD) {
        translateClass = "translate-x-[0]";
      } else if (leftPercent > CHART_CONSTANTS.TOOLTIP_RIGHT_EDGE_THRESHOLD) {
        translateClass = "translate-x-[-100%]";
      }

      setTooltipPosition({ leftPercent, translateClass });
    }
  }, [tooltip.visible, tooltip.clientX]);

  if (!data.prices || data.prices.length === 0) {
    return (
      <div className="text-center text-gray-500">No chart data available</div>
    );
  }

  const prices = data.prices.map((p) => p[1]);
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);
  const range = maxPrice - minPrice;

  // Normalize prices to 0-100 scale
  const normalizedPrices = prices.map((p) => ((p - minPrice) / range) * 100);

  // Helper function to calculate tooltip data from pointer event
  const getTooltipDataFromEvent = (e: React.PointerEvent<SVGSVGElement>) => {
    const svg = svgRef.current;
    if (!svg) return null;

    const rect = svg.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width;
    const index = Math.max(
      0,
      Math.min(Math.round(ratio * (prices.length - 1)), prices.length - 1),
    );

    const [timestamp, price] = data.prices[index];

    return {
      visible: true,
      clientX: e.clientX,
      index,
      price,
      timestamp,
    };
  };

  // 포인터 이벤트 핸들러
  const handlePointerMove = (e: React.PointerEvent<SVGSVGElement>) => {
    // Desktop (mouse)에서는 hover 추적, mobile (touch)은 드래그 중일 때만
    if (e.pointerType === "touch" && !isPointerDown.current) return;

    const tooltipData = getTooltipDataFromEvent(e);
    if (tooltipData) setTooltip(tooltipData);
  };

  const handlePointerDown = (e: React.PointerEvent<SVGSVGElement>) => {
    if (e.pointerType !== "touch") return;

    isPointerDown.current = true;
    e.currentTarget.setPointerCapture(e.pointerId);

    const tooltipData = getTooltipDataFromEvent(e);
    if (tooltipData) setTooltip(tooltipData);
  };

  const handlePointerUp = (e: React.PointerEvent<SVGSVGElement>) => {
    if (e.pointerType !== "touch") return;

    isPointerDown.current = false;
    setTooltip((prev) => ({ ...prev, visible: false }));
  };

  const handlePointerLeave = () => {
    setTooltip((prev) => ({ ...prev, visible: false }));
  };

  // SVG 좌표 계산
  const selectedIndex = tooltip.index;
  const x =
    selectedIndex >= 0
      ? (selectedIndex / (prices.length - 1)) * CHART_CONSTANTS.SVG_WIDTH
      : 0;
  const y =
    selectedIndex >= 0
      ? CHART_CONSTANTS.SVG_HEIGHT - normalizedPrices[selectedIndex] * 2
      : 0;

  // Y축 가격 레이블 생성
  const generateYAxisLabels = (
    min: number,
    max: number,
    count: number = CHART_CONSTANTS.Y_AXIS_LABEL_COUNT,
  ) => {
    const step = (max - min) / count;
    const labels = [];
    for (let i = count; i >= 0; i--) {
      labels.push(min + step * i);
    }
    return labels;
  };

  // 가격 범위에 따라 소수점 자릿수 동적 결정.
  // USDC, Tether 등 1달러 이하 스테이블코인 대응.
  const getDecimalPlaces = (min: number, max: number): number => {
    const range = max - min;
    if (range < DECIMAL_RANGE_THRESHOLDS.VERY_SMALL.threshold)
      return DECIMAL_RANGE_THRESHOLDS.VERY_SMALL.decimals;
    if (range < DECIMAL_RANGE_THRESHOLDS.SMALL.threshold)
      return DECIMAL_RANGE_THRESHOLDS.SMALL.decimals;
    if (range < DECIMAL_RANGE_THRESHOLDS.MEDIUM.threshold)
      return DECIMAL_RANGE_THRESHOLDS.MEDIUM.decimals;
    if (range < DECIMAL_RANGE_THRESHOLDS.LARGE.threshold)
      return DECIMAL_RANGE_THRESHOLDS.LARGE.decimals;
    return 0;
  };

  const yAxisLabels = generateYAxisLabels(minPrice, maxPrice);
  const decimalPlaces = getDecimalPlaces(minPrice, maxPrice);

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
      </div>
      <div className="rounded-lg bg-gray-50 p-4 relative">
        <div className="flex gap-2">
          {/* Y축 가격 레이블 */}
          <div className="hidden md:flex min-w-10 flex-col justify-between text-xs text-gray-500 font-medium">
            {yAxisLabels.map((price) => (
              <div key={price}>
                $
                {price.toLocaleString("en-US", {
                  maximumFractionDigits: decimalPlaces,
                })}
              </div>
            ))}
          </div>

          {/* 차트 */}
          <div className="flex-1">
            <svg
              ref={svgRef}
              viewBox={`0 0 ${CHART_CONSTANTS.SVG_WIDTH} ${CHART_CONSTANTS.SVG_HEIGHT}`}
              className="w-full h-48"
              preserveAspectRatio="none"
              onPointerMove={handlePointerMove}
              onPointerDown={handlePointerDown}
              onPointerUp={handlePointerUp}
              onPointerLeave={handlePointerLeave}
              style={{ touchAction: "pan-y" }}
            >
              {/* Grid lines */}
              {CHART_CONSTANTS.GRID_PERCENTAGES.map((y) => (
                <line
                  key={`grid-${y}`}
                  x1="0"
                  y1={y * 2}
                  x2={CHART_CONSTANTS.SVG_WIDTH}
                  y2={y * 2}
                  stroke="#e5e7eb"
                  strokeWidth="1"
                />
              ))}

              {/* Price line */}
              <polyline
                points={normalizedPrices
                  .map((p, i) => {
                    const x =
                      (i / (normalizedPrices.length - 1)) *
                      CHART_CONSTANTS.SVG_WIDTH;
                    const y = CHART_CONSTANTS.SVG_HEIGHT - p * 2;
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
                <linearGradient
                  id="priceGradient"
                  x1="0%"
                  y1="0%"
                  x2="0%"
                  y2="100%"
                >
                  <stop
                    offset="0%"
                    style={{ stopColor: "#3b82f6", stopOpacity: 0.3 }}
                  />
                  <stop
                    offset="100%"
                    style={{ stopColor: "#3b82f6", stopOpacity: 0.05 }}
                  />
                </linearGradient>
              </defs>
              <polygon
                points={`0,${CHART_CONSTANTS.SVG_HEIGHT} ${normalizedPrices
                  .map((p, i) => {
                    const x =
                      (i / (normalizedPrices.length - 1)) *
                      CHART_CONSTANTS.SVG_WIDTH;
                    const y = CHART_CONSTANTS.SVG_HEIGHT - p * 2;
                    return `${x},${y}`;
                  })
                  .join(
                    " ",
                  )} ${CHART_CONSTANTS.SVG_WIDTH},${CHART_CONSTANTS.SVG_HEIGHT}`}
                fill="url(#priceGradient)"
              />

              {/* Tooltip 시각화: 수직 가이드선 및 포인트 닷 */}
              {tooltip.visible && selectedIndex >= 0 && (
                <>
                  {/* 수직 가이드선 */}
                  <line
                    x1={x}
                    y1="0"
                    x2={x}
                    y2={CHART_CONSTANTS.SVG_HEIGHT}
                    stroke="#60a5fa"
                    strokeWidth="2"
                    strokeDasharray="5,5"
                    vectorEffect="non-scaling-stroke"
                  />
                  {/* 포인트 닷 */}
                  <circle
                    cx={x}
                    cy={y}
                    r="4"
                    fill="#3b82f6"
                    stroke="white"
                    strokeWidth="2"
                    vectorEffect="non-scaling-stroke"
                  />
                </>
              )}
            </svg>
          </div>
        </div>

        {/* Tooltip DOM */}
        {tooltip.visible && (
          <div
            className={`absolute bg-gray-900 text-white px-3 py-2 rounded-lg shadow-lg pointer-events-none whitespace-nowrap ${tooltipPosition.translateClass}`}
            style={{ left: `${tooltipPosition.leftPercent}%`, top: "-48px" }}
          >
            <div className="text-xs text-gray-400">
              {formatDateWithTimeZone(
                new Date(tooltip.timestamp).toISOString(),
              )}
            </div>
            <div className="text-sm font-semibold">
              {formatPrice(tooltip.price)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
