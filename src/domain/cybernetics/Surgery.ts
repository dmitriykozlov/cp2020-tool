export const SURGERY_CODES = {
  N: "Negligible",
  M: "Minor",
  MA: "Major",
  CR: "Critical",
} as const;

export type SurgeryCode = keyof typeof SURGERY_CODES;
