import { useNavigate } from "react-router-dom";
// import UserModel from "../models/user";
import { useEffect } from "react";
import Dashboard from "../components/dashboard/Dashboard";

function DashboardView() {
  const nav = useNavigate();

  const isLoggedIn = window.localStorage.getItem("isLoggedIn");

  useEffect(() => {
    if (isLoggedIn === null || !isLoggedIn) {
      nav("/login");
    }
  });

//   const user = new UserModel(
//     window.localStorage.getItem("userName"),
//     window.localStorage.getItem("apiKey"),
//     window.localStorage.getItem("secretKey")
//   );

  return <Dashboard />;
}

export default DashboardView;
