import { SkillName } from "./index.ts";
import { NatStatName } from "../Stats.ts";

type SkillDescriptionConstArgs = {
  name: SkillName;
  description: string;
  multiplier?: number;
  stat?: NatStatName;
};

export class SkillDescription {
  readonly name: SkillName;
  readonly description: string;
  readonly multiplier: number;
  readonly stat?: NatStatName;

  private constructor(a: SkillDescriptionConstArgs) {
    this.name = a.name;
    this.description = a.description;
    this.multiplier = a.multiplier ?? 1;
    this.stat = a.stat;
  }

  static make(a: SkillDescriptionConstArgs) {
    return new SkillDescription(a);
  }
}
