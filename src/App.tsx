import React from "react";
import "./App.css";
import { MainLayout } from "./layout/MainLayout.tsx";
import { Outlet } from "react-router";

const App: React.FC = function () {
  return (
    <>
      <MainLayout>
        <Outlet />
      </MainLayout>
    </>
  );
};

export default App;
