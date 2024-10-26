import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import logo2 from "../img/logo2.png";
import { Navigate, useNavigate } from "react-router-dom";

export default function MenuAppBar() {
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const navigate = useNavigate();
  return (
    <Box sx={{ flexGrow: 1, width: "100vw" }}>
      <AppBar position="static" sx={{ backgroundColor: "grey" }}>
        <Toolbar on>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Box
              sx={{ width: "20px", height: "60px", cursor: "pointer" }}
              onClick={() => navigate("/")}
            >
              <img src={logo2} alt="lgo" height="60px" />
            </Box>
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
