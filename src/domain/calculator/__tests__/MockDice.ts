import { Dice } from "@domain/random/Dice.ts";
import { RollResult } from "@domain/random/RollResult.ts";

export class MockDice extends Dice {
  queue: RollResult[] = [];

  setRolls(...result: RollResult[]) {
    this.queue = result;
  }

  roll(_: number, amount: number): RollResult {
    return (
      this.queue.shift() ??
      new RollResult(Array.from({ length: amount }, () => 1))
    );
  }

  rollExploding(_: number, limit: number = 1): RollResult {
    return (
      this.queue.shift() ??
      new RollResult(Array.from({ length: limit }, () => 1))
    );
  }
}
