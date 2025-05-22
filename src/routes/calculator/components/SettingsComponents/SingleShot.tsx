import React from "react";
import { attackCalculator } from "@repo/main";
import { CommonProps } from "@/routes/calculator/components/SettingsComponents/common.ts";
import styles from "./settings.module.css";
import { observer } from "mobx-react-lite";

export const SingleShot: React.FC<CommonProps> = observer((p) => {
  const enabled = !(!p.store.range || Number.isNaN(p.store.skillValue));
  return (
    <div>
      <button
        className={styles.fire}
        disabled={!enabled}
        onClick={() => {
          p.onCalculate([
            attackCalculator.computeSingleShot(
              p.weapon,
              p.store.skillValue,
              p.store.range!,
              p.store.activeModifiers.map((m) => m.value),
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
              p.store.skillValue,
              p.store.range!,
              p.store.activeModifiers.map((m) => m.value),
            ),
            attackCalculator.computeSingleShot(
              p.weapon,
              p.store.skillValue,
              p.store.range!,
              p.store.activeModifiers.map((m) => m.value),
            ),
          ]);
        }}
      >
        Double shot
      </button>
    </div>
  );
});
