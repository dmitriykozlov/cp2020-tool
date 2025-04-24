import React from "react";
import { attackCalculator } from "@repo";
import { CommonProps } from "@/routes/calculator/components/SettingsComponents/common.ts";
import styles from "./settings.module.css";

export const SingleShot: React.FC<CommonProps> = (p) => {
  const enabled = !(!p.range || Number.isNaN(p.skillValue));
  return (
    <div>
      <button
        className={styles.fire}
        disabled={!enabled}
        onClick={() => {
          p.onCalculate([
            attackCalculator.computeSingleShot(
              p.weapon,
              p.skillValue,
              p.range!,
            ),
          ]);
        }}
      >
        Fire!
      </button>
      <button
        className={styles.fire}
        disabled={!enabled || p.weapon.ROF < 2}
        onClick={() => {
          p.onCalculate([
            attackCalculator.computeSingleShot(
              p.weapon,
              p.skillValue,
              p.range!,
            ),
            attackCalculator.computeSingleShot(
              p.weapon,
              p.skillValue,
              p.range!,
            ),
          ]);
        }}
      >
        Double shot
      </button>
    </div>
  );
};
