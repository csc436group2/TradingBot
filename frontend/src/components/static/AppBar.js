import {
  AppBar,
  Toolbar,
  Typography,
  ThemeProvider,
  Tooltip,
  IconButton,
  Avatar,
  Menu,
  Button,
  Divider,
} from "@mui/material";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import { createTheme } from "@mui/material/styles";
import { useState } from "react";

const MyAppBar = ({ isLogin, user, nav }) => {
  const myTheme = createTheme({
    palette: {
      primary: {
        main: "#181818",
        contrastText: "#4fe3ed",
      },
      secondary: {
        main: "#4fe3ed",
        contrastText: "#181818",
      },
    },
  });

  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogOut = () => {
    nav("/");
  };

  return (
    <ThemeProvider theme={myTheme}>
      <AppBar position="static" elevation={7} color="primary">
        <Toolbar disableGutters>
          <SmartToyIcon fontSize="large" sx={{ padding: "9px" }} />
          <Typography
            textAlign="start"
            variant="h5"
            color="#4fe3ed"
            noWrap
            fontFamily={"monospace"}
            letterSpacing="0.3rem"
            flexGrow={0.67}
          >
            TRADINGBOT
          </Typography>
          {isLogin === "false" && (
            <Typography
              textAlign="start"
              variant="h5"
              color="#4fe3ed"
              noWrap
              fontFamily={"monospace"}
              letterSpacing="0.3rem"
              flexGrow={1}
            >
              TRADING INTERFACE
            </Typography>
          )}
          {isLogin === "false" && (
            <div style={{marginRight: 12}}>
              <Tooltip title="Press me!" arrow={true} placement="bottom">
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="primary"
                >
                  <Avatar sx={{ backgroundColor: "#4fe3ed", color: "#181818" }}>
                    {user.userName.toUpperCase().charAt(0)}
                  </Avatar>
                </IconButton>
              </Tooltip>
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
                PaperProps={{
                  style: {
                    width: "160px",
                    backgroundColor: "rgba(94,123,130, 0.9)",
                  },
                }}
              >
                <Typography
                  paddingBottom={1}
                  textAlign={"center"}
                  style={{ fontWeight: 600 }}
                  fontSize={14}
                  color="white"
                >
                  User: @{user.userName}
                </Typography>
                <Divider sx={{ backgroundColor: "white" }} />
                <Button
                  variant="text"
                  onClick={handleLogOut}
                  sx={{
                    marginTop: 0,
                    marginBottom: -0.9,
                    fontSize: 14,
                    color: "white",
                  }}
                  fullWidth
                >
                  Sign Out
                </Button>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
};

export default MyAppBar;
