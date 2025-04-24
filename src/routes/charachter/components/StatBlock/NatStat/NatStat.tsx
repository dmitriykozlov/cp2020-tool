import React, { useState } from "react";
import c from "./natstat.module.css";
import { Stat } from "@domain/character/Stat.ts";
import { shortened } from "@domain/rules/Stats.ts";
import { observer } from "mobx-react-lite";
import { action } from "mobx";
import { Input } from "@/coreComponents/Input/Input.tsx";

type NatStatProps = {
  stat: Stat;
};

export const NatStat: React.FC<NatStatProps> = observer(({ stat }) => {
  const [baseValue, setValue] = useState<string>(stat.baseValue.toString());
  return (
    <div className={c.natStatContainer}>
      <span className={c.label}>{shortened[stat.name]}</span>
      <span className={c.statValues}>
        {stat.value !== stat.baseValue && (
          <>
            <Input
              className={c.natStatInput}
              value={stat.value}
              disabled
              type="text"
            />
            /
          </>
        )}
        <Input
          className={c.natStatInput}
          value={baseValue}
          onChange={(e) => {
            setValue(e.target.value);
          }}
          onBlur={action((e) => {
            const num = Number(e.target.value);
            if (!Number.isNaN(num)) {
              stat.baseValue = num;
            }
          })}
        />
      </span>
    </div>
  );
});
