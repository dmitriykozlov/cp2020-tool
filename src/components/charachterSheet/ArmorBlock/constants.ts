import { HitLocation } from "@domain/armor/HitLocations.ts";
import { Option } from "@/coreComponents/Select/Select.tsx";
import { COVERS } from "@domain/rules/Armor.ts";

export const HIT_LOCATIONS_DISPLAY: Record<HitLocation, string> = {
  head: "Head",
  torso: "Torso",
  right_arm: "R.Arm",
  left_arm: "L.Arm",
  right_leg: "R.Leg",
  left_leg: "L.Leg",
};

export const Covers: Option[] = [
  ...Object.entries(COVERS).map(([name, sp]) => ({
    id: name,
    display: `${name} - ${sp}`,
  })),
  { id: "Custom", display: "Custom" },
];
