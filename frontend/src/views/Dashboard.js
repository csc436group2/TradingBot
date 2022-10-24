import styled from "@emotion/styled";
import { Box, Divider, Typography, useTheme } from "@mui/material";
import { tokens } from "../theme";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import BotDetail from "../models/botDetail";
import StockDetail from "../components/StockDetail";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

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

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
        position: "top",
      },
      title: {
        display: false,
        text: "Portfolio History",
      },
    },
  };

  const [chartData, setChartData] = useState({
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "",
        data: [],
        backgroundColor: colors.blueAccent[500],
        borderColor: colors.blueAccent[300],
        borderWidth: 1,
      },
    ],
  });

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
      height: 50px;
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
    <Box display="flex">
      <Box m="20px">
        <Header title="DASHBOARD" subtitle="" />
        <Box display="flex">
          <Box
            backgroundColor={colors.primary[400]}
            display="flex"
            flexDirection="column"
            alignItems="start"
            justifyContent="start"
            width={900}
            minHeight={300}
            borderRadius="20px 20px 20px 20px"
            mb={6}
          >
            <Box
              bgcolor={colors.primary[600]}
              width={"100%"}
              p={2}
              borderRadius="20px 20px 0px 0px"
            >
              <Typography variant="h3" sx={{ color: "white" }}>
                My Robots
              </Typography>
            </Box>
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
                            width={800}
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
                            <Box
                              p={3}
                              display="flex"
                              flexDirection="column"
                              alignItems="start"
                              flexGrow={1}
                            >
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
                            <Box pr={4} pt={3}>
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
                        style={{ marginLeft: 350 }}
                        onClick={handleCreateBot}
                      >
                        CREATE BOT
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
        </Box>
        <Box
          backgroundColor={colors.primary[400]}
          display="flex"
          flexDirection="column"
          alignItems="start"
          justifyContent="start"
          width={900}
          borderRadius="20px 20px 20px 20px"
          mb={6}
        >
          <Box
            bgcolor={colors.primary[600]}
            width={"100%"}
            p={2}
            borderRadius="20px 20px 0px 0px"
          >
            <Typography variant="h3" sx={{ color: "white" }}>
              My Portfolio
            </Typography>
          </Box>
          <Box width="100%" p={3}>
            <Line data={chartData} options={options}></Line>
          </Box>
        </Box>
      </Box>
      <Box
        m="20px"
        mt="90px"
        backgroundColor={colors.primary[400]}
        display="flex"
        alignItems="center"
        justifyContent="start"
        width={500}
        height={420}
        borderRadius="20px 20px 20px 20px"
        flexDirection="column"
      >
        <Box
          bgcolor={colors.primary[600]}
          width={"100%"}
          p={2}
          borderRadius="20px 20px 0px 0px"
        >
          <Typography variant="h3" sx={{ color: "white" }}>
            FAQ
          </Typography>
        </Box>
        <Box p={3}>
          <Typography variant="h5" textAlign="center">
            Contributions
          </Typography>
          <Divider sx={{ marginTop: 1, marginBottom: 2 }} />
          <Typography variant="h6" textAlign="center">
            <span style={{ fontWeight: "bold" }}>Amit Peleg</span> -
            <span
              style={{
                textDecoration: "underline",
                color: "#535ac8",
                marginLeft: "3px",
              }}
            >
              apeleg@arizona.edu
            </span>
          </Typography>
          <Typography textAlign="center" mb={3}>
            Frontend Interface
          </Typography>
          <Typography variant="h6" textAlign="center">
            <span style={{ fontWeight: "bold" }}>Derek Tominaga</span> -
            <span
              style={{
                textDecoration: "underline",
                color: "#535ac8",
                marginLeft: "3px",
              }}
            >
              dtominag@arizona.edu
            </span>
          </Typography>
          <Typography textAlign="center" mb={3}>
            Backend RESTFul API
          </Typography>
          <Typography variant="h6" textAlign="center">
            <span style={{ fontWeight: "bold" }}>Adam Mekhail</span> -
            <span
              style={{
                textDecoration: "underline",
                color: "#535ac8",
                marginLeft: "3px",
              }}
            >
              amekhail@arizona.edu
            </span>
          </Typography>
          <Typography textAlign="center" mb={3}>
            Database Design & Handling
          </Typography>
          <Typography variant="h6" textAlign="center">
            <span style={{ fontWeight: "bold" }}>Nicholas Rizzo</span> -
            <span
              style={{
                textDecoration: "underline",
                color: "#535ac8",
                marginLeft: "3px",
              }}
            >
              nickrizzo466@arizona.edu
            </span>
          </Typography>
          <Typography textAlign="center">
            Bot Trading API Implementation
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
        <Typography variant="h5" p={3}>
          You don't appear to have a bot created with us yet. Let's get you
          started.
        </Typography>
        <button style={{ marginLeft: 350 }} onClick={handleCreateBot}>
          CREATE BOT
        </button>
      </div>
    );
  }
}

export default Dashboard;
