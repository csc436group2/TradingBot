import styled from "@emotion/styled";
import {
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Accordion,
  AccordionSummary,
  useTheme,
  Box,
  AccordionDetails,
  DialogActions,
  Button,
  Snackbar,
  Alert,
  Input,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { tokens } from "../context/theme";
import Header from "../components/Header";
import { useState } from "react";
import StartIcon from "@mui/icons-material/PlayCircleOutlineRounded";
import PauseIcon from "@mui/icons-material/PauseCircleOutlineRounded";
import ConfirmIcon from "@mui/icons-material/CheckCircleOutlineRounded";
import CancelIcon from "@mui/icons-material/BlockRounded";
import EditIcon from "@mui/icons-material/TuneRounded";
import DeleteIcon from "@mui/icons-material/DeleteOutlineRounded";
import CloseIcon from "@mui/icons-material/CloseRounded";

function StockDetail({
  index,
  open,
  setOpen,
  detailDesc,
  detailFirst,
  detailSecond,
  detailEPS,
  detailRatio,
}) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  let bots = JSON.parse(window.localStorage.getItem("bots"), "[]");

  const [deleteOpen, setDeleteOpen] = useState(false);

  const [curRunning, setCurRunning] = useState(bots[index]["isRunning"]);

  const [snackBarOpen, setSnackBarOpen] = useState(false);

  const [isEdit, setIsEdit] = useState(false);

  const [confirmOpen, setConfirmOpen] = useState(false);

  const [botsEdit, setBotsEdit] = useState(bots);

  const toggleEdit = () => {
    setIsEdit(!isEdit);
  };

  const handleSnackBarOpen = () => {
    setSnackBarOpen(true);
  };

  const handleSnackBarClose = () => {
    setSnackBarOpen(false);
  };

  const updateRunning = () => {
    setCurRunning(!curRunning);
  };

  const handleDialogClose = () => {
    setOpen(false);
  };

  const openDeleteDialog = () => {
    setDeleteOpen(true);
  };

  const closeDeleteDialog = () => {
    setDeleteOpen(false);
  };

  const openConfirmDialog = () => {
    setConfirmOpen(true);
  };

  const closeConfirmDialog = () => {
    setConfirmOpen(false);
  };

  const editHttpRequest = () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        secretKey: window.localStorage.getItem("secretKey"),
        apiKey: window.localStorage.getItem("apiKey"),
        botName: bots[index]["botName"],
        stock_sym: bots[index]["stockSym"],
        buy_condition: bots[index]["buy_condition"],
        sell_condition: bots[index]["sell_condition"],
      }),
    };
    fetch("http://localhost:5000/edit", requestOptions)
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

  const handleConfirmChanges = () => {
    if (process.env.NODE_ENV !== "development") {
      editHttpRequest();
    }
    toggleEdit();
    window.localStorage.setItem("bots", JSON.stringify(botsEdit));
    closeConfirmDialog();
  };

  const handleInputChange = (e, bot_i, cn_i, cn, val) => {
    const curr = botsEdit[bot_i];
    let target_val = e.target.value;
    if (target_val === "") {
      target_val = 0;
    }
    curr[cn][cn_i][val] = target_val;
    const list = [...botsEdit];
    list.filter(function (i) {
      if (i === curr) {
        return curr;
      } else {
        return i;
      }
    });
    setBotsEdit(list);
  };

  const pauseHttpRequest = () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        secretKey: window.localStorage.getItem("secretKey"),
        apiKey: window.localStorage.getItem("apiKey"),
        botName: bots[index]["botName"],
        stock_sym: bots[index]["stockSym"],
      }),
    };
    fetch("http://localhost:5000/pause", requestOptions)
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

  const handlePauseRobot = () => {
    if (process.env.NODE_ENV !== "development") {
      pauseHttpRequest();
    }
    const toUpdate = bots[index];
    toUpdate["isRunning"] = true;
    const updated = [];
    bots.forEach(function (i) {
      if (i["botName"] !== toUpdate["botName"]) {
        updated.push(i);
      } else {
        updated.push(toUpdate);
      }
    });
    window.localStorage.setItem("bots", JSON.stringify(updated));
    updateRunning();
    if (!curRunning) {
      handleSnackBarOpen();
    }
  };

  const DeleteButton = styled.div`
    button {
      max-width: 140px;
      min-width: 140px;
      height: 40px;
      border: none;
      box-shadow: 0px 14px 9px -15px rgba(0, 0, 0, 0.25);
      border-radius: 200px;
      background-color: ${colors.redAccent[600]};
      color: white;
      align-items: center;
      justify-content: center;
      display: flex;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s ease-in;
      &:hover {
        transform: translateY(-3px);
      }
    }
  `;

  const PauseButton = styled.div`
    button {
      max-width: 120px;
      min-width: 120px;
      height: 40px;
      border: none;
      box-shadow: 0px 14px 9px -15px rgba(0, 0, 0, 0.25);
      border-radius: 200px;
      background-color: ${colors.yellowAccent[600]};
      color: ${colors.primary};
      align-items: center;
      justify-content: center;
      display: flex;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s ease-in;
      &:hover {
        transform: translateY(-3px);
      }
    }
  `;

  const StartButton = styled.div`
    button {
      max-width: 120px;
      min-width: 120px;
      height: 40px;
      border: none;
      box-shadow: 0px 14px 9px -15px rgba(0, 0, 0, 0.25);
      border-radius: 200px;
      background-color: ${colors.greenAccent[600]};
      color: white;
      align-items: center;
      justify-content: center;
      display: flex;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s ease-in;
      &:hover {
        transform: translateY(-3px);
      }
    }
  `;

  const EditButton = styled.div`
    button {
      max-width: 100px;
      min-width: 100px;
      height: 40px;
      border: none;
      box-shadow: 0px 14px 9px -15px rgba(0, 0, 0, 0.25);
      border-radius: 200px;
      background-color: ${colors.blueAccent[600]};
      color: white;
      align-items: center;
      justify-content: center;
      display: flex;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s ease-in;
      &:hover {
        transform: translateY(-3px);
      }
    }
  `;

  const CancelButton = styled.div`
    button {
      max-width: 140px;
      min-width: 140px;
      height: 40px;
      border: none;
      box-shadow: 0px 14px 9px -15px rgba(0, 0, 0, 0.25);
      border-radius: 200px;
      background-color: ${colors.blueAccent[600]};
      color: white;
      align-items: center;
      justify-content: center;
      display: flex;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s ease-in;
      &:hover {
        transform: translateY(-3px);
      }
    }
  `;

  const ConfirmButton = styled.div`
    button {
      max-width: 150px;
      min-width: 150px;
      height: 40px;
      border: none;
      box-shadow: 0px 14px 9px -15px rgba(0, 0, 0, 0.25);
      border-radius: 200px;
      background-color: ${colors.greenAccent[600]};
      color: white;
      align-items: center;
      justify-content: center;
      display: flex;
      font-weight: 600;
      cursor: pointer;
      margin-right: 8px;
      transition: all 0.2s ease-in;
      &:hover {
        transform: translateY(-3px);
      }
    }
  `;

  const CloseButton = styled.div`
    button {
      max-width: 120px;
      min-width: 120px;
      height: 40px;
      border: none;
      box-shadow: 0px 14px 9px -15px rgba(0, 0, 0, 0.25);
      border-radius: 200px;
      background-color: ${colors.blueAccent[600]};
      color: white;
      align-items: center;
      justify-content: center;
      display: flex;
      font-weight: 600;
      cursor: pointer;
      margin-right: 8px;
      transition: all 0.2s ease-in;
      &:hover {
        transform: translateY(-3px);
      }
    }
  `;

  return (
    <Dialog open={open} onClose={handleDialogClose} maxWidth="true">
      <DialogTitle sx={{ backgroundColor: colors.primary[400] }}>
        <Box p={1}>
          <Header
            title={bots[index]["botName"]}
            subtitle={bots[index]["stockSym"]}
          />
        </Box>
      </DialogTitle>
      <DialogContent sx={{ backgroundColor: colors.primary[400] }}>
        <Typography
          variant="h3"
          color={colors.grey[100]}
          fontWeight="bold"
          sx={{ m: "0 0 5px 0" }}
          p={1}
          textAlign="center"
        >
          Stock Details
        </Typography>
        <Divider sx={{ marginBottom: 3 }} />
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            Stock Description
          </AccordionSummary>
          <AccordionDetails>
            <Box
              width={1000}
              display="flex"
              flexDirection="row"
              justifyContent="start"
            >
              <Box width={1000} display="flex" flexDirection="column">
                {detailDesc.map((_name, _index) => {
                  return (
                    <div key={_index + "-desc"} style={{ flexGrow: 1 }}>
                      <Box display="flex" flexDirection="row">
                        <Typography variant="h5" p={1} flexGrow={1}>
                          {detailDesc[_index]["key"]}
                        </Typography>
                        <Typography
                          variant="h5"
                          p={1}
                          fontWeight={700}
                          textAlign="end"
                        >
                          {detailDesc[_index]["val"]}
                        </Typography>
                      </Box>
                      <Divider sx={{ marginBottom: 1 }} />
                    </div>
                  );
                })}
              </Box>
            </Box>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel3a-content"
            id="panel3a-header"
          >
            EPS & Return
          </AccordionSummary>
          <AccordionDetails>
            <Box
              width={1000}
              display="flex"
              flexDirection="row"
              justifyContent="start"
            >
              <Box width={1000} display="flex" flexDirection="column">
                {detailEPS.map((_name, _index) => {
                  return (
                    <div key={_index + "-eps"} style={{ flexGrow: 1 }}>
                      <Box display="flex" flexDirection="row">
                        <Typography variant="h5" p={1} flexGrow={1}>
                          {detailEPS[_index]["key"]}
                        </Typography>
                        <Typography
                          variant="h5"
                          p={1}
                          fontWeight={700}
                          textAlign="end"
                        >
                          {detailEPS[_index]["val"]}
                        </Typography>
                      </Box>
                      <Divider sx={{ marginBottom: 1 }} />
                    </div>
                  );
                })}
              </Box>
            </Box>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel4a-content"
            id="panel4a-header"
          >
            Ratio
          </AccordionSummary>
          <AccordionDetails>
            <Box
              width={1000}
              display="flex"
              flexDirection="row"
              justifyContent="start"
            >
              <Box width={1000} display="flex" flexDirection="column">
                {detailRatio.map((_name, _index) => {
                  return (
                    <div key={_index + "-ratio"} style={{ flexGrow: 1 }}>
                      <Box display="flex" flexDirection="row">
                        <Typography variant="h5" p={1} flexGrow={1}>
                          {detailRatio[_index]["key"]}
                        </Typography>
                        <Typography
                          variant="h5"
                          p={1}
                          fontWeight={700}
                          textAlign="end"
                        >
                          {detailRatio[_index]["val"]}
                        </Typography>
                      </Box>
                      <Divider sx={{ marginBottom: 1 }} />
                    </div>
                  );
                })}
              </Box>
            </Box>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel5a-content"
            id="panel5a-header"
          >
            Advanced Details
          </AccordionSummary>
          <AccordionDetails>
            <Box
              width={1000}
              height={800}
              display="flex"
              flexDirection="row"
              justifyContent="center"
            >
              <Box width={360} display="flex" flexDirection="column">
                {detailFirst.map((_name, _index) => {
                  return (
                    <div key={_index + "-detail"} style={{ flexGrow: 1 }}>
                      <Box display="flex" flexDirection="row">
                        <Typography variant="h5" p={1} flexGrow={1}>
                          {detailFirst[_index]["key"]}
                        </Typography>
                        <Typography
                          variant="h5"
                          p={1}
                          fontWeight={700}
                          textAlign="end"
                        >
                          {detailFirst[_index]["val"]}
                        </Typography>
                      </Box>
                    </div>
                  );
                })}
              </Box>
              <Box width={360} display="flex" flexDirection="column">
                {detailSecond.map((_name, _index) => {
                  return (
                    <div key={_index + "-second"} style={{ flexGrow: 1 }}>
                      <Box display="flex" flexDirection="row">
                        <Typography variant="h5" p={1} flexGrow={1}>
                          {detailSecond[_index]["key"]}
                        </Typography>
                        <Typography
                          variant="h5"
                          p={1}
                          fontWeight={700}
                          textAlign="end"
                        >
                          {detailSecond[_index]["val"]}
                        </Typography>
                      </Box>
                    </div>
                  );
                })}
              </Box>
            </Box>
          </AccordionDetails>
        </Accordion>
        <Typography
          variant="h3"
          color={colors.grey[100]}
          fontWeight="bold"
          sx={{ m: "12px 0 5px 0" }}
          p={1}
          textAlign="center"
        >
          Buy Conditions
        </Typography>
        <Box
          width={"100%"}
          minHeight={300}
          bgcolor={colors.grey[800]}
          borderRadius={8}
          p={3}
          display="flex"
          flexDirection="row"
        >
          <Box p={3}>
            <Typography fontWeight={700} variant="h5" mb={3}>
              CONDITION
            </Typography>
            {bots[index]["buy_condition"].map((item) => {
              return (
                <div key={item.property + "-prop-1"}>
                  <Box mr={6} fontSize={16} mb={2}>
                    {item.property}
                  </Box>
                </div>
              );
            })}
          </Box>
          <Box p={3}>
            <Typography fontWeight={700} variant="h5" mb={3}>
              LOW
            </Typography>
            {bots[index]["buy_condition"].map((item, _index) => {
              return (
                <div key={_index + "-" + item.lt + "-lt-1"}>
                  <Box mr={6} fontSize={16} mb={2}>
                    {isEdit ? (
                      <Input
                        type="number"
                        placeholder={item.lt.toString()}
                        value={botsEdit[index]["buy_condition"][_index].lt}
                        onChange={(e) => {
                          handleInputChange(
                            e,
                            index,
                            _index,
                            "buy_condition",
                            "lt"
                          );
                        }}
                      ></Input>
                    ) : (
                      item.lt
                    )}
                  </Box>
                </div>
              );
            })}
          </Box>
          <Box p={3}>
            <Typography fontWeight={700} variant="h5" mb={3}>
              HIGH
            </Typography>
            {bots[index]["buy_condition"].map((item, _index) => {
              return (
                <div key={_index + "-" + item.gt + "-gt-1"}>
                  <Box mr={6} fontSize={16} mb={2}>
                    {isEdit ? (
                      <Input
                        type="number"
                        placeholder={item.gt.toString()}
                        value={botsEdit[index]["buy_condition"][_index].gt}
                        onChange={(e) => {
                          handleInputChange(
                            e,
                            index,
                            _index,
                            "buy_condition",
                            "gt"
                          );
                        }}
                      ></Input>
                    ) : (
                      item.gt
                    )}
                  </Box>
                </div>
              );
            })}
          </Box>
        </Box>
        <Typography
          variant="h3"
          color={colors.grey[100]}
          fontWeight="bold"
          sx={{ m: "12px 0 5px 0" }}
          p={1}
          textAlign="center"
        >
          Sell Conditions
        </Typography>
        <Box
          width={"100%"}
          minHeight={300}
          bgcolor={colors.grey[800]}
          borderRadius={8}
          p={3}
          display="flex"
          flexDirection="row"
        >
          <Box p={3}>
            <Typography fontWeight={700} variant="h5" mb={3}>
              CONDITION
            </Typography>
            {bots[index]["sell_condition"].map((item) => {
              return (
                <div key={item.property + "-prop-2"}>
                  <Box mr={6} fontSize={16} mb={2}>
                    {item.property}
                  </Box>
                </div>
              );
            })}
          </Box>
          <Box p={3}>
            <Typography fontWeight={700} variant="h5" mb={3}>
              LOW
            </Typography>
            {bots[index]["sell_condition"].map((item, _index) => {
              return (
                <div key={_index + "-" + item.lt + "-lt-2"}>
                  <Box mr={6} fontSize={16} mb={2}>
                    {isEdit ? (
                      <Input
                        type="number"
                        placeholder={item.lt.toString()}
                        value={botsEdit[index]["sell_condition"][_index].lt}
                        onChange={(e) => {
                          handleInputChange(
                            e,
                            index,
                            _index,
                            "sell_condition",
                            "lt"
                          );
                        }}
                      ></Input>
                    ) : (
                      item.lt
                    )}
                  </Box>
                </div>
              );
            })}
          </Box>
          <Box p={3}>
            <Typography fontWeight={700} variant="h5" mb={3}>
              HIGH
            </Typography>
            {bots[index]["sell_condition"].map((item, _index) => {
              return (
                <div key={_index + "-" + item.gt + "-gt-2"}>
                  <Box mr={6} fontSize={16} mb={2}>
                    {isEdit ? (
                      <Input
                        type="number"
                        placeholder={item.gt.toString()}
                        value={botsEdit[index]["sell_condition"][_index].gt}
                        onChange={(e) => {
                          handleInputChange(
                            e,
                            index,
                            _index,
                            "sell_condition",
                            "gt"
                          );
                        }}
                      ></Input>
                    ) : (
                      item.gt
                    )}
                  </Box>
                </div>
              );
            })}
          </Box>
        </Box>
        <Dialog open={deleteOpen} onClose={closeDeleteDialog}>
          <DialogTitle fontWeight="bold" variant="h4">
            WARNING
          </DialogTitle>
          <DialogContent>
            <Typography variant="h5">
              Are you sure you want to delete robot '{bots[index]["botName"]}'?
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button
              sx={{ color: colors.primary[100], fontWeight: 700, fontSize: 16 }}
              onClick={async () => {
                const requestOptions = {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    botName: bots[index]["botName"],
                    botId: bots[index]["botId"],
                  }),
                };
                await fetch("http://127.0.0.1:5000/delete", requestOptions)
                  .then(async (response) => {
                    console.log(response);
                    if (!response.ok) {
                      return Promise.reject();
                    }
                  })
                  .catch((error) => {
                    console.error("Error Code:", error);
                  })
                  .finally(() => {
                    const toDelete = bots[index];
                    bots = bots.filter(function (i) {
                      return i !== toDelete;
                    });
                    window.localStorage.setItem("bots", JSON.stringify(bots));
                    closeDeleteDialog();
                    handleDialogClose();
                  });
              }}
            >
              Confirm
            </Button>
            <Button
              sx={{
                color: colors.redAccent[500],
                fontWeight: 700,
                fontSize: 16,
              }}
              onClick={closeDeleteDialog}
            >
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog open={confirmOpen} onClose={closeConfirmDialog}>
          <DialogTitle fontWeight="bold" variant="h4">
            CONFIRM
          </DialogTitle>
          <DialogContent>
            <Typography variant="h5">
              Do you want to confirm these changes?
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button
              sx={{ color: colors.primary[100], fontWeight: 700, fontSize: 16 }}
              onClick={handleConfirmChanges}
            >
              Confirm
            </Button>
            <Button
              sx={{
                color: colors.redAccent[500],
                fontWeight: 700,
                fontSize: 16,
              }}
              onClick={closeConfirmDialog}
            >
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </DialogContent>
      <DialogActions sx={{ backgroundColor: colors.primary[400] }}>
        {!isEdit ? (
          <Box ml={2}>
            {curRunning ? (
              <PauseButton>
                <button onClick={handlePauseRobot}>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <Typography fontSize={20} p={1} fontWeight="bold">
                      PAUSE
                    </Typography>
                    <PauseIcon fontSize="large" />
                  </div>
                </button>
              </PauseButton>
            ) : (
              <StartButton>
                <button onClick={handlePauseRobot}>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <Typography fontSize={20} p={1} fontWeight="bold">
                      START
                    </Typography>
                    <StartIcon fontSize="large" />
                  </div>
                </button>
              </StartButton>
            )}
          </Box>
        ) : null}
        {isEdit ? (
          <Box display="flex" flexDirection="row" ml={2}>
            <ConfirmButton>
              <button onClick={openConfirmDialog}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Typography fontSize={20} p={1} fontWeight="bold">
                    CONFIRM
                  </Typography>
                  <ConfirmIcon fontSize="large" />
                </div>
              </button>
            </ConfirmButton>
            <CancelButton>
              <button onClick={toggleEdit}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Typography fontSize={20} p={1} fontWeight="bold">
                    CANCEL
                  </Typography>
                  <CancelIcon fontSize="large" />
                </div>
              </button>
            </CancelButton>
          </Box>
        ) : (
          <Box flexGrow={1}>
            <EditButton>
              <button onClick={toggleEdit}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Typography fontSize={20} p={1} fontWeight="bold">
                    EDIT
                  </Typography>
                  <EditIcon fontSize="medium" />
                </div>
              </button>
            </EditButton>
          </Box>
        )}
        {isEdit ? (
          <Box flexGrow={1}>
            <DeleteButton>
              <button onClick={openDeleteDialog}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Typography fontSize={20} p={1} fontWeight="bold">
                    DELETE
                  </Typography>
                  <DeleteIcon fontSize="large" />
                </div>
              </button>
            </DeleteButton>
          </Box>
        ) : null}
        <CloseButton>
          <button onClick={handleDialogClose}>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Typography fontSize={20} p={1} fontWeight="bold">
                CLOSE
              </Typography>
              <CloseIcon fontSize="large" />
            </div>
          </button>
        </CloseButton>
      </DialogActions>
      <Snackbar
        open={snackBarOpen}
        autoHideDuration={3000}
        onClose={handleSnackBarClose}
      >
        <Alert severity="info" icon={<StartIcon />}>
          {bots[index]["botName"] + " is now running."}
        </Alert>
      </Snackbar>
    </Dialog>
  );
}

export default StockDetail;
