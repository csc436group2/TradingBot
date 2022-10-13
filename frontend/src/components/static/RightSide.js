import React from "react";
import styled from "@emotion/styled";

const RightSide = () => {

  const Container = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    h1 {
        font-size: 45px;
        font-weight: 900;
        color: #343434;
    }

    @media (max-width: 900px) {
        display: none;
    }
  `;

  return (
    <Container>
      <h1>Bot Trading made simple.</h1>
    </Container>
  );
};

export default RightSide;
