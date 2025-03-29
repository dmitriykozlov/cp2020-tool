import { Character } from "../domain/character/Character.ts";
import { ROLES } from "../domain/rules/Roles.ts";
import { injectStores } from "@mobx-devtools/tools";
import { StatModifier } from "../domain/modifiers/StatModifier.ts";

export const character = new Character({
  skills: {
    specialSkill: 6,
    professionalSkills: {
      Credibility: 6,
      "Awareness/Notice": 7,
      Composition: 6,
      "Education & Gen. Know": 4,
      "Persuasion & Fast Talk": 8,
      "Human Perception": 5,
      Social: 6,
      Streetwise: 0,
      "Photo & Film": 0,
      Interview: 0,
    },
    pickupSkills: {
      Handgun: 6,
      Stealth: 6,
    },
  },
  handle: 'Theodore "Steddy" Link',
  age: 25,
  familyBackground: "",
  money: 0,
  role: ROLES.media,
  improvementPoints: 100,
  stats: {
    intelligence: 8,
    reflexes: 6,
    cool: 6,
    technical: 4,
    luck: 3,
    attractiveness: 6,
    movement: 3,
    empathy: 9,
    body: 5,
  },
  style: {
    clothes: "",
    hair: "",
    affections: "",
    ethnicity: "",
    language: "",
  },
  // weapons: [
  //   {
  //     accuracy: 0,
  //     ammo: "",
  //     availability: undefined,
  //     concealabillty: undefined,
  //     cost: 0,
  //     damage: undefined,
  //     name: "",
  //     range: 0,
  //     rateOfFire: 0,
  //     reliability: undefined,
  //     shots: 0,
  //     type: undefined,
  //     weight: 0,
  //   },
  // ],
  armor: [
    {
      name: "Medium armor jacket",
      sp: 18,
      cover: ["torso", "left_arm", "right_arm"],
      encumbrance: 1,
      cost: 200,
      equipped: true,
    },
    // {
    //   name: "Kevlar T-Shirt",
    //   sp: 10,
    //   cover: ["torso"],
    //   encumbrance: 0,
    //   cost: 100,
    //   equipped: true,
    // },
    {
      name: "Nylon Helmet",
      sp: 20,
      cost: 100,
      cover: ["head"],
      encumbrance: 0,
      equipped: true,
    },
  ],
  cybernetics: [
    {
      code: "MBL",
      name: "Muscle and Bone Lace",
      description: "Raised Body Type by +2",
      cost: 1500,
      surgery: "N",
      humanityLoss: 3,
      modifiers: [
        {
          type: StatModifier.name,
          description: "Raised Body Type by +2",
          stat: "body",
          value: 2,
        },
      ],
    },
  ],
});

injectStores({ character });
