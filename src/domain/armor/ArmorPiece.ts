import { Valuable } from "../Valuable.ts";
import { ApplicableModifier, ModifierSource } from "../modifiers/IModifier.ts";
import { Character } from "../character/Character.ts";
import { StatModifier } from "../modifiers/StatModifier.ts";
import { Equippable } from "../Equipable.ts";
import { makeAutoObservable } from "mobx";

export const BODY_PARTS = [
  "head",
  "torso",
  "right_arm",
  "left_arm",
  "right_leg",
  "left_leg",
] as const;

export type BodyPart = (typeof BODY_PARTS)[number];

export const HIT_TABLE: Record<BodyPart, [number, number]> = {
  head: [1, 1],
  torso: [2, 4],
  right_arm: [5, 5],
  left_arm: [6, 6],
  right_leg: [7, 8],
  left_leg: [9, 10],
};

export type ArmorPieceConstArgs = {
  name: string;
  sp: number;
  cover: BodyPart[];
  encumbrance: number;
  cost?: number;
  equipped?: boolean;
};

export class ArmorPiece implements Valuable, ModifierSource, Equippable {
  name: string;
  stoppingPower: number;
  cover: Set<BodyPart>;
  encumbrance: number;
  cost: number;
  modifiers: ApplicableModifier[];
  owner: Character;

  constructor(a: ArmorPieceConstArgs, owner: Character) {
    this.name = a.name;
    this.stoppingPower = a.sp;
    this.cover = new Set(a.cover);
    this.encumbrance = a.encumbrance;
    this.cost = a.cost ?? 0;
    this.owner = owner;
    this.modifiers = [];
    if (a.encumbrance) {
      this.modifiers.push(
        new StatModifier({
          description: "Encumbrance from armor",
          stat: "reflexes",
          value: -a.encumbrance,
        }),
      );
    }
    this.isEquipped = a.equipped ?? false;
    makeAutoObservable(this);
  }

  private _isEquipped: boolean = false;

  get isEquipped(): boolean {
    return this._isEquipped;
  }

  set isEquipped(value: boolean) {
    if (value) {
      this.modifiers.forEach((mod) => {
        mod.applyModifier(this, this.owner);
      });
    } else {
      this.modifiers.forEach((mod) => {
        mod.removeModifier();
      });
    }
    this._isEquipped = value;
  }

  get sp(): number {
    return this.stoppingPower;
  }

  asModifierSource(): string {
    return this.name;
  }
}
