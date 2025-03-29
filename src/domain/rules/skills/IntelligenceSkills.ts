import { SkillDescription } from "./SkillDescription.ts";

export const intelligenceSkillNames = [
  "Accounting",
  "Anthropology",
  "Awareness/Notice",
  "Biology",
  "Botany",
  "Chemistry",
  "Composition",
  "Diagnose Illness",
  "Education & Gen. Know",
  "Expert",
  "Gamble",
  "Geology",
  "Hide/Evade",
  "History",
  "Language",
  "Library Search",
  "Mathematics",
  "Physics",
  "Programming",
  "Shadow/Track",
  "Stock Market",
  "System Knowledge",
  "Teaching",
  "Wilderness Survival",
  "Zoology",
] as const;

export type IntelligenceSkillName = (typeof intelligenceSkillNames)[number];

export const intelligenceSkills: Record<
  IntelligenceSkillName,
  SkillDescription
> = {
  Accounting: SkillDescription.make({
    name: "Accounting",
    stat: "intelligence",
    description:
      "The ability to balance books (or create false books), juggle numbers, create budgets, and handle day-to-day business operations.",
  }),
  Anthropology: SkillDescription.make({
    name: "Anthropology",
    stat: "intelligence",
    description:
      "The knowledge of human cultures, habits, and customs. Unlike Streetwise (which covers only the cultures and customs of the Street) or Social (which covers only what you should do in a given situation), Anthropology covers general customs and the background of a culture. For example, with Streetwise, you know what alleys to avoid and what gangs are dangerous. With Social, you know the proper forms of address for a high-ranking Japanese zaibatsu head. With Anthropology, you know that the customs of an N’Tanga tribesman require that a young man kill a lion to be accepted as an adult male.",
  }),
  "Awareness/Notice": SkillDescription.make({
    name: "Awareness/Notice",
    stat: "intelligence",
    description:
      "This is the equivalent of a 'trained observer' skill, allowing characters to notice or be aware of clues, shadowers, and other events. With an Awareness of +2, you will usually spot small pieces of paper with notes on them, doors left ajar, and obvious expressions of lying or dislike. An Awareness of +5 or better allows you to spot fairly well-hidden clues, notice small changes in expression, and recognize sophisticated attempts to 'shadow' you. With an Awareness of +8 or greater, you routinely perform the sorts of deductive reasoning seen in the average TV cop show ('The murderer was left-handed because this knife has a specialized handle'). Sherlock Holmes has a +10 Awareness. Players without this skill may only use their Intelligence Stat.",
  }),
  Biology: SkillDescription.make({
    name: "Biology",
    stat: "intelligence",
    description:
      "General knowledge of animals, plants, and other biological systems. At level +3, you know most types of common animals and plants. At +6, you have a general understanding of genetics, cellular biology, etc. At +10, you can perform most bio-lab procedures, including gene mapping and splicing.",
  }),
  Botany: SkillDescription.make({
    name: "Botany",
    stat: "intelligence",
    description:
      "General knowledge of plants and plant identification. At level +3, you know most common plants and can identify which ones are dangerous and why. At +6, you can identify most important plants found worldwide and have a working knowledge of their uses. At +8, you have the equivalent of a doctorate in Botany and know all about rare poisons, exotic orchids, and other useful plants.",
  }),
  Chemistry: SkillDescription.make({
    name: "Chemistry",
    stat: "intelligence",
    description:
      "The required skill for mixing chemicals and creating various compounds. A level +2 Chemistry is equal to high school chemistry. A level +4 is equal to a trained pharmacist or college-level chemist. A +8 is a trained laboratory chemist.",
  }),
  Composition: SkillDescription.make({
    name: "Composition",
    stat: "intelligence",
    description:
      "The required skill for writing songs, articles, or stories. A Composition Skill of +4 or greater gives your character the ability to produce salable work. A Skill of +8 or more produces work of such high caliber that the creator may have a strong literary following and not a little critical acclaim.",
  }),
  "Diagnose Illness": SkillDescription.make({
    name: "Diagnose Illness",
    stat: "intelligence",
    description:
      "The skill of clinically diagnosing symptoms and medical problems. A +3 is the equivalent of a high school nurse—you can recognize most common injuries and complaints. At +6, you would be equivalent to a trained intern; you can recognize many uncommon illnesses and know how to treat most common ones. A +9 is the equivalent of a skilled diagnostician; other physicians come to you to get a diagnosis.",
  }),
  "Education & Gen. Know": SkillDescription.make({
    name: "Education & Gen. Know",
    stat: "intelligence",
    description:
      "This skill is the equivalent of a basic public school education, allowing you to know how to read, write, use basic math, and know enough history to get by. In effect, it is a 'lore' or trivia skill. A level of +1 is a basic grade school education. A skill of +2 is equal to a high school equivalency. A Knowledge Skill of +3 is equal to a college education. +4 or higher is equal to a Master’s or Doctorate. At +7, you are an extremely well-educated person and are asked to play Trivial Pursuit a lot. At +9 and above, you are one of those people who 'knows a lot about everything' (and hopefully has the good sense to keep his mouth shut).",
  }),
  Expert: SkillDescription.make({
    name: "Expert",
    stat: "intelligence",
    description:
      "You may use this skill to be an expert on one specific subject, such as rare postage stamps, obscure weapons, a foreign language, etc. At +3, you are the local expert. At +6, you know enough to publish a few books on the subject. At +8 or better, your books are recognized as major texts on the subject, and you could do the talk-show circuit if you wanted to.",
  }),
  Gamble: SkillDescription.make({
    name: "Gamble",
    stat: "intelligence",
    description:
      "The skill of knowing how to make bets, figure odds, and play games of chance successfully. As any professional gambler knows, this is not a luck skill. At +2, you are the local card shark at the Saturday night poker game. At +6, you can make a living at the tables in Vegas and Monte Carlo. At +9 or better, you can take on James Bond at roulette and stand a good chance of breaking the bank.",
  }),
  Geology: SkillDescription.make({
    name: "Geology",
    stat: "intelligence",
    description:
      "A functional knowledge of rocks, minerals, and geologic structures. At +3, you can identify most common rocks and minerals. At +6, you have the equivalent of a college degree in Geology and can identify minerals and geological structures with ease. At +8, you can teach geology in high school.",
  }),
  "Hide/Evade": SkillDescription.make({
    name: "Hide/Evade",
    stat: "intelligence",
    description:
      "The skill of losing pursuers, covering tracks, and otherwise evading people on your trail. At +3, you can lose most booster-gangers on the rampage. At +6, you can ditch cops and private eyes. At +8, you can ditch most Solos.",
  }),
  History: SkillDescription.make({
    name: "History",
    stat: "intelligence",
    description:
      "The knowledge of facts and figures of past events. In gameplay, this might be used to determine if a character is familiar with a particular clue related to a past event. At +2, you have the equivalent of a grade school history education. At +6, you would have the equivalent of a college grasp on the subject. At +8, you could teach history in high school. At +9, you may have written a few of the most oft-used texts on a particular historical personage or epoch.",
  }),
  Language: SkillDescription.make({
    name: "Language",
    stat: "intelligence",
    description:
      "The knowledge of a foreign tongue. At +2, you can 'get by' with speaking the language. At +3, you can actually read a written form of it. At +6 and above, you are fairly fluent, although no native will be fooled by your ability. At +8 and above, you speak and read the language like a native.",
  }),
  "Library Search": SkillDescription.make({
    name: "Library Search",
    stat: "intelligence",
    description:
      "The skill of using databases, DataTerms™, libraries, and other compiled information sources to find facts. With a skill of +2, you can use most simple databases. With a skill of +6, you can easily access the Library of Congress. At +9, you can comprehend almost any public database and find very obscure facts.",
  }),
  Mathematics: SkillDescription.make({
    name: "Mathematics",
    stat: "intelligence",
    description:
      "The skill of understanding calculations and mathematical formulas. At +3, you have the ability to add, subtract, divide, and multiply. At +4, you can do algebra and geometry. At +6, you can perform calculus. At +9, you can deduce your own mathematical formulas.",
  }),
  Physics: SkillDescription.make({
    name: "Physics",
    stat: "intelligence",
    description:
      "The ability to calculate physical principles such as gas pressures, mechanical energies, etc. This skill requires a basic Mathematics Skill of +4.",
  }),
  Programming: SkillDescription.make({
    name: "Programming",
    stat: "intelligence",
    description:
      "The required skill to write programs and reprogram computer systems. This skill does not allow players to actually do repairs on a computer (this requires Electronics). With a Programming Skill of +1, you can do simple EBASIC programs. A Programming Skill of +3 or better allows you to know some higher-level languages and be able to write reasonably complex programs (including video games). Players with a Programming Skill of +6 or better are considered professionals who can build operating software, design mainframe systems, and hold down a steady job at your average Silicon Valley firm. With a Programming Skill of +9 or better, other programmers speak your name with reverence ('You invented Q? Wow!'), young hackers set out to crack your systems, and any computer software you design instantly gets used by every business application in the world.",
  }),
  "Shadow/Track": SkillDescription.make({
    name: "Shadow/Track",
    stat: "intelligence",
    description:
      "The skill of shadowing and following people. This skill is primarily used in urban or inhabited areas rather than in the wilderness (where the skill of Survival incorporates tracking game in the wilds).",
  }),
  "Stock Market": SkillDescription.make({
    name: "Stock Market",
    stat: "intelligence",
    description:
      "The ability to play the stock market, engage in routine stock transactions, and manipulate stocks profitably. At +2, you know enough to invest in junk bonds and lose your shirt. At +6, your investments pay off 75% of the time. At +9, you are a major heavy on the Market, routinely dabble in international stocks, and can write learned articles on the subject of investment.",
  }),
  "System Knowledge": SkillDescription.make({
    name: "System Knowledge",
    stat: "intelligence",
    description:
      "Basic knowledge of the geography of the Net, its lore and history, as well as knowledge of the important computer systems, their strengths, and their weaknesses. At +2, you can generally navigate around the Net and know where all the local places are. At +6, you know the locations of most places in the Net and have a working understanding of its largest and most well-known systems. At +9, you know the entire Net like the back of your hand, know the general layouts of the important systems cold, and are aware of the layouts for the rest of them.",
  }),
  Teaching: SkillDescription.make({
    name: "Teaching",
    stat: "intelligence",
    description:
      "The skill of imparting knowledge to someone else (if you don’t think this is a skill, you ought to try it sometime). Players may not teach any skill unless they have a higher skill level than the student. The referee is the final arbiter of how long it takes to teach a skill. At a Teaching Skill of +3 or better, you can professionally teach students up to high school. At +6, you know enough to be a college professor (if you wanted). At +9 or greater, you are recognized by others in the field as good enough to guest lecture at MIT or Cal Tech; your texts on the subject are quoted as major references, and you might have a TV show on the equivalent of the PBS channel.",
  }),
  "Wilderness Survival": SkillDescription.make({
    name: "Wilderness Survival",
    stat: "intelligence",
    description:
      "The required skill for knowing how to survive in the wilds. Knowledge includes how to set traps, forage for wood, track game, build shelters, and make fires. The average Boy Scout has a Survival of +3. A Special Forces Green Beret has a Survival of +6 or above. Grizzly Adams, Mountain Man of the Wilderness, would have a +9 or +10 Survival Skill.",
  }),
  Zoology: SkillDescription.make({
    name: "Zoology",
    stat: "intelligence",
    description:
      "Knowledge of lifeforms, biological processes, and their relation to the environment. At +2, you know most common animals. At +5, you know not only well-known animals but also many exotics and endangered species. At +8, you are knowledgeable about almost all animals, know their habits well, and have a +1 advantage to any Wilderness Survival Skills (you know where to find the game).",
  }),
};
