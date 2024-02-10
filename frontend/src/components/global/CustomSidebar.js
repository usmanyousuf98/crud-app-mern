import { useState } from "react";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, colors, useTheme } from "@mui/material";
import { Link } from "react-router-dom";

import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";

const Item = ({ title, to, icon, selected, setSelected }) => {
  return (
    <MenuItem
      active={selected === title}
      style={
        {
          //color: colors.grey[100],
        }
      }
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const CustomSidebar = ({ isCollapsed, setIsCollapsed, handleSelection }) => {
  const theme = useTheme();
  // const colors = tokens(theme.palette.mode);
  const [selected, setSelected] = useState("Dashboard");
  handleSelection(selected);

  return (
    <Box
      sx={{
        "& .pro-sidebar-inner": {
          background: "red !important", // Change background color to red
        },

        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
        },

        backgroundColor: "green",
        height: "99vh",
      }}
    >
      <Sidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          {/* LOGO AND MENU ICON */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0",
              // // color: colors.grey[100],
            }}
          >
            {!isCollapsed && (
              <div
                display="flex"
                justifyContent="center"
                alignItems="center"
                // ml="30px"
              >
                <Typography variant="h4">SAVIYNT</Typography>
              </div>
            )}
          </MenuItem>

          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            <Item
              title="Customers"
              to="/"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
              // setSelected={setSelected}
            />
          </Box>
        </Menu>
      </Sidebar>
    </Box>
  );
};

export default CustomSidebar;
