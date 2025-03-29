import { Character } from "./Character.ts";
import { makeAutoObservable } from "mobx";
import { NatStatName } from "../rules/Stats.ts";
import { StatModifier } from "../modifiers/StatModifier.ts";

export class Stat {
  readonly name: NatStatName;
  readonly character: Character;
  baseValue: number;
  modifiers: Set<StatModifier>;

  constructor(name: NatStatName, baseValue: number, character: Character) {
    this.name = name;
    this.baseValue = baseValue;
    this.character = character;
    this.modifiers = new Set<StatModifier>();
    makeAutoObservable(this);
  }

  get value(): number {
    let modifierValue = 0;
    for (const mod of this.modifiers) {
      modifierValue += mod.value;
    }
    if (this.name === "empathy") {
      return Math.ceil(this.character.humanity / 10) + modifierValue;
    }
    return this.baseValue + modifierValue;
  }
}
