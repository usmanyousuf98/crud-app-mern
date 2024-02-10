import React from "react";
import { styled, useTheme } from "@mui/material/styles";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));
const drawerWidth = 240;
const TopBar = ({ isCollapsed, setIsCollapsed, title }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handelLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };
  const handelToggel = () => {
    if (isCollapsed) {
      setIsCollapsed(false);
    } else {
      setIsCollapsed(true);
    }
  };
  return (
    <AppBar
      position="relative"
      style={{ color: "#00979c", backgroundColor: "white" }}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handelToggel}
          edge="start"
          sx={{ mr: 2, ...(isCollapsed && { display: "none" }) }}
        >
          <Typography
            variant="h4"
            noWrap
            component="div"
            width={"100%"}
            sx={{ color: "black" }}
          >
            {title}
          </Typography>
        </IconButton>
        <Typography variant="h6" noWrap component="div" width={"100%"}>
          {/* Persistent drawer */}
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
