import React, { useState } from "react";
import { Input } from "@/coreComponents/Input/Input.tsx";
import { HIT_LOCATIONS, HitLocation } from "@domain/armor/HitLocations.ts";
import { HIT_LOCATIONS_DISPLAY } from "@/routes/character/components/ArmorBlock/constants.ts";
import c from "./armorTable.module.css";
import { CoverSelector } from "@/components/CoverSelect/CoverSelector.tsx";
import { Select } from "@/coreComponents/Select/Select.tsx";
import { action } from "mobx";
import { observer } from "mobx-react-lite";
import { ArmorTableStore, ArmorType } from "../../state/ArmorTableStore.ts";
import clsx from "clsx";

type ArmorTableProps = {
  store: ArmorTableStore;
  affectedBodyParts: Set<HitLocation>;
};

const armorTypeOptions: Array<{ id: ArmorType; display: string }> = [
  { id: "hard", display: "Hard" },
  { id: "soft", display: "Soft" },
];

export const ArmorTable: React.FC<ArmorTableProps> = observer(
  ({ store, affectedBodyParts }) => {
    const totalSp = store.totalSp;
    const [btm, setBTM] = useState(store.btm.toString());

    return (
      <div className={c.wrapper}>
        <Input
          label="BTM: "
          value={btm}
          type="number"
          onChange={action((e) => {
            setBTM(e.target.value);
            const num = Number(e.target.value);
            if (!Number.isNaN(num)) {
              store.btm = num;
            }
          })}
        />
        <table className={c.armorTable}>
          <thead>
            <tr>
              <th>Cover</th>
              <th colSpan={HIT_LOCATIONS.length}>
                <CoverSelector
                  value={store.coverSP}
                  onChange={action((value) => {
                    store.coverSP = value;
                  })}
                />
              </th>
            </tr>
            <tr>
              <th>
                <input
                  type="checkbox"
                  checked={store.allCovered}
                  onChange={() => {
                    store.toggleCoverAll();
                  }}
                />
              </th>
              {store.coveredParts.map((isCovered, location) => (
                <th
                  key={HIT_LOCATIONS[location]}
                  className={clsx({
                    [c.affected]: affectedBodyParts.has(
                      HIT_LOCATIONS[location],
                    ),
                  })}
                >
                  <input
                    type="checkbox"
                    checked={isCovered}
                    onChange={() => {
                      store.toggleCover(location);
                    }}
                  />
                </th>
              ))}
            </tr>
            <tr>
              <th>Location:</th>
              {HIT_LOCATIONS.map((bodyPart) => (
                <th
                  key={bodyPart}
                  className={clsx({
                    [c.affected]: affectedBodyParts.has(bodyPart),
                  })}
                >
                  {HIT_LOCATIONS_DISPLAY[bodyPart]}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {store.layers.map((layer, layerIndex) => (
              <tr key={layerIndex}>
                <th>
                  <Select
                    value={layer.type}
                    options={armorTypeOptions}
                    onChange={(id) => {
                      store.changeLayerType(layerIndex, id as ArmorType);
                    }}
                  />
                </th>
                {layer.locations.map((sp, locationIndex) => (
                  <td
                    key={HIT_LOCATIONS[locationIndex]}
                    className={clsx({
                      [c.affected]: affectedBodyParts.has(
                        HIT_LOCATIONS[locationIndex],
                      ),
                    })}
                  >
                    <Input
                      className={c.spInput}
                      value={sp}
                      type="number"
                      onChange={(e) => {
                        store.changeLayerSP(
                          layerIndex,
                          locationIndex,
                          e.target.value,
                        );
                      }}
                    />
                  </td>
                ))}
                <td className={c.removeButtonCell}>
                  <button
                    tabIndex={-1}
                    disabled={store.layers.length <= 1}
                    className={c.removeButton}
                    onClick={() => {
                      store.removeRow(layerIndex);
                    }}
                  >
                    ✖️
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <th>Total:</th>
              {HIT_LOCATIONS.map((bodyPart, index) => (
                <th
                  key={bodyPart}
                  className={clsx({
                    [c.affected]: affectedBodyParts.has(bodyPart),
                  })}
                >
                  {totalSp[index]}
                </th>
              ))}
            </tr>
          </tfoot>
        </table>
        <button className={c.addButton} onClick={() => store.addRow()}>
          + Add layer
        </button>
      </div>
    );
  },
);
