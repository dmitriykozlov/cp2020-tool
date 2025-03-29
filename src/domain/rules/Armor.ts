export const calcProportionalArmorBonus = (difference: number) => {
  if (difference <= 4) {
    return 5;
  } else if (difference <= 8) {
    return 4;
  } else if (difference <= 14) {
    return 3;
  } else if (difference <= 20) {
    return 2;
  } else if (difference <= 26) {
    return 1;
  } else {
    return 0;
  }
};

export const COVERS = {
  None: 0,
  "Sheetrock Wall": 5,
  "Stone Wall": 30,
  "Tree, Phone Pole": 30,
  "Brick Wall": 25,
  "Concrete Block Wall": 10,
  "Wood Door": 5,
  "Heavy Wood Door": 15,
  "Steel Door": 20,
  "Concrete Utility Pole": 35,
  "Data Term": 25,
  "Car Body, Door": 10,
  "Armored Car Body": 40,
  "AV-4 Body": 40,
  "Engine Block": 35,
  Mailbox: 25,
  Hydrant: 35,
  Curb: 25,
} as const;
