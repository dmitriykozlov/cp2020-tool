import React, { useState } from "react";
import { attackCalculator } from "@repo/main";
import { Input } from "@/coreComponents/Input/Input.tsx";
import { CommonProps } from "@/routes/calculator/components/SettingsComponents/common.ts";
import styles from "@/routes/calculator/components/SettingsComponents/settings.module.css";

export const FullAuto: React.FC<CommonProps> = (p) => {
  const [numOfTargets, setNumOfTargets] = useState("3");
  const numberOfTargets = Number(numOfTargets);
  const enabled = !(
    !p.range ||
    Number.isNaN(p.skillValue) ||
    Number.isNaN(numberOfTargets)
  );
  return (
    <>
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
        className={styles.fire}
        disabled={!enabled}
        onClick={() => {
          p.onCalculate(
            attackCalculator.computeFullAuto(
              p.weapon,
              p.skillValue,
              numberOfTargets,
              p.range!,
            ),
          );
        }}
      >
        Fire!
      </button>
    </>
  );
};
