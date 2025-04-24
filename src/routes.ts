import { createBrowserRouter } from "react-router";
import React from "react";

export const router = createBrowserRouter([
  {
    path: "/cp2020-tool",
    Component: React.lazy(() => import("./App.tsx")),
    children: [
      {
        index: true,
        Component: React.lazy(
          () => import("./routes/character/CharacterPage.tsx"),
        ),
      },
      {
        path: "calculator",
        Component: React.lazy(
          () => import("./routes/calculator/Calculator.tsx"),
        ),
      },
    ],
  },
]);
