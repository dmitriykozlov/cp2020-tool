import React from "react";
import { HIT_LOCATIONS, HIT_TABLE } from "@domain/armor/HitLocations.ts";
import c from "./armor.module.css";
import { HIT_LOCATIONS_DISPLAY } from "./constants.ts";
import { CoverSelector } from "@/components/calculator/CoverSelect/CoverSelector.tsx";
import { useCoverSelectState } from "@/components/calculator/CoverSelect/useCoverSelectState.ts";
import { character } from "@/repository";

export const ArmorBlock: React.FC = () => {
  const [state, dispatch] = useCoverSelectState();
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
                {character.armorStat.calculateSP(bodyPart, state.sp)}
              </td>
            ))}
          </tr>
        </tbody>
      </table>
      <h3>Cover</h3>
      <CoverSelector state={state} dispatch={dispatch} />
    </div>
  );
};
