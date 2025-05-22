import React, { useId } from "react";
import clsx from "clsx";
import c from "./radio-group.module.css";

interface RadioGroupProps {
  label?: string;
  options: Array<{
    value: string;
    label: string;
    disabled?: boolean;
  }>;
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
}

export const RadioGroup: React.FC<RadioGroupProps> = ({
  options,
  value,
  onChange,
  className,
  label,
}) => {
  const id = useId();
  return (
    <div className={clsx(c.container, className)}>
      {label && <span className={c.label}>{label}</span>}
      <div className={c.options}>
        {options.map((option) => (
          <React.Fragment key={option.value}>
            <input
              type="radio"
              name={id}
              value={option.value}
              checked={value === option.value}
              id={id + option.value}
              onChange={(e) => onChange?.(e.target.value)}
              className={c.input}
              disabled={option.disabled}
            />
            <label
              key={option.value}
              className={c.option}
              htmlFor={id + option.value}
            >
              <span className={c.label}>{option.label}</span>
            </label>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};
