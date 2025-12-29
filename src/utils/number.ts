export const add = (a: number, b: number): number => a + b;

export const subtract = (a: number, b: number): number => a - b;

export const isEven = (n: number): boolean => n % 2 === 0;

export const isOdd = (n: number): boolean => Math.abs(n % 2) === 1;

export const multiply = (a: number, b: number): number => a * b;

export const divide = (a: number, b: number): number => {
  if (b === 0) throw new Error("Division by zero");
  return a / b;
};

export const clamp = (n: number, min: number, max: number): number => {
  if (min > max) throw new RangeError("min must be <= max");
  return Math.min(max, Math.max(min, n));
};

export const sum = (nums: number[]): number =>
  nums.reduce((acc, n) => acc + n, 0);

export const factorial = (n: number): number => {
  if (!Number.isInteger(n)) throw new TypeError("n must be an integer");
  if (n < 0) throw new RangeError("n must be >= 0");
  let acc = 1;
  for (let i = 2; i <= n; i += 1) acc *= i;
  return acc;
};
