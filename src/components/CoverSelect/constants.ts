import { COVERS } from "@domain/rules/Armor.ts";
import { Option } from "@/coreComponents/Select/Select.tsx";

export const COVER_OPTIONS: Option[] = [
  ...Object.entries(COVERS).map(([name, sp]) => ({
    id: name,
    display: `${name} - ${sp}`,
  })),
  { id: "Custom", display: "Custom" },
];
