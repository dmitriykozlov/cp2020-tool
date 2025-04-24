import React from "react";
import { attackCalculator } from "@repo";
import { CommonProps } from "@/routes/calculator/components/SettingsComponents/common.ts";
import styles from "@/routes/calculator/components/SettingsComponents/settings.module.css";

export const BurstShot: React.FC<CommonProps> = (p) => {
  const enabled = !(!p.range || Number.isNaN(p.skillValue));
  return (
    <>
      <button
        className={styles.fire}
        disabled={!enabled}
        onClick={() => {
          p.onCalculate([
            attackCalculator.computeBurst(p.weapon, p.skillValue, p.range!),
          ]);
        }}
      >
        Fire!
      </button>
    </>
  );
};
