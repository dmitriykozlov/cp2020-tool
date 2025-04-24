import React from "react";
import { CharacterInfo } from "@/routes/character/components/CharacterInfo/CharacterInfo.tsx";
import { StatBlock } from "@/routes/character/components/StatBlock/StatBlock.tsx";
import { ArmorBlock } from "@/routes/character/components/ArmorBlock/ArmorBlock.tsx";
import { FullSkillBlock } from "@/routes/character/components/SkillBlock/SkillsBlock.tsx";
import { WeaponsBlock } from "@/routes/character/components/Weapons/WeaponsBlock.tsx";
import { GearBlock } from "@/routes/character/components/GearBlock/GearBlock.tsx";

const CharacterPage: React.FC = () => {
  return (
    <>
      <CharacterInfo />
      <StatBlock />
      <ArmorBlock />
      <FullSkillBlock />
      <WeaponsBlock />
      <GearBlock />
    </>
  );
};

export default CharacterPage;
