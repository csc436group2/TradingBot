import Image from "../assets/image/bg.png";
import styled from "@emotion/styled";
import LoginComponent from "../components/form/LoginSidebar";
import RightSide from "../components/static/RightSide";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function LoginView() {
  const nav = useNavigate();
  const isLoggedIn = window.localStorage.getItem("isLoggedIn");

  useEffect(() => {
    if (isLoggedIn !== null || isLoggedIn) {
      nav("/home");
    }
  });

  return (
      <Wrapper>
        <LoginComponent />
        <RightSide />
      </Wrapper>
  );
}

const Wrapper = styled.div`
  background-image: url(${Image});
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  width: 100%;
  height: 100%;
  display: flex;
`;

export default LoginView;
