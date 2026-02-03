import { describe, it, expect } from "vitest";
import {
  formatPrice,
  formatLargeNumber,
  formatPercentage,
  formatDate,
  formatNumber,
} from "@/utils/format";

describe("Format utilities", () => {
  describe("formatPrice", () => {
    it("should format numbers as USD currency", () => {
      expect(formatPrice(42000)).toBe("$42,000.00");
      expect(formatPrice(2300.5)).toBe("$2,300.50");
      expect(formatPrice(0.05)).toBe("$0.05");
    });

    it("should handle null and undefined", () => {
      expect(formatPrice(null)).toBe("N/A");
      expect(formatPrice(undefined)).toBe("N/A");
    });

    it("should handle negative numbers", () => {
      expect(formatPrice(-1000)).toBe("-$1,000.00");
    });
  });

  describe("formatLargeNumber", () => {
    it("should format trillion numbers", () => {
      expect(formatLargeNumber(1.2e12)).toBe("$1.20T");
    });

    it("should format billion numbers", () => {
      expect(formatLargeNumber(823000000000)).toBe("$823.00B");
      expect(formatLargeNumber(1.5e9)).toBe("$1.50B");
    });

    it("should format million numbers", () => {
      expect(formatLargeNumber(276500000)).toBe("$276.50M");
      expect(formatLargeNumber(5.2e6)).toBe("$5.20M");
    });

    it("should format million numbers (28M case)", () => {
      expect(formatLargeNumber(28000000)).toBe("$28.00M");
    });

    it("should format regular numbers", () => {
      expect(formatLargeNumber(100)).toBe("$100.00");
    });

    it("should handle null and undefined", () => {
      expect(formatLargeNumber(null)).toBe("N/A");
      expect(formatLargeNumber(undefined)).toBe("N/A");
    });

    it("should handle negative numbers", () => {
      expect(formatLargeNumber(-823000000000)).toBe("-$823.00B");
    });
  });

  describe("formatPercentage", () => {
    it("should format positive percentages with plus sign", () => {
      expect(formatPercentage(2.94)).toBe("+2.94%");
      expect(formatPercentage(10)).toBe("+10.00%");
    });

    it("should format negative percentages", () => {
      expect(formatPercentage(-5.5)).toBe("-5.50%");
      expect(formatPercentage(-0.1)).toBe("-0.10%");
    });

    it("should format zero", () => {
      expect(formatPercentage(0)).toBe("+0.00%");
    });

    it("should support custom decimal places", () => {
      expect(formatPercentage(2.94, 0)).toBe("+3%");
      expect(formatPercentage(2.94, 1)).toBe("+2.9%");
    });

    it("should handle null and undefined", () => {
      expect(formatPercentage(null)).toBe("N/A");
      expect(formatPercentage(undefined)).toBe("N/A");
    });
  });

  describe("formatDate", () => {
    it("should format ISO date strings", () => {
      const result = formatDate("2024-01-15T10:00:00Z");
      expect(result).toContain("Jan");
      expect(result).toContain("15");
    });

    it("should handle null and undefined", () => {
      expect(formatDate(null)).toBe("N/A");
      expect(formatDate(undefined)).toBe("N/A");
    });

    it("should handle invalid dates", () => {
      expect(formatDate("invalid")).toBe("N/A");
    });
  });

  describe("formatNumber", () => {
    it("should format numbers with commas", () => {
      expect(formatNumber(1000)).toBe("1,000");
      expect(formatNumber(1234567)).toBe("1,234,567");
      expect(formatNumber(100)).toBe("100");
    });

    it("should handle decimals", () => {
      expect(formatNumber(1000.5)).toBe("1,000.5");
    });

    it("should handle null and undefined", () => {
      expect(formatNumber(null)).toBe("N/A");
      expect(formatNumber(undefined)).toBe("N/A");
    });

    it("should handle negative numbers", () => {
      expect(formatNumber(-1000)).toBe("-1,000");
    });
  });
});
