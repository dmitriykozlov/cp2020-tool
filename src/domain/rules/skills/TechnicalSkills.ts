import { SkillDescription } from "./SkillDescription.ts";

export const techSkillNames = [
  "Aero Tech",
  "AV Tech",
  "Basic Tech",
  "Cryotank Operation",
  "Cyberdeck Design",
  "CyberTech",
  "Demolitions",
  "Disguise",
  "Electronics",
  "Elect. Security",
  "First Aid",
  "Forgery",
  "Gyro Tech",
  "Paint or Draw",
  "Photo & Film",
  "Pharmaceuticals",
  "Pick Lock",
  "Pick Pocket",
  "Play Instrument",
  "Weaponsmith",
] as const;

export type TechSkillName = (typeof techSkillNames)[number];

export const technicalSkills: Record<TechSkillName, SkillDescription> = {
  "Aero Tech": SkillDescription.make({
    name: "Aero Tech",
    stat: "technical",
    multiplier: 2,
    description:
      "The required skill for repairing fixed-wing aircraft, including Ospreys, jets, and light aircraft. With a Skill of +3, you can perform most routine maintenance tasks. With a Skill of +6, you can do engine teardowns and major structural repairs. With a Skill of +9 or better, you are capable of designing and building your own aircraft.",
  }),
  "AV Tech": SkillDescription.make({
    name: "AV Tech",
    stat: "technical",
    multiplier: 3,
    description:
      "The required skill for repairing all ducted fan aerodyne vehicles. At +3, you can perform routine maintenance. At +6, you can tear down engines and modify an AV. At +10, you can design your own AVs on common airframes.",
  }),
  "Basic Tech": SkillDescription.make({
    name: "Basic Tech",
    stat: "technical",
    multiplier: 2,
    description:
      "The required skills for building or repairing simple mechanical and electrical devices, such as car engines, television sets, etc. With a Basic Tech Skill of +3 or better, you can fix minor car problems, repair basic wiring, etc. A Basic Tech Skill of +6 or better can repair stereos and TVs, rebuild an engine, etc. A Basic Tech Skill of +9 or better can build a simple computer from scratch, put together a race car engine, and maintain any kind of industrial machinery.",
  }),
  "Cryotank Operation": SkillDescription.make({
    name: "Cryotank Operation",
    stat: "technical",
    description:
      "The required skill for operating, repairing, and maintaining life suspension and body chilling devices. A minimum skill of +4 is required to chill down a healthy person. A minimum skill of +6 is required for chilling a wounded person.",
  }),
  "Cyberdeck Design": SkillDescription.make({
    name: "Cyberdeck Design",
    stat: "technical",
    multiplier: 2,
    description:
      "The required skill for designing cyberdecks. At level +4, you can modify an existing cyberdeck for greater speed or memory. At level +6, you can design a deck equal to most existing designs. At +8, you can design decks that are substantially improved over existing designs.",
  }),
  CyberTech: SkillDescription.make({
    name: "CyberTech",
    stat: "technical",
    multiplier: 2,
    description:
      "The required skill for repairing and maintaining cyberwear. At level +2, you can keep your cyberwear tuned up and replace its power batteries. At level +6, you can strip down most cyberwear and even make simple modifications. At level +8, you can design your own cyberwear to order.",
  }),
  Demolitions: SkillDescription.make({
    name: "Demolitions",
    stat: "technical",
    multiplier: 2,
    description:
      "This skill allows the character to be knowledgeable in the use of explosives, as well as knowing the best explosives to use for which jobs, how to set timers and detonators, and how much explosive to use to accomplish a desired result.",
  }),
  Disguise: SkillDescription.make({
    name: "Disguise",
    stat: "technical",
    description:
      "The skill of disguising your character to resemble someone else, whether real or fictitious. This skill incorporates elements of both makeup and acting, although it is not the same as the ability to actually be an actor.",
  }),
  Electronics: SkillDescription.make({
    name: "Electronics",
    stat: "technical",
    description:
      "The required skill for maintaining, repairing, and modifying electronic instruments such as computers, personal electronics hardware, electronic security systems, cameras, and monitors.",
  }),
  "Elect. Security": SkillDescription.make({
    name: "Elect. Security",
    stat: "technical",
    multiplier: 2,
    description:
      "The skill of installing or countering electronic eyes, electronic locks, bugs and tracers, security cameras, pressure plates, etc. At level +3, you can jimmy or install most apartment locks and security cams. At +6, you can override most corporate office locks and traps. At +9, you can enter most high-security areas with impunity.",
  }),
  "First Aid": SkillDescription.make({
    name: "First Aid",
    stat: "technical",
    description:
      "This skill allows the user to bind wounds, stop bleeding, and revive a stunned patient (see Trauma Team, pg. 116 for details).",
  }),
  Forgery: SkillDescription.make({
    name: "Forgery",
    stat: "technical",
    description:
      "The skill of copying and creating false documents and identifications. This skill may also be applied to the detection of same; if you can fake it, you can usually tell a fake as well.",
  }),
  "Gyro Tech": SkillDescription.make({
    name: "Gyro Tech",
    stat: "technical",
    multiplier: 3,
    description:
      "The skill of repairing and maintaining rotorwing aircraft such as helicopters and gyrocopters.",
  }),
  "Paint or Draw": SkillDescription.make({
    name: "Paint or Draw",
    stat: "technical",
    description:
      "The skill of producing professional drawings. A Skill of +3 allows you to produce salable 'modern' art. A Skill of +6 will produce artwork that is recognizable and extremely pleasant to the eye—as well as salable. An artist with a Skill of +8 or greater will be nationally known, have exhibits in galleries, and have other lesser artists studying his style in art school.",
  }),
  "Photo & Film": SkillDescription.make({
    name: "Photo & Film",
    stat: "technical",
    description:
      "The skill of producing professional-caliber photographs or motion pictures. A Skill of +2 allows you to make decent home movies. A Skill of +4 or better creates work capable of winning amateur contests. A Skill of +6 or better will produce work of the level of the average Playboy cover or rock video. A photographer or cinematographer with a Skill of +8 or better will be nationally known and probably famous.",
  }),
  Pharmaceuticals: SkillDescription.make({
    name: "Pharmaceuticals",
    stat: "technical",
    multiplier: 2,
    description:
      "The skill of designing and manufacturing drugs and medicines. A minimum Chemistry skill of +4 is required. At +4, you can make aspirin. At +6, you can make hallucinogenics or antibiotics. At level +9, you can build designer drugs tailored to individual body chemistries.",
  }),
  "Pick Lock": SkillDescription.make({
    name: "Pick Lock",
    stat: "technical",
    description:
      "The skill required to pick locks and break into sealed containers and rooms. At +3, you can jimmy most simple locks. At +6, you can crack most safes. At +9 or better, you have a rep as a master cracksman, and are known to all the major players in the Cyberpunk world.",
  }),
  "Pick Pocket": SkillDescription.make({
    name: "Pick Pocket",
    stat: "technical",
    description:
      "The required skill for picking pockets without being noticed, as well as 'shoplifting' small items. For ideas on levels of ability, see Pick Lock, above.",
  }),
  "Play Instrument": SkillDescription.make({
    name: "Play Instrument",
    stat: "technical",
    description:
      "The skill of knowing how to play a musical instrument. You must take this skill separately for each type of instrument played. A Skill of +4 or higher will qualify your character to play professional 'gigs'. A Skill of +8 and above will gain the musician some professional acclaim, possibly with recording contracts and command performances. At +10, you are widely acclaimed, have lots of Grammys, and regularly jam with Kerry Eurodyne.",
  }),
  Weaponsmith: SkillDescription.make({
    name: "Weaponsmith",
    stat: "technical",
    multiplier: 2,
    description:
      "The required skill for repairing and maintaining weapons of all types. At level +2, you can do repairs and field stripping. At level +6, you can repair all types of weapons and make simple modifications. At level +8, you can design your own weapons to order.",
  }),
};
