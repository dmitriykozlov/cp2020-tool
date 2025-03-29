import React from "react";
import c from "./char-info.module.css";
import { observer } from "mobx-react-lite";
import { action } from "mobx";
import { character } from "../../repository";
import { Input } from "../../coreComponents/Input/Input.tsx";
import { Option, Select } from "../../coreComponents/Select/Select.tsx";
import { ROLE_NAMES } from "../../domain/rules/Roles.ts";

// type Props = {};

const slice = ROLE_NAMES.map(
  (name): Option => ({
    id: name,
    display: name,
  }),
);

export const CharacterInfo: React.FC = observer(() => {
  return (
    <div className={c.container}>
      <div className={c.charInfo}>
        <h3>
          <Input
            spellCheck={false}
            value={character.handle}
            label={"Character name"}
            onChange={action((e) => {
              character.handle = e.target.value;
            })}
          />
        </h3>
        <h4>
          <Select value={character.role.name} options={slice} />
        </h4>
      </div>
    </div>
  );
});
