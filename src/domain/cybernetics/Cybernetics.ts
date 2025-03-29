import { ApplicableModifier, ModifierSource } from "../modifiers/IModifier.ts";
import { Valuable } from "../Valuable.ts";
import { SurgeryCode } from "./Surgery.ts";
import { Character } from "../character/Character.ts";
import {
  modifierFactory,
  ModifierFactoryArgs,
} from "../modifiers/modifierFactory.ts";
import { HumanityModifier } from "../modifiers/HumanityModifier.ts";

export type CyberneticsConstructorArgs = {
  code: string;
  name: string;
  description: string;
  cost: number;
  surgery: SurgeryCode;
  modifiers?: ModifierFactoryArgs[];
  humanityLoss: number;
};

export class Cybernetics implements ModifierSource, Valuable {
  cost: number;
  code: string;
  name: string;
  description: string;
  humanityLoss: number;
  surgery: SurgeryCode;
  modifiers: Set<ApplicableModifier>;
  owner: Character;

  constructor(args: CyberneticsConstructorArgs, owner: Character) {
    this.cost = args.cost;
    this.code = args.code;
    this.name = args.name;
    this.description = args.description;
    this.humanityLoss = args.humanityLoss;
    this.surgery = args.surgery;
    this.modifiers = new Set(
      args.modifiers?.map((mod) => modifierFactory(mod)),
    );
    this.modifiers.add(
      new HumanityModifier("Cybernetics install", -this.humanityLoss),
    );
    this.owner = owner;
    for (const modifier of this.modifiers) {
      modifier.applyModifier(this, owner);
    }
  }

  asModifierSource(): string {
    return this.name;
  }
}
