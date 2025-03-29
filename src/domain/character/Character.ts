import { makeAutoObservable } from "mobx";
import { Role } from "../rules/Roles.ts";
import { Stats, StatsConstructorArg } from "./Stats.ts";
import { Skills, SkillsFactoryArgs } from "./Skills.ts";
import { Weapon, WeaponConstructorArgs } from "../weapons/Weapon.ts";
import { ArmorPiece, ArmorPieceConstArgs } from "../armor/ArmorPiece.ts";
import { HumanityModifier } from "../modifiers/HumanityModifier.ts";
import { ArmorStat } from "../armor/ArmorStat.ts";
import {
  Cybernetics,
  CyberneticsConstructorArgs,
} from "../cybernetics/Cybernetics.ts";

type Style = {
  clothes: string;
  hair: string;
  affections: string;
  ethnicity: string;
  language: string;
};

type CharacterConstructorArg = {
  handle: string;
  age: number;
  role: Role;
  stats: StatsConstructorArg;
  skills: SkillsFactoryArgs;
  money?: number;
  style: Style;
  familyBackground: string;
  reputation?: number;
  improvementPoints?: number;
  weapons?: WeaponConstructorArgs[];
  armor?: ArmorPieceConstArgs[];
  cybernetics?: CyberneticsConstructorArgs[];
};

export class Character {
  handle: string;
  age: number;
  style: Style;
  familyBackground: string;

  role: Role;

  money: number;
  reputation: number;
  improvementPoints: number;

  stats: Stats;

  skills: Skills;

  weapons: Weapon[];
  armor: Set<ArmorPiece>;
  armorStat: ArmorStat;

  cybernetics: Set<Cybernetics>;

  humanityModifiers: Set<HumanityModifier>;

  constructor(p: CharacterConstructorArg) {
    this.handle = p.handle;
    this.role = p.role;
    this.age = p.age;
    this.style = p.style;
    this.familyBackground = p.familyBackground;

    this.stats = new Stats(p.stats, this);

    this.skills = Skills.factory(p.skills, this);

    this.role.applyModifiers(this);

    this.improvementPoints = p.improvementPoints ?? 0;
    this.reputation = p.reputation ?? 0;
    this.money =
      p.money ?? this.role.occupations[this.skills.specialSkill.level].salary;
    this.weapons = p.weapons?.map((w) => new Weapon(w)) ?? [];

    this.armorStat = new ArmorStat(this);
    const armor = p.armor?.map(
      (arm: ArmorPieceConstArgs) => new ArmorPiece(arm, this),
    );

    this.armor = new Set<ArmorPiece>(armor);

    this.humanityModifiers = new Set();

    const cybernetics = p.cybernetics?.map((args) => {
      return new Cybernetics(args, this);
    });

    this.cybernetics = new Set(cybernetics);

    // const testModifier = new HumanityModifier(
    //   "Humanity loss from cybernetics",
    //   -12,
    // );
    // testModifier.applyModifier(testArmor, this);
    makeAutoObservable(this);
  }

  get humanity(): number {
    let modifierValue = 0;
    for (const mod of this.humanityModifiers) {
      modifierValue += mod.value;
    }
    return this.stats.empathy.baseValue * 10 + modifierValue;
  }
}
