import { Stat } from "./Stat.ts";
import { NatStatName, naturalStats } from "../rules/Stats.ts";
import { Character } from "./Character.ts";
import {
  BodyType,
  selectBodyType,
  selectBodyTypeModifier,
} from "../rules/skills/BodySkills.ts";
import { makeAutoObservable } from "mobx";
import { BodyTypeModifier } from "../modifiers/BodyTypeModifier.ts";

type StatKeys = Record<NatStatName, Stat>;

export type StatsConstructorArg = Record<
  NatStatName,
  { value: number } | number
>;

export class Stats implements StatKeys {
  cool!: Stat;
  technical!: Stat;
  luck!: Stat;
  attractiveness!: Stat;
  movement!: Stat;
  empathy!: Stat;
  body!: Stat;
  intelligence!: Stat;
  reflexes!: Stat;
  bodyTypeModifiers: Set<BodyTypeModifier>;

  constructor(stats: StatsConstructorArg, character: Character) {
    naturalStats.forEach((stat) => {
      const value =
        typeof stats[stat] === "number" ? stats[stat] : stats[stat].value;
      this[stat] = new Stat(stat, value, character);
    });
    this.bodyTypeModifiers = new Set<BodyTypeModifier>();
    makeAutoObservable(this);
  }

  get characterPoints(): number {
    let result = 0;
    for (const stat of naturalStats) {
      result += this[stat].baseValue;
    }
    return result;
  }

  get run(): number {
    return this.movement.value * 3;
  }

  get leap(): number {
    return this.run / 4;
  }

  get lift(): number {
    return this.body.value * 40;
  }

  get carry(): number {
    return this.body.value * 10;
  }

  get saveNumber(): number {
    return this.body.value;
  }

  get bodyType(): BodyType {
    return selectBodyType(this.bodyTypeModifier);
  }

  get bodyTypeModifier(): number {
    let modifiersValue = 0;
    for (const bodyTypeModifier of this.bodyTypeModifiers) {
      modifiersValue += bodyTypeModifier.value;
    }
    return selectBodyTypeModifier(this.body.value) + modifiersValue;
  }
}
