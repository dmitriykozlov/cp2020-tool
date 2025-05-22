import { RollResult } from "./RollResult.ts";

export interface Dice {
  roll(sides: number, amount: number): RollResult;

  /**
   * Performs an exploding dice roll, where maximum results trigger additional rolls.
   * @param sides - The number of sides on the dice
   * @param limit - Maximum number of additional rolls on critical success. If negative, there is no limit. Default is 1.
   * @returns Result of the dice roll
   */
  rollExploding(sides: number, limit?: number): RollResult;
}
