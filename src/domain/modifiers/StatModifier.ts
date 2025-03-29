import { Character } from "../character/Character.ts";
import {
  ApplicableModifier,
  CommonModifierFactoryArgs,
  ModifierSource,
} from "./IModifier.ts";
import { v4 } from "uuid";
import { NatStatName } from "../rules/Stats.ts";

export type StatModifierFactoryArgs = {
  stat: NatStatName;
} & CommonModifierFactoryArgs;

export class StatModifier implements ApplicableModifier {
  id: string;
  description: string;
  value: number;
  stat: NatStatName;

  character?: Character;
  source?: ModifierSource;

  isActive: boolean;
  isApplied: boolean;

  constructor(args: StatModifierFactoryArgs) {
    this.id = v4();
    this.description = args.description;
    this.isActive = args.isActive ?? false;
    this.value = args.value;
    this.stat = args.stat;
    this.isApplied = false;
  }

  applyModifier(source: ModifierSource, character: Character): void {
    this.source = source;
    this.character = character;
    this.isActive = true;
    if (!this.isApplied) {
      this.character.stats[this.stat].modifiers.add(this);
      this.isApplied = true;
    }
  }

  removeModifier(): void {
    if (!this.isApplied && this.character) {
      this.character.stats[this.stat].modifiers.delete(this);
      this.isApplied = false;
    }
  }
}
