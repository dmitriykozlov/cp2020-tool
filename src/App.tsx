import "./App.css";
import { MainLayout } from "./layout/MainLayout.tsx";
import { CharacterInfo } from "./components/CharacterInfo/CharacterInfo.tsx";
import { DialogProvider } from "./coreComponents/Dialog/Context.tsx";
import { StatBlock } from "./components/StatBlock/StatBlock.tsx";
import { FullSkillBlock } from "./components/SkillBlock/SkillsBlock.tsx";
import { WeaponsBlock } from "./components/Weapons/WeaponsBlock.tsx";
import { ArmorBlock } from "./components/ArmorBlock/ArmorBlock.tsx";
import { GearBlock } from "./components/GearBlock/GearBlock.tsx";

function App() {
  return (
    <>
      <DialogProvider>
        <MainLayout>
          <CharacterInfo />
          <StatBlock />
          <ArmorBlock />
          <FullSkillBlock />
          <WeaponsBlock />
          <GearBlock />
        </MainLayout>
      </DialogProvider>
    </>
  );
}

export default App;
