import { Dice } from "@domain/random/Dice.ts";
import { Weapon } from "@domain/weapons/Weapon.ts";
import { RELIABILITY_TABLE } from "@domain/rules/weapon/constants.ts";
import { RollResult } from "@domain/random/RollResult.ts";
import { AttackCalculator, Hit } from "@domain/calculator/AttackCalculator.ts";

export type Fumble = {
  description: string;
  reliabilityRoll?: RollResult;
  hits?: Hit[];
};

export function computeCombatFumble(weapon: Weapon, dice: Dice): Fumble {
  if (weapon.isAutomatic) {
    return jammingFumble(weapon, dice);
  }

  const fumbleRoll = dice.roll(10, 1);

  switch (fumbleRoll.result) {
    case 5:
      return { description: "You drop your weapon." };
    case 6:
      return dischargeFumble(weapon, dice);
    case 7:
      return jammingFumble(weapon, dice);
    case 8:
      return injuryFumble("You manage to wound yourself.", weapon, dice);
    case 9:
    case 10:
      return injuryFumble(
        "You manage to wound a member of your own party.",
        weapon,
        dice,
      );
    default: {
      return {
        description: "No fumble. You just screw up.",
      };
    }
  }
}

function dischargeFumble(weapon: Weapon, dice: Dice): Fumble {
  const reliabilityRoll = dice.roll(10, 1);
  if (reliabilityRoll.result > RELIABILITY_TABLE[weapon.reliability]) {
    return {
      description: "Attack strikes something harmless.",
      reliabilityRoll,
    };
  } else {
    return {
      description: "Weapon discharges and hits something harmless.",
      reliabilityRoll,
    };
  }
}

export function jammingFumble(weapon: Weapon, dice: Dice) {
  const reliabilityRoll = dice.roll(10, 1);
  if (reliabilityRoll.result > RELIABILITY_TABLE[weapon.reliability]) {
    return {
      description: "Weapon imbeds itself in the ground for one turn.",
      reliabilityRoll,
    };
  } else {
    const turnsToFix = dice.roll(6, 1);
    return {
      description: `Weapon jams for ${turnsToFix.result} turns.`,
      reliabilityRoll,
    };
  }
}

function injuryFumble(description: string, weapon: Weapon, dice: Dice): Fumble {
  const attackCalc = new AttackCalculator(dice);

  return {
    description,
    hits: attackCalc.computeSeveralHits(1, weapon),
  };
}
