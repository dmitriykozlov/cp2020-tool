import React from "react";
import { Select } from "@/coreComponents/Select/Select.tsx";
import { Input } from "@/coreComponents/Input/Input.tsx";
import { Covers } from "../../charachterSheet/ArmorBlock/constants.ts";
import c from "./cover-selector.module.css";
import {
  CoverAction,
  CoverState,
} from "@/components/calculator/CoverSelect/useCoverSelectState.ts";

type CoverSelectorProps = {
  state: CoverState;
  dispatch: React.Dispatch<CoverAction>;
};

export const CoverSelector: React.FC<CoverSelectorProps> = ({
  state,
  dispatch,
}) => {
  return (
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
          console.log(state);
        }}
      />
      <Input
        value={state.inputValue}
        className={c.coverInput}
        onChange={(e) => {
          dispatch({ type: "input", value: e.target.value });
          console.log(state);
        }}
        size={3}
      />
    </p>
  );
};
