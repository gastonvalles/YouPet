import { CssBaseline, ThemeProvider } from "@mui/material";
import React from "react";
import { Route, Routes } from "react-router-dom";
import Info from "../Info/index.jsx";
import AddPet from "../Pets/AddPet/index.jsx";
import MyPets from "../Pets/MyPets/index.jsx";
import UpdateInfo from "../Profile/UpdateInfo/index.jsx";
import SideBar from "../SideBar/index.jsx";
import { ColorModeContext, useMode } from "../theme";
import bodyPanelStyle from "./UserPanel.module.css";

export default function PanelAdmin() {
  const [theme, colorMode] = useMode();
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className={bodyPanelStyle.app}>
          <SideBar />
          <main className={bodyPanelStyle.content}>
            <Routes>
              <Route path="/" element={<Info />} />
              <Route path="/addpet" element={<AddPet />} />
              <Route path="/MyPets" element={<MyPets />} />
              <Route path="/update" element={<UpdateInfo />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
