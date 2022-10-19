import { Navigate, Route, Routes } from "react-router-dom";
import CreateBotView from "./views/createBot.view";
import LoginView from "./views/login.view";
import "./assets/css/fonts.css";
import DashboardView from "./views/dashboard.view";
import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import TopBar from "./components/global/TopBar";

function App() {

  const [theme, colorMode] = useMode();
  const isLoggedIn = window.localStorage.getItem("isLoggedIn");
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <main className="content">
            <TopBar/>
            <Routes>
              <Route
                path="/"
                element={
                  isLoggedIn ? (
                    <Navigate to="/home" />
                  ) : (
                    <Navigate to="/login" />
                  )
                }
              />
              <Route
                path="/home"
                element={<DashboardView />}
              />
              <Route path="/createbot" element={<CreateBotView />} />
              <Route path="/login" element={<LoginView />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
