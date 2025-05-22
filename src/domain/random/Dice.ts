import { RollResult } from "./RollResult.ts";

export abstract class Dice {
  abstract roll(sides: number, amount: number): RollResult;

  /**
   * Performs an exploding dice roll, where maximum results trigger additional rolls.
   * @param sides - The number of sides on the dice
   * @param limit - Maximum number of additional rolls on critical success. If negative, there is no limit. Default is 1.
   * @returns Result of the dice roll
   */
  rollExploding(sides: number, limit: number = 1): RollResult {
    const rolls = this.rollRecursive(sides, limit);
    return new RollResult(rolls);
  }

  private rollRecursive(
    sides: number,
    limit: number = 1,
    rolls: number[] = [],
  ): number[] {
    const roll = this.roll(sides, 1);
    rolls.push(roll.result);
    if (roll.result === sides && limit !== 0) {
      return this.rollRecursive(sides, limit - 1, rolls);
    } else {
      return rolls;
    }
  }
}
