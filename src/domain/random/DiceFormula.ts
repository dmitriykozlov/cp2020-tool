import { Dice } from "./Dice.ts";
import { FormulaRollResult } from "./RollResult.ts";

const formulaRegex = /^(?:(\d+)D(\d+))?([+-/])?(\d+)?$/;

const EXPRESSIONS = ["+", "-", "/"] as const;

type Expression = (typeof EXPRESSIONS)[number];

const EXPRESSIONS_SET = new Set<string>(EXPRESSIONS);

export class DiceFormula {
  amount: number;
  dieSides: number;
  expression: Expression;
  constModifier: number;

  constructor(
    amount: number,
    dieSides: number,
    expression: Expression,
    constModifier: number,
  ) {
    this.amount = amount;
    this.dieSides = dieSides;
    this.constModifier = constModifier;
    this.expression = expression;
  }

  get formula(): string {
    let result = "";
    if (this.amount && this.dieSides) {
      result += this.amount.toString() + "D" + this.dieSides.toString();
    }
    if (this.expression) {
      result += this.expression;
    }
    if (this.constModifier) {
      result += this.constModifier;
    }
    return result;
  }

  static fromFormula(formula: string): DiceFormula {
    const result = formulaRegex.exec(formula);
    if (result) {
      const amount = Number(result[1]);
      const dieSides = Number(result[2]);
      const expression = result[3];
      const constModifier = Number(result[4]);
      if (!Number.isNaN(constModifier) && !EXPRESSIONS_SET.has(expression)) {
        throw new Error(`Damage formula is incorrect: ${formula}`);
      }
      return new DiceFormula(
        amount,
        dieSides,
        expression as Expression,
        constModifier,
      );
    }
    throw new Error(`Damage formula is incorrect: ${formula}`);
  }

  toString(): string {
    return this.formula;
  }

  applyExpression(value: number): number {
    switch (this.expression) {
      case "+":
        return value + this.constModifier;
      case "-":
        return value - this.constModifier;
      case "/":
        return Math.ceil(value / this.constModifier);
      default:
        return value;
    }
  }

  roll(random: Dice): FormulaRollResult {
    const rollResult = random.roll(this.dieSides, this.amount);
    return FormulaRollResult.fromRollResult(this, rollResult);
  }
}
