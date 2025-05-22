import React, { useId, useState } from "react";
import { Option, Select } from "@/coreComponents/Select/Select.tsx";
import { Input } from "@/coreComponents/Input/Input.tsx";
import { AttackResult, RANGES } from "@domain/calculator/AttackCalculator.ts";
import { SingleShot } from "./components/SettingsComponents/SingleShot.tsx";
import { BurstShot } from "./components/SettingsComponents/Burst.tsx";
import { FullAuto } from "./components/SettingsComponents/FullAuto.tsx";
import { RadioGroup } from "@/coreComponents/RadioGroup/RadioGroup.tsx";
import c from "./calc.module.css";
import { AttackResultCard } from "./components/AttackResult";
import { WeaponCard } from "@/components/WeaponCard/WeaponCard.tsx";
import { weapons } from "@repo/weapons.ts";
import { Weapon } from "@domain/weapons/Weapon.ts";
import { SituationalModifiers } from "./components/SituationalModifiers/SituationalModifiers.tsx";
import { CalculatorStore, Mode } from "./state/CalculatorStore.ts";
import { observer } from "mobx-react-lite";
import { CommonProps } from "./components/SettingsComponents/common.ts";
import { action } from "mobx";

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

const modeComponents: Record<Mode, React.FC<CommonProps>> = {
  single: SingleShot,
  burst: BurstShot,
  auto: FullAuto,
} as const;

const store = new CalculatorStore();

const Calculator: React.FC = observer(() => {
  const weapon = store.weapon;
  const apCheckboxId = useId();

  const SettingsComponent = modeComponents[store.mode];

  const [attacks, setAttacks] = useState<AttackResult[]>([]);

  return (
    <div className={c.page}>
      <aside className={c.sidebar}>
        <h1>Calculator</h1>
        <section>
          <h3>Weapon</h3>
          <Select
            value={weapon.name}
            options={options}
            onChange={action((id) => {
              const weapon = weapons.find((w) => w.name === id);
              if (weapon) store.weapon = weapon;
            })}
          />
          <WeaponCard weapon={weapon} />
        </section>
        <section>
          <h3>Attack settings</h3>
          <p>
            <label htmlFor={apCheckboxId}>
              <input
                type="checkbox"
                id={apCheckboxId}
                checked={store.armorPiercing}
                onChange={() => store.toggleArmorPiercing()}
              />
              <span> Armor piercing</span>
            </label>
          </p>

          <p>
            <Input
              label="Distance "
              placeholder="0"
              type="number"
              value={store.distanceString}
              className={c.attackSettingInput}
              onChange={action((e) => {
                store.distance = Number(e.target.value);
              })}
            />
            {store.range && (
              <span>
                {" "}
                ({store.range} - {RANGES[store.range]})
              </span>
            )}
          </p>
          <p>
            <Input
              label="Skill value "
              type="number"
              placeholder="0"
              value={store.skillValueString}
              className={c.attackSettingInput}
              onChange={action((e) => {
                store.skillValue = Number(e.target.value);
              })}
            />
          </p>
        </section>
        <section>
          <SituationalModifiers store={store} />
        </section>
        <section>
          <h3>Attack mode</h3>
          <RadioGroup
            value={store.mode}
            options={[
              { value: "single", label: "Single shot" },
              {
                value: "burst",
                label: "3 round burst",
                disabled: !weapon.isAutomatic,
              },
              {
                value: "auto",
                label: "Full auto",
                disabled: !weapon.isAutomatic,
              },
            ]}
            onChange={action((value) => {
              store.mode = value as Mode;
            })}
          />

          <SettingsComponent
            store={store}
            weapon={weapon}
            onCalculate={(attacks: AttackResult[]) => {
              setAttacks(attacks);
            }}
          />
        </section>
      </aside>
      <div className={c.cards}>
        {attacks.map((attack, i) => (
          <AttackResultCard
            attack={attack}
            name={`Attack #${i + 1}`}
            ap={store.armorPiercing}
          />
        ))}
      </div>
    </div>
  );
});

export default Calculator;
