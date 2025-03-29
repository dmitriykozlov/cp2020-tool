import React, { useLayoutEffect, useRef, useState } from "react";
import c from "./menu.module.css";

export const Menu: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);
  useLayoutEffect(() => {
    if (ref.current) {
      setOffset(ref.current.offsetHeight);
    }
  }, []);
  return (
    <>
      <div className={c.menuContainer} ref={ref}>
        <span>Home</span>
        <span>Attack</span>
        <span>Cyber/Gear</span>
        <span>Info</span>
      </div>
      <div className="menuOffset" style={{ height: offset }} />
    </>
  );
};
