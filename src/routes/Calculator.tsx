import React, { useState } from "react";
import { Select } from "@/coreComponents/Select/Select";
import { Weapon } from "@domain/weapons/Weapon.ts";
import { Input } from "@/coreComponents/Input/Input.tsx";
import { Range, RANGES } from "@domain/calculator/AttackCalculator.ts";
import { SingleShot } from "@/components/calculator/SingleShot/SingleShot.tsx";
import { BurstShot } from "@/components/calculator/BurstShot/Burst.tsx";
import { FullAuto } from "@/components/calculator/FullAuto/FullAuto.tsx";
import { RadioGroup } from "@/coreComponents/RadioGroup/RadioGroup.tsx";

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
  const [distance, setDistance] = useState("");
  const [skillValue, setSkillValue] = useState("0");
  const [fireMode, setFireMode] = useState<Mode>("single");
  const distanceNum = Number(distance);
  let range: Range | null = null;
  if (distance && !Number.isNaN(distanceNum)) {
    range = weapon.computeRange(distanceNum);
  }
  const Component = modeComponents[fireMode];
  return (
    <div>
      <h1>Calculator</h1>
      <Select
        value={weapon.name}
        options={options}
        onChange={(id) => {
          setWeapon(weapons.find((w) => w.name === id)!);
        }}
      />
      <p>{weapon.code}</p>
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
          { value: "burst", label: "3 round burst" },
          { value: "auto", label: "Full auto" },
        ]}
        onChange={(value) => {
          setFireMode(value as Mode);
        }}
      />

      <Component
        range={range}
        skillValue={Number(skillValue)}
        weapon={weapon}
      />
    </div>
  );
};

export default Calculator;
