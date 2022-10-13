import { useState } from "react";
import {
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
} from "@mui/material";
import styled from "@emotion/styled";
import Input from "../input/InputTextField";
import { Stack, ThemeProvider } from "@mui/system";
import { createTheme } from "@mui/material/styles";
import DeleteIcon from "@mui/icons-material/Delete";
import Conditions from "../../shared/data/conditions";

function CreateBot() {
  const [stockSym, setStockSym] = useState("");
  const [stepCount, incrementStep] = useState({
    symbol: false,
    buy: false,
    sell: false,
  });

  const condRef = new Conditions();
  const conditions = condRef.conditions;

  const [buyCnList, setBuyCnList] = useState([
    { property: "Avg Volume", low: 0, high: 0 },
  ]);
  const [sellCnList, setSellCnList] = useState([
    { property: "Avg Volume", low: 0, high: 0 },
  ]);

  // eslint-disable-next-line
  const handleBuyAddCondition = () => {
    setBuyCnList([...buyCnList, { property: "", low: 0, high: 0 }]);
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
      list[index]["low"] = value;
    } else {
      list[index]["high"] = value;
    }
    setBuyCnList(list);
  };

  const handleSellFieldChange = (e, index, isLow) => {
    // eslint-disable-next-line
    const { _name, value } = e.target;
    const list = [...sellCnList];
    if (isLow) {
      list[index]["low"] = value;
    } else {
      list[index]["high"] = value;
    }
    setSellCnList(list);
  };

  // eslint-disable-next-line
  const handleSellAddCondition = () => {
    setSellCnList([...sellCnList, { property: "", low: 0, high: 0 }]);
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

  const myTheme = createTheme({
    palette: {
      primary: {
        main: "#4fe3ed",
        contrastText: "#4fe3ed",
      },
      secondary: {
        main: "white",
        contrastText: "white",
        light: "white",
        dark: "white",
      },
    },
  });

  return (
    <ThemeProvider theme={myTheme}>
      <BoxContainter>
        <Typography
          variant="overline"
          textAlign="center"
          sx={{ fontWeight: 700 }}
          color="white"
        >
          You don't seem to have a bot with us yet, let's get you started.
        </Typography>
        <Divider
          style={{
            backgroundColor: "white",
            width: "100%",
            marginBottom: 24,
            marginTop: 0,
          }}
        />
        <HorizFormWrapper>
          <p style={{ fontSize: 16, marginRight: 12, marginLeft: 6 }}>
            To get started, enter the Stock Symbol (e.g.{" "}
            <span style={{ fontWeight: 700 }}>MSFT</span>) you would like to
            trade with:
          </p>
          <Input
            value={stockSym}
            onChange={handleStockSymChange}
            variant={"normal"}
            placeholder={"Stock Symbol"}
            maxLength={4}
          />
        </HorizFormWrapper>
        {stepCount.symbol && (
          <FormWrapper>
            <Typography
              variant="h5"
              color={"black"}
              fontWeight="bold"
              marginLeft={-124}
              marginBottom={1}
              alignSelf={"center"}
              sx={{ fontFamily: "Monaco" }}
            >
              BUY CONDITIONS
            </Typography>
            <Divider
              style={{
                backgroundColor: "rgba(0,0,0,0.3)",
                width: "100%",
                marginBottom: 24,
                marginTop: 0,
              }}
            />
            {buyCnList.map((condition, index) => {
              return (
                <div key={index}>
                  <BuyConditionContainer>
                    <Stack
                      direction={"row"}
                      spacing={2}
                      sx={{ alignSelf: "start", marginLeft: 2 }}
                    >
                      <FormControl
                        variant="outlined"
                        fullWidth
                        sx={{
                          m: 1,
                          minWidth: 200,
                          maxWidth: 200,
                          marginTop: 3,
                        }}
                      >
                        <InputLabel
                          id="buy-condition-label"
                          color="secondary"
                          sx={{ color: "black", fontWeight: 700 }}
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
                              value={buyCnList[index]["low"]}
                              type="number"
                              onChange={(e) => {
                                handleBuyFieldChange(e, index, true);
                              }}
                              variant={"condition"}
                              labelText={"LOW"}
                            />
                            <Input
                              value={buyCnList[index]["high"]}
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
                          <Tooltip
                            title="Remove"
                            arrow={true}
                            placement="bottom"
                          >
                            <IconButton
                              className="iconButton"
                              color="primary"
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
                        ADD BUY CONDITION
                      </button>
                    </AddButton>
                  )}
                </div>
              );
            })}
            {!stepCount.buy && (
              <p style={{ fontSize: 14, marginRight: 12, marginLeft: -860 }}>
                *You must choose at least 1 buy condition to proceed.
              </p>
            )}
            {stepCount.buy && (
              <div>
                <Typography
                  variant="h5"
                  color={"black"}
                  fontWeight="bold"
                  marginBottom={1}
                  marginLeft={0}
                  alignSelf={"center"}
                  sx={{ fontFamily: "Monaco" }}
                >
                  SELL CONDITIONS
                </Typography>
                <Divider
                  style={{
                    backgroundColor: "rgba(0,0,0,0.3)",
                    width: "100%",
                    marginBottom: 24,
                    marginTop: 0,
                    marginRight: 1200,
                  }}
                />
                {sellCnList.map((condition, index) => {
                  return (
                    <div key={index} style={{marginLeft: 200}}>
                      <SellConditionContainer>
                        <Stack
                          direction={"row"}
                          spacing={2}
                          sx={{ alignSelf: "start", marginLeft: 2 }}
                        >
                          <FormControl
                            variant="outlined"
                            fullWidth
                            sx={{
                              m: 1,
                              minWidth: 200,
                              maxWidth: 200,
                              marginTop: 3,
                            }}
                          >
                            <InputLabel
                              id="sell-condition-label"
                              color="secondary"
                              sx={{ color: "black", fontWeight: 700 }}
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
                            value={sellCnList[index]["low"]}
                            type="number"
                            onChange={(e) => {
                              handleSellFieldChange(e, index, true);
                            }}
                            variant={"condition"}
                            labelText={"LOW"}
                          />
                          <Input
                            value={sellCnList[index]["high"]}
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
                              <Tooltip
                                title="Remove"
                                arrow={true}
                                placement="bottom"
                              >
                                <IconButton
                                  className="iconButton"
                                  color="primary"
                                  onClick={() =>
                                    handleSellRemoveCondition(index)
                                  }
                                >
                                  Delete Item
                                  <DeleteIcon fontSize="medium" />
                                </IconButton>
                              </Tooltip>
                            </StyledIcon>
                          )}
                        </Stack>
                      </SellConditionContainer>
                      {sellCnList.length - 1 === index &&
                        sellCnList.length < 70 && (
                          <AddSellButton>
                            <button onClick={handleSellAddCondition}>
                              ADD SELL CONDITION
                            </button>
                          </AddSellButton>
                        )}
                    </div>
                  );
                })}
                {!stepCount.sell && (
                  <p style={{ fontSize: 14, marginRight: 12, marginLeft: 6 }}>
                    *You must choose at least 1 sell condition to proceed.
                  </p>
                )}
              </div>
            )}
          </FormWrapper>
        )}
        {stepCount.sell === true && (
          <FormWrapper>
            <MyButton>
              <button>CREATE MY BOT</button>
            </MyButton>
          </FormWrapper>
        )}
      </BoxContainter>
    </ThemeProvider>
  );
}

const BoxContainter = styled.div`
  min-width: 90%;
  max-width: 100%;
  backdrop-filter: blur(10px);
  background-color: rgba(57, 91, 100, 0.8);
  height: 40%;
  min-height: 600px;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  padding: 16px 2rem;
  margin: auto;
  margin-top: 4rem;
  border-radius: 24px;
  box-shadow: 2px 2px 12px rgba(0, 0, 0, 0.8);
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
    color: rgba(0, 0, 0, 0.7);
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

const FormWrapper = styled.div`
  display: flex;
  min-width: 1200px;
  max-width: 1200px;
  margin-bottom: 1rem;
  justify-content: start;
  align-items: center;
  flex-direction: column;
  padding: 1rem;
  background-color: rgba(255, 255, 255, 0.5);
  box-shadow: 0px 14px 9px -15px rgba(0, 0, 0, 0.25);
  border-radius: 8px;
  transition: all 0.2s ease-in;
`;

const HorizFormWrapper = styled.div`
  display: flex;
  min-width: 1200px;
  max-width: 1200px;
  margin-bottom: 1rem;
  justify-content: start;
  align-items: center;
  flex-direction: row;
  padding: 1rem;
  background-color: rgba(255, 255, 255, 0.5);
  box-shadow: 0px 14px 9px -15px rgba(0, 0, 0, 0.25);
  border-radius: 8px;
`;

const BuyConditionContainer = styled.div`
  display: flex;
  min-width: 800px;
  max-width: 800px;
  margin-bottom: 1rem;
  justify-content: start;
  align-items: center;
  background-color: rgba(8, 192, 163, 0.25);
  box-shadow: 0px 14px 9px -15px rgba(0, 0, 0, 0.25);
  border-radius: 8px;
`;

const SellConditionContainer = styled.div`
  display: flex;
  min-width: 800px;
  max-width: 800px;
  margin-bottom: 1rem;
  justify-content: start;
  align-items: center;
  background-color: rgba(192, 0, 0, 0.25);
  box-shadow: 0px 14px 9px -15px rgba(0, 0, 0, 0.25);
  border-radius: 8px;
`;

const MyButton = styled.div`
  button {
    width: 100%;
    max-width: 350px;
    min-width: 250px;
    height: 60px;
    border: none;
    margin: 1rem 0;
    box-shadow: 0px 14px 9px -15px rgba(0, 0, 0, 0.25);
    border-radius: 198px;
    background-color: #70edb9;
    color: black;
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
  button {
    width: 32%;
    max-width: 350px;
    min-width: 60px;
    height: 54px;
    border: none;
    margin: 1rem 0;
    box-shadow: 0px 14px 9px -15px rgba(0, 0, 0, 0.25);
    border-radius: 198px;
    background-color: rgba(100, 200, 183, 1);
    color: black;
    font-weight: 600;
    cursor: pointer;
    margin-left: 17rem;
    transition: all 0.2s ease-in;
    &:hover {
      background-color: rgba(100, 230, 183, 1);
      transform: translateY(-3px);
    }
  }
`;

const AddSellButton = styled.div`
  button {
    width: 25%;
    max-width: 350px;
    min-width: 60px;
    height: 54px;
    border: none;
    margin: 1rem 0;
    box-shadow: 0px 14px 9px -15px rgba(0, 0, 0, 0.25);
    border-radius: 198px;
    background-color: rgba(192, 100, 100, 1);
    color: black;
    font-weight: 600;
    cursor: pointer;
    margin-left: 17rem;
    transition: all 0.2s ease-in;
    &:hover {
      background-color: rgba(230, 100, 100, 1);
      transform: translateY(-3px);
    }
  }
`;

export default CreateBot;
