import { Typography } from "@mui/material";
import React from "react";
import styled from "styled-components";

const Input = ({
  type,
  placeholder,
  onChange,
  value,
  variant = "normal",
  isRequired = true,
  labelText,
  maxLength
}) => {
  return (
    <Container>
      {variant === "normal" && (
        <>
          <StyledInput
            placeholder={placeholder && placeholder}
            type={type ? type : "text"}
            required
            autocomplete="off"
            onChange={onChange}
            value={value}
            maxLength={maxLength}
          />
          {isRequired && (
            <>
              <Status />
            </>
          )}
        </>
      )}
      {variant === "label" && (
        <Stack>
          <Typography
            variant="subtitle1"
            color={"black"}
            fontWeight="bold"
            marginBottom={-1}
            marginLeft={8}
            sx={{ fontSize: 16 }}
            textAlign={"center"}
          >
            {labelText}
          </Typography>
          <LabeledInput
            placeholder={placeholder && placeholder}
            type={type ? type : "text"}
            required={isRequired}
            autocomplete="off"
            onChange={onChange}
            value={value}
            maxLength={maxLength}
          />
        </Stack>
      )}
      {variant === "condition" && (
        <Stack>
          <Typography
            variant="subtitle1"
            color={"black"}
            fontWeight="bold"
            marginBottom={-1}
            marginLeft={10}
            sx={{ fontSize: 16 }}
            textAlign={"center"}
          >
            {labelText}
          </Typography>
          <LabeledCondition
            placeholder={placeholder && placeholder}
            type={type ? type : "text"}
            required={isRequired}
            autocomplete="off"
            onChange={onChange}
            value={value}
          />
        </Stack>
      )}
    </Container>
  );
};

const StyledInput = styled.input`
  width: 80%;
  max-width: 350px;
  min-width: 250px;
  height: 40px;
  border: none;
  margin: 0.5rem 0;
  background-color: #f5f5f5;
  box-shadow: 0px 14px 9px -15px rgba(0, 0, 0, 0.25);
  border-radius: 8px;
  padding: 0 1rem;
  transition: all 0.2s ease-in;
  font-family: Source Sans Pro;
  &:hover {
    transform: translateY(-3px);
  }
`;

const LabeledInput = styled.input`
  width: 100%;
  max-width: 200px;
  min-width: 200px;
  height: 40px;
  border: none;
  margin: 0.5rem 0;
  background-color: #f5f5f5;
  box-shadow: 0px 14px 9px -15px rgba(0, 0, 0, 0.25);
  border-radius: 8px;
  padding: 0 1rem;
  transition: all 0.2s ease-in;
  margin-left: 6rem;
  margin-bottom: 2rem;
  font-family: Source Sans Pro;
  &:hover {
    transform: translateY(-3px);
  }
`;

const LabeledCondition = styled.input`
  width: 100%;
  max-width: 120px;
  min-width: 120px;
  height: 40px;
  border: none;
  margin: 0.5rem 0;
  background-color: #f5f5f5;
  box-shadow: 0px 14px 9px -15px rgba(0, 0, 0, 0.25);
  border-radius: 8px;
  padding: 0 1rem;
  transition: all 0.2s ease-in;
  margin-left: 5rem;
  font-family: Source Sans Pro;
  &:hover {
    transform: translateY(-3px);
  }
`;

const Container = styled.div`
  display: fixed;
  justify-content: center;
  align-items: center;
`;

const Stack = styled.div`
  display: inline-grid;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  margin-left: -4.5rem;
`;

const Status = styled.div`
  height: 10px;
  width: 10px;
  background: #9d9d9d;
  border-radius: 10px;
  margin-left: 1rem;
  ${StyledInput}:focus + & {
    background: #ffa689;
  }
  ${StyledInput}:invalid + & {
    background: #fe2f75;
  }
  ${StyledInput}:valid + & {
    background: #70edb9;
  }
`;

export default Input;
