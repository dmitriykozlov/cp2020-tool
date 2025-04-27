import {
  AVAILABILITY,
  Availability,
  CONCEALABILITY,
  Concealabillty,
  RELIABILITY,
  Reliability,
  WEAPON_TYPES,
  WeaponType,
} from "../rules/weapon/constants.ts";
import { DiceFormula } from "../random/DiceFormula.ts";
import { Valuable } from "../Valuable.ts";
import { Range } from "../calculator/AttackCalculator.ts";

const CODE_SEPARATOR = "|";

type JSONRep = {
  name: string;
  group: string;
  type: string;
  wa: number;
  con: string;
  avail: string;
  dmg: string;
  ammo: string;
  shots: number;
  rof: number;
  rel: string;
  range: number;
  cost: number;
};

export type WeaponConstructorArgs = {
  name: string;
  type: WeaponType;
  accuracy: number;
  concealabillty: Concealabillty;
  availability: Availability;
  damage: DiceFormula | string;
  ammo: string;
  shots: number;
  rateOfFire: number;
  reliability: Reliability;
  range: number;
  weight: number;
  group?: string;
} & Valuable;

export class Weapon implements Valuable {
  name: string;
  type: WeaponType;
  accuracy: number;
  concealabillty: Concealabillty;
  availability: Availability;
  damage: DiceFormula;
  ammo: string;
  shots: number;
  rateOfFire: number;
  reliability: Reliability;
  range: number;
  weight: number;
  cost: number;
  group: string;

  constructor(args: WeaponConstructorArgs) {
    this.name = args.name;
    this.type = args.type;
    this.accuracy = args.accuracy;
    this.concealabillty = args.concealabillty;
    this.availability = args.availability;
    if (args.damage instanceof DiceFormula) this.damage = args.damage;
    else this.damage = DiceFormula.fromFormula(args.damage);
    this.ammo = args.ammo;
    this.shots = args.shots;
    this.rateOfFire = args.rateOfFire;
    this.reliability = args.reliability;
    this.range = args.range;
    this.weight = args.weight;
    this.cost = args.cost;
    this.group = args.group ?? "No group";
  }

  get codeAsArray(): string[] {
    return [
      this.name,
      this.type,
      this.accuracy > 0 ? "+" + this.accuracy : this.accuracy.toString(),
      this.concealabillty,
      this.availability,
      this.damage.toString(),
      this.ammo,
      this.shots.toString(),
      this.rateOfFire.toString(),
      this.reliability,
      this.range.toString() + "m",
      this.weight.toString() + "kg",
    ];
  }

  get code(): string {
    return this.codeAsArray.join(CODE_SEPARATOR);
  }

  get ROF(): number {
    return this.rateOfFire;
  }

  get isAutomatic(): boolean {
    return this.rateOfFire >= 3;
  }

  static fromCode(code: string): Weapon {
    const [
      name,
      type,
      accuracy,
      concealability,
      availability,
      damage,
      ammunition,
      shots,
      rateOfFire,
      reliability,
      range,
      weight,
      cost,
    ] = code.split(CODE_SEPARATOR);
    if (!(type in WEAPON_TYPES)) throw new Error(`Type is invalid: ${type}`);
    const accuracyNumber = Number(accuracy);
    if (Number.isNaN(accuracyNumber))
      throw new Error(`Accuracy is invalid: ${accuracy}`);
    if (!(concealability in CONCEALABILITY))
      throw new Error(`Concealability is invalid: ${concealability}`);
    if (!(availability in AVAILABILITY))
      throw new Error(`Availability is invalid: ${availability}`);
    const shotsNumber = Number(shots);
    if (Number.isNaN(shotsNumber)) {
      throw new Error(`Shots is invalid: ${shots}`);
    }
    const rateOfFireNumber = Number(rateOfFire);
    if (Number.isNaN(rateOfFireNumber)) {
      throw new Error(`Rate of Fire is invalid: ${rateOfFire}`);
    }
    if (!(reliability in RELIABILITY)) {
      throw new Error(`Reliability is invalid: ${reliability}`);
    }
    const rangeNumber = Number(range);
    if (Number.isNaN(rangeNumber)) {
      throw new Error(`Range is invalid: ${range}`);
    }
    const weightNumber = Number(weight);
    if (Number.isNaN(weightNumber)) {
      throw new Error(`Weight is invalid: ${weight}`);
    }
    const costNumber = Number(cost);
    return new Weapon({
      name,
      type: type as WeaponType,
      accuracy: accuracyNumber,
      concealabillty: concealability as Concealabillty,
      availability: availability as Availability,
      damage: DiceFormula.fromFormula(damage),
      ammo: ammunition,
      shots: shotsNumber,
      rateOfFire: rateOfFireNumber,
      reliability: reliability as Reliability,
      range: rangeNumber,
      weight: weightNumber,
      cost: costNumber,
    });
  }

  static fromJSON(data: JSONRep) {
    if (!(data.avail in AVAILABILITY)) {
      throw new Error(
        `Availability for ${data.name} is invalid: ${data.avail}`,
      );
    }
    if (!(data.con in CONCEALABILITY)) {
      throw new Error(
        `Concealability for ${data.name} is invalid: ${data.con}`,
      );
    }
    if (!(data.rel in RELIABILITY)) {
      throw new Error(`Reliability for ${data.name} is invalid: ${data.rel}`);
    }
    if (!(data.type in WEAPON_TYPES)) {
      throw new Error(`Type for ${data.name} is invalid: ${data.type}`);
    }
    return new Weapon({
      accuracy: data.wa,
      ammo: data.ammo,
      availability: data.avail as Availability,
      concealabillty: data.con as Concealabillty,
      cost: data.cost,
      damage: DiceFormula.fromFormula(data.dmg),
      name: data.name,
      range: data.range,
      rateOfFire: data.rof,
      reliability: data.rel as Reliability,
      shots: data.shots,
      type: data.type as WeaponType,
      weight: 0,
      group: data.group,
    });
  }

  computeRange(distance: number): Range {
    if (distance <= 2) return "POINT_BLANK";
    if (distance <= this.range / 4) return "CLOSE";
    if (distance <= this.range / 2) return "MEDIUM";
    if (distance <= this.range) return "LONG";
    return "EXTREME";
  }
}
