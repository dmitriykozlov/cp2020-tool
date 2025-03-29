import { NatStatName } from "../Stats.ts";
import {
  specialAbilities,
  specialAbilitiesNames,
  SpecialAbilityName,
} from "./SpecialAbilities.ts";
import {
  AttractivenessSkillName,
  attractivenessSkillNames, attractivenessSkills,
} from "./AttractivenessSkills.ts";
import {BodySkillName, bodySkillNames, bodySkills} from "./BodySkills.ts";
import {CoolSkillName, coolSkillNames, coolSkills} from "./CoolSkills.ts";
import {EmpathySkillName, empathySkillNames, empathySkills} from "./EmpathySkills.ts";
import {
  IntelligenceSkillName,
  intelligenceSkillNames, intelligenceSkills,
} from "./IntelligenceSkills.ts";
import {reflexesSkillNames, ReflexSkillName, reflexSkills} from "./ReflexSkills.ts";
import {technicalSkills, TechSkillName, techSkillNames} from "./TechnicalSkills.ts";
import {SkillDescription} from "./SkillDescription.ts";

export type SkillName =
  | SpecialAbilityName
  | AttractivenessSkillName
  | BodySkillName
  | CoolSkillName
  | EmpathySkillName
  | IntelligenceSkillName
  | ReflexSkillName
  | TechSkillName;

export type SkillGroupName =
  | Exclude<NatStatName, "luck" | "movement">
  | "specialAbilities";

export type StatSkillMap = {
  specialAbilities: readonly SpecialAbilityName[];
  attractiveness: readonly AttractivenessSkillName[];
  body: readonly BodySkillName[];
  cool: readonly CoolSkillName[];
  empathy: readonly EmpathySkillName[];
  intelligence: readonly IntelligenceSkillName[];
  reflexes: readonly ReflexSkillName[];
  technical: readonly TechSkillName[];
};

export const skillNamesMap: StatSkillMap = {
  specialAbilities: specialAbilitiesNames,
  attractiveness: attractivenessSkillNames,
  body: bodySkillNames,
  cool: coolSkillNames,
  empathy: empathySkillNames,
  intelligence: intelligenceSkillNames,
  reflexes: reflexesSkillNames,
  technical: techSkillNames,
} as const satisfies Record<SkillGroupName, readonly SkillName[]>;

type SkillDescriptions = {
  [statKey in SkillGroupName]: {
    [skillKey in StatSkillMap[statKey][number]]: SkillDescription;
  };
};

export const skillDescriptions: SkillDescriptions = {
  specialAbilities,
  attractiveness: attractivenessSkills,
  body: bodySkills,
  cool: coolSkills,
  empathy: empathySkills,
  intelligence: intelligenceSkills,
  reflexes: reflexSkills,
  technical: technicalSkills,
};

export const skillIndex: Record<SkillName, SkillDescription> = {
  ...skillDescriptions.specialAbilities,
  ...skillDescriptions.attractiveness,
  ...skillDescriptions.body,
  ...skillDescriptions.cool,
  ...skillDescriptions.empathy,
  ...skillDescriptions.intelligence,
  ...skillDescriptions.reflexes,
  ...skillDescriptions.technical,
};
