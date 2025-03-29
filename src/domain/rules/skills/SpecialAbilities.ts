import { SkillDescription } from "./SkillDescription.ts";

export const specialAbilitiesNames = [
  "Authority",
  "Charismatic Leadership",
  "Combat Sense",
  "Credibility",
  "Family",
  "Interface",
  "Jury Rig",
  "Medical Tech",
  "Resources",
  "Streetdeal",
] as const;

export type SpecialAbilityName = (typeof specialAbilitiesNames)[number];

export const specialAbilities: Record<SpecialAbilityName, SkillDescription> = {
  Authority: SkillDescription.make({
    name: "Authority",
    stat: "cool",
    description:
      "The ability to intimidate or control others through your position as a lawman. This represents the Cop's ability to call on the forces of the Law and Government to get what they want. Higher Authority improves your ability to face down criminals and officials. Applied to the Cool stat.",
  }),
  "Charismatic Leadership": SkillDescription.make({
    name: "Charismatic Leadership",
    stat: "cool",
    description:
      "Allows Rockers to sway crowds based on their level squared times 200. This ability, added to the Cool stat, lets the Rockerboy control, incite, and charm large crowds. At high levels, it can start movements or even destroy nations.",
  }),
  "Combat Sense": SkillDescription.make({
    name: "Combat Sense",
    // 24.03.2025 TODO: add modifier lo
    description:
      "Based on the Solo's training and professionalism, Combat Sense allows the Solo to perceive danger, notice traps, and avoid harm. It provides a bonus to Awareness and Initiative equal to its level.",
  }),
  Credibility: SkillDescription.make({
    name: "Credibility",
    stat: "intelligence",
    description:
      "The ability to be believed by viewers, police, and powerful figures. Essential for getting stories heard and gathering information. Higher levels allow exposing major scandals and convincing top authorities. Applied to the INT stat.",
  }),
  Family: SkillDescription.make({
    name: "Family",
    stat: "intelligence",
    description:
      "The ability to call upon the resources and help of a Nomad’s large extended family. Can provide weapons, cash, information, or backup. Higher levels increase the Nomad’s influence within the family. Applied to the Intelligence stat.",
  }),
  Interface: SkillDescription.make({
    name: "Interface",
    stat: "intelligence",
    description:
      "Reflects the Netrunner’s ability to manipulate Interface programs. Used for Net actions like controlling remotes, running software, and managing data. Applied to the INT stat.",
  }),
  "Jury Rig": SkillDescription.make({
    name: "Jury Rig",
    description:
      "A general repair skill that allows a Techie to temporarily repair or alter anything for 1D6 turns per level. Not a permanent fix; the jury-rigged object will eventually break down.",
  }),
  "Medical Tech": SkillDescription.make({
    name: "Medical Tech",
    description:
      "The skill used to perform major surgery and medical repairs. Critical for Medtech roles handling life-saving procedures.",
  }),
  Resources: SkillDescription.make({
    name: "Resources",
    stat: "intelligence",
    description:
      "Represents the Corporate’s ability to command corporate resources, from bodyguards to vehicles. Higher levels allow access to greater assets. Applied to the INT stat.",
  }),
  Streetdeal: SkillDescription.make({
    name: "Streetdeal",
    stat: "cool",
    description:
      "This is the ability to deal with the underground information network. With Streetdeal, a Fixer can uncover rumors and information, locate missing persons or things, put gossip out on the Street, pick up clues and score big deals. The higher your Streetdeal ability, the more information you can gather about things happening around you, the more informants you have, and the more secretive the information you can dig up. A level +3 Streetdeal can get you contacts for weapons, tools, or minor illegal operations. At level +5, you can penetrate the secrets of all but the most powerful crime families. At level +9, you are the equivalent of a Mafia crimelord yourself, privy to every secret that's on the Street. Apply Streetdeal to your Cool stat.",
  }),
};
