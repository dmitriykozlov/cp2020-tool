import React, { useState } from "react";
import { Weapon } from "@domain/weapons/Weapon.ts";
import c from "./weapon.module.css";
import {
  AVAILABILITY,
  CONCEALABILITY,
  RELIABILITY,
  WEAPON_TYPES,
} from "@domain/rules/weapon/constants.ts";

interface WeaponCardProps {
  weapon: Weapon;
}

export const WeaponCard: React.FC<WeaponCardProps> = ({ weapon }) => {
  const [showFull, setShowFull] = useState(true);
  const accuracy =
    weapon.accuracy < 0 ? weapon.accuracy : "+" + weapon.accuracy;

  return (
    <div
      className={c.weaponWrapper}
      onClick={() => {
        setShowFull((prev) => !prev);
      }}
    >
      <h4>
        <span className={c.weaponTypeHeader}>({weapon.type}) </span>
        {weapon.name}
        <span className={c.weaponTypeHeader}> {accuracy}</span>
      </h4>
      {!showFull && (
        <p>
          {weapon.damage.formula} | {weapon.shots}x{weapon.ammo} | {weapon.ROF}
          /round | {weapon.range}m
        </p>
      )}
      {showFull && (
        <div className={c.stats}>
          <p className={c.type}>
            Type:{" "}
            <span className={c.important}>{WEAPON_TYPES[weapon.type]}</span>
          </p>
          <p className={c.accuracy}>
            Accuracy: <span className={c.important}>{accuracy}</span>
          </p>
          <p className={c.dmg}>
            Dmg: <span className={c.important}>{weapon.damage.formula}</span>
          </p>
          <p className={c.ammo}>
            Ammo: <span className={c.important}>{weapon.ammo}</span>
          </p>
          <p className={c.shots}>
            Shots: <span className={c.important}>{weapon.shots}</span>
          </p>
          <p className={c.rof}>
            ROF: <span className={c.important}>{weapon.ROF}</span>
          </p>
          <p className={c.range}>
            Range: <span className={c.important}>{weapon.range}m</span>
          </p>
          <p className={c.reliability}>
            Reliability: <span>{RELIABILITY[weapon.reliability]}</span>
          </p>
          <p className={c.conceal}>
            Can conceal in <span>{CONCEALABILITY[weapon.concealabillty]}</span>
          </p>
          <p className={c.availability}>
            <span>{AVAILABILITY[weapon.availability]}</span>
          </p>
        </div>
      )}
    </div>
  );
};
