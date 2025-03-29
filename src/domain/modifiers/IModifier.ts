import { Character } from "../character/Character.ts";

export type CommonModifierFactoryArgs = {
  description: string;
  value: number;
  isActive?: boolean;
};

export interface ModifierSource {
  asModifierSource(): string;
}

export interface ApplicableModifier {
  id: string;
  description: string;
  value: number;
  character?: Character;
  source?: ModifierSource;

  isActive: boolean;
  isApplied: boolean;

  applyModifier(source: ModifierSource, character: Character): void;

  removeModifier(): void;
}
