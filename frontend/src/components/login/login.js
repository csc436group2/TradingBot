import { useState } from "react";

const { Box, Typography, TextField, Button } = require("@mui/material");

const Login = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [keys, setKeys] = useState({
    apiKey: "",
    secretKey: "",
  });

  const handleChange = (e) => {
    setKeys((prev) => ({...prev, [e.target.name] : e.target.value}))
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(keys);
  };

  const resetState = () => {
    setIsSignUp(!isSignUp);
    setKeys({apiKey:'', secretKey:''});
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
            {isSignUp ? "Create Account" : "Login"}
          </Typography>
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
          >
            {isSignUp ? "Sign Up" : "Login"}
          </Button>
          <Button
            onClick={resetState}
            sx={{ marginTop: 3, borderRadius: 3 }}
          >
            Change to {isSignUp ? "Login" : "Sign Up"}
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default Login;
