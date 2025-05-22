import React from "react";
import "./App.css";
import { MainLayout } from "./layout/MainLayout.tsx";
import { DialogProvider } from "./coreComponents/Dialog/Context.tsx";
import { Outlet } from "react-router";

const App: React.FC = function () {
  return (
    <>
      <DialogProvider>
        <MainLayout>
          <Outlet />
        </MainLayout>
      </DialogProvider>
    </>
  );
};

export default App;
