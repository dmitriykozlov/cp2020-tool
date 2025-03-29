import { SkillDescription } from "./SkillDescription.ts";

export const martialArtNames = [
  "Martial Art(Aikido)",
  "Martial Art(Animal Kung Fu)",
  "Martial Art(Boxing)",
  "Martial Art(Capoeira)",
  "Martial Art(Choi Li Fut)",
  "Martial Art(Judo)",
  "Martial Art(Karate)",
  "Martial Art(Tae Kwon Do)",
  "Martial Art(Thai Kick Boxing)",
  "Martial Art(Wrestling)",
] as const;

export type MartialArtsSkillName = (typeof martialArtNames)[number];

export const pilotingSkillNames = [
  "Pilot (Gyro)",
  "Pilot (Fixed Wing)",
  "Pilot (Dirigible)",
  "Pilot (Vect.Thrust Vehicle)",
] as const;

export type PilotingSkillName = (typeof pilotingSkillNames)[number];

export const reflexesSkillNames = [
  "Archery",
  "Athletics",
  "Brawling",
  "Dance",
  "Dodge & Escape",
  "Driving",
  "Fencing",
  "Handgun",
  "Heavy Weapons",
  ...martialArtNames,
  "Melee",
  "Motorcycle",
  "Operate Heavy Machinery",
  ...pilotingSkillNames,
  "Rifle",
  "Stealth",
  "Submachinegun",
] as const;

export type ReflexSkillName = (typeof reflexesSkillNames)[number];

const martialArts: Record<MartialArtsSkillName, SkillDescription> = {
  "Martial Art(Aikido)": SkillDescription.make({
    name: "Martial Art(Aikido)",
    stat: "reflexes",
    multiplier: 3,
    description:
      "This form relies on using the opponent's strength and momentum against him. It is a perfect form for stopping an opponent peacefully while making yourself very hard to hit. Key attacks are: blocks & parries, dodges, throws, holds, escapes, chokes, sweeps, trips & sweeps, grapples.",
  }),
  "Martial Art(Animal Kung Fu)": SkillDescription.make({
    name: "Martial Art(Animal Kung Fu)",
    stat: "reflexes",
    multiplier: 3,
    description:
      "These are forms based on animal movements, such as crane, mantis, tiger, leopard, and dragon forms. These attacks are fast and dangerous, with a style that is exciting and flashy. Key attacks include: strikes, punches, kicks, blocks & parries, sweeps & trips.",
  }),
  "Martial Art(Boxing)": SkillDescription.make({
    name: "Martial Art(Boxing)",
    stat: "reflexes",
    multiplier: 1,
    description:
      "The manly art of fisticuffs, this form delivers lightning punches and a tight blocking defense. Key attacks are: punches, blocks & parries.",
  }),
  "Martial Art(Capoeira)": SkillDescription.make({
    name: "Martial Art(Capoeira)",
    stat: "reflexes",
    multiplier: 3,
    description:
      "Created by Caribbean slaves, this form combines dancelike movements with fast kicks and low-line sweeps. It is a relatively unknown form and can be combined with dance moves to disguise its true power. Key attacks are: punches, kicks, blocks & parries, dodges, and sweeps & trips.",
  }),
  "Martial Art(Choi Li Fut)": SkillDescription.make({
    name: "Martial Art(Choi Li Fut)",
    stat: "reflexes",
    multiplier: 3,
    description:
      "Descended directly from the ancient Shaolin temples, this form combines powerful roundhouse blows and sweeping kicks into a dynamic fighting style. Key attacks are: strikes, punches, kicks, blocks & parries, dodges, throws, and sweeps & trips.",
  }),
  "Martial Art(Judo)": SkillDescription.make({
    name: "Martial Art(Judo)",
    stat: "reflexes",
    multiplier: 1,
    description:
      "This system was designed as a sport form, but is very effective in combat as well. It uses throws and sweeps to knock down the opponent. Key attacks include: dodges, throws, holds, escapes, sweeps & trips, and grappling.",
  }),
  "Martial Art(Karate)": SkillDescription.make({
    name: "Martial Art(Karate)",
    stat: "reflexes",
    multiplier: 2,
    description:
      "The Japanese version of kung fu, this style uses straight-line movements and powerful blows. Variations include Shotokan and Kenpo, each with their own special moves. Key attacks are: punches, kicks, and blocks & parries.",
  }),
  "Martial Art(Tae Kwon Do)": SkillDescription.make({
    name: "Martial Art(Tae Kwon Do)",
    stat: "reflexes",
    multiplier: 3,
    description:
      "A very fast and precise form, with graceful movements and some aerial kicks. Key attacks include: strikes, punches, kicks, blocks & parries, dodges.",
  }),
  "Martial Art(Thai Kick Boxing)": SkillDescription.make({
    name: "Martial Art(Thai Kick Boxing)",
    stat: "reflexes",
    multiplier: 4,
    description:
      "One of the deadliest forms in existence, this style is known for blinding kicks delivered with incredible power. Key moves include: strikes, punches, kicks, blocks & parries, and grapples.",
  }),
  "Martial Art(Wrestling)": SkillDescription.make({
    name: "Martial Art(Wrestling)",
    stat: "reflexes",
    multiplier: 1,
    description:
      "This form combines techniques of Olympic and Professional wrestling. The style uses a wide variety of throws and holds to incapacitate the opponent. Key attacks include: throws, holds, escapes, chokes, sweeps, trips, and grapples.",
  }),
};

const pilotingSkills: Record<PilotingSkillName, SkillDescription> = {
  "Pilot (Gyro)": SkillDescription.make({
    name: "Pilot (Gyro)",
    stat: "reflexes",
    multiplier: 3,
    description:
      "The ability to pilot all types of rotorwing aircraft, including gyros, copters, and Ospreys.",
  }),
  "Pilot (Fixed Wing)": SkillDescription.make({
    name: "Pilot (Fixed Wing)",
    stat: "reflexes",
    multiplier: 2,
    description:
      "The ability to pilot fixed-wing jets and light aircraft. Ospreys may be flown with this skill, but only in the straight-ahead (non-hover) mode.",
  }),
  "Pilot (Dirigible)": SkillDescription.make({
    name: "Pilot (Dirigible)",
    stat: "reflexes",
    multiplier: 2,
    description:
      "The ability to pilot all lighter-than-air vehicles, including cargo dirigibles, blimps, and powered balloons.",
  }),
  "Pilot (Vect.Thrust Vehicle)": SkillDescription.make({
    name: "Pilot (Vect.Thrust Vehicle)",
    stat: "reflexes",
    multiplier: 3,
    description:
      "The skill of piloting all types of vectored thrust vehicles, including hovercars, hover rafts, and AV-4, 6, and 7 vehicles.",
  }),
};

export const reflexSkills: Record<ReflexSkillName, SkillDescription> = {
  Archery: SkillDescription.make({
    name: "Archery",
    stat: "reflexes",
    description:
      "The skill required to use bows, crossbows and other arrow-based ranged weapons. See Handgun for details.",
  }),
  Athletics: SkillDescription.make({
    name: "Athletics",
    stat: "reflexes",
    description:
      "This skill is required for accurate throwing, climbing, and balancing. It combines the basic elements of any high school level sports program. At +3 and above, you are the equivalent of a real high school 'jock'. At +5 and above, you can perform in college level competitions. At +8 and above, you are of Olympic or Professional caliber.",
  }),
  Brawling: SkillDescription.make({
    name: "Brawling",
    stat: "reflexes",
    description:
      "The skill of fighting man to man with fist, feet and other parts of the body. Brawling is not a trained skill—it is learned on the street by getting into a lot of fights. Unlike Martial Arts, there are no specialized attacks and no damage bonuses based on level of mastery.",
  }),
  Dance: SkillDescription.make({
    name: "Dance",
    stat: "reflexes",
    description:
      "The specific skill needed to become a professional dancer. A trained dancer +4 or greater can successfully dance for payment in small clubs or dance troupes. Dancers +6 or greater will be considered to be of professional caliber, and regularly give performances and have fans. Dancers +9 or greater are of 'star' caliber, have a large number of fans, and may be recognized on the street.",
  }),
  "Dodge & Escape": SkillDescription.make({
    name: "Dodge & Escape",
    stat: "reflexes",
    description:
      "This skill is required to dodge attacks and escape grapples and holds. If an attack is made without your knowledge, you may not apply this skill to your Defense roll.",
  }),
  Driving: SkillDescription.make({
    name: "Driving",
    stat: "reflexes",
    description:
      "This skill allows you to pilot all ground vehicles like cars, trucks, tanks, and hovercraft. This skill is not usable for piloting aircraft. A skill of +3 is equal to that of a very good non-professional driver. A skill of +6 allows you to drive with the skill of a moderately skilled race driver. A driver with a skill of +8 or greater will be nationally known as a racer, regularly win championship races, and possibly have access to the most advanced ground vehicles available (as long as he makes an endorsement).",
  }),
  Fencing: SkillDescription.make({
    name: "Fencing",
    stat: "reflexes",
    description:
      "The mastery of swords, rapiers, and monoblades. A Fencing Skill of +3 allows you to be competent with a blade. A Skill of +5 makes you fairly skilled. A Fencing Skill of +6 might win you the National Fencing Competitions. A Skill of +8 will get you a reputation for being a true swordsman of duelist caliber. People like D'Artagnan or Miyamoto Musashi have Skills of +10. They are legendary masters of the blade; the mention of whom will cause all but the stupidest young bravo to run for cover.",
  }),
  Handgun: SkillDescription.make({
    name: "Handgun",
    stat: "reflexes",
    description:
      "You must have this skill to effectively use handguns of any type, including cyberware types. At +2, you can use a handgun effectively on a target range, though combat will still rattle you. At +5, you are as skilled as most military officers or policemen. At +7, you can do the sort of fancy shooting you see on TV, and have begun to get a reputation of being 'good with a gun'. At +8, you are a recognized gunslinger with a 'rep'. The very sound of your name makes some people back down in fear. At +10, you are a legendary gunslinger, feared by all except the stupid young punks who keep trying to 'take' you in innumerable gunfight challenges.",
  }),
  "Heavy Weapons": SkillDescription.make({
    name: "Heavy Weapons",
    stat: "reflexes",
    description:
      "The required skill for using grenade launchers, autocannon, mortars, heavy machine guns, missiles, and rocket launchers. A Level +5 skill would be equivalent to a general military 'Heavy Weapons' training course, giving the user the ability to use any or all of these weapon types.",
  }),
  Melee: SkillDescription.make({
    name: "Melee",
    stat: "reflexes",
    description:
      "The ability to use knives, axes, clubs and other hand-to-hand weapons in combat. Note: when using non-ranged cyberweapons such as rippers, scratchers, slice n' dices, cyberbeasts, and battlegloves, you must use this skill.",
  }),
  Motorcycle: SkillDescription.make({
    name: "Motorcycle",
    stat: "reflexes",
    description:
      "The required skill to operate motorcycles, cyberbikes, and other two- and three-wheeled vehicles.",
  }),
  "Operate Heavy Machinery": SkillDescription.make({
    name: "Operate Heavy Machinery",
    stat: "reflexes",
    description:
      "The required skill to operate tractors, tanks, very large trucks, and construction equipment.",
  }),
  Rifle: SkillDescription.make({
    name: "Rifle",
    stat: "reflexes",
    description:
      "You must have this skill to use rifles/shotguns effectively (see Handguns for limitations and modifiers).",
  }),
  Stealth: SkillDescription.make({
    name: "Stealth",
    stat: "reflexes",
    multiplier: 2,
    description:
      "The skill of hiding in shadows, moving silently, evading guards, etc. A Stealth Skill of +1 is about the level of a very sneaky 10-year-old stealing cookies. At +3, you are able to get past most guards, or your parents if you've been grounded. At +6, you are good enough to slip smoothly from shadow to shadow and not make any noise. At +8, you are the equal of most Ninja warriors. At +10, you move as silently as a shadow, making the Ninja sound like elephants.",
  }),
  Submachinegun: SkillDescription.make({
    name: "Submachinegun",
    stat: "reflexes",
    description:
      "You must have this skill to use any type of submachine gun effectively (see Handguns for limitations and modifiers).",
  }),
  ...martialArts,
  ...pilotingSkills,
};
