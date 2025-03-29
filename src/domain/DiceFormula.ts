const formulaRegex = /^(?:(\d+)D6)?([+-/])?(\d+)?$/;

const EXPRESSIONS = ["+", "-", "/"] as const;

type Expression = (typeof EXPRESSIONS)[number];

const EXPRESSIONS_SET = new Set<string>(EXPRESSIONS);

export class DiceFormula {
  dice: number;
  expression: Expression;
  constModifier: number;

  constructor(dice: number, expression: Expression, constModifier: number) {
    this.dice = dice;
    this.constModifier = constModifier;
    this.expression = expression;
  }

  get formula(): string {
    let result = "";
    if (this.dice) {
      result += this.dice.toString() + "D6";
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
      const dice = Number(result[1]);
      const constModifier = Number(result[3]);
      if (!Number.isNaN(constModifier) && !EXPRESSIONS_SET.has(result[2])) {
        throw new Error(`Damage formula is incorrect: ${formula}`);
      }
      return new DiceFormula(dice, result[2] as Expression, constModifier);
    }
    throw new Error(`Damage formula is incorrect: ${formula}`);
  }

  toString(): string {
    return this.formula;
  }
}
