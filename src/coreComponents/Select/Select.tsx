import React from "react";
import c from "./select.module.css";
import clsx from "clsx";

export type Option = {
  id: string;
  display: string;
};

type SelectProps = {
  value: Option["display"];
  options: Option[];
  onChange?: (id: Option["id"]) => void;
  className?: string;
};

export const Select: React.FC<SelectProps> = (p) => {
  return (
    <select
      className={clsx(p.className, c.selectField)}
      value={p.value}
      onChange={(e) => {
        p.onChange?.(e.target.value);
      }}
    >
      {p.options.map((option) => (
        <option key={option.id} value={option.id}>
          {option.display}
        </option>
      ))}
    </select>
  );
};
