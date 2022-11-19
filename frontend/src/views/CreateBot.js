import { useState } from "react";
import {
  Alert,
  Box,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
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
import Conditions from "../context/conditions";
import { tokens } from "../context/theme";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import Info from "@mui/icons-material/Info";
import Bot from "../models/bot";
import AddIcon from "@mui/icons-material/Add";

function CreateBot() {
  const [stockSym, setStockSym] = useState("");
  const [stockExists, setStockExists] = useState("");
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
  const dateFormat = `${
    curDate.getMonth() + 1
  }/${curDate.getDate()}/${curDate.getFullYear()}`;

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

  const handleCancel = () => {
    nav("/home");
  };

  const MyButton = styled.div`
    button {
      max-width: 80px;
      min-width: 80px;
      height: 42px;
      border: none;
      margin: 1rem 0;
      margin-left: 1rem;
      box-shadow: 0px 14px 9px -15px rgba(0, 0, 0, 0.25);
      border-radius: 12px;
      background-color: ${colors.blueAccent[500]};
      color: ${theme.palette.mode === "dark" ? "#eee" : "black"};
      font-weight: bold;
      font-size: 16px;
      cursor: pointer;
      transition: all 0.2s ease-in;
      &:hover {
        transform: translateY(-3px);
        background-color: ${colors.greenAccent[400]};
      }
    }
  `;

  const CancelButton = styled.div`
    button {
      max-width: 80px;
      min-width: 80px;
      height: 42px;
      border: none;
      margin: 1rem 0;
      box-shadow: 0px 14px 9px -15px rgba(0, 0, 0, 0.25);
      border-radius: 12px;
      background-color: ${colors.blueAccent[400]};
      color: ${theme.palette.mode === "dark" ? "#eee" : "black"};
      font-weight: 600;
      font-size: 16px;
      cursor: pointer;
      transition: all 0.2s ease-in;
      &:hover {
        transform: translateY(-3px);
        background-color: ${colors.redAccent[400]};
      }
    }
  `;

  const AddButton = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    button {
      min-width: 40px;
      max-width: 40px;
      height: 40px;
      border: none;
      margin: 1rem 0;
      box-shadow: 0px 14px 9px -15px rgba(0, 0, 0, 0.25);
      border-radius: 120px;
      background-color: ${colors.blueAccent[400]};
      color: ${theme.palette.mode === "dark" ? "#eee" : "black"};
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s ease-in;
      &:hover {
        background-color: ${colors.blueAccent[300]};
        transform: translateY(-3px);
      }
    }
  `;

  const DeleteButton = styled.div`
    button {
      min-width: 40px;
      max-width: 40px;
      height: 40px;
      border: none;
      margin-left: 1rem;
      box-shadow: 0px 14px 9px -15px rgba(0, 0, 0, 0.25);
      border-radius: 120px;
      background-color: ${colors.redAccent[400]};
      color: ${theme.palette.mode === "dark" ? "#eee" : "black"};
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s ease-in;
      &:hover {
        background-color: ${colors.redAccent[300]};
        transform: translateY(-3px);
      }
    }
  `;

  return (
    <Box m="20px">
      <Header title="CREATE BOT" subtitle="Get started below." />
      <Box
        display="flex"
        flexDirection="column"
        alignItems="start"
        justifyContent="start"
        p={3}
        mr={3}
      >
        <FormWrapper
          style={{
            backgroundColor: colors.blueAccent[700],
            borderRadius: 20,
            alignItems: "start",
          }}
        >
          <Box
            bgcolor={colors.blueAccent[800]}
            width={"101.4%"}
            display="flex"
            alignItems="center"
            justifyContent="center"
            mt={-1}
            ml={-1}
            p={1}
            borderRadius="20px 20px 0px 0px"
          >
            <Typography
              variant="h4"
              fontWeight="bold"
              alignSelf={"center"}
              sx={{ fontFamily: "Monaco" }}
            >
              BOT DETAILS
            </Typography>
          </Box>
          <Box
            display="flex"
            flexDirection="column"
            p={3}
            pl={10}
            alignItems="start"
          >
            <Box display="flex" flexDirection="row" alignItems="center">
              <Box display="flex" flexDirection="row">
                <Typography variant="h5" mr={0.6}>
                  Bot Name
                </Typography>
                <Tooltip
                  title="Display name for your robot in the dashboard."
                  arrow={true}
                  placement="top"
                  describeChild
                  sx={{ marginRight: 7.8 }}
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
              flexDirection="row"
              alignItems="center"
              ml={-0.1}
            >
              <Typography variant="h5" mr={7.5}>
                Stock Symbol
              </Typography>
              <Input
                value={stockSym}
                onChange={handleStockSymChange}
                variant={"normal"}
                placeholder={"MSFT"}
                maxLength={4}
              />
            </Box>
            <Box display="flex" flexDirection="row" mt={3}>
              <Typography variant="h5" mr={7}>
                Buy Conditions
              </Typography>
              <Box
                display="flex"
                flexDirection="column"
                mt={0}
                ml={-1}
                bgcolor={colors.blueAccent[600]}
                borderRadius={4}
                p={3}
              >
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
                            <Box
                              display="flex"
                              flexDirection="row"
                              alignItems="center"
                            >
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
                              <Tooltip
                                title="Remove"
                                arrow={true}
                                placement="bottom"
                              >
                                <DeleteButton>
                                  <button
                                    onClick={() =>
                                      handleBuyRemoveCondition(index)
                                    }
                                  >
                                    <DeleteIcon fontSize="medium" />
                                  </button>
                                </DeleteButton>
                              </Tooltip>
                            </Box>
                          )}
                        </Stack>
                      </BuyConditionContainer>
                      {buyCnList.length - 1 === index && buyCnList.length < 70 && (
                        <Box
                          display="flex"
                          justifyContent="end"
                          mr={buyCnList.length === 1 ? 24 : 14}
                          mt={buyCnList.length === 1 ? -10 : -11.3}
                        >
                          <AddButton>
                            <button
                              onClick={handleBuyAddCondition}
                              style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                              }}
                            >
                              <AddIcon />
                            </button>
                          </AddButton>
                        </Box>
                      )}
                    </div>
                  );
                })}
              </Box>
            </Box>
            <Box display="flex" flexDirection="row" mt={3}>
              <Typography variant="h5" mr={7}>
                Sell Conditions
              </Typography>
              <Box
                display="flex"
                flexDirection="column"
                mt={0}
                ml={-1}
                bgcolor={colors.blueAccent[600]}
                borderRadius={4}
                p={3}
              >
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
                            <Box
                              display="flex"
                              flexDirection="row"
                              alignItems="center"
                            >
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
                              <Tooltip
                                title="Remove"
                                arrow={true}
                                placement="bottom"
                              >
                                <DeleteButton>
                                  <button
                                    onClick={() =>
                                      handleSellRemoveCondition(index)
                                    }
                                  >
                                    <DeleteIcon fontSize="medium" />
                                  </button>
                                </DeleteButton>
                              </Tooltip>
                            </Box>
                          )}
                        </Stack>
                      </SellConditionContainer>
                      {sellCnList.length - 1 === index &&
                        sellCnList.length < 70 && (
                          <Box
                            display="flex"
                            justifyContent="end"
                            mr={sellCnList.length === 1 ? 24 : 14}
                            mt={sellCnList.length === 1 ? -10 : -11.3}
                          >
                            <AddButton>
                              <button
                                onClick={handleSellAddCondition}
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                }}
                              >
                                <AddIcon />
                              </button>
                            </AddButton>
                          </Box>
                        )}
                    </div>
                  );
                })}
              </Box>
            </Box>
            <Box
              display="flex"
              flexDirection="row"
              justifyContent="end"
              width="110%"
              mb={-4}
              mt={4}
            >
              <CancelButton>
                <button onClick={handleCancel}>Cancel</button>
              </CancelButton>
              <MyButton>
                <button
                  onClick={async () => {
                    let tempExists = false;
                    if (
                      stepCount.symbol &&
                      stepCount.buy & stepCount.sell &&
                      stepCount.botName
                    ) {
                      await fetch(
                        `http://127.0.0.1:5000/detail?stocksym=${stockSym}`
                      )
                        .then(function (response) {
                          return response.json();
                        })
                        .then(function (data) {
                          if (data === "Not Found") {
                            tempExists = false;
                            setStockExists("dne");
                          } else {
                            tempExists = true;
                          }
                        })
                        .catch((error) => {
                          console.error("Error Code:", error);
                        });
                      if (tempExists) {
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
                        await fetch(
                          "http://127.0.0.1:5000/create",
                          requestOptions
                        )
                          .then(async (response) => {
                            console.log(
                              "RESPONSE: " +
                                response.status +
                                "\n" +
                                "STATUS: " +
                                response.statusText
                            );
                          })
                          .catch((error) => {
                            console.error("Error Code:", error);
                          })
                          .finally(() => {
                            fetch(
                              `http://127.0.0.1:5000/getbots?apiKey=${window.localStorage.getItem(
                                "apiKey"
                              )}&secretKey=${window.localStorage.getItem(
                                "secretKey"
                              )}`
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
                                    e[5],
                                    e[6] === 1 ? true : false,
                                    JSON.parse(e[4]),
                                    JSON.parse(e[3]),
                                    e[0]
                                  );
                                  bots.push(botModel);
                                  return 0;
                                });
                                window.localStorage.setItem(
                                  "bots",
                                  JSON.stringify(bots)
                                );
                              })
                              .catch((error) => {
                                console.error("Error Code:", error);
                              })
                              .finally(() => nav("/home"));
                          });
                      }
                    }
                  }}
                >
                  Create
                </button>
              </MyButton>
            </Box>
            {stockExists === "dne" && (
              <Alert
                variant="outlined"
                severity="error"
                sx={{ fontSize: 14, borderRadius: 18 }}
              >
                Stock symbol not found. Please update to an existing stock
                symbol.
              </Alert>
            )}
          </Box>
        </FormWrapper>
      </Box>
    </Box>
  );
}

const FormWrapper = styled.div`
  display: flex;
  min-width: 1200px;
  max-width: 1200px;
  margin-bottom: 1rem;
  justify-content: start;
  align-items: start;
  flex-direction: column;
  padding: 8px;
  align-self: center;
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
