import { ArmorPiece, BodyPart } from "./ArmorPiece.ts";
import { Character } from "../character/Character.ts";
import { calcProportionalArmorBonus } from "../rules/Armor.ts";
import { makeAutoObservable } from "mobx";

type BodyPartsSP = Record<BodyPart, number>;

export class ArmorStat implements BodyPartsSP {
  character: Character;

  constructor(char: Character) {
    this.character = char;
    makeAutoObservable(this);
  }

  get equipped(): ArmorPiece[] {
    return Array.from(this.character.armor).filter((arm) => arm.isEquipped);
  }

  get head(): number {
    return this.calculateSP("head");
  }

  get torso(): number {
    return this.calculateSP("torso");
  }

  get right_arm(): number {
    return this.calculateSP("right_arm");
  }

  get left_arm(): number {
    return this.calculateSP("left_arm");
  }

  get right_leg(): number {
    return this.calculateSP("right_leg");
  }

  get left_leg(): number {
    return this.calculateSP("left_leg");
  }

  calculateSP(bodyPart: BodyPart, coverSP?: number): number {
    const stoppingPowers = this.equipped
      .filter((arm) => arm.cover.has(bodyPart))
      .map((arm) => arm.sp);

    if (coverSP) {
      stoppingPowers.push(coverSP);
    }

    const sorted = stoppingPowers.sort((a, b) => b - a);

    if (sorted.length > 0)
      return sorted.reduce((result, sp) => {
        const spBonus = calcProportionalArmorBonus(result - sp);
        return result + spBonus;
      });

    return 0;
  }
}
