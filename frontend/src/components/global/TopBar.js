import {
  Typography,
  IconButton,
  Box,
  Button,
  Menu,
  Divider,
} from "@mui/material";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import { useTheme } from "@mui/material";
import { useContext, useState } from "react";
import { ColorModeContext, tokens } from "../../theme";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import { useNavigate } from "react-router-dom";

const TopBar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);

  const [anchorEl, setAnchorEl] = useState(null);
  const nav = useNavigate();

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogOut = () => {
    window.localStorage.removeItem("isLoggedIn");
    window.localStorage.removeItem("userName");
    window.localStorage.removeItem("apiKey");
    window.localStorage.removeItem("secretKey");
    nav("/");
  };

  return (
    <Box display="flex" justifyContent="space-between" p={2}>
      <Box display="flex" alignItems="center" p={1}>
        <SmartToyIcon sx={{ color: colors.blueAccent[500] }} />
        <Typography
          variant="h4"
          fontFamily="monospace"
          letterSpacing="0.3rem"
          p={1}
        >
          TRADINGBOT
        </Typography>
      </Box>
      <Box display="flex">
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton>
        <IconButton onClick={handleMenu}>
          <PersonOutlinedIcon />
        </IconButton>
        {(window.location.pathname === "/home" ||
          window.location.pathname === "/createBot") && (
          <Box mt={1.3}>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              elevation={10}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
              color={colors.primary}
              PaperProps={{
                style: {
                  width: "160px",
                },
              }}
            >
              <Typography
                paddingBottom={1}
                textAlign={"center"}
                style={{ fontWeight: 600 }}
                fontSize={14}
              >
                User: @{window.localStorage.getItem("userName")}
              </Typography>
              <Divider />
              <Button
                variant="text"
                onClick={handleLogOut}
                sx={
                  theme.palette.mode === "light"
                    ? {
                        marginTop: 0,
                        marginBottom: -0.9,
                        fontSize: 14,
                        color: "#555",
                      }
                    : {
                        marginTop: 0,
                        marginBottom: -0.9,
                        fontSize: 14,
                        color: "white",
                      }
                }
                fullWidth
              >
                Sign Out
              </Button>
            </Menu>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default TopBar;

// return (
//   <AppBar position="static" elevation={7} color="primary">
//     <Toolbar disableGutters>
//       <SmartToyIcon fontSize="large" sx={{ padding: "9px" }} />
//       <Typography
//         textAlign="start"
//         variant="h5"
//         color="#4fe3ed"
//         noWrap
//         fontFamily={"monospace"}
//         letterSpacing="0.3rem"
//         flexGrow={0.67}
//       >
//         TRADINGBOT
//       </Typography>
//       <Typography
//         textAlign="start"
//         variant="h5"
//         color="#4fe3ed"
//         noWrap
//         fontFamily={"monospace"}
//         letterSpacing="0.3rem"
//         flexGrow={1}
//       >
//         {middleText ? middleText : ""}
//       </Typography>
//     </Toolbar>
//   </AppBar>
// );
