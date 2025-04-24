import React, { useState } from "react";
import { AttackResult, Range } from "@domain/calculator/AttackCalculator.ts";
import { Weapon } from "@domain/weapons/Weapon.ts";
import { attackCalculator } from "@repo";
import { AttackResultCard } from "@/routes/calculator/components/AttackResult";

export const SingleShot: React.FC<{
  range: Range | null;
  skillValue: number;
  weapon: Weapon;
}> = (p) => {
  const [attackResult, setAttackResult] = useState<AttackResult>();
  const enabled = !(!p.range || Number.isNaN(p.skillValue));
  return (
    <div>
      <h2>Single shot</h2>
      <button
        disabled={!enabled}
        onClick={() => {
          setAttackResult(
            attackCalculator.computeSingleShot(
              p.weapon,
              p.skillValue,
              p.range!,
            ),
          );
        }}
      >
        Calculate
      </button>
      {attackResult && <AttackResultCard name={"1"} attack={attackResult} />}
    </div>
  );
};
