import React from "react";
import { Weapon } from "@domain/weapons/Weapon.ts";
import { WeaponCard } from "@/components/WeaponCard/WeaponCard.tsx";

const weapon: Weapon = Weapon.fromCode(
  "Stern meyer Type 35|P|0|J|C|3D6|11mm|8|2|VR|50|0.5",
);

export const WeaponsBlock: React.FC = () => {
  return (
    <div>
      <h2>Weapons</h2>
      <WeaponCard weapon={weapon} />
    </div>
  );
};
