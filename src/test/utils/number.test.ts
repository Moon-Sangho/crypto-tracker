import { describe, expect, it } from "vitest";

import {
  add,
  clamp,
  divide,
  factorial,
  isEven,
  isOdd,
  multiply,
  subtract,
  sum,
} from "@/utils/number";

describe("⚙️ add", () => {
  it("adds two numbers", () => {
    expect(add(1, 2)).toBe(3);
  });

  it("works with negative numbers", () => {
    expect(add(-1, -2)).toBe(-3);
  });
});

/**
 * describe.concurrent - run tests in parallel
 * @see https://vitest.dev/api/#describe-concurrent
 */
describe.concurrent("⚙️ subtract", () => {
  it("subtracts two numbers", ({ expect }) => {
    expect(subtract(5, 2)).toBe(3);
  });

  it("works with negative numbers", ({ expect }) => {
    expect(subtract(-5, -2)).toBe(-3);
  });
});

/**
 * %i - integer placeholder
 * %s - string placeholder
 * @see https://jestjs.io/docs/api#testeachtablename-fn-timeout
 */
describe("⚙️ isEven", () => {
  it.each([
    [0, true],
    [1, false],
    [2, true],
    [-3, false],
    [-4, true],
  ])("isEven(%i) -> %s", (input, expected) => {
    expect(isEven(input)).toBe(expected);
  });
});

describe("⚙️ isOdd", () => {
  it.each([
    [0, false],
    [1, true],
    [2, false],
    [-3, true],
    [-4, false],
  ])("isOdd(%i) -> %s", (input, expected) => {
    expect(isOdd(input)).toBe(expected);
  });
});

describe("⚙️ multiply", () => {
  it.each([
    { a: 2, b: 3, expected: 6 },
    { a: -2, b: 3, expected: -6 },
    { a: 0, b: 999, expected: 0 },
  ])("multiply($a, $b) -> $expected", ({ a, b, expected }) => {
    expect(multiply(a, b)).toBe(expected);
  });
});

describe("⚙️ divide", () => {
  it("divides two numbers", () => {
    expect(divide(6, 3)).toBe(2);
  });

  it("throws when dividing by zero", () => {
    expect(() => divide(1, 0)).toThrow(/Division by zero/);
  });

  it.todo("handles non-integer division precision expectations");
});

describe("⚙️ clamp", () => {
  it.each([
    [5, 0, 10, 5],
    [-1, 0, 10, 0],
    [999, 0, 10, 10],
    [0, 0, 10, 0],
    [10, 0, 10, 10],
  ])("clamp(%i, %i, %i) -> %i", (n, min, max, expected) => {
    expect(clamp(n, min, max)).toBe(expected);
  });

  it("throws when min > max", () => {
    expect(() => clamp(1, 10, 0)).toThrow(/min must be <= max/);
  });
});

describe.concurrent("⚙️ sum", () => {
  it("sums an array", ({ expect }) => {
    expect(sum([1, 2, 3])).toBe(6);
  });

  it("returns 0 for empty array", ({ expect }) => {
    expect(sum([])).toBe(0);
  });

  it("works with negatives", ({ expect }) => {
    expect(sum([-1, -2, 3])).toBe(0);
  });
});

describe("⚙️ factorial", () => {
  it.each([
    [0, 1],
    [1, 1],
    [5, 120],
  ])("factorial(%i) -> %i", (n, expected) => {
    expect(factorial(n)).toBe(expected);
  });

  it("throws for negative n", () => {
    expect(() => factorial(-1)).toThrow(/n must be >= 0/);
  });

  it("throws for non-integer n", () => {
    expect(() => factorial(1.1)).toThrow(/n must be an integer/);
  });
});
