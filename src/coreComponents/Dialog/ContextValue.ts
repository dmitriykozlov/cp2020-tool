import React, { use } from "react";

// eslint-disable-next-line
export type OpenFn = <Props = {}>(
  Component: React.FC<Props>,
  props: Props,
) => Promise<unknown>;
export const DialogContext = React.createContext<{
  open: OpenFn;
  // @ts-expect-error because
}>(null);

export const useDialog = () => {
  return use(DialogContext);
};
