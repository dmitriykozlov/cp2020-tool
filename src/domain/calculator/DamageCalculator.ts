import { HIT_LOCATION_INDEX, HIT_LOCATIONS } from "@domain/armor/HitLocations";
import { AttackResult } from "./AttackCalculator";

type DamagePerHit = {
  sp: number;
  armorPenetrated: boolean;
  dmg: number;
};

export type TakenDamageCalculations = {
  hits: DamagePerHit[];
  newSP: number[];
  damagePerLocation: number[];
};

function calculateDamagePerLocation(
  hits: DamagePerHit[],
  attack: AttackResult,
): number[] {
  return hits.reduce(
    (result, hit, index) => {
      result[HIT_LOCATION_INDEX[attack.hits[index].location]] += hit.dmg;
      return result;
    },
    Array.from<number>({ length: HIT_LOCATIONS.length }).fill(0),
  );
}

function calculatePenetration(
  damage: number,
  sp: number,
  location: string,
  armorPiercing: boolean,
): { penetratedDamage: number; armorPenetrated: boolean } {
  const alteredSp = armorPiercing ? Math.floor(sp / 2) : sp;

  let penetratedDamage = Math.max(damage - alteredSp, 0);
  const armorPenetrated = penetratedDamage > 0;

  if (armorPiercing) {
    penetratedDamage = Math.floor(penetratedDamage / 2);
  }

  if (location === "head" && armorPenetrated) {
    penetratedDamage *= 2;
  }

  return { penetratedDamage, armorPenetrated };
}

export function calculateDamage(
  attack: AttackResult,
  stoppingPowers: number[],
  btm: number,
  armorPiercing: boolean,
): TakenDamageCalculations {
  const copiedSP = Array.from(stoppingPowers);
  const hits: DamagePerHit[] = [];

  // Calculate damage for each hit
  for (const hit of attack.hits) {
    const locationIndex = HIT_LOCATION_INDEX[hit.location];
    const sp = copiedSP[locationIndex];
    const { penetratedDamage, armorPenetrated } = calculatePenetration(
      hit.damage.result,
      sp,
      hit.location,
      armorPiercing,
    );

    if (armorPenetrated) {
      copiedSP[locationIndex] = Math.max(sp - 1, 0);
    }

    hits.push({
      sp,
      armorPenetrated,
      dmg: Math.max(penetratedDamage - btm, 0),
    });
  }

  const damagePerLocation = calculateDamagePerLocation(hits, attack);

  return {
    hits,
    newSP: copiedSP,
    damagePerLocation,
  };
}
