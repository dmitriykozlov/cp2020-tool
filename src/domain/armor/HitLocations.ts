import { RandomDice } from "../random/Dice.ts";

export const HIT_LOCATIONS = [
  "head",
  "torso",
  "right_arm",
  "left_arm",
  "right_leg",
  "left_leg",
] as const;

export const HIT_LOCATION_INDEX = {
  head: 0,
  torso: 1,
  right_arm: 2,
  left_arm: 3,
  right_leg: 4,
  left_leg: 5,
};

export type HitLocation = (typeof HIT_LOCATIONS)[number];

export const HIT_TABLE: Record<HitLocation, [number, number]> = {
  head: [1, 1],
  torso: [2, 4],
  right_arm: [5, 5],
  left_arm: [6, 6],
  right_leg: [7, 8],
  left_leg: [9, 10],
} as const;

export function rollHitLocation(randomDice: RandomDice): HitLocation {
  const roll = randomDice.roll(10, 1);
  for (const key in HIT_TABLE) {
    const [min, max] = HIT_TABLE[key as HitLocation];
    if (roll.result >= min && roll.result <= max) {
      return key as HitLocation;
    }
  }
  return "torso";
}
