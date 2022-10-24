import styled from "@emotion/styled";
import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../theme";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import BotDetail from "../models/botDetail";
import StockDetail from "../components/StockDetail";

function Dashboard() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const nav = useNavigate();

  const bots = JSON.parse(window.localStorage.getItem("bots"));

  const [open, setOpen] = useState(false);
  const [detailIndex, setDetailIndex] = useState(null);
  const [detailStockSym, setDetailStockSym] = useState(null);

  const dataRef = new BotDetail();
  const detailDesc = dataRef.detailsDescription;
  const detailFirst = dataRef.detailsFirstHalf;
  const detailSecond = dataRef.detailsSecondHalf;
  const detailEPS = dataRef.detailsEPS;
  const detailRatio = dataRef.detailsRatio;

  const handleCreateBot = () => {
    nav("/createBot");
  };

  const handleDialogOpen = (index) => {
    setDetailIndex(index);
    setDetailStockSym(bots[index]["stockSym"]);
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
          {!bots ? (
            <NewBot>
              <NoBotCreated nav={nav} />
            </NewBot>
          ) : (
            <div>
              {bots.length > 0 ? (
                <div>
                  {bots.map((bot, index) => {
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
                            <Typography variant="h5">
                              {bot["botName"]}
                            </Typography>
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
                              {bot["stockSym"]}
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
                            <Typography variant="h5" textAlign="center">
                              {bot["creation_date"]}
                            </Typography>
                          </Box>
                          <Box pr={4} pt={4}>
                            <ViewButton>
                              <button
                                id={index}
                                onClick={() => {
                                  handleDialogOpen(index);
                                }}
                              >
                                View
                              </button>
                            </ViewButton>
                          </Box>
                          {open === true ? (
                            <StockDetail
                              index={detailIndex}
                              open={open}
                              setOpen={setOpen}
                              detailDesc={detailDesc}
                              detailFirst={detailFirst}
                              detailSecond={detailSecond}
                              detailEPS={detailEPS}
                              detailRatio={detailRatio}
                              stockSym={detailStockSym}
                            />
                          ) : null}
                        </Box>
                      </div>
                    );
                  })}
                  <NewBot>
                    <button
                      style={{ marginLeft: 170 }}
                      onClick={handleCreateBot}
                    >
                      Create New Bot
                    </button>
                  </NewBot>
                </div>
              ) : (
                <NewBot>
                  <NoBotCreated nav={nav} />
                </NewBot>
              )}
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

class NoBotCreated extends React.Component {
  render() {
    const nav = this.props.nav;
    const handleCreateBot = () => {
      nav("/createBot");
    };
    return (
      <div>
        <Typography variant="h4" p={3}>
          You don't appear to have a bot created with us yet. Let's get you
          started.
        </Typography>
        <button style={{ marginLeft: "34%" }} onClick={handleCreateBot}>
          Create New Bot
        </button>
      </div>
    );
  }
}

export default Dashboard;
