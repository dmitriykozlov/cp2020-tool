import { RandomDice } from "../random/Dice.ts";
import {
  HIT_LOCATION_INDEX,
  HitLocation,
  rollHitLocation,
} from "../armor/HitLocations.ts";
import { Weapon } from "../weapons/Weapon.ts";
import { FormulaRollResult, RollResult } from "@domain/random/RollResult.ts";

export const RANGES = {
  POINT_BLANK: 10,
  CLOSE: 15,
  MEDIUM: 20,
  LONG: 25,
  EXTREME: 30,
} as const;

export type Range = keyof typeof RANGES;

const BURST_BONUS = 3;

const APPLY_BURST_BONUS = new Set<Range>(["CLOSE", "MEDIUM", "POINT_BLANK"]);

const APPLY_FULL_AUTO_BONUS = new Set<Range>(["CLOSE", "POINT_BLANK"]);

type Hit = {
  location: HitLocation;
  damage: FormulaRollResult;
};

export type AttackResult = {
  attackRoll: RollResult;
  hits: Hit[];
};

export type FullAutoResult = {
  targets: Array<AttackResult>;
};

export type SuppressiveFire = {
  saveNumber: number;
  fireZoneWidth: number;
};

function insideMinMax(min: number, value: number, max: number): number {
  return Math.max(min, Math.min(value, max));
}

export class AttackCalculator {
  randomDice: RandomDice;

  constructor(randomDice: RandomDice) {
    this.randomDice = randomDice;
  }

  computeSingleShot(
    weapon: Weapon,
    skillValue: number,
    range: Range,
  ): AttackResult {
    const attack = this.computeAttack(skillValue, weapon.accuracy);
    const hits: Hit[] = [];
    if (attack.result >= RANGES[range]) {
      hits.push(this.computeHit(weapon));
    }

    return {
      attackRoll: attack,
      hits,
    };
  }

  computeBurst(weapon: Weapon, skillValue: number, range: Range): AttackResult {
    const burstBonus = APPLY_BURST_BONUS.has(range) ? BURST_BONUS : 0;
    const attack = this.computeAttack(skillValue, weapon.accuracy, burstBonus);

    let hits: Hit[] = [];
    if (attack.result >= RANGES[range]) {
      const hitsAmount = this.randomDice.roll(3, 1);
      hits = this.computeSeveralHits(hitsAmount.result, weapon);
    }

    return {
      attackRoll: attack,
      hits,
    };
  }

  computeFullAuto(
    weapon: Weapon,
    skillValue: number,
    numberOfTargets: number,
    range: Range,
  ): FullAutoResult {
    const targets: FullAutoResult["targets"] = [];
    const roundsPerTarget = Math.floor(weapon.rateOfFire / numberOfTargets);
    const difficulty = RANGES[range];

    const attackBonusValue = Math.floor(roundsPerTarget / 10);

    const attackBonus = APPLY_FULL_AUTO_BONUS.has(range)
      ? attackBonusValue
      : -attackBonusValue;

    for (let i = 0; i < numberOfTargets; i++) {
      const attack = this.computeAttack(
        skillValue,
        weapon.accuracy,
        attackBonus,
      );
      const numberOfHits = insideMinMax(
        0,
        attack.result - difficulty,
        roundsPerTarget,
      );
      targets.push({
        attackRoll: attack,
        hits: this.computeSeveralHits(numberOfHits, weapon),
      });
    }

    return {
      targets,
    };
  }

  private computeAttack(...modifiers: number[]): RollResult {
    return this.randomDice.rollExploding(10).applyModifiers(...modifiers);
  }

  private computeHit(weapon: Weapon): Hit {
    return {
      damage: weapon.damage.roll(this.randomDice),
      location: rollHitLocation(this.randomDice),
    };
  }

  private computeSeveralHits(numberOfHits: number, weapon: Weapon): Hit[] {
    return Array.from(
      { length: numberOfHits },
      (): Hit => this.computeHit(weapon),
    ).sort(
      (a, b) => HIT_LOCATION_INDEX[a.location] - HIT_LOCATION_INDEX[b.location],
    );
  }
}
