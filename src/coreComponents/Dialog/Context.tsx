import React, { useState } from "react";
import { Dialog } from "./Dialog.tsx";
import { DialogContext, OpenFn } from "./ContextValue.ts";
import { v4 as uuid } from "uuid";

type ProviderProps = {
  children: React.ReactNode;
};

type DialogInvocation = {
  id: string;
  Component: React.FC;
  props: object;
  resolve: (value: unknown) => void;
  reject: (reason?: never) => void;
};

export const DialogProvider: React.FC<ProviderProps> = ({ children }) => {
  const [opened, setOpened] = useState<DialogInvocation[]>([]);
  const open: OpenFn = (Component, props) => {
    return new Promise((resolve, reject) => {
      const id = uuid();
      setOpened((current) => {
        return current.concat([{ id, Component, props, resolve, reject }]);
      });
    });
  };

  return (
    <DialogContext.Provider value={{ open }}>
      {children}
      {opened.map(({ Component, props, resolve, id }) => (
        <Dialog
          key={id}
          onClose={() => {
            setOpened((prevState) => {
              return prevState.filter((o) => o.id !== id);
            });
            resolve("close");
          }}
        >
          <Component {...props} />
        </Dialog>
      ))}
    </DialogContext.Provider>
  );
};
