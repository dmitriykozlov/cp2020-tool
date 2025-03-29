import { Character } from "../character/Character.ts";
import { ApplicableModifier, ModifierSource } from "./IModifier.ts";
import { v4 } from "uuid";
import { SkillName } from "../rules/skills";

export class SkillModifier implements ApplicableModifier {
  id: string;
  description: string;
  character?: Character | undefined;
  source?: ModifierSource | undefined;
  isActive: boolean;
  isApplied: boolean;
  skillName: SkillName;

  constructor(
    description: string,
    skillName: SkillName,
    value: number,
    isActive: boolean,
  ) {
    this.id = v4();
    this.description = description;
    this._value = value;
    this.isActive = isActive;
    this.isApplied = false;
    this.skillName = skillName;
  }

  private _value: number;

  public get value(): number {
    return this._value;
  }

  public set value(value: number) {
    this._value = value;
  }

  applyModifier(source: ModifierSource, character: Character): void {
    if (!this.isApplied) {
      this.character = character;
      this.source = source;
      // 29.03.2025 TODO: if skill is zero
      this.character.skills.data[this.skillName].modifiers.add(this);
    }
  }

  removeModifier(): void {
    if (this.isApplied && this.character) {
      this.character.skills.data[this.skillName].modifiers.delete(this);
    }
  }
}
