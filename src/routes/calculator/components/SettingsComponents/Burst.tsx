import React from "react";
import { attackCalculator } from "@repo/main";
import { CommonProps } from "@/routes/calculator/components/SettingsComponents/common.ts";
import styles from "@/routes/calculator/components/SettingsComponents/settings.module.css";
import { observer } from "mobx-react-lite";

export const BurstShot: React.FC<CommonProps> = observer((p) => {
  const enabled = !(!p.store.range || Number.isNaN(p.store.skillValue));
  return (
    <>
      <button
        className={styles.fire}
        disabled={!enabled}
        onClick={() => {
          p.onCalculate([
            attackCalculator.computeBurst(
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
    </>
  );
});
