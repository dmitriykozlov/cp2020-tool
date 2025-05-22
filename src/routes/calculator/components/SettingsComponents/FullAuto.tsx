import React, { useState } from "react";
import { attackCalculator } from "@repo/main";
import { Input } from "@/coreComponents/Input/Input.tsx";
import { CommonProps } from "@/routes/calculator/components/SettingsComponents/common.ts";
import styles from "@/routes/calculator/components/SettingsComponents/settings.module.css";
import { observer } from "mobx-react-lite";

export const FullAuto: React.FC<CommonProps> = observer((p) => {
  const [numOfTargets, setNumOfTargets] = useState("3");
  const numberOfTargets = Number(numOfTargets);
  const enabled = !(
    !p.store.range ||
    Number.isNaN(p.store.skillValue) ||
    Number.isNaN(numberOfTargets)
  );
  return (
    <>
      <p>
        <Input
          label="# of targets "
          value={numOfTargets}
          className={styles.fullAutoInput}
          type="number"
          onChange={(e) => {
            setNumOfTargets(e.target.value);
          }}
        />
      </p>
      <button
        className={styles.fire}
        disabled={!enabled}
        onClick={() => {
          p.onCalculate(
            attackCalculator.computeFullAuto(
              p.weapon,
              p.store.skillValue,
              numberOfTargets,
              p.store.range!,
              p.store.activeModifiers.map((m) => m.value),
            ),
          );
        }}
      >
        Fire!
      </button>
    </>
  );
});
