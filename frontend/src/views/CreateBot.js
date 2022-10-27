import { useState } from "react";
import {
  Box,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  IconButton,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import styled from "@emotion/styled";
import Input from "../components/InputTextField";
import { Stack } from "@mui/system";
import DeleteIcon from "@mui/icons-material/Delete";
import Conditions from "../shared/data/conditions";
import { tokens } from "../theme";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import Info from "@mui/icons-material/Info";
import Bot from "../models/bot";

function CreateBot() {
  const [stockSym, setStockSym] = useState("");
  const [botName, setBotName] = useState("");
  const [stepCount, incrementStep] = useState({
    symbol: false,
    buy: false,
    sell: false,
    botName: false,
  });

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const nav = useNavigate();

  const condRef = new Conditions();
  const conditions = condRef.conditions;

  const curDate = new Date();
  const dateFormat = `${curDate.getMonth()}/${curDate.getDate()}/${curDate.getFullYear()}`;
  // const timeFormat = ` ${curDate.toLocaleTimeString()}`;

  const [buyCnList, setBuyCnList] = useState([
    { property: "Avg Volume", lt: 0, gt: 0 },
  ]);
  const [sellCnList, setSellCnList] = useState([
    { property: "Avg Volume", lt: 0, gt: 0 },
  ]);

  // eslint-disable-next-line
  const handleBuyAddCondition = () => {
    setBuyCnList([...buyCnList, { property: "", lt: 0, gt: 0 }]);
  };

  const handleBuyRemoveCondition = (index) => {
    const list = [...buyCnList];
    list.splice(index, 1);
    setBuyCnList(list);
  };

  const handleBuyCnChange = (e, index) => {
    // eslint-disable-next-line
    const { _name, value } = e.target;
    const list = [...buyCnList];
    list[index]["property"] = conditions[value];
    setBuyCnList(list);
    if (list.length >= 1) {
      const countList = stepCount;
      countList["buy"] = true;
      incrementStep(countList);
    }
  };

  const handleBuyFieldChange = (e, index, isLow) => {
    // eslint-disable-next-line
    const { _name, value } = e.target;
    const list = [...buyCnList];
    if (isLow) {
      list[index]["lt"] = value;
    } else {
      list[index]["gt"] = value;
    }
    setBuyCnList(list);
  };

  const handleSellFieldChange = (e, index, isLow) => {
    // eslint-disable-next-line
    const { _name, value } = e.target;
    const list = [...sellCnList];
    if (isLow) {
      list[index]["lt"] = value;
    } else {
      list[index]["gt"] = value;
    }
    setSellCnList(list);
  };

  // eslint-disable-next-line
  const handleSellAddCondition = () => {
    setSellCnList([...sellCnList, { property: "", lt: 0, gt: 0 }]);
  };

  const handleSellRemoveCondition = (index) => {
    const list = [...sellCnList];
    list.splice(index, 1);
    setSellCnList(list);
  };

  const handleSellCnChange = (e, index) => {
    // eslint-disable-next-line
    const { _name, value } = e.target;
    const list = [...sellCnList];
    list[index]["property"] = conditions[value];
    setSellCnList(list);
    if (list.length >= 1) {
      const countList = stepCount;
      countList["sell"] = true;
      incrementStep(countList);
    }
  };

  const handleStockSymChange = (e) => {
    setStockSym(e.target.value.toUpperCase());
    if (stockSym.length > 1) {
      const list = stepCount;
      list["symbol"] = true;
      incrementStep(list);
    }
  };

  const handleBotNameChange = (e) => {
    setBotName(e.target.value);
    if (botName.length >= 3) {
      const list = stepCount;
      list["botName"] = true;
      incrementStep(list);
    }
  };

  const createBotHttpRequest = () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        secretKey: window.localStorage.getItem("secretKey"),
        apiKey: window.localStorage.getItem("apiKey"),
        stockSym: stockSym,
        botName: botName,
        buy_condition: buyCnList,
        sell_condition: sellCnList,
        creation_date: dateFormat,
        isRunning: true,
      }),
    };
    fetch("http://localhost:5000/api/createbot", requestOptions)
      .then(async (response) => {
        const isJson = response.headers
          .get("content-type")
          ?.includes("application/json");
        const data = isJson && (await response.json());
        if (!response.ok) {
          const e = (data && data.message) || response.status;
          return Promise.reject(e);
        }
      })
      .catch((error) => {
        console.error("Error Code:", error);
      });
  };

  const handleCreateBot = () => {
    if (
      stepCount.symbol &&
      stepCount.buy & stepCount.sell &&
      stepCount.botName
    ) {
      if (process.env.NODE_ENV !== "development") {
        createBotHttpRequest();
      }
      const botModel = new Bot(
        botName,
        stockSym,
        dateFormat,
        false,
        buyCnList,
        sellCnList
      );
      let bots = window.localStorage.getItem("bots");
      if (bots.length === 0) {
        bots = JSON.parse(localStorage.getItem("bots"), "[]");
        bots = [botModel];
      } else {
        bots = JSON.parse(window.localStorage.getItem("bots"), "[]");
        bots.push(botModel);
      }
      localStorage.setItem("bots", JSON.stringify(bots));
      console.log("bots: " + window.localStorage.getItem("bots"));
      nav("/home");
    }
  };

  const handleCancel = () => {
    nav("/home");
  };

  const MyButton = styled.div`
    button {
      max-width: 250px;
      min-width: 250px;
      height: 60px;
      border: none;
      margin: 1rem 0;
      box-shadow: 0px 14px 9px -15px rgba(0, 0, 0, 0.25);
      border-radius: 198px;
      background-color: ${colors.blueAccent[400]};
      color: ${theme.palette.mode === "dark" ? "black" : "white"};
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s ease-in;
      &:hover {
        transform: translateY(-3px);
        background-color: #00feb9;
      }
    }
  `;

  const CancelButton = styled.div`
    button {
      max-width: 180px;
      min-width: 180px;
      height: 60px;
      border: none;
      margin: 1rem 0;
      margin-left: 1rem;
      box-shadow: 0px 14px 9px -15px rgba(0, 0, 0, 0.25);
      border-radius: 198px;
      background-color: ${colors.grey[400]};
      color: ${theme.palette.mode === "dark" ? "black" : "white"};
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s ease-in;
      &:hover {
        transform: translateY(-3px);
        background-color: #00feb9;
      }
    }
  `;

  const AddButton = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    button {
      min-width: 160px;
      max-width: 160px;
      height: 54px;
      border: none;
      margin: 1rem 0;
      box-shadow: 0px 14px 9px -15px rgba(0, 0, 0, 0.25);
      border-radius: 198px;
      background-color: ${colors.greenAccent[400]};
      color: ${theme.palette.mode === "dark" ? "black" : "white"};
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s ease-in;
      &:hover {
        background-color: ${colors.greenAccent[500]};
        transform: translateY(-3px);
      }
    }
  `;

  const AddSellButton = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    button {
      min-width: 160px;
      max-width: 160px;
      height: 54px;
      border: none;
      margin: 1rem 0;
      box-shadow: 0px 14px 9px -15px rgba(0, 0, 0, 0.25);
      border-radius: 198px;
      background-color: ${colors.redAccent[400]};
      color: ${theme.palette.mode === "dark" ? "black" : "white"};
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s ease-in;
      &:hover {
        background-color: ${colors.redAccent[500]};
        transform: translateY(-3px);
      }
    }
  `;

  return (
    <Box m="20px">
      <Header title="CREATE BOT" subtitle="Get started below." />
      <Box
        backgroundColor={colors.primary[400]}
        display="flex"
        flexDirection="column"
        alignItems="start"
        justifyContent="start"
        p={3}
        mr={3}
      >
        <DescWrapper style={{ backgroundColor: colors.blueAccent[800] }}>
          <Typography
            variant="h5"
            fontWeight="bold"
            marginBottom={1}
            alignSelf={"center"}
            sx={{ fontFamily: "Monaco" }}
          >
            STOCK DESCRIPTION
          </Typography>
          <Box display="flex" flexDirection="row" p={3} pl={10}>
            <Box
              display="flex"
              justifyContent="start"
              flexDirection="column"
              m={3}
            >
              <Box display="flex" flexDirection="row">
                <Typography variant="h5" mr={0.6}>
                  Bot Name
                </Typography>
                <Tooltip
                  title="Display name for your robot in the dashboard."
                  arrow={true}
                  placement="top"
                  describeChild
                >
                  <Info fontSize="small" />
                </Tooltip>
              </Box>
              <Input
                value={botName}
                onChange={handleBotNameChange}
                variant={"normal"}
                placeholder={"MyRobot"}
                maxLength={25}
              />
            </Box>
            <Box
              display="flex"
              justifyContent="start"
              flexDirection="column"
              m={3}
            >
              <Typography variant="h5">Stock Symbol:</Typography>
              <Input
                value={stockSym}
                onChange={handleStockSymChange}
                variant={"normal"}
                placeholder={"MSFT"}
                maxLength={4}
              />
            </Box>
          </Box>
        </DescWrapper>
        <FormWrapper style={{ backgroundColor: colors.blueAccent[800] }}>
          <Typography
            variant="h5"
            fontWeight="bold"
            marginBottom={1}
            alignSelf={"center"}
            sx={{ fontFamily: "Monaco" }}
          >
            BUY CONDITIONS
          </Typography>
          {buyCnList.map((condition, index) => {
            return (
              <div key={index}>
                <BuyConditionContainer>
                  <Stack direction={"row"} spacing={2} ml={7}>
                    <FormControl
                      variant="outlined"
                      fullWidth
                      sx={{
                        minWidth: 200,
                        maxWidth: 200,
                        marginTop: 3,
                      }}
                    >
                      <InputLabel
                        id="buy-condition-label"
                        color="secondary"
                        sx={{ fontWeight: 700 }}
                      >
                        Name
                      </InputLabel>
                      <Select
                        labelId="buy-condition-label"
                        id="buy-condition"
                        defaultValue={0}
                        value={
                          conditions.indexOf(condition.property) !== -1
                            ? conditions.indexOf(condition.property)
                            : ""
                        }
                        label="Buy"
                        onChange={(e) => handleBuyCnChange(e, index)}
                        color="secondary"
                      >
                        {conditions.map((_name, _i) => (
                          <MenuItem value={_i} key={_i}>
                            {_name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    {condition.property !== "Optionable" &&
                      condition.property !== "Shortable" && (
                        <Stack
                          direction={"row"}
                          spacing={2}
                          sx={{ alignSelf: "start", marginLeft: 2 }}
                        >
                          <Input
                            value={buyCnList[index]["lt"]}
                            type="number"
                            onChange={(e) => {
                              handleBuyFieldChange(e, index, true);
                            }}
                            variant={"condition"}
                            labelText={"LOW"}
                          />
                          <Input
                            value={buyCnList[index]["gt"]}
                            type="number"
                            onChange={(e) => {
                              handleBuyFieldChange(e, index, false);
                            }}
                            variant={"condition"}
                            labelText={"HIGH"}
                          />
                        </Stack>
                      )}
                    {condition.property === "Optionable" && (
                      <FormControl sx={{ paddingRight: 22.8 }}>
                        <FormLabel
                          sx={{
                            marginTop: 2,
                            marginLeft: 1.5,
                            "&.MuiFormLabel-root": { color: "black" },
                          }}
                        >
                          Optionable
                        </FormLabel>
                        <RadioGroup
                          defaultValue={1}
                          sx={{ marginLeft: 1.5 }}
                          row
                        >
                          <FormControlLabel
                            value={1}
                            control={
                              <Radio
                                sx={{
                                  color: "black",
                                  "&.Mui-checked": {
                                    color: "black",
                                  },
                                }}
                              />
                            }
                            label="Yes"
                          />
                          <FormControlLabel
                            value={0}
                            control={
                              <Radio
                                sx={{
                                  color: "black",
                                  "&.Mui-checked": {
                                    color: "black",
                                  },
                                }}
                              />
                            }
                            label="No"
                          />
                        </RadioGroup>
                      </FormControl>
                    )}
                    {condition.property === "Shortable" && (
                      <FormControl sx={{ paddingRight: 22.8 }}>
                        <FormLabel
                          sx={{
                            marginTop: 2,
                            marginLeft: 1.5,
                            "&.MuiFormLabel-root": { color: "black" },
                          }}
                        >
                          Shortable
                        </FormLabel>
                        <RadioGroup
                          defaultValue={1}
                          sx={{ marginLeft: 1.5 }}
                          row
                        >
                          <FormControlLabel
                            value={1}
                            control={
                              <Radio
                                sx={{
                                  color: "black",
                                  "&.Mui-checked": {
                                    color: "black",
                                  },
                                }}
                              />
                            }
                            label="Yes"
                          />
                          <FormControlLabel
                            value={0}
                            control={
                              <Radio
                                sx={{
                                  color: "black",
                                  "&.Mui-checked": {
                                    color: "black",
                                  },
                                }}
                              />
                            }
                            label="No"
                          />
                        </RadioGroup>
                      </FormControl>
                    )}
                    {index !== 0 && (
                      <StyledIcon>
                        <Divider
                          orientation="vertical"
                          style={{
                            marginLeft: "1rem",
                            opacity: 0.4,
                            backgroundColor: "rgba(0, 0, 0, 1)",
                            height: "100%",
                            width: "1%",
                            borderRadius: 10,
                          }}
                        />
                        <Tooltip title="Remove" arrow={true} placement="bottom">
                          <IconButton
                            onClick={() => handleBuyRemoveCondition(index)}
                          >
                            Delete Item
                            <DeleteIcon fontSize="medium" />
                          </IconButton>
                        </Tooltip>
                      </StyledIcon>
                    )}
                  </Stack>
                </BuyConditionContainer>
                {buyCnList.length - 1 === index && buyCnList.length < 70 && (
                  <AddButton>
                    <button onClick={handleBuyAddCondition}>
                      ADD CONDITION
                    </button>
                  </AddButton>
                )}
              </div>
            );
          })}
          <p style={{ fontSize: 14, marginRight: 12 }}>
            *You must choose at least 1 buy condition to proceed.
          </p>
        </FormWrapper>
        <FormWrapper style={{ backgroundColor: colors.blueAccent[800] }}>
          <Typography
            variant="h5"
            fontWeight="bold"
            marginBottom={1}
            alignSelf={"center"}
            sx={{ fontFamily: "Monaco" }}
          >
            SELL CONDITIONS
          </Typography>
          {sellCnList.map((condition, index) => {
            return (
              <div key={index}>
                <SellConditionContainer>
                  <Stack direction={"row"} spacing={2} ml={7}>
                    <FormControl
                      variant="outlined"
                      fullWidth
                      sx={{
                        minWidth: 200,
                        maxWidth: 200,
                        marginTop: 3,
                      }}
                    >
                      <InputLabel
                        id="sell-condition-label"
                        color="secondary"
                        sx={{ fontWeight: 700 }}
                      >
                        Name
                      </InputLabel>
                      <Select
                        labelId="sell-condition-label"
                        id="sell-condition"
                        defaultValue={0}
                        value={
                          conditions.indexOf(condition.property) !== -1
                            ? conditions.indexOf(condition.property)
                            : ""
                        }
                        label="Sell"
                        onChange={(e) => handleSellCnChange(e, index)}
                        color="secondary"
                      >
                        {conditions.map((_name, _i) => (
                          <MenuItem value={_i} key={_i}>
                            {_name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    <Input
                      value={sellCnList[index]["lt"]}
                      type="number"
                      onChange={(e) => {
                        handleSellFieldChange(e, index, true);
                      }}
                      variant={"condition"}
                      labelText={"LOW"}
                    />
                    <Input
                      value={sellCnList[index]["gt"]}
                      type="number"
                      onChange={(e) => {
                        handleSellFieldChange(e, index, false);
                      }}
                      variant={"condition"}
                      labelText={"HIGH"}
                    />
                    {index !== 0 && (
                      <StyledIcon>
                        <Divider
                          orientation="vertical"
                          style={{
                            marginLeft: "1rem",
                            opacity: 0.4,
                            backgroundColor: "rgba(0, 0, 0, 1)",
                            height: "100%",
                            width: "1%",
                            borderRadius: 10,
                          }}
                        />
                        <Tooltip title="Remove" arrow={true} placement="bottom">
                          <IconButton
                            className="iconButton"
                            onClick={() => handleSellRemoveCondition(index)}
                          >
                            Delete Item
                            <DeleteIcon fontSize="medium" />
                          </IconButton>
                        </Tooltip>
                      </StyledIcon>
                    )}
                  </Stack>
                </SellConditionContainer>
                {sellCnList.length - 1 === index && sellCnList.length < 70 && (
                  <AddSellButton>
                    <button onClick={handleSellAddCondition}>
                      ADD CONDITION
                    </button>
                  </AddSellButton>
                )}
              </div>
            );
          })}
          <p style={{ fontSize: 14, marginRight: 12, marginLeft: 6 }}>
            *You must choose at least 1 sell condition to proceed.
          </p>
        </FormWrapper>
        <FormWrapper style={{ backgroundColor: colors.blueAccent[800] }}>
          <Box display="flex" flexDirection="row">
            <MyButton>
              <button
                onClick={async () => {
                  if (
                    stepCount.symbol &&
                    stepCount.buy & stepCount.sell &&
                    stepCount.botName
                  ) {
                    const requestOptions = {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({
                        secretKey: window.localStorage.getItem("secretKey"),
                        apiKey: window.localStorage.getItem("apiKey"),
                        stockSym: stockSym,
                        botName: botName,
                        buy_condition: buyCnList,
                        sell_condition: sellCnList,
                        creation_date: dateFormat,
                        isRunning: true,
                      }),
                    };
                    await fetch("http://127.0.0.1:5000/create", requestOptions)
                      .then(async (response) => {
                        console.log(
                          "RESPONSE: " +
                            response.status +
                            "\n" +
                            "STATUS: " +
                            response.statusText
                        );
                        if (response.status === 200) {
                          const botModel = new Bot(
                            botName,
                            stockSym,
                            dateFormat,
                            false,
                            buyCnList,
                            sellCnList
                          );
                          let bots = window.localStorage.getItem("bots");
                          if (bots.length === 0) {
                            bots = JSON.parse(
                              localStorage.getItem("bots"),
                              "[]"
                            );
                            bots = [botModel];
                          } else {
                            bots = JSON.parse(
                              window.localStorage.getItem("bots"),
                              "[]"
                            );
                            bots.push(botModel);
                          }
                          localStorage.setItem("bots", JSON.stringify([bots]));
                        } else {
                          let test = JSON.parse(
                            window.localStorage.getItem("bots")
                          );
                          console.log(JSON.parse(test));
                        }
                      })
                      .catch((error) => {
                        console.error("Error Code:", error);
                      })
                      .finally(() => nav("/home"));
                  }
                }}
              >
                CREATE MY BOT
              </button>
            </MyButton>
            <CancelButton>
              <button onClick={handleCancel}>CANCEL</button>
            </CancelButton>
          </Box>
        </FormWrapper>
      </Box>
    </Box>
  );
}

const DescWrapper = styled.div`
  display: flex;
  min-width: 1200px;
  max-width: 1200px;
  margin-bottom: 1rem;
  justify-content: start;
  align-items: center;
  flex-direction: column;
  padding: 1rem;
  align-self: center;
`;

const FormWrapper = styled.div`
  display: flex;
  min-width: 1200px;
  max-width: 1200px;
  margin-bottom: 1rem;
  justify-content: start;
  align-items: center;
  flex-direction: column;
  padding: 1rem;
  align-self: center;
`;

const StyledIcon = styled.div`
  button {
    width: 100%;
    max-width: 130px;
    min-width: 130px;
    font-size: 12px;
    height: 50px;
    border: none;
    box-shadow: 0px 14px 9px -15px rgba(0, 0, 0, 0.25);
    border-radius: 32px;
    background-color: rgba(255, 53, 50, 0.6);
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease-in;
    margin-top: -7.5rem;
    margin-left: 3rem;
    &:hover {
      background-color: rgba(255, 53, 50, 0.8);
      opacity: 0.85;
      transform: translateY(-3px);
    }
  }
`;

const BuyConditionContainer = styled.div`
  display: flex;
  min-width: 800px;
  max-width: 800px;
  margin-bottom: 1rem;
  justify-content: start;
  align-items: center;
`;

const SellConditionContainer = styled.div`
  display: flex;
  min-width: 800px;
  max-width: 800px;
  margin-bottom: 1rem;
  justify-content: start;
  align-items: center;
`;

export default CreateBot;
