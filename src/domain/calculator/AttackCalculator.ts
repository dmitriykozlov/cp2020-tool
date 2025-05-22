import { Dice } from "../random/Dice.ts";
import {
  HIT_LOCATION_INDEX,
  HitLocation,
  rollHitLocation,
} from "../armor/HitLocations.ts";
import { Weapon } from "../weapons/Weapon.ts";
import { FormulaRollResult, RollResult } from "@domain/random/RollResult.ts";
import {
  computeCombatFumble,
  Fumble,
  jammingFumble,
} from "@domain/rules/weapon/ComputeCombatFumble.ts";

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

export type Hit = {
  location: HitLocation;
  damage: FormulaRollResult;
};

export type AttackResult = {
  attackRoll: RollResult;
  fumble?: Fumble;
  hits: Hit[];
};

export type FullAutoResult = Array<AttackResult>;

export type SuppressiveFire = {
  saveNumber: number;
  fireZoneWidth: number;
};

function insideMinMax(min: number, value: number, max: number): number {
  return Math.max(min, Math.min(value, max));
}

export class AttackCalculator {
  dice: Dice;

  constructor(dice: Dice) {
    this.dice = dice;
  }

  computeSingleShot(
    weapon: Weapon,
    skillValue: number,
    range: Range,
    situationalModifiers: number[] = [],
  ): AttackResult {
    const attackRoll = this.computeAttack(
      skillValue,
      weapon.accuracy,
      ...situationalModifiers,
    );

    if (attackRoll.isCriticalFailure) {
      return {
        attackRoll,
        hits: [],
        fumble: computeCombatFumble(weapon, this.dice),
      };
    }

    const hits: Hit[] = [];
    if (!attackRoll.isCriticalFailure && attackRoll.result >= RANGES[range]) {
      hits.push(this.computeHit(weapon));
    }

    return {
      attackRoll,
      hits,
    };
  }

  computeBurst(
    weapon: Weapon,
    skillValue: number,
    range: Range,
    situationalModifiers: number[] = [],
  ): AttackResult {
    const burstBonus = APPLY_BURST_BONUS.has(range) ? BURST_BONUS : 0;
    const attackRoll = this.computeAttack(
      skillValue,
      weapon.accuracy,
      burstBonus,
      ...situationalModifiers,
    );

    if (attackRoll.isCriticalFailure) {
      return {
        attackRoll,
        hits: [],
        fumble: jammingFumble(weapon, this.dice),
      };
    }

    let hits: Hit[] = [];
    if (!attackRoll.isCriticalFailure && attackRoll.result >= RANGES[range]) {
      const numberOfHits = this.dice.roll(3, 1);
      hits = this.computeSeveralHits(numberOfHits.result, weapon);
    }

    return {
      attackRoll,
      hits,
    };
  }

  computeFullAuto(
    weapon: Weapon,
    skillValue: number,
    numberOfTargets: number,
    range: Range,
    situationalModifiers: number[] = [],
  ): FullAutoResult {
    const targets: FullAutoResult = [];
    const roundsPerTarget = Math.floor(weapon.rateOfFire / numberOfTargets);
    const difficulty = RANGES[range];

    const attackBonusValue = Math.floor(roundsPerTarget / 10);

    const attackBonus = APPLY_FULL_AUTO_BONUS.has(range)
      ? attackBonusValue
      : -attackBonusValue;

    for (let i = 0; i < numberOfTargets; i++) {
      const attackRoll = this.computeAttack(
        skillValue,
        weapon.accuracy,
        attackBonus,
        ...situationalModifiers,
      );

      if (attackRoll.isCriticalFailure) {
        targets.push({
          attackRoll,
          hits: [],
          fumble: jammingFumble(weapon, this.dice),
        });
      } else {
        const numberOfHits = insideMinMax(
          0,
          attackRoll.result - difficulty,
          roundsPerTarget,
        );

        targets.push({
          attackRoll: attackRoll,
          hits: this.computeSeveralHits(numberOfHits, weapon),
        });
      }
    }

    return targets;
  }

  public computeSeveralHits(numberOfHits: number, weapon: Weapon): Hit[] {
    return Array.from(
      { length: numberOfHits },
      (): Hit => this.computeHit(weapon),
    ).sort(
      (a, b) => HIT_LOCATION_INDEX[a.location] - HIT_LOCATION_INDEX[b.location],
    );
  }

  private computeAttack(...modifiers: number[]): RollResult {
    return this.dice.rollExploding(10).applyModifiers(...modifiers);
  }

  private computeHit(weapon: Weapon): Hit {
    return {
      damage: weapon.damage.roll(this.dice),
      location: rollHitLocation(this.dice),
    };
  }
}
