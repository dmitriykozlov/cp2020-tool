import React from "react";
import { character } from "@repo/main.ts";

export const GearBlock: React.FC = () => {
  return (
    <div>
      <h2>Gear</h2>
      {Array.from(character.armor).map((armor) => (
        <p key={armor.name}>
          [A] {armor.name} ({armor.sp}) - ${armor.cost}
        </p>
      ))}
    </div>
  );
};
