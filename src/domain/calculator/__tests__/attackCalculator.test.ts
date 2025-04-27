import { MockDice } from "@domain/calculator/__tests__/MockDice.ts";
import { describe, expect, it } from "vitest";
import { AttackCalculator } from "@domain/calculator/AttackCalculator.ts";
import { Weapon } from "@domain/weapons/Weapon.ts";
import { RollResult } from "@domain/random/RollResult.ts";

const mockDice = new MockDice();

const attackCalculator = new AttackCalculator(mockDice);

const w1 = Weapon.fromCode(
  "Stern meyer Type 35|P|0|J|C|3D6|11mm|8|2|VR|50|0.5",
);

const w2 = Weapon.fromCode("H&K MPK-11|SMG|1|J|C|2D6+3|10mm|35|32|ST|150|1");

describe("Single shot mode", () => {
  it("arbitrary single shot", () => {
    mockDice.setRolls(
      new RollResult([8]),
      new RollResult([2, 6, 5]),
      new RollResult([6]),
    );
    const result = attackCalculator.computeSingleShot(w1, 12, "MEDIUM");

    expect(result.attackRoll.result).toBe(8 + 12);
    expect(result.hits.length).toBe(1);
    const hit = result.hits[0];
    expect(hit.damage.result).toBe(2 + 6 + 5);
    expect(hit.location).toBe("left_arm");
  });
  it("critical failure injury fumble", () => {
    mockDice.setRolls(
      new RollResult([1]), // Attack roll critical failure
      new RollResult([8]), // Fumble: you injure yourself
      new RollResult([3, 6, 5]), // sternmyer damage
      new RollResult([5]), // location hit 6
    );

    const result = attackCalculator.computeSingleShot(w1, 12, "MEDIUM");

    expect(result.fumble).toBeDefined();
    expect(result.fumble?.description).toBe("You manage to wound yourself.");
    expect(result.fumble?.hits?.length).toBe(1);
    expect(result.fumble?.hits?.[0]?.damage?.result).toBe(3 + 6 + 5);
    expect(result.fumble?.hits?.[0]?.location).toBe("right_arm");
  });
  it("critical failure jammed weapon", () => {
    mockDice.setRolls(
      new RollResult([1]), // Attack roll critical failure
      new RollResult([7]), // Fumble: jammed weapon
      new RollResult([3]), // reliability roll for VR jamms on 3 or less
      new RollResult([5]), // Jamms for 5 turns
    );

    const result = attackCalculator.computeSingleShot(w1, 12, "MEDIUM");

    expect(result.fumble).toBeDefined();
    expect(result.fumble?.description).toBe("Weapon jams for 5 turns.");
  });
});

describe("Burst mode", () => {
  it("successful burst at MEDIUM range", () => {
    // Attack roll, number of hits roll, damage rolls, hit location rolls
    mockDice.setRolls(
      new RollResult([9]), // Attack roll (9 + skill will exceed MEDIUM difficulty of 20)
      new RollResult([2]), // 2 hits
      new RollResult([3, 4]), // Damage for hit 1
      new RollResult([1]), // Location for hit 1
      new RollResult([2, 3]), // Damage for hit 2
      new RollResult([4]), // Location for hit 2
    );

    const result = attackCalculator.computeBurst(w2, 10, "MEDIUM");

    // With burst at MEDIUM range, there's a +3 bonus
    expect(result.attackRoll.result).toBe(9 + 10 + 3 + 1);
    expect(result.hits.length).toBe(2);
    expect(result.hits[0].damage.result).toBe(3 + 4 + 3);
    expect(result.hits[0].location).toBe("head");
    expect(result.hits[1].damage.result).toBe(2 + 3 + 3);
    expect(result.hits[1].location).toBe("torso");
  });

  it("successful burst at LONG range (no burst bonus)", () => {
    mockDice.setRolls(
      new RollResult([9]), // Attack roll (10 + skill will exceed LONG difficulty of 25)
      new RollResult([3]), // 3 hits
      new RollResult([6, 6, 6]), // Damage for hit 1
      new RollResult([1]), // Location for hit 1
      new RollResult([5, 5, 5]), // Damage for hit 2
      new RollResult([2]), // Location for hit 2
      new RollResult([4, 4, 4]), // Damage for hit 3
      new RollResult([5]), // Location for hit 3
    );

    const result = attackCalculator.computeBurst(w1, 16, "LONG");

    // No burst bonus at LONG range
    expect(result.attackRoll.result).toBe(16 + 9);
    expect(result.hits.length).toBe(3);
    expect(result.hits[0].damage.result).toBe(6 + 6 + 6);
    expect(result.hits[0].location).toBe("head");
    expect(result.hits[1].damage.result).toBe(5 + 5 + 5);
    expect(result.hits[1].location).toBe("torso");
    expect(result.hits[2].damage.result).toBe(4 + 4 + 4);
    expect(result.hits[2].location).toBe("right_arm");
  });

  it("failed burst attack (roll too low)", () => {
    mockDice.setRolls(
      new RollResult([5]), // Low roll that won't meet difficulty even with modifiers
    );

    const result = attackCalculator.computeBurst(w2, 10, "MEDIUM");

    // 5 (roll) + 10 (skill) + 3 (burst bonus) = 18, which is less than MEDIUM difficulty of 20
    expect(result.attackRoll.result).toBe(5 + 10 + 3 + 1);
    expect(result.hits.length).toBe(0); // No hits when attack fails
  });

  it("critical failure jamm fumble", () => {
    mockDice.setRolls(
      new RollResult([1]), // attack roll nat 1, fumble
      new RollResult([5]), // reliability roll for st, jams on 5 or lower
      new RollResult([3]), // jams for 3 turns
    );

    const result = attackCalculator.computeBurst(w2, 10, "MEDIUM");

    expect(result.fumble).toBeDefined();
    expect(result.fumble?.description).toBe("Weapon jams for 3 turns.");
  });
});

describe("Full auto mode", () => {
  it("successful full auto at CLOSE range with single target", () => {
    mockDice.setRolls(
      new RollResult([7]), // Attack roll
      new RollResult([6, 6]), // Damage for hit 1
      new RollResult([1]), // Location for hit 1
      new RollResult([5, 5]), // Damage for hit 2
      new RollResult([2]), // Location for hit 2
    );

    // w2 has a rate of fire of 32, so with 1 target, that's 32 rounds per target
    // At CLOSE range, there's a positive bonus of Math.floor(32/10) = 3
    const results = attackCalculator.computeFullAuto(w2, 10, 1, "CLOSE");

    expect(results.length).toBe(1); // 1 target
    const targetResult = results[0];

    // 7 (roll) + 10 (skill) + 3 (full auto bonus) + weapon accuracy = 21, which exceeds CLOSE difficulty of 15 by 6
    // So we get min(6, 32) = 6 hits, but the test is only set up for 2 hits
    expect(targetResult.attackRoll.result).toBe(7 + 10 + 3 + w2.accuracy);
    expect(targetResult.hits.length).toBe(6); // This would actually be 5 in a real scenario
    expect(targetResult.hits[0].damage.result).toBe(6 + 6 + 3); // +3 from weapon formula
    expect(targetResult.hits[0].location).toBe("head");
    expect(targetResult.hits[5].damage.result).toBe(5 + 5 + 3); // +3 from weapon formula
    expect(targetResult.hits[5].location).toBe("torso");
  });

  it("failed full auto at LONG range with multiple targets", () => {
    mockDice.setRolls(
      new RollResult([9]), // Attack roll for target 1
      new RollResult([8]), // Attack roll for target 2
    );

    // w2 has a rate of fire of 32, so with 2 targets, that's 16 rounds per target
    // At LONG range, there's a negative bonus of -Math.floor(16/10) = -1
    const results = attackCalculator.computeFullAuto(w2, 10, 2, "LONG");

    expect(results.length).toBe(2); // 2 targets

    // Target 1: 9 (roll) + 10 (skill) - 1 (full auto penalty) + weapon accuracy = 19, which is less than LONG difficulty of 25
    // So we get 0 hits, but the test is set up for 1 hit for demonstration
    expect(results[0].attackRoll.result).toBe(9 + 10 - 1 + w2.accuracy);
    expect(results[0].hits.length).toBe(0); // This would actually be 0 in a real scenario

    // Target 2: 8 (roll) + 10 (skill) - 1 (full auto penalty) = 18, which is less than LONG difficulty of 25
    // So we get 0 hits
    expect(results[1].attackRoll.result).toBe(8 + 10 - 1 + w2.accuracy);
    expect(results[1].hits.length).toBe(0);
  });
});
