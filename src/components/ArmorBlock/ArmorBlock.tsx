import React, { useReducer } from "react";
import {
  BODY_PARTS,
  BodyPart,
  HIT_TABLE,
} from "../../domain/armor/ArmorPiece.ts";
import c from "./armor.module.css";
import { character } from "../../repository";
import { Option, Select } from "../../coreComponents/Select/Select.tsx";
import { COVERS } from "../../domain/rules/Armor.ts";
import { Input } from "../../coreComponents/Input/Input.tsx";

const displayMap: Record<BodyPart, string> = {
  head: "Head",
  torso: "Torso",
  right_arm: "R.Arm",
  left_arm: "L.Arm",
  right_leg: "R.Leg",
  left_leg: "L.Leg",
};

const Covers: Option[] = [
  ...Object.entries(COVERS).map(([name, sp]) => ({
    id: name,
    display: `${name} - ${sp}`,
  })),
  { id: "Custom", display: "Custom" },
];

type CoverState = {
  selectValue: keyof typeof COVERS | "Custom";
  sp: number;
  inputValue: string;
};

type Action =
  | {
      type: "select";
      value: CoverState["selectValue"];
    }
  | {
      type: "input";
      value: string;
    };

const reducer = (prev: CoverState, action: Action): CoverState => {
  let sp = prev.sp;
  switch (action.type) {
    case "select": {
      if (action.value !== "Custom") {
        sp = COVERS[action.value];
      }
      return {
        selectValue: action.value,
        sp,
        inputValue: sp.toString(),
      };
    }
    case "input": {
      const num = Number(action.value);
      if (!Number.isNaN(num)) {
        sp = num;
      }
      return {
        selectValue: "Custom",
        inputValue: action.value,
        sp,
      };
    }
  }
};

const INITIAL_STATE: CoverState = {
  selectValue: "None",
  sp: 0,
  inputValue: "0",
};

export const ArmorBlock: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  return (
    <div>
      <h2>Armor</h2>
      <table className={c.armorTable}>
        <thead>
          <tr className={c.bodyPartHeading}>
            {BODY_PARTS.map((bodyPart) => (
              <th key={bodyPart}>{displayMap[bodyPart]}</th>
            ))}
          </tr>
          <tr className={c.hitTableHeading}>
            {BODY_PARTS.map((bodyPart) => {
              const [min, max] = HIT_TABLE[bodyPart];
              if (min == max) return <th key={bodyPart}>{min}</th>;
              return (
                <th key={bodyPart}>
                  {min}-{max}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          <tr>
            {BODY_PARTS.map((bodyPart) => (
              <td key={bodyPart}>
                {character.armorStat.calculateSP(bodyPart, state.sp)}
              </td>
            ))}
          </tr>
        </tbody>
      </table>
      <h3>Cover</h3>
      <p className={c.coverFlex}>
        <Select
          value={state.selectValue}
          options={Covers}
          className={c.coverSelect}
          onChange={(id) => {
            dispatch({
              type: "select",
              value: id as CoverState["selectValue"],
            });
          }}
        />
        <Input
          value={state.inputValue}
          className={c.coverInput}
          onChange={(e) => {
            dispatch({ type: "input", value: e.target.value });
          }}
          size={3}
        />
      </p>
    </div>
  );
};
