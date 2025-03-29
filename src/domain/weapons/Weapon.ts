import {
  AVAILABILITY,
  Availability,
  CONCEALABILITY,
  Concealabillty,
  RELIABILITY,
  Reliability,
  WEAPON_TYPES,
  WeaponType,
} from "./constants.ts";
import { DiceFormula } from "../DiceFormula.ts";
import { Valuable } from "../Valuable.ts";

const CODE_SEPARATOR = "|";

export type WeaponConstructorArgs = {
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
} & Valuable;

// type WeaponJSON = WeaponConstructorArgs & {
//   damage: string;
// };

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

  constructor(args: WeaponConstructorArgs) {
    this.name = args.name;
    this.type = args.type;
    this.accuracy = args.accuracy;
    this.concealabillty = args.concealabillty;
    this.availability = args.availability;
    this.damage = args.damage;
    this.ammo = args.ammo;
    this.shots = args.shots;
    this.rateOfFire = args.rateOfFire;
    this.reliability = args.reliability;
    this.range = args.range;
    this.weight = args.weight;
    this.cost = args.cost;
  }

  get codeAsArray(): string[] {
    return [
      this.name,
      this.type,
      this.accuracy.toString(),
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

  // static fromJSON(json: string | WeaponJSON): Weapon {}
}
