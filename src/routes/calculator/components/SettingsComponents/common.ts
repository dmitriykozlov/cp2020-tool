import { AttackResult } from "@domain/calculator/AttackCalculator.ts";
import { Weapon } from "@domain/weapons/Weapon.ts";
import { CalculatorStore } from "@/routes/calculator/state/CalculatorStore.ts";

export type CommonProps = {
  store: CalculatorStore;
  weapon: Weapon;
  onCalculate: (result: AttackResult[]) => void;
};
