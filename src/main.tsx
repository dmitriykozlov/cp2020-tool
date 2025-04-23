import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./domain/modifiers/modifierFactory.ts";
import { RouterProvider } from "react-router";
import { router } from "./routes.ts";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
