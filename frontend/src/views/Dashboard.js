import styled from "@emotion/styled";
import {
  Box,
  Typography,
  useTheme,
} from "@mui/material";
import { tokens } from "../theme";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import BotDetail from "../models/botDetail";
import StockDetail from "../components/StockDetail";

function Dashboard() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const nav = useNavigate();

  let botNames = null;
  let botNameArr = [];
  let botStockSymArr = [];
  if (window.localStorage.getItem("bots")) {
    botNames = window.localStorage.getItem("bots");
    const temp = botNames.split(",");
    temp.map((val, index) => {
      const split = val.split("_");
      botNameArr[index] = split[0];
      botStockSymArr[index] = split[1];
      return "";
    });
  } else {
    botNames = "";
  }

  const [open, setOpen] = useState(false);

  const dataRef = new BotDetail();
  const detailDesc = dataRef.detailsDescription;
  const detailFirst = dataRef.detailsFirstHalf;
  const detailSecond = dataRef.detailsSecondHalf;
  const detailEPS = dataRef.detailsEPS;
  const detailRatio = dataRef.detailsRatio;

  const handleCreateBot = () => {
    nav("/createBot");
  };

  const handleDialogOpen = () => {
    setOpen(true);
  };

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

  const ViewButton = styled.div`
    button {
      max-width: 80px;
      min-width: 80px;
      height: 40px;
      border: none;
      font-size: 16px;
      box-shadow: 0px 14px 9px -15px rgba(0, 0, 0, 0.25);
      border-radius: 20px;
      background-color: ${colors.greenAccent[600]};
      color: ${colors.primary};
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
                <button style={{ marginLeft: "35%" }} onClick={handleCreateBot}>
                  Create New Bot
                </button>
              </NewBot>
            </div>
          )}
          {botNames.length > 0 && (
            <div>
              {botNameArr.map((name, index) => {
                return (
                  <div key={index}>
                    <Box
                      bgcolor={colors.blueAccent[400]}
                      p={1}
                      m={3}
                      boxShadow="0px 14px 9px -15px rgba(0, 0, 0, 0.25)"
                      borderRadius={5}
                      width={500}
                      alignItems="start"
                      display="flex"
                    >
                      <Box p={3}>
                        <Typography
                          fontWeight={700}
                          variant="h5"
                          color={colors.grey[700]}
                        >
                          Name
                        </Typography>
                        <Typography variant="h5">{name}</Typography>
                      </Box>
                      <Box p={3}>
                        <Typography
                          fontWeight={700}
                          variant="h5"
                          color={colors.grey[700]}
                        >
                          Stock Symbol
                        </Typography>
                        <Typography variant="h5" textAlign="center">
                          {botStockSymArr[index]}
                        </Typography>
                      </Box>
                      <Box p={3} flexGrow={1}>
                        <Typography
                          fontWeight={700}
                          variant="h5"
                          color={colors.grey[700]}
                        >
                          Order Date
                        </Typography>
                        <Typography variant="h5">10/13/2022</Typography>
                      </Box>
                      <Box pr={4} pt={4}>
                        <ViewButton>
                          <button onClick={handleDialogOpen}>View</button>
                        </ViewButton>
                      </Box>
                      <StockDetail
                        index={index}
                        open={open}
                        setOpen={setOpen}
                        botNameArr={botNameArr}
                        detailDesc={detailDesc}
                        detailFirst={detailFirst}
                        detailSecond={detailSecond}
                        detailEPS={detailEPS}
                        detailRatio={detailRatio}
                      />
                    </Box>
                  </div>
                );
              })}
              <NewBot>
                <button style={{ marginLeft: 170 }} onClick={handleCreateBot}>
                  Create New Bot
                </button>
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
          maxHeight={400}
        >
          <Typography variant="h2" p={3}>
            Portfolio
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default Dashboard;
