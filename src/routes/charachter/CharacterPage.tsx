import React from "react";
import { CharacterInfo } from "@/routes/charachter/components/CharacterInfo/CharacterInfo.tsx";
import { StatBlock } from "@/routes/charachter/components/StatBlock/StatBlock.tsx";
import { ArmorBlock } from "@/routes/charachter/components/ArmorBlock/ArmorBlock.tsx";
import { FullSkillBlock } from "@/routes/charachter/components/SkillBlock/SkillsBlock.tsx";
import { WeaponsBlock } from "@/routes/charachter/components/Weapons/WeaponsBlock.tsx";
import { GearBlock } from "@/routes/charachter/components/GearBlock/GearBlock.tsx";

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
