import { createBrowserRouter } from "react-router";
import React from "react";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: React.lazy(() => import("./App.tsx")),
    children: [
      {
        index: true,
        Component: React.lazy(
          () => import("./routes/charachter/CharacterPage.tsx"),
        ),
      },
      {
        path: "calculator",
        Component: React.lazy(
          () => import("./rotes/calculator/Calculator.tsx"),
        ),
      },
    ],
  },
]);
