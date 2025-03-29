import { SkillName } from "./skills";
import { SpecialAbilityName } from "./skills/SpecialAbilities.ts";
import { martialArtNames } from "./skills/ReflexSkills.ts";
import { SkillsRecord } from "../character/Skills.ts";
import {
  ValidationError,
  ValidationResult,
} from "../validation/ValidationResult.ts";
import { Character } from "../character/Character.ts";
import { ModifierSource } from "../modifiers/IModifier.ts";
import { CombatSenseAwarenessModifier } from "../modifiers/CombatSenseModifier.ts";

export const ROLE_NAMES = [
  "solo",
  "rocker",
  "netrunner",
  "media",
  "nomad",
  "fixer",
  "cop",
  "corporate",
  "techie",
  "medtechie",
] as const;

export type RoleName = (typeof ROLE_NAMES)[number];

type Occupation = { title: string; salary: number };

type OccupationsTuple = [
  Occupation,
  Occupation,
  Occupation,
  Occupation,
  Occupation,
  Occupation,
];

class _Role implements ModifierSource {
  readonly name: RoleName;
  readonly specialAbility: SpecialAbilityName;
  readonly careerSkills: Set<SkillName | SkillName[]>;
  readonly occupations: Occupation[];

  constructor(
    name: RoleName,
    specialAbility: SpecialAbilityName,
    careerSkills: Iterable<SkillName | SkillName[]>,
    occupations: OccupationsTuple,
  ) {
    this.name = name;
    this.specialAbility = specialAbility;
    this.careerSkills = new Set(careerSkills);

    if (this.careerSkills.size !== 9) {
      throw new Error("Career skills number mismatch");
    }
    this.occupations = Array.of(
      occupations[0],
      occupations[0],
      occupations[0],
      occupations[0],
      ...occupations,
    );
    if (this.occupations.length !== 10) {
      throw new Error("Occupations number mismatch");
    }
  }

  asModifierSource(): string {
    return `Modifier from role ${this.name}`;
  }

  applyModifiers(character: Character): void {
    if (this.specialAbility === "Combat Sense") {
      const awareness = new CombatSenseAwarenessModifier(
        "Bonus on awareness from combat sense",
      );
      awareness.applyModifier(this, character);
    }
  }

  validateCareerSkills(careerSkills: SkillsRecord): ValidationResult {
    const inputSkills = new Set(Object.keys(careerSkills));
    if (inputSkills.size > 10) {
      return ValidationError.critical("Career skills number exceeded");
    }
    if (!inputSkills.has(this.specialAbility)) {
      return ValidationError.critical(
        "Career skills should contain special ability",
      );
    }
    this.careerSkills.forEach((careerSkillOption) => {
      if (typeof careerSkillOption === "string") {
        inputSkills.delete(careerSkillOption);
      } else {
        careerSkillOption.forEach((option) => {
          inputSkills.delete(option);
        });
      }
    });
    if (inputSkills.size !== 1) {
      return ValidationError.critical("Career skills number mismatch");
    }
    return true;
  }
}

export type Role = _Role;

export const ROLES: Record<RoleName, Role> = {
  media: new _Role(
    "media",
    "Credibility",
    [
      "Awareness/Notice",
      "Composition",
      "Education & Gen. Know",
      "Persuasion & Fast Talk",
      "Human Perception",
      "Social",
      "Streetwise",
      "Photo & Film",
      "Interview",
    ],
    [
      {
        title: "Stringer Reporter",
        salary: 1000,
      },
      {
        title: "Staff Reporter",
        salary: 1200,
      },
      {
        title: "Section Editor",
        salary: 3000,
      },
      {
        title: "Producer/ Managing Editor",
        salary: 5000,
      },
      {
        title: "Local Media Personality",
        salary: 7000,
      },
      {
        title: "National Media Personality",
        salary: 1000,
      },
    ],
  ),
  solo: new _Role(
    "solo",
    "Combat Sense",
    [
      "Awareness/Notice",
      "Handgun",
      ["Brawling", ...martialArtNames],
      "Melee",
      "Weaponsmith",
      "Rifle",
      "Athletics",
      "Submachinegun",
      "Stealth",
    ],
    [
      { title: "Street Ronin", salary: 2000 },
      { title: "Private Enforcer", salary: 3000 },
      { title: "Corporate Muscle", salary: 4500 },
      { title: "Professional Operative", salary: 7000 },
      { title: "Major League Hitter", salary: 9000 },
      { title: "Solo Elite", salary: 12000 },
    ],
  ),
  rocker: new _Role(
    "rocker",
    "Charismatic Leadership",
    [
      "Awareness/Notice",
      "Perform",
      "Wardrobe & Style",
      "Composition",
      "Brawling",
      "Play Instrument",
      "Streetwise",
      "Persuasion & Fast Talk",
      "Seduction",
    ],
    [
      { title: "Desperate for gigs", salary: 1000 },
      { title: "Regular Club Jobs", salary: 1500 },
      { title: "Play the Big Clubs", salary: 2000 },
      { title: "You've got a Contract", salary: 5000 },
      { title: "Concert Band", salary: 8000 },
      { title: "Major Act", salary: 12000 },
    ],
  ),
  netrunner: new _Role(
    "netrunner",
    "Interface",
    [
      "Awareness/Notice",
      "Basic Tech",
      "Education & Gen. Know",
      "System Knowledge",
      "CyberTech",
      "Cyberdeck Design",
      "Composition",
      "Electronics",
      "Programming",
    ],
    [
      { title: "Weefle Runner", salary: 1000 },
      { title: "Hacker", salary: 2000 },
      { title: "Bit Jockey", salary: 3000 },
      { title: "Net Cowboy", salary: 5000 },
      { title: "Deckslinger", salary: 7000 },
      { title: "Sysop", salary: 10000 },
    ],
  ),
  nomad: new _Role(
    "nomad",
    "Family",
    [
      "Awareness/Notice",
      "Endurance",
      "Melee",
      "Rifle",
      "Driving",
      "Basic Tech",
      "Wilderness Survival",
      "Brawling",
      "Athletics",
    ],
    [
      { title: "Clanmember", salary: 1000 },
      { title: "Warrior", salary: 1500 },
      { title: "Head of Household", salary: 2000 },
      { title: "Scout", salary: 3000 },
      { title: "Clan Senior", salary: 4000 },
      { title: "Family Head", salary: 5000 },
    ],
  ),
  fixer: new _Role(
    "fixer",
    "Streetdeal",
    [
      "Awareness/Notice",
      "Forgery",
      "Handgun",
      "Brawling",
      "Melee",
      "Pick Lock",
      "Pick Pocket",
      "Intimidate",
      "Persuasion & Fast Talk",
    ],
    [
      { title: "Street Punk", salary: 1500 },
      { title: "Gang Leader", salary: 3000 },
      { title: "Enforcer", salary: 5000 },
      { title: "Sub-Lieutenant", salary: 7000 },
      { title: "Lieutenant", salary: 8000 },
      { title: "Crime Boss", salary: 10000 },
    ],
  ),
  cop: new _Role(
    "cop",
    "Authority",
    [
      "Awareness/Notice",
      "Handgun",
      "Human Perception",
      "Athletics",
      "Education & Gen. Know",
      "Brawling",
      "Melee",
      "Interrogation",
      "Streetwise",
    ],
    [
      { title: "Private Guard", salary: 1000 },
      { title: "City Cop", salary: 1200 },
      { title: "Corporate Guard/Detective", salary: 3000 },
      { title: "Corp. Security/Psycho Squad", salary: 5000 },
      { title: "Enforcement Team Leader", salary: 7000 },
      { title: "Security Head/Police Chief", salary: 9000 },
    ],
  ),
  corporate: new _Role(
    "corporate",
    "Resources",
    [
      "Awareness/Notice",
      "Human Perception",
      "Education & Gen. Know",
      "Library Search",
      "Social",
      "Persuasion & Fast Talk",
      "Stock Market",
      "Wardrobe & Style",
      "Personal Grooming",
    ],
    [
      { title: "Assistant", salary: 1500 },
      { title: "Manager", salary: 3000 },
      { title: "Junior Executive", salary: 5000 },
      { title: "Executive", salary: 7000 },
      { title: "Department Head", salary: 9000 },
      { title: "Division Head", salary: 12000 },
    ],
  ),
  techie: new _Role(
    "techie",
    "Jury Rig",
    [
      "Awareness/Notice",
      "Basic Tech",
      "CyberTech",
      "Teaching",
      "Education & Gen. Know",
      "Electronics",
      ["Gyro Tech", "Aero Tech", "Weaponsmith", "Elect. Security"],
      ["Gyro Tech", "Aero Tech", "Weaponsmith", "Elect. Security"],
      ["Gyro Tech", "Aero Tech", "Weaponsmith", "Elect. Security"],
    ],
    [
      { title: "Freelance Technician", salary: 1500 },
      { title: "Shop Tech", salary: 3000 },
      { title: "Corporate Tech", salary: 5000 },
      { title: "Specialist Engineer", salary: 7000 },
      { title: "Lead Designer", salary: 9000 },
      { title: "R&D Director", salary: 12000 },
    ],
  ),
  medtechie: new _Role(
    "medtechie",
    "Medical Tech",
    [
      "Awareness/Notice",
      "Basic Tech",
      "Diagnose Illness",
      "Education & Gen. Know",
      "Cryotank Operation",
      "Library Search",
      "Pharmaceuticals",
      "Zoology",
      "Human Perception",
    ],
    [
      { title: "Patchman", salary: 1600 },
      { title: "Medical Technician", salary: 3000 },
      { title: "RipperDoc", salary: 5000 },
      { title: "Trauma Team Medic", salary: 7000 },
      { title: "General Practitioner", salary: 10000 },
      { title: "Specialist Physician", salary: 15000 },
    ],
  ),
};
