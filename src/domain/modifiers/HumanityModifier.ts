import { Character } from "../character/Character.ts";
import { ApplicableModifier, ModifierSource } from "./IModifier.ts";
import { v4 } from "uuid";

export class HumanityModifier implements ApplicableModifier {
  id: string;
  description: string;
  value: number;
  character?: Character;
  source?: ModifierSource;
  isActive: boolean;
  isApplied: boolean;

  constructor(description: string, value: number, isActive?: boolean) {
    this.id = v4();
    this.description = description;
    this.value = value;
    this.isActive = isActive ?? true;
    this.isApplied = false;
  }

  applyModifier(source: ModifierSource, character: Character): void {
    this.source = source;
    this.character = character;
    if (!this.isApplied) {
      this.character.humanityModifiers.add(this);
      this.isActive = true;
    }
  }

  removeModifier(): void {
    if (this.isApplied && this.character) {
      this.character.humanityModifiers.delete(this);
      this.isActive = true;
    }
  }
}
