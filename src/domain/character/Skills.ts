import { Skill } from "./Skill.ts";
import { Character } from "./Character.ts";
import { skillIndex, SkillName } from "../rules/skills";
import { makeAutoObservable } from "mobx";

export type SkillsRecord = Partial<Record<SkillName, number>>;

function createDummySkills(character: Character): Record<SkillName, Skill> {
  const result: Partial<Record<SkillName, Skill>> = {};

  Object.keys(skillIndex).forEach((key) => {
    const skillName = key as SkillName;
    result[skillName] = new Skill(skillName, { level: 0 }, character);
  });

  return result as Record<SkillName, Skill>;
}

export type SkillsFactoryArgs = {
  specialSkill: number;
  professionalSkills: SkillsRecord;
  pickupSkills: SkillsRecord;
};

export class Skills {
  specialSkill: Skill;

  data: Record<SkillName, Skill>;

  private constructor(specialSkill: Skill, skills: Record<SkillName, Skill>) {
    this.specialSkill = specialSkill;
    this.data = skills;
    makeAutoObservable(this);
  }

  static factory(args: SkillsFactoryArgs, character: Character) {
    const skills: Record<SkillName, Skill> = createDummySkills(character);
    // 29.03.2025 TODO: fix validation
    // const validationResult = character.role.validateCareerSkills(
    //   args.professionalSkills,
    // );
    // 22.03.2025 TODO: add validation for professional skills not to intersect with pickup skills

    Object.entries(args.professionalSkills).forEach(([skillName, level]) => {
      skills[skillName as SkillName].level = level;
    });
    Object.entries(args.pickupSkills).forEach(([skillName, level]) => {
      skills[skillName as SkillName].level = level;
    });
    return new Skills(
      new Skill(
        character.role.specialAbility,
        { level: args.specialSkill },
        character,
      ),
      skills,
    );
  }
}
