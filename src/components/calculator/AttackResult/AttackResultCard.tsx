import React from "react";
import { AttackResult } from "@domain/calculator/AttackCalculator.ts";
import styles from "./attackResult.module.css";
import clsx from "clsx";
import { ArmorTable } from "@/components/calculator/ArmorTable";

type TargetDamageProps = {
  name: string;
  attack: AttackResult;
  className?: string;
};

export const AttackResultCard: React.FC<TargetDamageProps> = ({
  attack,
  name,
  className,
}) => {
  const damageFormula = attack.hits[0]?.damage.formula.formula;

  return (
    <div className={clsx(styles.targetDamageItem, className)}>
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
        <>
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
              {attack.hits.map((hit, index) => (
                <tr key={index} className={styles.hitRow}>
                  <td className={styles.indexCell}>{index + 1}</td>
                  <td className={styles.locationCell}>{hit.location}</td>
                  <td className={styles.damageCell}>
                    {hit.damage.result}{" "}
                    <span className={styles.damageValues}>
                      ({hit.damage.values.join(", ")})
                    </span>
                  </td>
                  <td></td>
                  <td></td>
                </tr>
              ))}
            </tbody>
          </table>
          <ArmorTable />
        </>
      )}
    </div>
  );
};
