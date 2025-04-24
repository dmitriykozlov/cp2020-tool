import React, { useLayoutEffect, useRef, useState } from "react";
import c from "./menu.module.css";
import { NavLink } from "react-router";

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
        <NavLink to="/">
          <span>Home</span>
        </NavLink>
        <NavLink to="/calculator">
          <span>Calculator</span>
        </NavLink>
      </div>
      <div className={c.menuOffset} style={{ height: offset }} />
    </>
  );
};
