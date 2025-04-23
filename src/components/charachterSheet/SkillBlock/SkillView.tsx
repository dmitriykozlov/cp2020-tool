import React, { useState } from "react";
import c from "./skill.module.css";
import { Skill } from "@domain/character/Skill.ts";
import clsx from "clsx";
import { character } from "@repo";
import { Input } from "@/coreComponents/Input/Input.tsx";
import { observer } from "mobx-react-lite";

type Props = { skill: Skill };

export const SkillView: React.FC<Props> = observer(({ skill }) => {
  const [level, setLevel] = useState<string>(() => skill.level.toString());
  const isGhost = skill.level === 0;

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setLevel(e.target.value);
  };

  const handleBlur: React.FocusEventHandler<HTMLInputElement> = (e) => {
    const val = Number(e.target.value);
    if (Number.isNaN(val)) {
      setLevel(skill.level.toString());
      return;
    }
    if (val < skill.level) {
      alert(`You can't decrease your skill level`);
    } else if (val > skill.level) {
      const cost = skill.levelIncreaseCost(val);
      const result = confirm(
        `Level increase cost: ${cost}. Current IP balance: ${character.improvementPoints}`,
      );
      if (result) {
        if (!skill.buyLevel(val)) {
          alert(`Not enough IP`);
          setLevel(skill.level.toString());
        }
      } else {
        setLevel(skill.level.toString());
      }
    }
  };

  return (
    <p className={clsx(c.skillRow, isGhost && c.ghost)}>
      <Input
        label={`${skill.name} - `}
        className={c.input}
        value={level}
        size={Math.max(level.toString().length, 2)}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      <span> ({skill.computedValue})</span>
    </p>
  );
});
