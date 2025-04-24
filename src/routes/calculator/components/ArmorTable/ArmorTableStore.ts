import { makeAutoObservable } from "mobx";
import { HIT_LOCATIONS } from "@domain/armor/HitLocations.ts";
import { computeLayeredSP } from "@domain/rules/Armor.ts";

export type ArmorType = "hard" | "soft";

export type Layer = {
  type: ArmorType;
  locations: string[];
};

export class ArmorTableStore {
  layers: Layer[];
  coverSP: number;
  coveredParts: boolean[];

  constructor() {
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

  addRow(): void {
    this.layers.push({
      type: "hard",
      locations: Array.from<string>({
        length: HIT_LOCATIONS.length,
      }).fill(""),
    });
  }

  removeRow(index: number): void {
    this.layers = this.layers.filter((_, i) => i !== index);
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

export const armorTableStore = new ArmorTableStore();
