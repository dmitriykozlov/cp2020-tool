import { createBrowserRouter } from "react-router";
import React from "react";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: React.lazy(() => import("./App.tsx")),
    children: [
      {
        path: "character",
        Component: React.lazy(
          () => import("./routes/character/CharacterPage.tsx"),
        ),
      },
      {
        index: true,
        Component: React.lazy(
          () => import("./routes/calculator/Calculator.tsx"),
        ),
      },
    ],
  },
]);
