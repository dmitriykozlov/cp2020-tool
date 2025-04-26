import data from "@/assets/weapons.json";
import { Weapon } from "@domain/weapons/Weapon.ts";

export const weapons = data.map(Weapon.fromJSON);
