import { makeAutoObservable, remove } from "mobx";
import {
  HIT_LOCATION_INDEX,
  HIT_LOCATIONS,
} from "@domain/armor/HitLocations.ts";
import { computeLayeredSP } from "@domain/rules/Armor.ts";
import { AttackResult } from "@domain/calculator/AttackCalculator.ts";
import { IObservableArray } from "mobx/dist/internal";

export type ArmorType = "hard" | "soft";

export type Layer = {
  type: ArmorType;
  locations: string[];
};

type DamagePerHit = {
  sp: number;
  armorPenetrated: boolean;
  dmg: number;
};

type TakenDamageCalculations = {
  hits: DamagePerHit[];
  newSP: number[];
  damagePerLocation: number[];
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

  get totalSpAndTakenDamage(): TakenDamageCalculations {
    const stoppingPowers = Array.from(this.totalSp);
    const hits: Array<DamagePerHit> = [];
    for (const hit of this.attack.hits) {
      const sp = stoppingPowers[HIT_LOCATION_INDEX[hit.location]];
      let penetratedDamage = Math.max(hit.damage.result - sp, 0);
      const armorPenetrated = penetratedDamage > 0;

      if (hit.location === "head" && armorPenetrated) {
        penetratedDamage = penetratedDamage * 2;
      }

      if (armorPenetrated) {
        stoppingPowers[HIT_LOCATION_INDEX[hit.location]] = Math.max(sp - 1, 0);
      }

      hits.push({
        sp,
        armorPenetrated,
        dmg: Math.max(penetratedDamage - this.btm, 0),
      });
    }
    const damagePerLocation = hits.reduce(
      (result, hit, index) => {
        result[HIT_LOCATION_INDEX[this.attack.hits[index].location]] += hit.dmg;
        return result;
      },
      Array.from<number>({ length: HIT_LOCATIONS.length }).fill(0),
    );
    return {
      hits,
      newSP: stoppingPowers,
      damagePerLocation,
    };
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
