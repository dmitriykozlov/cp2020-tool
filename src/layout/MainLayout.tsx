import React, { ReactNode } from "react";
import c from "./main-layout.module.css";
import { Menu } from "../coreComponents/Menu/Menu.tsx";

export const MainLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className={c.main}>
      <div className={c.content}>{children}</div>
      <Menu />
    </div>
  );
};
