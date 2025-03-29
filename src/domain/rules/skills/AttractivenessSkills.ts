import { SkillDescription } from "./SkillDescription.ts";

export const attractivenessSkillNames = [
  "Personal Grooming",
  "Wardrobe & Style",
] as const;

export type AttractivenessSkillName = (typeof attractivenessSkillNames)[number];

export const attractivenessSkills: Record<
  AttractivenessSkillName,
  SkillDescription
> = {
  "Personal Grooming": SkillDescription.make({
    name: "Personal Grooming",
    stat: "attractiveness",
    description:
      "This is the skill of knowing proper grooming, hair styling, etc., to maximize your physical attractiveness. Use of this skill allows players to increase their Attractiveness, and thus their chances of successful Relationships or Persuasions. A basically good looking person would be at +2. A fashion model might have a Personal Grooming of +5 or +6. At +8 or better, you could be a major fashion model, film star, or trendsetter. You are always 'together'. And you know it.",
  }),
  "Wardrobe & Style": SkillDescription.make({
    name: "Wardrobe & Style",
    stat: "attractiveness",
    description:
      "The skill of knowing the right clothes to wear, when to wear them, and how to look cool even in a spacesuit. With a Wardrobe of +2 or better, you are good at choosing clothes off the rack. At +6, your friends ask you for wardrobe tips, and you never buy anything off the rack. At +8 or better, you are one of those rare people whose personal style influences major fashion trends.",
  }),
};
