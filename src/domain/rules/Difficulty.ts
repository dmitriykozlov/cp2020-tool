export type Difficulty =
  | "easy"
  | "average"
  | "difficult"
  | "very_difficult"
  | "nearly_impossible";

export const DIFFICULTIES: Record<Difficulty, [number, number]> = {
  easy: [10, 14],
  average: [15, 19],
  difficult: [20, 24],
  very_difficult: [25, 29],
  nearly_impossible: [30, Number.MAX_SAFE_INTEGER],
} as const;
