import { IObservableArray, makeAutoObservable, remove } from "mobx";
import { HIT_LOCATIONS } from "@domain/armor/HitLocations.ts";
import { computeLayeredSP } from "@domain/rules/Armor.ts";
import { AttackResult } from "@domain/calculator/AttackCalculator.ts";
import {
  calculateDamage,
  TakenDamageCalculations,
} from "@domain/calculator/DamageCalculator";

export type ArmorType = "hard" | "soft";

export type Layer = {
  type: ArmorType;
  locations: string[];
};

export class ArmorTableStore {
  layers: Layer[];
  coverSP: number;
  coveredParts: boolean[];
  btm: number;
  attack: AttackResult;

  constructor(attack: AttackResult, btm: number = 0) {
    this.layers = [
      {
        type: "hard",
        locations: Array.from<string>({
          length: HIT_LOCATIONS.length,
        }).fill(""),
      },
    ];
    this.coverSP = 0;
    this.coveredParts = Array.from<boolean>({
      length: HIT_LOCATIONS.length,
    }).fill(false);
    this.btm = btm;
    this.attack = attack;
    makeAutoObservable(this);
  }

  get allCovered(): boolean {
    return this.coveredParts.every((isCovered) => isCovered);
  }

  get totalSp(): number[] {
    return HIT_LOCATIONS.map((_, index) => {
      const stoppingPowers = this.layers.map((layer) =>
        Number(layer.locations[index]),
      );
      if (this.coveredParts[index]) {
        stoppingPowers.push(this.coverSP);
      }
      return computeLayeredSP(...stoppingPowers);
    });
  }

  totalSpAndTakenDamage(armorPiercing: boolean): TakenDamageCalculations {
    return calculateDamage(this.attack, this.totalSp, this.btm, armorPiercing);
  }

  addRow(): void {
    this.layers.push({
      type: "hard",
      locations: Array.from<string>({
        length: HIT_LOCATIONS.length,
      }).fill(""),
    });
  }

  removeRow(index: number): void {
    remove(this.layers as IObservableArray, index);
  }

  changeLayerType(layer: number, value: ArmorType): void {
    if (this.layers[layer]) {
      this.layers[layer].type = value;
    }
  }

  changeLayerSP(layer: number, location: number, value: string): void {
    if (this.layers[layer]?.locations[location] !== undefined) {
      this.layers[layer].locations[location] = value;
    }
  }

  toggleCover(location: number): void {
    if (this.coveredParts[location] !== undefined) {
      this.coveredParts[location] = !this.coveredParts[location];
    }
  }

  toggleCoverAll(): void {
    const newValue = !this.allCovered;
    this.coveredParts = this.coveredParts.map(() => newValue);
  }
}
