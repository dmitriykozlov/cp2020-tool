import React, { useState } from "react";
import { Weapon } from "@domain/weapons/Weapon.ts";
import { attackCalculator } from "@repo";
import { AttackResultCard } from "@/components/calculator/AttackResult";
import { AttackResult, Range } from "@domain/calculator/AttackCalculator.ts";

export const BurstShot: React.FC<{
  range: Range | null;
  skillValue: number;
  weapon: Weapon;
}> = (p) => {
  const [hitResult, setHitResult] = useState<AttackResult>();
  const enabled = !(!p.range || Number.isNaN(p.skillValue));
  return (
    <div>
      <h2>3R Burst</h2>
      <button
        disabled={!enabled}
        onClick={() => {
          setHitResult(
            attackCalculator.computeBurst(p.weapon, p.skillValue, p.range!),
          );
        }}
      >
        Calculate
      </button>
      {hitResult && (
        <AttackResultCard attack={hitResult} rangeBonus={3} name={"1"} />
      )}
    </div>
  );
};
