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
import Input from "../input/InputTextField";
import { Stack } from "@mui/system";
import DeleteIcon from "@mui/icons-material/Delete";
import Conditions from "../../shared/data/conditions";
import { tokens } from "../../theme";
import Header from "../Header";
import { useNavigate } from "react-router-dom";

function CreateBot() {
  const [stockSym, setStockSym] = useState("");
  const [botName, setBotName] = useState("");
  const [stepCount, incrementStep] = useState({
    symbol: false,
    buy: false,
    sell: false,
  });

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const nav = useNavigate();

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

  const handleBotNameChange = (e) => {
    setBotName(e.target.value);
    if (botName.length > 3) {
      const list = stepCount;
      list["bot"] = true;
      incrementStep(list);
    }
  };

  const handleCreateBot = () => {
    if (stepCount.sell) {
      localStorage.setItem("hasBot", true);
      nav("/home");
    }
  };

  const FormWrapper = styled.div`
    display: flex;
    min-width: 1200px;
    max-width: 1200px;
    margin-bottom: 1rem;
    justify-content: start;
    align-items: center;
    flex-direction: column;
    padding: 1rem;
    background-color: ${colors.blueAccent[800]};
    align-self: center;
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
        <Box justifyContent="space-evenly" flexDirection="row" p={3} pl={10}>
          <Box display="flex" flexDirection="column">
            <Typography variant="h5">Bot Name:</Typography>
            <Input
              value={botName}
              onChange={handleBotNameChange}
              variant={"normal"}
              placeholder={"MyRobot"}
              maxLength={25}
            />
          </Box>
          <Box display="flex" flexDirection="column">
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
        <FormWrapper>
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
                  <Stack direction={"row"} spacing={2}>
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
                      ADD BUY CONDITION
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
        <FormWrapper>
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
                  <Stack direction={"row"} spacing={2}>
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
                      ADD SELL CONDITION
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
        <FormWrapper>
          <MyButton>
            <button onClick={handleCreateBot}>CREATE MY BOT</button>
          </MyButton>
        </FormWrapper>
      </Box>
    </Box>
  );
}

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

export default CreateBot;
