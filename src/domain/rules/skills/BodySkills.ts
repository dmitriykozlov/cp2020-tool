import { SkillDescription } from "./SkillDescription.ts";

export const bodySkillNames = [
  "Endurance",
  "Strength Feat",
  "Swimming",
] as const;

export type BodySkillName = (typeof bodySkillNames)[number];

export type BodyType =
  | "very weak"
  | "weak"
  | "average"
  | "strong"
  | "very strong"
  | "superhuman";

export function selectBodyType(btm: number): BodyType {
  switch (btm) {
    case 0:
      return "very weak";
    case 1:
      return "weak";
    case 2:
      return "average";
    case 3:
      return "strong";
    case 4:
      return "very strong";
    default:
      return "superhuman";
  }
}

export function selectBodyTypeModifier(bodyStat: number): number {
  if (bodyStat <= 2) {
    return 0; //very-weak
  } else if (bodyStat <= 4) {
    return 1; //weak
  } else if (bodyStat <= 7) {
    return 2; //average
  } else if (bodyStat <= 9) {
    return 3; //strong
  } else {
    return 4; //very_strong
  }
}

export const bodySkills: Record<BodySkillName, SkillDescription> = {
  Endurance: SkillDescription.make({
    name: "Endurance",
    stat: "body",
    description:
      "The ability to withstand pain or hardship, particularly over long periods, by knowing how to conserve strength and energy. Endurance checks apply when a character must stay active after prolonged deprivation of food, sleep, or water.",
  }),
  "Strength Feat": SkillDescription.make({
    name: "Strength Feat",
    stat: "body",
    description:
      "Training in feats of strength like bending bars, crushing objects, and ripping phone books apart. At +2, you can crush cans and bend thin rods. At +8, you can bend rebar and snap handcuffs. At +10, you can bend prison bars and dent car fenders with one blow.",
  }),
  Swimming: SkillDescription.make({
    name: "Swimming",
    stat: "body",
    description:
      "This skill represents the ability to swim. Required for characters engaging in aquatic movement and survival. (See Athletics for details).",
  }),
};
