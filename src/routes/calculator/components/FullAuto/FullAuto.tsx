import React, { useState } from "react";
import { FullAutoResult, Range } from "@domain/calculator/AttackCalculator.ts";
import { Weapon } from "@domain/weapons/Weapon.ts";
import { attackCalculator } from "@repo";
import { Input } from "@/coreComponents/Input/Input.tsx";
import { AttackResultCard } from "@/routes/calculator/components/AttackResult";

export const FullAuto: React.FC<{
  range: Range | null;
  skillValue: number;
  weapon: Weapon;
}> = (p) => {
  const [hitResult, setHitResult] = useState<FullAutoResult>();
  const [numOfTargets, setNumOfTargets] = useState("3");
  const numberOfTargets = Number(numOfTargets);
  const enabled = !(
    !p.range ||
    Number.isNaN(p.skillValue) ||
    Number.isNaN(numberOfTargets)
  );
  return (
    <div>
      <p>
        <Input
          label="# of targets "
          value={numOfTargets}
          type="number"
          onChange={(e) => {
            setNumOfTargets(e.target.value);
          }}
        />
      </p>
      <button
        disabled={!enabled}
        onClick={() => {
          setHitResult(
            attackCalculator.computeFullAuto(
              p.weapon,
              p.skillValue,
              numberOfTargets,
              p.range!,
            ),
          );
        }}
      >
        Calculate
      </button>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
        {hitResult &&
          hitResult.targets.map((target, index) => (
            <AttackResultCard
              name={`Target #${index + 1}`}
              attack={target}
              key={index}
            />
          ))}
      </div>
    </div>
  );
};
