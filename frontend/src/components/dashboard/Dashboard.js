import styled from "@emotion/styled";
import {
  Box,
  Typography,
  useTheme,
} from "@mui/material";
import { tokens } from "../../theme";
import Header from "../Header";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const nav = useNavigate();

  let botNames = null;
  if (window.localStorage.getItem("bots")) {
    botNames = window.localStorage.getItem("bots");
  } else {
    botNames = [];
  }

  const handleCreateBot = () => {
    nav('/createBot');
  }

  const NewBot = styled.div`
  button {
    max-width: 240px;
    min-width: 180px;
    height: 40px;
    border: none;
    margin: 1rem 0;
    font-size: 18px;
    box-shadow: 0px 14px 9px -15px rgba(0, 0, 0, 0.25);
    border-radius: 20px;
    background-color: ${colors.blueAccent[800]};
    color: ${colors.primary[100]};
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease-in;
    &:hover {
      transform: translateY(-3px);
    }
  }
`;

  return (
    <Box m="20px">
      <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />
      <Typography variant="h3" pb={2}>
        My Robots
      </Typography>
      <Box display="flex">
        <Box
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="start"
          justifyContent="start"
          p={3}
          mr={3}
          width={600}
        >
          {botNames.length === 0 && (
            <div>
              <Typography variant="h4" p={3}>
                You don't appear to have a bot created with us yet. Let's get
                you started.
              </Typography>
              <NewBot>
                <button style={{ marginLeft: "35%" }} onClick={handleCreateBot}>Create New Bot</button>
              </NewBot>
            </div>
          )}
        </Box>
        <Box
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          p={3}
          width={600}
        >
          <Typography variant="h2" p={3}>
            Portfolio
          </Typography>
        </Box>
      </Box>
      {/*      <MyRobotsContainer>
        <h4 style={{ marginTop: -36, marginBottom: 12 }}>MY ROBOTS</h4>
        <Divider
          sx={{
            width: "107.2%",
            marginLeft: -6,
            marginBottom: 3,
            backgroundColor: "#777777",
            opacity: 0.3,
          }}
        />
        <RobotContainer title="Tap to view more information.">
          <BotNameBox>
            <p>Asimo</p>
          </BotNameBox>
          <BotTextContainer>
            <h6>STOCK SYMBOL</h6>
            <p>AMZN</p>
          </BotTextContainer>
          <BotTextContainer>
            <h6>BUY botNames</h6>
            <p>13</p>
          </BotTextContainer>
          <BotTextContainer>
            <h6>SELL botNames</h6>
            <p>7</p>
          </BotTextContainer>
          <OrderDateBox>
            <h6>ORDER DATE</h6>
            <p>3 Sep 2022</p>
            <p>8:32 PM</p>
          </OrderDateBox>
          <BotImg>
            <img
              src={genBotIcon(Math.random())}
              width="60"
              height="60"
              alt="bottts_avatar"
            />
          </BotImg>
        </RobotContainer>
        <RobotContainer title="Tap to view more information.">
          <BotNameBox>
            <p>Lunar</p>
          </BotNameBox>
          <BotTextContainer>
            <h6>STOCK SYMBOL</h6>
            <p>AAPL</p>
          </BotTextContainer>
          <BotTextContainer>
            <h6>BUY botNames</h6>
            <p>2</p>
          </BotTextContainer>
          <BotTextContainer>
            <h6>SELL botNames</h6>
            <p>9</p>
          </BotTextContainer>
          <OrderDateBox>
            <h6>ORDER DATE</h6>
            <p>8 Oct 2022</p>
            <p>2:04 PM</p>
          </OrderDateBox>
          <BotImg>
            <img
              src={genBotIcon(Math.random())}
              width="60"
              height="60"
              alt="bottts_avatar"
            />
          </BotImg>
        </RobotContainer>
        <RobotContainer title="Tap to view more information.">
          <BotNameBox>
            <p>Solar</p>
          </BotNameBox>
          <BotTextContainer>
            <h6>STOCK SYMBOL</h6>
            <p>MSFT</p>
          </BotTextContainer>
          <BotTextContainer>
            <h6>BUY botNames</h6>
            <p>4</p>
          </BotTextContainer>
          <BotTextContainer>
            <h6>SELL botNames</h6>
            <p>12</p>
          </BotTextContainer>
          <OrderDateBox>
            <h6>ORDER DATE</h6>
            <p>10 Oct 2022</p>
            <p>3:16 PM</p>
          </OrderDateBox>
          <BotImg>
            <img
              src={genBotIcon(Math.random())}
              width="60"
              height="60"
              alt="bottts_avatar"
            />
          </BotImg>
        </RobotContainer>
      </MyRobotsContainer>*/}
      {/* <Wrapper>
        <PortfolioContainer>
          <h4 style={{ marginTop: -24, marginBottom: 4 }}>Portfolio</h4>
          <Divider
            sx={{ marginBottom: 3, backgroundColor: "black", opacity: 0.2 }}
          />
        </PortfolioContainer>
      </Wrapper> */}
    </Box>
  );
}

const Wrapper = styled.div`
  min-width: 1438px;
  max-width: 1438px;
  min-height: 800px;
  max-height: 3200px;
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: start;
  padding: 1rem;
`;

const PortfolioContainer = styled.div`
  width: 100%;
  backdrop-filter: blur(10px);
  background-color: rgba(17, 164, 173, 0.9);
  height: 100%;
  min-height: 400px;
  max-height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: start;
  padding: 3rem;
  color: black;
  border-radius: 24px;
  box-shadow: 2px 2px 12px rgba(0, 0, 0, 0.25);
  transition: all 0.2s ease-in;
  &:hover {
    box-shadow: 2px 2px 12px rgba(0, 0, 0, 0.8);
  }
`;

const MyRobotsContainer = styled.div`
  width: 100%;
  backdrop-filter: blur(10px);
  background-image: linear-gradient(to bottom, rgba(79, 227, 237, 1), #2f888e);
  min-height: 400px;
  max-height: 1200px;
  display: flex;
  flex-direction: column;
  justify-content: start;
  padding: 3rem;
  border-radius: 24px;
  box-shadow: 2px 2px 12px rgba(0, 0, 0, 0.25);
  transition: all 0.2s ease-in;
  color: black;
  &:hover {
    box-shadow: 2px 2px 12px rgba(0, 0, 0, 0.8);
  }
`;

const RobotContainer = styled.div`
  display: flex;
  min-width: 60%;
  max-width: 60%;
  height: 20%;
  min-height: 20%;
  max-height: 100%;
  justify-content: start;
  align-items: start;
  flex-direction: row;
  background-image: linear-gradient(
    to bottom,
    rgba(79, 227, 237, 0.6),
    #379ea5
  );
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
  border-bottom-left-radius: 20px;
  transition: all 0.2s ease-in;
  box-shadow: 2px 2px 12px rgba(0, 0, 0, 0.25);
  margin-bottom: 1rem;
  &:hover {
    background-color: rgba(79, 227, 237, 0.75);
    border-top-right-radius: 52px;
    border-bottom-right-radius: 52px;
  }
  h6 {
    margin-top: -24px;
  }

  button {
    width: 10%;
    max-width: 120px;
    min-width: 60px;
    height: 60px;
    border: none;
    margin: 1rem 0;
    margin-left: 1rem;
    box-shadow: 0px 14px 9px -15px rgba(0, 0, 0, 0.25);
    border-radius: 198px;
    background-color: #4fe3ed;
    color: black;
    font-weight: 900;
    cursor: pointer;
    padding: 23px;
    font-size: 14px;
    transition: all 0.2s ease-in;
    &:hover {
      transform: translateY(-3px);
      background-color: #00feb9;
    }
  }
`;

const BotNameBox = styled.div`
  padding: inherit;
  height: 118px;
  max-height: 100%;
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
  background-image: linear-gradient(to left, rgba(79, 227, 237, 0), #379ea5);
  p {
    writing-mode: vertical-rl;
    text-transform: uppercase;
    transform: scale(-1);
    font-weight: 900;
    padding-right: 2rem;
    padding-bottom: 1.25rem;
    color: black;
    margin: auto;
    margin-left: -1rem;
  }
`;

const OrderDateBox = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 2rem;
  margin-bottom: 1rem;
  margin-left: 0.5rem;
  padding: 12px;
  p {
    font-size: 16px;
    font-weight: 900;
    color: #555555;
    margin: auto;
  }

  h6 {
    font-size: 18px;
    font-size: 2;
    font-weight: 900;
    color: black;
    margin: auto;
    margin-top: -1.5rem;
    margin-bottom: 0.5rem;
  }
`;

const BotTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 2rem;
  margin-bottom: 1rem;
  margin-left: 0.5rem;
  padding: 12px;
  p {
    font-size: 16px;
    font-weight: 900;
    color: #555555;
    margin: auto;
  }

  h6 {
    font-size: 18px;
    font-size: 2;
    font-weight: 900;
    color: black;
    margin: auto;
    margin-top: -1.5rem;
    margin-bottom: 0.5rem;
  }
`;

const BotImg = styled.div`
  display: flex;
  width: 80px;
  height: 80px;
  align-items: center;
  justify-content: center;
  margin: auto;
  background-color: rgba(79, 227, 237, 0.1);
  border-radius: 80px;
  box-shadow: 2px 2px 12px rgba(0, 0, 0, 0.25);
`;

export default Dashboard;
