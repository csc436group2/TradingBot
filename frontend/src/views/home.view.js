import { Divider } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import UserModel from "../models/user";
import Image from "../assets/image/bg.png"; // Import using relative path
import MyAppBar from "../components/static/AppBar";
import CreateBot from "../components/form/CreateBot";
import styled from "@emotion/styled";

function Home() {
  const loc = useLocation();
  const nav = useNavigate();

  const user = new UserModel(
    loc.state.userName,
    loc.state.apiKey,
    loc.state.secretKey
  );

  return (
    <Container>
      <MyAppBar isLogin={"false"} user={user} nav={nav} />
      <Wrapper>
        <Divider variant="middle" />
        <CreateBot />
      </Wrapper>
    </Container>
  );
}

const Container = styled.div`
  background: #effcff;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  min-height: 1000px;
`;

const Wrapper = styled.div`
  background-image: url(${Image});
  background-position: center;
  background-size: 100%;
  width: 100%;
  height: undefined;
  min-height: 100%;
  display: flex;
  justify-content: center;
  background-repeat: repeat;
`;

export default Home;
