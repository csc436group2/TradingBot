import React from "react";
import styled from "@emotion/styled";
import { Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";

const RightSide = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Container>
      <Typography
        variant="h1"
        fontWeight="bold"
        sx={theme.palette.mode === 'dark' ? { color: "white" } : { color: colors.primary[100]}}
      >
        Bot Trading made simple.
      </Typography>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 900px) {
    display: none;
  }
`;

export default RightSide;
