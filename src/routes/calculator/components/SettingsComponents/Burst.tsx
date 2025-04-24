import React from "react";
import { attackCalculator } from "@repo";
import { CommonProps } from "@/routes/calculator/components/SettingsComponents/common.ts";

export const BurstShot: React.FC<CommonProps> = (p) => {
  const enabled = !(!p.range || Number.isNaN(p.skillValue));
  return (
    <>
      <button
        disabled={!enabled}
        onClick={() => {
          p.onCalculate([
            attackCalculator.computeBurst(p.weapon, p.skillValue, p.range!),
          ]);
        }}
      >
        Calculate
      </button>
    </>
  );
};
