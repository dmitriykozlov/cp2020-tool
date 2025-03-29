import { SkillDescription } from "./SkillDescription.ts";
export const coolSkillNames = [
  "Interrogation",
  "Intimidate",
  "Oratory",
  "Resist Torture/Drugs",
  "Streetwise",
] as const;

export type CoolSkillName = (typeof coolSkillNames)[number];

export const coolSkills: Record<CoolSkillName, SkillDescription> = {
  Interrogation: SkillDescription.make({
    name: "Interrogation",
    stat: "cool",
    description:
      "The skill of drawing information from a subject and forcing secrets into the open. Higher levels allow uncovering deeper truths and detecting lies.",
  }),
  Intimidate: SkillDescription.make({
    name: "Intimidate",
    stat: "cool",
    description:
      "The skill of coercing others through force of personality or physical presence. Higher levels enable scaring even hardened criminals.",
  }),
  Oratory: SkillDescription.make({
    name: "Oratory",
    stat: "cool",
    description:
      "The skill of public speaking and persuasion. Mastering this skill allows influencing crowds and moving nations.",
  }),
  "Resist Torture/Drugs": SkillDescription.make({
    name: "Resist Torture/Drugs",
    stat: "cool",
    description:
      "Grants resistance to physical and mental coercion, including torture and drug-induced persuasion.",
  }),
  Streetwise: SkillDescription.make({
    name: "Streetwise",
    stat: "cool",
    description:
      "Knowledge of criminal activities, underworld dealings, and survival in bad neighborhoods. Higher levels grant access to powerful connections.",
  }),
};
