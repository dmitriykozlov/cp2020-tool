import React, { useMemo, useReducer } from "react";
import { Input } from "@/coreComponents/Input/Input.tsx";
import { HIT_LOCATIONS } from "@domain/armor/HitLocations.ts";
import { HIT_LOCATIONS_DISPLAY } from "@/components/charachterSheet/ArmorBlock/constants.ts";
import c from "./armorTable.module.css";
import { CoverSelector } from "../CoverSelect/CoverSelector";
import { useCoverSelectState } from "@/components/calculator/CoverSelect/useCoverSelectState.ts";
import { Select } from "@/coreComponents/Select/Select";
import { computeLayeredSP } from "@domain/rules/Armor.ts";

type ArmorType = "hard" | "soft";

type Layer = {
  type: ArmorType;
  locations: string[];
};
type ArmorTableState = {
  cover: {
    locations: boolean[];
  };
  layers: Layer[];
};

type ArmorTableAction =
  | {
      type: "addRow";
    }
  | {
      type: "removeRow";
      index: number;
    }
  | {
      type: "toggleCoverAll";
    }
  | {
      type: "toggleCover";
      location: number;
    }
  | {
      type: "changeLayerType";
      layer: number;
      value: ArmorType;
    }
  | {
      type: "changeLayerSP";
      layer: number;
      location: number;
      value: string;
    };

const INITIAL_STATE: ArmorTableState = {
  layers: [
    {
      type: "hard",
      locations: Array.from<string>({
        length: HIT_LOCATIONS.length,
      }).fill(""),
    },
  ],
  cover: {
    locations: Array.from<boolean>({
      length: HIT_LOCATIONS.length,
    }).fill(false),
  },
};

const reducer = (state: ArmorTableState, action: ArmorTableAction) => {
  switch (action.type) {
    case "addRow": {
      return {
        ...state,
        layers: [
          ...state.layers,
          {
            type: "hard",
            locations: Array.from<string>({
              length: HIT_LOCATIONS.length,
            }).fill(""),
          },
        ],
      } satisfies ArmorTableState;
    }
    case "removeRow": {
      return {
        ...state,
        layers: state.layers.filter((_, index) => index !== action.index),
      };
    }
    case "changeLayerSP": {
      return {
        ...state,
        layers: state.layers.map((layer, layerIndex): Layer => {
          if (layerIndex === action.layer) {
            return {
              ...layer,
              locations: layer.locations.map((sp, locationIndex): string => {
                if (locationIndex === action.location) {
                  return action.value;
                }
                return sp;
              }),
            };
          }
          return layer;
        }),
      };
    }
    case "changeLayerType": {
      return {
        ...state,
        layers: state.layers.map((layer, index) => {
          if (index === action.layer) {
            return {
              ...layer,
              type: action.value,
            };
          }
          return layer;
        }),
      };
    }
    case "toggleCover": {
      return {
        ...state,
        cover: {
          ...state.cover,
          locations: state.cover.locations.map((isCovered, location) => {
            if (location === action.location) {
              return !isCovered;
            }
            return isCovered;
          }),
        },
      };
    }
    case "toggleCoverAll": {
      const allCovered = !state.cover.locations.every((isCovered) => isCovered);
      return {
        ...state,
        cover: {
          ...state.cover,
          locations: state.cover.locations.map(() => allCovered),
        },
      };
    }
    default:
      return state;
  }
};

const armorTypeOptions: Array<{ id: ArmorType; display: string }> = [
  { id: "hard", display: "Hard" },
  { id: "soft", display: "Soft" },
];

export const ArmorTable: React.FC = () => {
  const [coverState, coverDispatch] = useCoverSelectState();
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  const allCovered = useMemo(
    () => state.cover.locations.every((isCovered) => isCovered),
    [state.cover.locations],
  );

  const totalSp = useMemo<number[]>(() => {
    return HIT_LOCATIONS.map((_, index) => {
      const stoppingPowers = state.layers.map((layer) =>
        Number(layer.locations[index]),
      );
      if (state.cover.locations[index]) {
        stoppingPowers.push(coverState.sp);
      }
      return computeLayeredSP(...stoppingPowers);
    });
  }, [coverState.sp, state.cover.locations, state.layers]);

  return (
    <div className={c.wrapper}>
      <table className={c.armorTable}>
        <thead>
          <tr>
            <th>Cover</th>
            <th colSpan={HIT_LOCATIONS.length}>
              <CoverSelector state={coverState} dispatch={coverDispatch} />
            </th>
          </tr>
          <tr>
            <th>
              <input
                type="checkbox"
                checked={allCovered}
                onClick={() => {
                  dispatch({ type: "toggleCoverAll" });
                }}
              />
            </th>
            {state.cover.locations.map((isCovered, location) => (
              <th key={HIT_LOCATIONS[location]}>
                <input
                  type="checkbox"
                  checked={isCovered}
                  onClick={() => {
                    dispatch({ type: "toggleCover", location });
                  }}
                />
              </th>
            ))}
          </tr>
          <tr>
            <th>Location:</th>
            {HIT_LOCATIONS.map((bodyPart) => (
              <th key={bodyPart}>{HIT_LOCATIONS_DISPLAY[bodyPart]}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {state.layers.map((layer, layerIndex) => (
            <tr>
              <th>
                <Select
                  value={layer.type}
                  options={armorTypeOptions}
                  onChange={(id) => {
                    dispatch({
                      type: "changeLayerType",
                      layer: layerIndex,
                      value: id as ArmorType,
                    });
                  }}
                />
              </th>
              {layer.locations.map((sp, locationIndex) => (
                <td key={HIT_LOCATIONS[locationIndex]}>
                  <Input
                    className={c.spInput}
                    value={sp}
                    type="number"
                    onChange={(e) => {
                      dispatch({
                        type: "changeLayerSP",
                        layer: layerIndex,
                        location: locationIndex,
                        value: e.target.value,
                      });
                    }}
                  />
                </td>
              ))}
              <td>
                <button
                  tabIndex={-1}
                  disabled={state.layers.length <= 1}
                  onClick={() => {
                    dispatch({ type: "removeRow", index: layerIndex });
                  }}
                >
                  x
                </button>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <th>Total:</th>
            {HIT_LOCATIONS.map((bodyPart, index) => (
              <th key={bodyPart}>{totalSp[index]}</th>
            ))}
          </tr>
        </tfoot>
      </table>
      <button
        className={c.addButton}
        onClick={() => dispatch({ type: "addRow" })}
      >
        + Add layer
      </button>
    </div>
  );
};
