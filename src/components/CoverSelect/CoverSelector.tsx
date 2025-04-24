import React, { useState } from "react";
import { Select } from "@/coreComponents/Select/Select.tsx";
import { Input } from "@/coreComponents/Input/Input.tsx";
import { COVER_OPTIONS } from "./constants.ts";
import c from "./cover-selector.module.css";
import { COVERS } from "@domain/rules/Armor.ts";

type CoverSelectorProps = {
  value: number;
  onChange: (value: number) => void;
};

type CoverOptionId = keyof typeof COVERS | "Custom";

export const CoverSelector: React.FC<CoverSelectorProps> = ({
  value,
  onChange,
}) => {
  const [selected, setSelected] = useState("None");
  const [input, setInput] = useState(value.toString());
  return (
    <p className={c.coverFlex}>
      <Select
        value={selected}
        options={COVER_OPTIONS}
        className={c.coverSelect}
        onChange={(id_) => {
          const id = id_ as CoverOptionId;
          setSelected(id);
          if (id !== "Custom") {
            setInput(COVERS[id].toString());
            onChange(COVERS[id]);
          }
        }}
      />
      <Input
        value={input}
        className={c.coverInput}
        onChange={(e) => {
          setSelected("Custom");
          setInput(e.target.value);
          const num = Number(e.target.value);
          if (!Number.isNaN(num)) {
            onChange(num);
          }
        }}
        size={3}
      />
    </p>
  );
};
