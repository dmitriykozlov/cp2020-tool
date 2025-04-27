import { Dice } from "@domain/random/Dice.ts";
import { RollResult } from "@domain/random/RollResult.ts";

export class MockDice implements Dice {
  queue: RollResult[] = [];

  setRolls(...result: RollResult[]) {
    this.queue = result;
  }

  roll(sides: number, amount: number): RollResult {
    return (
      this.queue.shift() ??
      new RollResult(Array.from({ length: amount }, () => sides))
    );
  }

  rollExploding(sides: number, limit: number = 1): RollResult {
    return (
      this.queue.shift() ??
      new RollResult(Array.from({ length: limit + 1 }, () => sides))
    );
  }
}
