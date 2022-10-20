import styled from "@emotion/styled";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Typography,
  useTheme,
} from "@mui/material";
import { tokens } from "../../theme";
import Header from "../Header";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import BotDetail from "../../models/botDetail";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

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

  const handleDialogClose = () => {
    setOpen(false);
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
                      <Dialog
                        open={open}
                        onClose={handleDialogClose}
                        maxWidth="true"
                      >
                        <DialogTitle>
                          <Box p={1}>
                            <Header title={botNameArr[index]} subtitle="Bot Details" />
                          </Box>
                        </DialogTitle>
                        <DialogContent>
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
                                <Box
                                  width={1000}
                                  display="flex"
                                  flexDirection="column"
                                >
                                  {detailDesc.map((_name, _index) => {
                                    return (
                                      <div key={_index} style={{ flexGrow: 1 }}>
                                        <Box display="flex" flexDirection="row">
                                          <Typography
                                            variant="h5"
                                            p={1}
                                            flexGrow={1}
                                          >
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
                                <Box
                                  width={1000}
                                  display="flex"
                                  flexDirection="column"
                                >
                                  {detailEPS.map((_name, _index) => {
                                    return (
                                      <div key={_index} style={{ flexGrow: 1 }}>
                                        <Box display="flex" flexDirection="row">
                                          <Typography
                                            variant="h5"
                                            p={1}
                                            flexGrow={1}
                                          >
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
                                <Box
                                  width={1000}
                                  display="flex"
                                  flexDirection="column"
                                >
                                  {detailRatio.map((_name, _index) => {
                                    return (
                                      <div key={_index} style={{ flexGrow: 1 }}>
                                        <Box display="flex" flexDirection="row">
                                          <Typography
                                            variant="h5"
                                            p={1}
                                            flexGrow={1}
                                          >
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
                                <Box
                                  width={360}
                                  display="flex"
                                  flexDirection="column"
                                >
                                  {detailFirst.map((_name, _index) => {
                                    return (
                                      <div key={_index} style={{ flexGrow: 1 }}>
                                        <Box display="flex" flexDirection="row">
                                          <Typography
                                            variant="h5"
                                            p={1}
                                            flexGrow={1}
                                          >
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
                                <Box
                                  width={360}
                                  display="flex"
                                  flexDirection="column"
                                >
                                  {detailSecond.map((_name, _index) => {
                                    return (
                                      <div key={_index} style={{ flexGrow: 1 }}>
                                        <Box display="flex" flexDirection="row">
                                          <Typography
                                            variant="h5"
                                            p={1}
                                            flexGrow={1}
                                          >
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
                        </DialogContent>
                        <DialogActions>
                          <ViewButton>
                            <button onClick={handleDialogClose}>CLOSE</button>
                          </ViewButton>
                        </DialogActions>
                      </Dialog>
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
