import {
  BodyTypeModifier,
  BodyTypeModifierFactoryArgs,
} from "./BodyTypeModifier.ts";
import { StatModifier, StatModifierFactoryArgs } from "./StatModifier.ts";

export type ModifierFactoryArgs = (
  | BodyTypeModifierFactoryArgs
  | StatModifierFactoryArgs
) & { type: string };

const CLASS_TABLE = {
  [BodyTypeModifier.name]: BodyTypeModifier,
  [StatModifier.name]: StatModifier,
};

export function modifierFactory(args: ModifierFactoryArgs) {
  return new CLASS_TABLE[args.type](args);
}
