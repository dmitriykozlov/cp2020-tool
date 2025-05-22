import { weapons } from "@repo/weapons";
import { Weapon } from "@domain/weapons/Weapon.ts";
import { action, makeAutoObservable, observable } from "mobx";
import { Range } from "@domain/calculator/AttackCalculator.ts";

export type Mode = "single" | "burst" | "auto";

type SituationalModifierDesc = {
  id: string;
  name: string;
  value: number;
  note?: string;
  grouped?: string[];
};

type SituationModifier = {
  id: string;
  value: number;
  isActive: boolean;
};

export const DEF_MOD_VALUES: Record<string, SituationalModifierDesc> = {
  movingTargetRef10: {
    id: "movingTargetRef10",
    name: "Moving Target REF > 10",
    value: -3,
    grouped: ["movingTargetRef12", "movingTargetRef14"],
  },
  movingTargetRef12: {
    id: "movingTargetRef12",
    name: "Moving Target REF > 12",
    value: -4,
    grouped: ["movingTargetRef10", "movingTargetRef14"],
  },
  movingTargetRef14: {
    id: "movingTargetRef14",
    name: "Moving Target REF > 14",
    value: -5,
    grouped: ["movingTargetRef12", "movingTargetRef10"],
  },
  targetImmobile: {
    id: "targetImmobile",
    name: "Target immobile",
    value: 4,
  },
  fastDrawSnapshot: {
    id: "fastDrawSnapshot",
    name: "Fast draw/Snapshot",
    value: -3,
  },
  ambush: {
    id: "ambush",
    name: "Ambush",
    value: 5,
  },
  aimedShotBody: {
    id: "aimedShotBody",
    name: "Aimed shot at body location",
    value: -4,
  },
  ricochetIndirectFire: {
    id: "ricochetIndirectFire",
    name: "Ricochet or indirect fire",
    value: -5,
  },
  blinded: {
    id: "blinded",
    name: "Blinded by light or dust",
    value: -3,
  },
  targetSilhouette: {
    id: "targetSilhouette",
    name: "Target silhouette",
    value: 2,
  },
  turningToFace: {
    id: "turningToFace",
    name: "Turning to face target",
    value: -2,
  },
  twoWeapons: {
    id: "twoWeapons",
    name: "Using two weapons",
    value: -3,
    note: "-3 on both",
  },
  firingRunning: {
    id: "firingRunning",
    name: "Firing while running",
    value: -3,
  },
  firingFromHip: {
    id: "firingFromHip",
    name: "Firing shoulder arm from hip",
    value: -2,
  },
  turretMounted: {
    id: "turretMounted",
    name: "Turret-mounted weapon",
    value: 2,
  },
  vehicleMounted: {
    id: "vehicleMounted",
    name: "Vehicle-mounted, no turret",
    value: -4,
  },
  largeTarget: {
    id: "largeTarget",
    name: "Large target",
    value: 4,
  },
  smallTarget: {
    id: "smallTarget",
    name: "Small target",
    value: -4,
  },
  tinyTarget: {
    id: "tinyTarget",
    name: "Tiny target",
    value: -6,
  },
  aiming: {
    id: "aiming",
    name: "Aiming",
    value: 1,
    note: "+1 for each round, up to 3 rounds",
  },
  laserSight: {
    id: "laserSight",
    name: "Laser Sight",
    value: 1,
  },
  telescopicSight: {
    id: "telescopicSight",
    name: "Telescopic Sight",
    value: 1,
    note: "+2 Extreme range, +1 Medium range",
  },
  targetingScope: {
    id: "targetingScope",
    name: "Targeting scope",
    value: 1,
  },
  smartgun: {
    id: "smartgun",
    name: "Smartgun",
    value: 2,
  },
  smartgoggles: {
    id: "smartgoggles",
    name: "Smartgoggles",
    value: 2,
  },
} as const;

type ConstructorArgs = {
  weapon?: Weapon;
  armorPiercing?: boolean;
  distance?: number;
  skillValue?: number;
  mode?: Mode;
  activeModifiers?: Map<string, SituationModifier>;
};

function populateModifiersFromDesc(): Map<string, SituationModifier> {
  const map = new Map<string, SituationModifier>();
  Object.values(DEF_MOD_VALUES).forEach((desc) => {
    map.set(desc.id, { id: desc.id, value: desc.value, isActive: false });
  });
  return map;
}

export class CalculatorStore {
  weapon: Weapon;
  armorPiercing: boolean;

  distance: number;
  skillValue: number;

  mode: Mode;

  modifiers: Map<string, SituationModifier>;

  constructor(args: ConstructorArgs = {}) {
    makeAutoObservable(this, {
      toggleArmorPiercing: action,
      setModifierValue: action,
      modifiers: observable,
    });
    this.weapon = args.weapon ?? weapons[12];
    this.armorPiercing = args.armorPiercing ?? false;
    this.distance = args.distance ?? 10;
    this.skillValue = args.skillValue ?? 10;
    this.mode = args.mode ?? ("single" as Mode);
    this.modifiers = args.activeModifiers ?? populateModifiersFromDesc();
  }

  get range(): Range | null {
    if (Number.isNaN(this.distance)) {
      return null;
    }
    return this.weapon.computeRange(this.distance);
  }

  get skillValueString(): string {
    if (!this.skillValue || Number.isNaN(this.skillValue)) {
      return "";
    }
    return this.skillValue.toString();
  }

  get distanceString(): string {
    if (!this.distance || Number.isNaN(this.distance)) {
      return "";
    }
    return this.distance.toString();
  }

  get activeModifiers(): SituationModifier[] {
    return Array.from(this.modifiers.values().filter((m) => m.isActive));
  }

  get overallModifierValue(): string {
    const value = this.activeModifiers.reduce((acc, mod) => acc + mod.value, 0);
    if (value >= 0) {
      return `+${value}`;
    } else {
      return `${value}`;
    }
  }

  toggleArmorPiercing() {
    this.armorPiercing = !this.armorPiercing;
  }

  setModifierValue(modifierId: string, inputValue: string) {
    const num = Number(inputValue);
    const mod = this.modifiers.get(modifierId);
    if (mod && !Number.isNaN(num)) {
      this.modifiers.set(modifierId, {
        ...mod,
        value: num,
      });
    }
  }

  resetActiveAllModifiers() {
    this.modifiers.forEach((mod) => {
      mod.isActive = false;
    });
  }

  toggleModifier(modifierId: string, checked: boolean) {
    console.log(modifierId, checked);
    const mod = this.modifiers.get(modifierId);
    if (mod) {
      this.modifiers.set(modifierId, {
        ...mod,
        isActive: checked,
      });
    }
  }

  resetModifier(modifierId: string) {
    const mod = this.modifiers.get(modifierId);
    if (mod) {
      this.modifiers.set(modifierId, {
        ...mod,
        value: DEF_MOD_VALUES[modifierId].value,
      });
    }
  }
}
