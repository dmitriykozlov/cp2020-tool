import React, { useId } from "react";
import c from "./input.module.css";
import clsx from "clsx";

type InputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, "id"> & {
  label?: string;
};

export const Input: React.FC<InputProps> = (props) => {
  const id = useId();
  return (
    <label htmlFor={id}>
      {props.label}
      <input
        {...props}
        id={id}
        className={clsx(props.className, c.inputField)}
        placeholder={props.placeholder ?? props.label}
      />
    </label>
  );
};
