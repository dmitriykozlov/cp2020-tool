import { useReducer } from "react";
import { COVERS } from "@domain/rules/Armor.ts";

export type CoverState = {
  selectValue: keyof typeof COVERS | "Custom";
  sp: number;
  inputValue: string;
};

export type CoverAction =
  | {
      type: "select";
      value: CoverState["selectValue"];
    }
  | {
      type: "input";
      value: string;
    };

const reducer = (prev: CoverState, action: CoverAction): CoverState => {
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

export const useCoverSelectState = () => {
  return useReducer(reducer, INITIAL_STATE);
};
