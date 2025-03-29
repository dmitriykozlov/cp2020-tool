import { Character } from "../character/Character.ts";
import {
  ApplicableModifier,
  CommonModifierFactoryArgs,
  ModifierSource,
} from "./IModifier.ts";
import { v4 } from "uuid";

export type BodyTypeModifierFactoryArgs = CommonModifierFactoryArgs;

export class BodyTypeModifier implements ApplicableModifier {
  id: string;
  description: string;
  value: number;
  character?: Character;
  source?: ModifierSource;
  isActive: boolean;
  isApplied: boolean;

  constructor(args: BodyTypeModifierFactoryArgs) {
    this.id = v4();
    this.description = args.description;
    this.value = args.value;
    this.isActive = args.isActive ?? true;
    this.isApplied = false;
  }

  applyModifier(source: ModifierSource, character: Character): void {
    this.source = source;
    this.character = character;
    if (!this.isApplied) {
      this.character.stats.bodyTypeModifiers.add(this);
      this.isActive = true;
    }
  }

  removeModifier(): void {
    if (this.isApplied && this.character) {
      this.character.stats.bodyTypeModifiers.delete(this);
    }
  }
}
