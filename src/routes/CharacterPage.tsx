import React from "react";
import { CharacterInfo } from "@/components/charachterSheet/CharacterInfo/CharacterInfo.tsx";
import { StatBlock } from "@/components/charachterSheet/StatBlock/StatBlock.tsx";
import { ArmorBlock } from "@/components/charachterSheet/ArmorBlock/ArmorBlock.tsx";
import { FullSkillBlock } from "@/components/charachterSheet/SkillBlock/SkillsBlock.tsx";
import { WeaponsBlock } from "@/components/charachterSheet/Weapons/WeaponsBlock.tsx";
import { GearBlock } from "@/components/charachterSheet/GearBlock/GearBlock.tsx";

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
