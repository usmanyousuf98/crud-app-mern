import "./App.css";
import React, { useEffect, useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import CustomSideBar from "./components/global/CustomSidebar";
import TopBar from "./components/global/TopBar";
import { Route, Routes } from "react-router-dom";
import { Box } from "@mui/material";
import Dashboard from "./pages/Dashboard";

function App() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");

  const isLoggedIn = true; // useSelector((state) => state?.auth?.isLoggedIn);

  const handleSelection = (value) => {
    setSelected(value);
  };

  return (
    <div style={{ display: "flex" }}>
      <CssBaseline />
      {isLoggedIn && (
        <CustomSideBar
          isCollapsed={isCollapsed}
          setIsCollapsed={setIsCollapsed}
          handleSelection={handleSelection}
        />
      )}

      <main className="content">
        {isLoggedIn && (
          <TopBar
            isCollapsed={isCollapsed}
            setIsCollapsed={setIsCollapsed}
            title={selected}
          />
        )}
        <Box>
          <Routes>
            <Route path="/" element={<Dashboard />} />
          </Routes>
        </Box>
      </main>
    </div>
  );
}

export default App;
