import React, { useState } from "react";
import { Select } from "@/coreComponents/Select/Select.tsx";
import { Weapon } from "@domain/weapons/Weapon.ts";
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

const weapons: Weapon[] = [
  Weapon.fromCode("Stern meyer Type 35|P|0|J|C|3D6|11mm|8|2|VR|50|0.5"),
  Weapon.fromCode("H&K MP-2013|SMG|+1|J|C|2D6+3|10mm|35|32|ST|150|0.5"),
];

const options = weapons.map((w) => ({ id: w.name, display: w.name }));

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
            setWeapon(weapons.find((w) => w.name === id)!);
          }}
        />
        <WeaponCard weapon={weapon} />
        {/*<p>{weapon.codeAsArray.slice(1,-1).join("|")}</p>*/}
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
          <AttackResultCard attack={attack} name={`Attack #${i + 1}`} />
        ))}
      </div>
    </div>
  );
};

export default Calculator;
