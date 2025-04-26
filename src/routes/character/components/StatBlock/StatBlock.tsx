import React from "react";
import c from "./stat-block.module.css";
import { naturalStats } from "@domain/rules/Stats.ts";
import { character } from "@repo/main.ts";
import { NatStat } from "./NatStat/NatStat.tsx";
import { ComStat } from "./ComStat/ComStat.tsx";
import { observer } from "mobx-react-lite";

export const StatBlock: React.FC = observer(() => {
  return (
    <>
      <div>
        <p>Char points: {character.stats.characterPoints}</p>
      </div>
      <div className={c.natContainer}>
        {naturalStats.map((statName) => (
          <NatStat key={statName} stat={character.stats[statName]} />
        ))}
      </div>
      <div className={c.derivedContainer}>
        <ComStat name="run" value={character.stats.run} postfix="m" readonly />
        <ComStat
          name="leap"
          value={character.stats.leap}
          postfix="m"
          readonly
        />
        <ComStat
          name="carry"
          value={character.stats.carry}
          postfix="kg"
          readonly
        />
        <ComStat
          name="lift"
          value={character.stats.lift}
          postfix="kg"
          readonly
        />
        <ComStat name="save" value={character.stats.saveNumber} readonly />
        <ComStat name="BTM" value={character.stats.bodyTypeModifier} readonly />
        <ComStat name="Hum" value={character.humanity} readonly />
      </div>
      <div className={c.expContainer}>
        <ComStat name="Rep" value={character.reputation} />
        <ComStat name="IP" value={character.improvementPoints} />
      </div>
    </>
  );
});
