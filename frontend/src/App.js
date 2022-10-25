import { Navigate, Route, Routes } from "react-router-dom";
import LoginView from "./views/Login";
import "./assets/css/fonts.css";
import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import Topbar from "./components/TopBar";
import Dashboard from "./views/Dashboard";
import CreateBot from "./views/CreateBot";
function App() {

  const [theme, colorMode] = useMode();
  const isLoggedIn = window.localStorage.getItem("isLoggedIn");
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <main className="content">
            <Topbar/>
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
                element={<Dashboard />}
              />
              <Route path="/createbot" element={<CreateBot/>} />
              <Route path="/login" element={<LoginView />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
