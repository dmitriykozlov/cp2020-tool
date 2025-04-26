import React, { useState } from "react";
import { SkillView } from "./SkillView.tsx";
import c from "./skill-block.module.css";
import { character } from "@repo/main.ts";
import { skillDescriptions, SkillGroupName } from "@domain/rules/skills";
import clsx from "clsx";

export const FullSkillBlock: React.FC = () => {
  const [showFull, setShowFull] = useState<boolean>(false);

  return (
    <div className={c.container}>
      <h2
        onClick={() => {
          setShowFull((c) => !c);
        }}
      >
        Skills
      </h2>
      <div className={clsx(c.skillsWrapper, showFull ? c.full : c.shortened)}>
        <div className={c.groupWrapper}>
          <h3 className={c.groupHeader}>Special abilities</h3>
          <SkillView skill={character.skills.specialSkill} />
        </div>
        {Object.entries(skillDescriptions).map(([group, skills]) => {
          if ((group as SkillGroupName) === "specialAbilities") return null;
          const skillElements = Object.entries(skills)
            .map(([skillName, skillDesc]) => {
              const chatSkill = character.skills.data[skillDesc.name];
              if (chatSkill.level > 0) {
                return <SkillView key={skillName} skill={chatSkill} />;
              }
              if (showFull) {
                return <SkillView key={skillName} skill={chatSkill} />;
              }
              return null;
            })
            .filter((v) => v !== null);
          if (skillElements.length === 0) {
            return null;
          }
          return (
            <div key={group} className={c.groupWrapper}>
              <h3 className={c.groupHeader}>{group}</h3>
              {skillElements}
            </div>
          );
        })}
      </div>
    </div>
  );
};
