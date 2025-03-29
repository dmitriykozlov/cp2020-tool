export const naturalStats = [
  "intelligence",
  "reflexes",
  "cool",
  "technical",
  "luck",
  "attractiveness",
  "movement",
  "empathy",
  "body",
] as const;

export type NatStatName = (typeof naturalStats)[number];

export const shortened: Record<NatStatName, string> = {
  intelligence: "int",
  reflexes: "ref",
  cool: "cool",
  technical: "tech",
  luck: "luck",
  attractiveness: "attr",
  movement: "ma",
  empathy: "emp",
  body: "body",
};