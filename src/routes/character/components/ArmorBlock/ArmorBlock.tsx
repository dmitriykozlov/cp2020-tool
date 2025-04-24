import React, { useState } from "react";
import { HIT_LOCATIONS, HIT_TABLE } from "@domain/armor/HitLocations.ts";
import c from "./armor.module.css";
import { HIT_LOCATIONS_DISPLAY } from "./constants.ts";
import { CoverSelector } from "@/components/CoverSelect/CoverSelector.tsx";
import { character } from "@/repository";

export const ArmorBlock: React.FC = () => {
  const [coverSp, setCoverSp] = useState(0);
  return (
    <div>
      <h2>Armor</h2>
      <table className={c.armorTable}>
        <thead>
          <tr className={c.bodyPartHeading}>
            {HIT_LOCATIONS.map((bodyPart) => (
              <th key={bodyPart}>{HIT_LOCATIONS_DISPLAY[bodyPart]}</th>
            ))}
          </tr>
          <tr className={c.hitTableHeading}>
            {HIT_LOCATIONS.map((bodyPart) => {
              const [min, max] = HIT_TABLE[bodyPart];
              if (min == max) return <th key={bodyPart}>{min}</th>;
              return (
                <th key={bodyPart}>
                  {min}-{max}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          <tr>
            {HIT_LOCATIONS.map((bodyPart) => (
              <td key={bodyPart}>
                {character.armorStat.calculateSP(bodyPart, coverSp)}
              </td>
            ))}
          </tr>
        </tbody>
      </table>
      <h3>Cover</h3>
      <CoverSelector
        value={coverSp}
        onChange={(value) => {
          setCoverSp(value);
        }}
      />
    </div>
  );
};
