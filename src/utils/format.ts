/**
 * Format a number as USD currency
 */
export const formatPrice = (price: number | null | undefined): string => {
  if (price === null || price === undefined) return "N/A";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(price);
};

/**
 * Format a large number with abbreviations (K, M, B, T)
 */
export const formatLargeNumber = (num: number | null | undefined): string => {
  if (num === null || num === undefined) return "N/A";

  const absNum = Math.abs(num);
  const sign = num < 0 ? "-" : "";

  if (absNum >= 1e12) {
    return `${sign}$${(absNum / 1e12).toFixed(2)}T`;
  }
  if (absNum >= 1e9) {
    return `${sign}$${(absNum / 1e9).toFixed(2)}B`;
  }
  if (absNum >= 1e6) {
    return `${sign}$${(absNum / 1e6).toFixed(2)}M`;
  }
  if (absNum >= 1e3) {
    return `${sign}$${(absNum / 1e3).toFixed(2)}K`;
  }

  return formatPrice(num);
};

/**
 * Format a percentage with sign
 */
export const formatPercentage = (
  percentage: number | null | undefined,
  decimals = 2
): string => {
  if (percentage === null || percentage === undefined) return "N/A";
  const sign = percentage >= 0 ? "+" : "";
  return `${sign}${percentage.toFixed(decimals)}%`;
};

/**
 * Format a date string to readable format
 */
export const formatDate = (dateString: string | null | undefined): string => {
  if (!dateString) return "N/A";
  try {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(dateString));
  } catch {
    return "N/A";
  }
};

/**
 * Format a number with commas
 */
export const formatNumber = (num: number | null | undefined): string => {
  if (num === null || num === undefined) return "N/A";
  return new Intl.NumberFormat("en-US").format(num);
};
