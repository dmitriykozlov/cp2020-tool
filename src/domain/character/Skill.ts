import { Character } from "./Character.ts";
import { SkillDescription } from "../rules/skills/SkillDescription.ts";
import { skillIndex, SkillName } from "../rules/skills";
import { SkillModifier } from "../modifiers/SkillModifier.ts";
import { makeAutoObservable } from "mobx";

export type SkillConstParams = {
  level: number;
  chipped?: boolean;
};

export class Skill {
  readonly description: SkillDescription;
  level: number;
  chipped: boolean;
  character: Character;
  modifiers: Set<SkillModifier>;

  constructor(name: SkillName, a: SkillConstParams, character: Character) {
    this.description = skillIndex[name];
    this.level = a.level;
    this.chipped = a.chipped ?? false;
    this.character = character;
    this.modifiers = new Set<SkillModifier>();
    makeAutoObservable(this);
  }

  get name(): SkillName {
    return this.description.name;
  }

  get computedValue(): number {
    const statValue = this.description.stat
      ? this.character.stats[this.description.stat].value
      : 0;
    let modifiersValue = 0;
    for (const modifier of this.modifiers) {
      modifiersValue += modifier.value;
    }
    return this.level + statValue + modifiersValue;
  }

  /**
   * return number - number of improvement points needed
   */
  levelIncreaseCost(newLevel: number): number {
    let cost = 0;
    for (let i = this.level; i < newLevel; i++) {
      if (i === 0) cost += 10;
      else cost += i * 10;
    }
    return cost * this.description.multiplier;
  }

  buyLevel(newLevel: number): boolean {
    const cost = this.levelIncreaseCost(newLevel);
    if (this.character.improvementPoints < cost) return false;
    this.character.improvementPoints -= cost;
    this.level = newLevel;
    return true;
  }
}
