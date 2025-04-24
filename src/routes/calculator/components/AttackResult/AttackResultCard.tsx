import React, { useMemo } from "react";
import { AttackResult } from "@domain/calculator/AttackCalculator.ts";
import styles from "./attackResult.module.css";
import clsx from "clsx";
import { ArmorTable } from "@/routes/calculator/components/ArmorTable";
import { ArmorTableStore } from "@/routes/calculator/components/ArmorTable/ArmorTableStore.ts";
import { HIT_LOCATIONS_DISPLAY } from "@/routes/charachter/components/ArmorBlock/constants.ts";
import { HIT_LOCATION_INDEX, HitLocation } from "@domain/armor/HitLocations.ts";
import { observer } from "mobx-react-lite";

type TargetDamageProps = {
  name: string;
  attack: AttackResult;
  className?: string;
};

export const AttackResultCard: React.FC<TargetDamageProps> = observer(
  ({ attack, name, className }) => {
    const damageFormula = attack.hits[0]?.damage.formula.formula;

    const armorStore = useMemo<ArmorTableStore>(
      () => new ArmorTableStore(),
      [],
    );

    const affectedBodyParts = new Set<HitLocation>(
      attack.hits.map((hit) => hit.location),
    );

    const armor = armorStore.totalSp;

    return (
      <div className={clsx(styles.attackCard, className)}>
        <h3 className={styles.title}>
          {name}
          <span className={styles.attackResult}>
            Attack roll: {attack.attackRoll.result}{" "}
            <span className={styles.diceValues}>
              ({attack.attackRoll.values.join(", ")})
            </span>
            <span className={styles.rollModifiers}>
              [{attack.attackRoll.modifiers.join(", ")}]
            </span>
          </span>
        </h3>
        <h4 className={styles.hitsHeader}>Hits: {attack.hits.length}</h4>
        {attack.hits.length > 0 && (
          <div className={styles.tables}>
            <ArmorTable
              store={armorStore}
              affectedBodyParts={affectedBodyParts}
            />
            <table className={styles.damageTable}>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Location</th>
                  <th>Dealt Dmg</th>
                  <th>SP</th>
                  <th>Taken Dmg</th>
                </tr>
                <tr className={styles.formulaRow}>
                  <th></th>
                  <th></th>
                  <th className={styles.damageFormula}>{damageFormula}</th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {attack.hits.map((hit, index) => {
                  const sp = armor[HIT_LOCATION_INDEX[hit.location]];
                  return (
                    <tr key={index} className={styles.hitRow}>
                      <td className={styles.indexCell}>{index + 1}</td>
                      <td className={styles.locationCell}>
                        {HIT_LOCATIONS_DISPLAY[hit.location]}
                      </td>
                      <td className={styles.damageCell}>
                        {hit.damage.result}{" "}
                        <span className={styles.damageValues}>
                          ({hit.damage.values.join(", ")})
                        </span>
                      </td>
                      <td>{sp}</td>
                      <td>{Math.max(hit.damage.result - sp, 0)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    );
  },
);
