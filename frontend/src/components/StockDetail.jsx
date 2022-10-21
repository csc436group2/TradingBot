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
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { tokens } from "../theme";
import Header from "./Header";
import { useState } from "react";
import StartIcon from "@mui/icons-material/PlayCircleFilledWhiteRounded";
import PauseIcon from "@mui/icons-material/PauseCircleFilledRounded";

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

  const deleteHttpRequest = () => {
    const requestOptions = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        secretKey: window.localStorage.getItem("secretKey"),
        apiKey: window.localStorage.getItem("apiKey"),
        botName: bots[index]["botName"],
        stock_sym: bots[index]["stockSym"],
      }),
    };
    fetch("http://localhost:5000/deletebot", requestOptions)
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

  const pauseHttpRequest = () => {
    const requestOptions = {
      method: "PUT",
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

  const handleDeleteRobot = () => {
    if (process.env.NODE_ENV !== "development") {
      deleteHttpRequest();
    }
    const toDelete = bots[index];
    bots = bots.filter(function (i) {
      return i !== toDelete;
    });
    window.localStorage.setItem("bots", JSON.stringify(bots));
    closeDeleteDialog();
    handleDialogClose();
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
      max-width: 80px;
      min-width: 80px;
      height: 40px;
      border: none;
      font-size: 16px;
      box-shadow: 0px 14px 9px -15px rgba(0, 0, 0, 0.25);
      border-radius: 20px;
      background-color: ${colors.redAccent[600]};
      color: ${colors.primary};
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
      background-color: ${colors.greenAccent[600]};
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

  const EditButton = styled.div`
    button {
      max-width: 80px;
      min-width: 80px;
      height: 40px;
      border: none;
      font-size: 16px;
      box-shadow: 0px 14px 9px -15px rgba(0, 0, 0, 0.25);
      border-radius: 20px;
      background-color: ${colors.blueAccent[600]};
      color: ${colors.primary};
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s ease-in;
      &:hover {
        transform: translateY(-3px);
      }
    }
  `;

  const CloseButton = styled.div`
    button {
      max-width: 80px;
      min-width: 80px;
      height: 40px;
      border: none;
      font-size: 16px;
      box-shadow: 0px 14px 9px -15px rgba(0, 0, 0, 0.25);
      border-radius: 20px;
      background-color: ${colors.grey[600]};
      color: white;
      font-weight: 600;
      cursor: pointer;
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
                    <div key={_index} style={{ flexGrow: 1 }}>
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
                    <div key={_index} style={{ flexGrow: 1 }}>
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
                    <div key={_index} style={{ flexGrow: 1 }}>
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
                    <div key={_index} style={{ flexGrow: 1 }}>
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
                    <div key={_index} style={{ flexGrow: 1 }}>
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
          height={500}
          bgcolor={colors.grey[900]}
          borderRadius={8}
        ></Box>
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
          height={500}
          bgcolor={colors.grey[900]}
          borderRadius={8}
        ></Box>
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
              onClick={handleDeleteRobot}
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
      </DialogContent>
      <DialogActions sx={{ backgroundColor: colors.primary[400] }}>
        <Box ml={2}>
          <PauseButton>
            <button onClick={handlePauseRobot}>
              {curRunning ? (
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
              ) : (
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
              )}
            </button>
          </PauseButton>
        </Box>
        <EditButton>
          <button onClick={handleDialogClose}>EDIT</button>
        </EditButton>
        <Box flexGrow={1}>
          <DeleteButton>
            <button onClick={openDeleteDialog}>DELETE</button>
          </DeleteButton>
        </Box>
        <CloseButton>
          <button onClick={handleDialogClose}>CLOSE</button>
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
