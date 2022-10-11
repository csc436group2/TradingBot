import { useState } from "react";
import { useNavigate } from "react-router-dom";

const { Box, Typography, TextField, Button } = require("@mui/material");

function Login() {

  const nav = useNavigate();

  const [isSubmitted, setIsSubmitted] = useState(false);

  const [keys, setKeys] = useState({
    userName: "",
    apiKey: "",
    secretKey: "",
  });

  const handleChange = (e) => {
    setKeys((prev) => ({...prev, [e.target.name] : e.target.value}))
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let verification = true;
    if (keys.userName.length < 4) {
      verification = false;
    } 
    if (keys.apiKey.length < 1) {
      verification = false;
    } 
    if (keys.secretKey.length < 1) {
      verification = false;
    } 
    if (verification) {
      nav('/home');
    } else {
      setIsSubmitted(true);
    }
    return verification;
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Box
          display="flex"
          flexDirection={"column"}
          maxWidth={400}
          alignItems="center"
          justifyContent={"center"}
          margin="auto"
          marginTop={5}
          padding={3}
          borderRadius={5}
          boxShadow={"5px 5px 10px #ccc"}
          sx={{
            ":hover": {
              boxShadow: "10px 10px 20px #ccc",
            },
          }}
        >
          <Typography variant="h3" padding={3} textAlign="center">
            Sign In
          </Typography>
          <TextField
            name="userName"
            value={keys.userName}
            onChange={handleChange}
            margin="normal"
            type={"text"}
            variant="outlined"
            placeholder="Username"
          ></TextField>
          <TextField
            name="apiKey"
            value={keys.apiKey}
            onChange={handleChange}
            margin="normal"
            type={"password"}
            variant="outlined"
            placeholder="API Key"
          ></TextField>
          <TextField
            name="secretKey"
            value={keys.secretKey}
            onChange={handleChange}
            margin="normal"
            type={"password"}
            variant="outlined"
            placeholder="Secret Key"
          ></TextField>
          <Button
            type="submit"
            sx={{ marginTop: 3, borderRadius: 3 }}
            variant="contained"
            color="primary"
            onClick={handleSubmit}
          >
            Login
          </Button>
          {isSubmitted === true && 
            <Typography variant="h7" padding={3} textAlign="center" color={'red'}>
              Incorrect fields were provided.
            </Typography>
          }
        </Box>
      </form>
    </div>
  );
};

export default Login;
