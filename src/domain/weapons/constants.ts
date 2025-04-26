export const WEAPON_TYPES = {
  P: "pistol",
  SMG: "submachine gun",
  SHT: "shotguns",
  RIF: "rifles",
  HVY: "heavy weapon",
  MELEE: "melee weapon",
  EX: "exotic weapon",
} as const;

export type WeaponType = keyof typeof WEAPON_TYPES;

export const CONCEALABILITY = {
  P: "Pocket, Pants Leg or Sleeve",
  J: "Jacket, Coat or Shoulder Rig",
  L: "Long Coat",
  N: "Can't be Hidden",
};

export const GROUPS = {

};

export type Concealabillty = keyof typeof CONCEALABILITY;

export const AVAILABILITY = {
  E: "Excellent. Can be found almost anywhere",
  C: "Common. Can be found in most sports & gun stores or on the Street.",
  P: "Poor. Specialty weapons, black market, stolen military.",
  R: "Rare. Stolen, one of a kind, special military issue, may be highly illegal.",
};

export type Availability = keyof typeof AVAILABILITY;

export const RELIABILITY = {
  VR: "Very reliable",
  ST: "Standard",
  UR: "Unreliable",
};

export type Reliability = keyof typeof RELIABILITY;
