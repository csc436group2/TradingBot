import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Typography } from "@mui/material";
import styled from "@emotion/styled";
import Input from "./InputTextField";
import Bot from "../models/bot";

function LoginComponent() {
  const nav = useNavigate();

  const [isSubmitted, setIsSubmitted] = useState(false);

  const [userName, setUsername] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [secretKey, setSecretKey] = useState("");

  return (
    <div>
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
          onClick={async () => {
            const requestOptions = {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                userName: userName,
                apiKey: apiKey,
                secretKey: secretKey,
              }),
            };
            await fetch("http://127.0.0.1:5000/api/login", requestOptions)
              .then(function (response) {
                console.log(response);
                if (!response.ok) {
                  setIsSubmitted(true);
                } else {
                  setIsSubmitted(false);
                  window.localStorage.setItem("isLoggedIn", true);
                  window.localStorage.setItem("userName", userName);
                  window.localStorage.setItem("apiKey", apiKey);
                  window.localStorage.setItem("secretKey", secretKey);
                }
              })
              .catch((error) => {
                console.error("Error Code:", error);
              });
            await fetch(
              `http://127.0.0.1:5000/getbots?apiKey=${apiKey}&secretKey=${secretKey}`
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
                    false,
                    JSON.parse(e[4]),
                    JSON.parse(e[3]),
                    e[0]
                  );
                  bots.push(botModel);
                  return 0;
                });
                window.localStorage.setItem("bots", JSON.stringify(bots));
              })
              .catch((error) => {
                console.error("Error Code:", error);
              })
              .finally(() => nav("/home"));
          }}
        >
          Login
        </button>
        {isSubmitted && (
          <Typography variant="subtitle1" textAlign="center" color={"red"}>
            Incorrect fields were provided.
          </Typography>
        )}
      </BoxContainter>
    </div>
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
