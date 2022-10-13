import { useState } from "react";
import { useNavigate } from "react-router-dom";
import records from "../../shared/mock/users.json";
import { Typography } from "@mui/material";
import styled from "@emotion/styled";
import Input from "../input/InputTextField";

function LoginComponent() {
  const nav = useNavigate();

  const [isSubmitted, setIsSubmitted] = useState(false);

  const [userName, setUsername] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [secretKey, setSecretKey] = useState("");

  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      userName: userName,
      apiKey: apiKey,
      secretKey: secretKey,
    }),
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let verification = true;
    if (userName.length < 4) {
      verification = false;
    }
    if (apiKey.length < 1) {
      verification = false;
    }
    if (secretKey.length < 1) {
      verification = false;
    }
    if (verification) {
      console.log(requestOptions.body);
      records.forEach((user) => {
        if (
          user.userName === userName &&
          user.apiKey === apiKey &&
          user.secretKey === secretKey
        ) {
          fetch("http://localhost:3000", requestOptions)
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
          nav("/home", {
            state: user,
          });
        }
      });
      setIsSubmitted(true);
    } else {
      setIsSubmitted(true);
    }
    return verification;
  };

  return (
    <form onSubmit={handleSubmit}>
      <BoxContainter>
        <Typography
          variant="h4"
          fontFamily={"monospace"}
          textAlign="start"
          sx={{ fontWeight: 700, wordSpacing: "-14px" }}
        >
          Log In
        </Typography>
        <Typography variant="subtitle1" textAlign="start">
          Enter your credentials to access your account.
        </Typography>
        <Input
          value={userName}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
          placeholder={"Username"}
        />
        <Input
          value={apiKey}
          onChange={(e) => {
            setApiKey(e.target.value);
          }}
          type={"password"}
          placeholder={"API Key"}
        />
        <Input
          value={secretKey}
          onChange={(e) => {
            setSecretKey(e.target.value);
          }}
          type={"password"}
          placeholder={"Secret Key"}
        />
        <button
          type="submit"
          sx={{
            marginTop: 3,
            borderRadius: 3,
            alignSelf: "center",
            width: 280,
            height: 60,
          }}
          variant="contained"
          color="warning"
        >
          Login
        </button>
        {isSubmitted === true && (
          <Typography variant="subtitle1" textAlign="center" color={"red"}>
            Incorrect fields were provided.
          </Typography>
        )}
      </BoxContainter>
    </form>
  );
}

const BoxContainter = styled.div`
  min-width: 400px;
  backdrop-filter: blur(10px);
  background-color: rgba(255, 255, 255, 0.8);
  height: 100%;
  min-height: 750px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 2rem;

  button {
    width: 75%;
    max-width: 350px;
    min-width: 250px;
    height: 40px;
    border: none;
    margin: 1rem 0;
    box-shadow: 0px 14px 9px -15px rgba(0, 0, 0, 0.25);
    border-radius: 8px;
    background-color: #70edb9;
    color: #fff;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease-in;
    &:hover {
      transform: translateY(-3px);
    }
  }
`;

export default LoginComponent;
