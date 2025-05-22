import { Dice } from "@domain/random/Dice.ts";
import { RollResult } from "@domain/random/RollResult.ts";

export class PseudoRandomDice extends Dice {
  roll(sides: number, amount: number): RollResult {
    const rolls = Array.from(
      { length: amount },
      () => Math.floor(Math.random() * sides) + 1,
    );
    return new RollResult(rolls);
  }
}
