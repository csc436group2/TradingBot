import styled from "@emotion/styled";
import {
  Box,
  CircularProgress,
  Divider,
  IconButton,
  Typography,
  useTheme,
} from "@mui/material";
import { tokens } from "../context/theme";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import StockDetail from "./StockDetail";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import RefreshIcon from "@mui/icons-material/Refresh";
import Bot from "../models/bot";
Chart.register(...registerables);

function Dashboard() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const nav = useNavigate();

  const bots = JSON.parse(window.localStorage.getItem("bots"));

  const [open, setOpen] = useState(false);
  const [detailIndex, setDetailIndex] = useState(null);
  const [detailStockSym, setDetailStockSym] = useState(null);

  const [detailDesc, setDetailDesc] = useState([{ key: "", val: "" }]);
  const [detailFirst, setDetailFirst] = useState([{ key: "", val: "" }]);
  const [detailSecond, setDetailSecond] = useState([{ key: "", val: "" }]);
  const [detailEPS, setDetailEPS] = useState([{ key: "", val: "" }]);
  const [detailRatio, setDetailRatio] = useState([{ key: "", val: "" }]);

  const [isLoading, setLoading] = useState(false);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
        position: "top",
      },
      title: {
        display: true,
        text: "Equity Over Last 30 Days",
        color: colors.primary[100],
        font: {
          size: 16,
          weight: 900,
        },
      },
    },
    scales: {
      y: {
        title: {
          display: true,
          text: "Equity",
          color: colors.primary[100],
          font: {
            size: 16,
            weight: 900,
          },
        },
        ticks: {
          font: {
            size: 12,
          },
          color: colors.primary[100],
          callback: function (value, index, ticks) {
            return "$" + value.toLocaleString();
          },
        },
      },
      x: {
        title: {
          display: true,
          text: "Date",
          color: colors.primary[100],
          font: {
            size: 16,
            weight: 900,
          },
        },
        ticks: {
          font: {
            size: 12,
          },
          color: colors.primary[100],
        },
      },
    },
  };

  useEffect(() => {
    fetch(
      `http://127.0.0.1:5000/getbots?apiKey=${localStorage.getItem(
        "apiKey"
      )}&secretKey=${localStorage.getItem("secretKey")}`
    )
      .then(function (response) {
        console.log(response);
        return response.json();
      })
      .then(function (data) {
        let test = data;
        console.log(test);
        let bots = [];
        test.map((e) => {
          const botModel = new Bot(
            e[1],
            e[2],
            e[6],
            e[5] === 1 ? true : false,
            JSON.parse(e[4]),
            JSON.parse(e[3]),
            e[0]
          );
          bots.push(botModel);
          return 0;
        });
        window.localStorage.setItem("bots", JSON.stringify(bots));
      })
      .catch((error) => {
        console.error("Error Code:", error);
      });
  }, []);

  const updatePortfolio = (data) => {
    let temp = data["equity"];
    const labels = [];
    const vals = [];
    let val = 0;
    for (const key in temp) {
      let date = new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "numeric",
      }).format(key);
      labels.push(date);
      // Uncomment to set real value
      //vals.push(temp[key]);
      val += Math.floor(Math.random() * 1000) + 10;
      vals.push(val);
    }
    const res = {
      labels: labels,
      datasets: [
        {
          label: "Equity",
          data: vals,
          backgroundColor: colors.blueAccent[500],
          borderColor: colors.blueAccent[300],
          borderWidth: 2,
          pointRadius: 4,
        },
      ],
    };
    setChartData(res);
    setLoading(false);
  };

  // eslint-disable-next-line
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

  const updateDetail = (data) => {
    setDetailDesc([
      { key: "Company", val: data["Company"] },
      { key: "Sector", val: data["Sector"] },
      { key: "Industry", val: data["Industry"] },
      { key: "Country", val: data["Country"] },
      { key: "Website", val: data["Website"] },
      { key: "Index", val: data["Index"] },
      { key: "Employees", val: data["Employees"].toLocaleString("en-US") },
      { key: "Price", val: data["Price"] },
      { key: "Volume", val: data["Volume"] },
    ]);
    setDetailFirst([
      { key: "Insider Own", val: data["Insider Own"] },
      { key: "Shs Outstand", val: data["Shs Outstand"] },
      { key: "Perf Week", val: data["Perf Week"] },
      { key: "Market Cap", val: data["Market Cap"] },
      { key: "Insider Trans", val: data["Insider Trans"] },
      { key: "Shs Float", val: data["Shs Float"] },
      { key: "Perf Month", val: data["Perf Month"] },
      { key: "Income", val: data["Income"] },
      { key: "Inst Own", val: data["Inst Own"] },
      { key: "Short Float", val: data["Short Float"] },
      { key: "Perf Quarter", val: data["Perf Quarter"] },
      { key: "Sales", val: data["Sales"] },
      { key: "Inst Trans", val: data["Inst Trans"] },
      { key: "Perf Half Y", val: data["Perf Half Y"] },
      { key: "Target Price", val: data["Target Price"] },
      { key: "Perf Year", val: data["Perf Year"] },
      { key: "52W Range", val: data["52W Range"] },
      { key: "Perf YTD", val: data["Perf YTD"] },
      { key: "Dividend", val: data["Dividend"] },
      { key: "52W High", val: data["52W High"] },
      { key: "Beta", val: data["Beta"] },
    ]);
    setDetailSecond([
      { key: "Gross Margin", val: data["Gross Margin"] },
      { key: "52W Low", val: data["52W Low"] },
      { key: "Sales Q/Q", val: data["Sales Q/Q"] },
      { key: "Oper. Margin", val: data["Oper. Margin"] },
      { key: "Volatility (Week)", val: data["Volatility (Week)"] },
      { key: "Volatility (Month)", val: data["Volatility (Month)"] },
      { key: "Profit Margin", val: data["Profit Margin"] },
      { key: "Rel Volume", val: data["Rel Volume"] },
      { key: "Prev Close", val: data["Prev Close"] },
      { key: "Earnings", val: data["Earnings"] },
      { key: "Payout", val: data["Payout"] },
      { key: "Avg Volume", val: data["Avg Volume"] },
      { key: "Recom", val: data["Recom"] },
      { key: "SMA20", val: data["SMA20"] },
      { key: "SMA50", val: data["SMA50"] },
      { key: "SMA200", val: data["SMA200"] },
      { key: "Change", val: data["Change"] },
      { key: "Dividend %", val: data["Dividend %"] },
      { key: "Sales past 5Y", val: data["Sales past 5Y"] },
      { key: "Shortable", val: data["Shortable"] },
      { key: "Optionable", val: data["Optionable"] },
    ]);
    setDetailEPS([
      { key: "EPS this Y", val: data["EPS this Y"] },
      { key: "EPS (ttm)", val: data["EPS (ttm)"] },
      { key: "EPS Q/Q", val: data["EPS Q/Q"] },
      { key: "EPS past 5Y", val: data["EPS past 5Y"] },
      { key: "EPS next Q", val: data["EPS next Q"] },
      { key: "EPS next Y", val: data["EPS next Y"] },
      { key: "EPS next 5Y", val: data["EPS next 5Y"] },
      { key: "EPS growth next Y", val: data["EPS growth next Y"] },
      { key: "ROI", val: data["ROI"] },
      { key: "ROA", val: data["ROA"] },
      { key: "ROE", val: data["ROE"] },
      { key: "RSI (14)", val: data["RSI (14)"] },
    ]);
    setDetailRatio([
      { key: "ATR", val: data["ATR"] },
      { key: "Book/sh", val: data["Book/sh"] },
      { key: "Cash/sh", val: data["Cash/sh"] },
      { key: "Current Ratio", val: data["Current Ratio"] },
      { key: "Debt/Eq", val: data["Debt/Eq"] },
      { key: "LT Debt/Eq", val: data["LTL Debt/Eq"] },
      { key: "P/B", val: data["P/B"] },
      { key: "P/C", val: data["P/C"] },
      { key: "P/E", val: data["P/E"] },
      { key: "Forward P/E", val: data["Forward P/E"] },
      { key: "P/FCF", val: data["P/FCF"] },
      { key: "P/S", val: data["P/S"] },
      { key: "PEG", val: data["PEG"] },
      { key: "Quick Ratio", val: data["Quick Ratio"] },
      { key: "Short Ratio", val: data["Short Ratio"] },
    ]);
  };

  const handleDialogOpen = (index) => {
    setDetailIndex(index);
    setDetailStockSym(bots[index]["stockSym"]);
    fetch(`http://127.0.0.1:5000/detail?stocksym=${bots[index]["stockSym"]}`)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        if (data !== "Not Found") {
          updateDetail(data);
        }
      })
      .catch((error) => {
        console.error("Error Code:", error);
      });
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
            display="flex"
          >
            <Typography variant="h3" sx={{ color: "white" }} flexGrow={1}>
              My Portfolio
            </Typography>
            <IconButton
              onClick={async () => {
                const url = `http://127.0.0.1:5000/portfolio?key_id=${localStorage.getItem(
                  "apiKey"
                )}&secret_key=${localStorage.getItem("secretKey")}`;
                setLoading(true);
                await fetch(url)
                  .then((response) => {
                    return response.json();
                  })
                  .then((data) => {
                    updatePortfolio(data);
                  })
                  .catch((e) => console.log(e));
              }}
            >
              {isLoading ? (
                <CircularProgress size={18} sx={{ color: "white" }} />
              ) : (
                <RefreshIcon sx={{ color: "white" }} />
              )}
            </IconButton>
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
          started!
        </Typography>
        <button style={{ marginLeft: 350 }} onClick={handleCreateBot}>
          CREATE BOT
        </button>
      </div>
    );
  }
}

export default Dashboard;
