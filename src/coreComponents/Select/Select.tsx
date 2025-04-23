import React, { useId } from "react";
import c from "./select.module.css";
import clsx from "clsx";

export type Option = {
  id: string;
  display: string;
};

type SelectProps = {
  value: Option["display"];
  label?: string;
  options: Option[];
  onChange?: (id: Option["id"]) => void;
  className?: string;
};

export const Select: React.FC<SelectProps> = (p) => {
  const id = useId();
  return (
    <label htmlFor={id}>
      {p.label}
      <select
        id={id}
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
    </label>
  );
};
