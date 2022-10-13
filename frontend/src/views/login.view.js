import Image from "../assets/image/bg.png";
import styled from "@emotion/styled";
import LoginComponent from "../components/form/LoginSidebar";
import RightSide from "../components/static/RightSide";
import MyAppBar from "../components/static/AppBar";

function LoginView() {
  const Container = styled.div`
    background: #effcff;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
  `;

  const Wrapper = styled.div`
    background-image: url(${Image});
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    width: 100%;
    height: 100%;
    display: flex;
  `;

  return (
    <Container>
      <MyAppBar isLogin={"true"}/>
      <Wrapper>
        <LoginComponent />
        <RightSide />
      </Wrapper>
    </Container>
  );
}

export default LoginView;
