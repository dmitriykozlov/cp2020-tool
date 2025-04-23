import React from "react";
import c from "./comstat.module.css";
import clsx from "clsx";

type ComStatProps = {
  name: string;
  value: number;
  readonly?: boolean;
  postfix?: string;
};

export const ComStat: React.FC<ComStatProps> = (p) => {
  return (
    <div className={clsx(c.statContainer, !p.readonly && c.editable)}>
      <span className={c.label}>{p.name}: </span>
      <span
        className={c.value}
        contentEditable={!p.readonly}
        dangerouslySetInnerHTML={{
          __html: p.value,
        }}
      />
      {p.postfix && <span> {p.postfix}</span>}
    </div>
  );
};
