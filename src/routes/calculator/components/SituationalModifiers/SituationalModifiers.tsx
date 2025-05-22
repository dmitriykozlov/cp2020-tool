import React, { useState } from "react";
import { CalculatorStore } from "@/routes/calculator/state/CalculatorStore.ts";
import { observer } from "mobx-react-lite";
import { ModifiersTable } from "./ModifiersTable";

type SituationalModifiersProps = {
  store: CalculatorStore;
};

export const SituationalModifiers: React.FC<SituationalModifiersProps> =
  observer(({ store }) => {
    const [isExpanded, setIsExpanded] = useState(true);

    return (
      <div>
        <div onClick={() => setIsExpanded((prev) => !prev)}>
          <h3>
            Situational Modifiers <span>{isExpanded ? "🔽" : "🔼"}</span>
          </h3>
        </div>
        {isExpanded ? <ModifiersTable store={store} /> : null}
        {store.overallModifierValue}
      </div>
    );
  });
