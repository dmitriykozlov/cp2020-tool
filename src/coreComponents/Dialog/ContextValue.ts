import React, { use } from "react";

export type OpenFn = (Component: React.FC, props: object) => Promise<unknown>;

export const DialogContext = React.createContext<{
  open: OpenFn;
  // @ts-expect-error because
}>(null);

export const useDialog = () => {
  return use(DialogContext);
};
