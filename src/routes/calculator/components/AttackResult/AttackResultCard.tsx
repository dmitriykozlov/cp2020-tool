import React, { useMemo } from "react";
import { AttackResult } from "@domain/calculator/AttackCalculator.ts";
import styles from "./attackResult.module.css";
import clsx from "clsx";
import { ArmorTable } from "@/routes/calculator/components/ArmorTable";
import { ArmorTableStore } from "@/routes/calculator/components/ArmorTableStore.ts";
import { HIT_LOCATIONS_DISPLAY } from "@/routes/character/components/ArmorBlock/constants.ts";
import { HIT_LOCATIONS, HitLocation } from "@domain/armor/HitLocations.ts";
import { observer } from "mobx-react-lite";

type TargetDamageProps = {
  name: string;
  attack: AttackResult;
  className?: string;
  ap: boolean;
};

const CRITICAL_DMG = 8;

export const AttackResultCard: React.FC<TargetDamageProps> = observer(
  ({ attack, name, className, ap }) => {
    const damageFormula = attack.hits[0]?.damage.formula.formula;

    const armorStore = useMemo<ArmorTableStore>(
      () => new ArmorTableStore(attack, 2),
      [attack],
    );

    const affectedBodyParts = new Set<HitLocation>(
      attack.hits.map((hit) => hit.location),
    );

    const damageCalculations = armorStore.totalSpAndTakenDamage(ap);

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
                  <th>BTM: {armorStore.btm}</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {attack.hits.map((hit, index) => {
                  const val = damageCalculations.hits[index];
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
                      <td
                        className={clsx({
                          [styles.highlight]: val.sp > 0 && val.armorPenetrated,
                          [styles.dimm]: val.sp == 0,
                        })}
                      >
                        {val.sp}
                        {ap &&
                          val.armorPenetrated &&
                          `(${Math.floor(val.sp / 2)})`}
                      </td>
                      <td
                        className={clsx({
                          [styles.dimm]: val.dmg == 0,
                        })}
                      >
                        {val.dmg}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div className={styles.summaryBlock}>
              <h3 className={styles.title}>Summary</h3>
              <table className={styles.damageTable}>
                <thead>
                  <tr>
                    <th></th>
                    {HIT_LOCATIONS.map((location) => (
                      <th key={location}>{HIT_LOCATIONS_DISPLAY[location]}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th>New SP</th>
                    {damageCalculations.newSP.map((sp, index) => (
                      <td
                        key={index}
                        className={clsx(
                          sp !== armorStore.totalSp[index]
                            ? styles.highlight
                            : styles.dimm,
                        )}
                      >
                        {sp}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <th>Damage</th>
                    {damageCalculations.damagePerLocation.map(
                      (damage, index) => (
                        <td
                          key={index}
                          className={clsx({
                            [styles.highlight]: damage >= CRITICAL_DMG,
                            [styles.dimm]: damage == 0,
                          })}
                        >
                          {damage}
                        </td>
                      ),
                    )}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    );
  },
);
