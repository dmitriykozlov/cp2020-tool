import { SkillModifier } from "./SkillModifier.ts";

export class CombatSenseAwarenessModifier extends SkillModifier {
  constructor(description: string) {
    super(description, "Awareness/Notice", 0, true);
  }

  get value(): number {
    return this.character?.skills.specialSkill.level ?? 0;
  }

  set value(_: number) {}
}