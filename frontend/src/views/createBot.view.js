import { useNavigate } from "react-router-dom";
import CreateBot from "../components/form/CreateBot";
import { useEffect } from "react";

function CreateBotView() {
  const nav = useNavigate();

  const isLoggedIn = window.localStorage.getItem("isLoggedIn");

  useEffect(() => {
    if (isLoggedIn === null || !isLoggedIn) {
      nav("/login");
    }
  });

  return <CreateBot />;
}

export default CreateBotView;
