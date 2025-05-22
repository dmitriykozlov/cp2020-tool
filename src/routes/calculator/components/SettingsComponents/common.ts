import { AttackResult, Range } from "@domain/calculator/AttackCalculator.ts";
import { Weapon } from "@domain/weapons/Weapon.ts";

export type CommonProps = {
  range: Range | null;
  skillValue: number;
  weapon: Weapon;
  onCalculate: (result: AttackResult[]) => void;
};
