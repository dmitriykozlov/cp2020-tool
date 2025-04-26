import React, { useId, useState } from "react";
import { Option, Select } from "@/coreComponents/Select/Select.tsx";
import { Input } from "@/coreComponents/Input/Input.tsx";
import {
  AttackResult,
  Range,
  RANGES,
} from "@domain/calculator/AttackCalculator.ts";
import { SingleShot } from "@/routes/calculator/components/SettingsComponents/SingleShot.tsx";
import { BurstShot } from "@/routes/calculator/components/SettingsComponents/Burst.tsx";
import { FullAuto } from "@/routes/calculator/components/SettingsComponents/FullAuto.tsx";
import { RadioGroup } from "@/coreComponents/RadioGroup/RadioGroup.tsx";
import c from "./calc.module.css";
import { AttackResultCard } from "@/routes/calculator/components/AttackResult";
import { WeaponCard } from "@/components/WeaponCard/WeaponCard.tsx";
import { weapons } from "@repo/weapons.ts";
import { Weapon } from "@domain/weapons/Weapon.ts";

const grouped: Map<string, Array<Weapon>> = new Map();

weapons.forEach((weapon) => {
  if (grouped.has(weapon.group)) {
    grouped.get(weapon.group)?.push(weapon);
  } else {
    grouped.set(weapon.group, [weapon]);
  }
});

const options = grouped
  .entries()
  .flatMap(([group, weapons]) => {
    return [
      { id: group, display: `---${group}---` },
      ...weapons.map((w) => ({ id: w.name, display: w.name })),
    ] as Option[];
  })
  .toArray();

const modeComponents = {
  single: SingleShot,
  burst: BurstShot,
  auto: FullAuto,
} as const;

type Mode = keyof typeof modeComponents;

const Calculator: React.FC = () => {
  const [weapon, setWeapon] = useState(weapons[1]);
  const [distance, setDistance] = useState("20");
  const [skillValue, setSkillValue] = useState("14");
  const [fireMode, setFireMode] = useState<Mode>("single");
  const apCheckboxId = useId();
  const [ap, setAp] = useState(false);
  const distanceNum = Number(distance);
  let range: Range | null = null;
  if (distance && !Number.isNaN(distanceNum)) {
    range = weapon.computeRange(distanceNum);
  }
  const SettingsComponent = modeComponents[fireMode];

  const [attacks, setAttacks] = useState<AttackResult[]>([]);

  return (
    <div className={c.page}>
      <aside className={c.sidebar}>
        <h1>Calculator</h1>
        <Select
          value={weapon.name}
          options={options}
          onChange={(id) => {
            const weapon = weapons.find((w) => w.name === id);
            if (weapon) setWeapon(weapon);
          }}
        />
        <WeaponCard weapon={weapon} />
        <p>
          <label htmlFor={apCheckboxId}>
            <input
              type="checkbox"
              id={apCheckboxId}
              checked={ap}
              onChange={() => setAp((prev) => !prev)}
            />
            Armor piercing
          </label>
        </p>
        <p>
          <Input
            label="Distance "
            placeholder={weapon.range + "m"}
            type="number"
            value={distance}
            onChange={(e) => {
              setDistance(e.target.value);
            }}
          />
          {range && (
            <span>
              {" "}
              ({range} - {RANGES[range]})
            </span>
          )}
        </p>
        <p>
          <Input
            label="Skill value "
            type="number"
            value={skillValue}
            onChange={(e) => {
              setSkillValue(e.target.value);
            }}
          />
        </p>
        <RadioGroup
          label="Mode: "
          value={fireMode}
          options={[
            { value: "single", label: "Single shot" },
            {
              value: "burst",
              label: "3 round burst",
              disabled: weapon.ROF < 3,
            },
            { value: "auto", label: "Full auto", disabled: weapon.ROF < 4 },
          ]}
          onChange={(value) => {
            setFireMode(value as Mode);
          }}
        />
        <SettingsComponent
          range={range}
          skillValue={Number(skillValue)}
          weapon={weapon}
          onCalculate={(attacks) => {
            setAttacks(attacks);
          }}
        />
      </aside>
      <div className={c.cards}>
        {attacks.map((attack, i) => (
          <AttackResultCard attack={attack} name={`Attack #${i + 1}`} ap={ap} />
        ))}
      </div>
    </div>
  );
};

export default Calculator;
