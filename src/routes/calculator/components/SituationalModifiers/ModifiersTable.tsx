import React, { useId } from "react";
import c from "./situationalModifiers.module.css";
import {
  CalculatorStore,
  DEF_MOD_VALUES,
} from "@/routes/calculator/state/CalculatorStore.ts";
import { observer } from "mobx-react-lite";

type ModifiersTableProps = {
  store: CalculatorStore;
};

export const ModifiersTable: React.FC<ModifiersTableProps> = observer(
  ({ store }) => {
    const id = useId();

    return (
      <table className={c.modifiersTable}>
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                onChange={() => store.resetActiveAllModifiers()}
                checked={false}
              />
            </th>
            <th>Modifier</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          {Array.from(store.modifiers.values()).map((modifier) => {
            const labelId = id + modifier.id;
            return (
              <tr key={modifier.id}>
                <td>
                  <input
                    id={labelId}
                    type="checkbox"
                    checked={modifier.isActive}
                    onChange={(e) => {
                      store.toggleModifier(modifier.id, e.target.checked);
                    }}
                  />
                </td>
                <td>
                  <label htmlFor={labelId} className={c.modName}>
                    {DEF_MOD_VALUES[modifier.id].name}
                    <span className={c.dots}></span>
                  </label>
                </td>
                <td>
                  <input
                    type="number"
                    className={c.modifierValueInput}
                    value={modifier.value || ""}
                    placeholder="0"
                    onChange={(e) => {
                      store.setModifierValue(modifier.id, e.target.value);
                    }}
                  />
                </td>
                <td>
                  <button
                    className={c.resetButton}
                    disabled={
                      modifier.value === DEF_MOD_VALUES[modifier.id].value
                    }
                    onClick={() => store.resetModifier(modifier.id)}
                  >
                    🔄
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  },
);
