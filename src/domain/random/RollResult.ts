import { DiceFormula } from "./DiceFormula.ts";

export class RollResult {
  values: number[];
  modifiers: number[] = [];

  constructor(values: number[]) {
    this.values = values;
  }

  get result(): number {
    return this.valuesSum + this.modifiersSum;
  }

  get isCriticalFailure(): boolean {
    return this.values.length === 1 && this.values[0] === 1;
  }

  get isCriticalSuccess(): boolean {
    return this.values[0] === 20;
  }

  protected get valuesSum(): number {
    return this.values.reduce((sum, val) => sum + val, 0);
  }

  protected get modifiersSum(): number {
    return this.modifiers.reduce((sum, val) => sum + val, 0);
  }

  applyModifiers(...modifiers: number[]): RollResult {
    this.modifiers = modifiers;
    return this;
  }
}

export class FormulaRollResult extends RollResult {
  formula: DiceFormula;

  constructor(formula: DiceFormula, values: number[]) {
    super(values);
    this.formula = formula;
  }

  get result(): number {
    return this.formula.applyExpression(this.valuesSum) + this.modifiersSum;
  }

  static fromRollResult(formula: DiceFormula, rollResult: RollResult) {
    return new FormulaRollResult(formula, rollResult.values);
  }
}
