import { RandomDice } from "@domain/random/Dice.ts";
import { RollResult } from "@domain/random/RollResult.ts";

export class PseudoDice implements RandomDice {
  rollExploding(sides: number, limit: number = 1): RollResult {
    const rolls = this.rollRecursive(sides, limit);
    return new RollResult(rolls);
  }

  roll(sides: number, amount: number): RollResult {
    const rolls = Array.from(
      { length: amount },
      () => Math.floor(Math.random() * sides) + 1,
    );
    return new RollResult(rolls);
  }

  private rollRecursive(
    sides: number,
    limit: number = 1,
    rolls: number[] = [],
  ): number[] {
    const roll = this.roll(sides, 1);
    rolls.push(roll.result);
    if (roll.result === sides && limit > 0) {
      return this.rollRecursive(sides, limit - 1, rolls);
    } else {
      return rolls;
    }
  }
}
