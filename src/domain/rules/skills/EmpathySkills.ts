import {SkillDescription} from "./SkillDescription.ts";

export const empathySkillNames = [
  "Human Perception",
  "Interview",
  "Leadership",
  "Seduction",
  "Social",
  "Persuasion & Fast Talk",
  "Perform",
] as const;

export type EmpathySkillName = (typeof empathySkillNames)[number];


export const empathySkills: Record<EmpathySkillName, SkillDescription> = {
  "Human Perception": SkillDescription.make({
    name: "Human Perception",
    stat: "empathy",
    description:
      "The skill of detecting lies, evasions, moods, and other emotional clues from others. Higher levels allow detecting subtle emotional shifts and hidden truths.",
  }),
  Interview: SkillDescription.make({
    name: "Interview",
    stat: "empathy",
    description:
      "The skill of eliciting interesting anecdotes from an interview subject. Higher levels help uncover deeper insights and personal secrets.",
  }),
  Leadership: SkillDescription.make({
    name: "Leadership",
    stat: "empathy",
    description:
      "The ability to lead and inspire others. At higher levels, this skill helps command respect, direct teams effectively, and influence large groups.",
  }),
  Seduction: SkillDescription.make({
    name: "Seduction",
    stat: "empathy",
    description:
      "The ability to initiate and maintain romantic or sexual relationships. Higher levels improve charm and the ability to manipulate romantic situations.",
  }),
  Social: SkillDescription.make({
    name: "Social",
    stat: "empathy",
    description:
      "The ability to navigate social interactions smoothly, from casual conversations to high-class events. Higher levels ensure effortless social blending and influence.",
  }),
  "Persuasion & Fast Talk": SkillDescription.make({
    name: "Persuasion & Fast Talk",
    stat: "empathy",
    description:
      "The ability to convince others to do what you want through charm, logic, or deception. Higher levels make even the most skeptical individuals believe you.",
  }),
  Perform: SkillDescription.make({
    name: "Perform",
    stat: "empathy",
    description:
      "The skill of trained acting, singing, or other performance arts. Higher levels ensure professional-level performances and widespread recognition.",
  }),
};