import { Box, TextField, useTheme, Button, Typography } from "@mui/material";
import { useState } from "react";
import { tokens } from "../theme";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  // Checking Empty Input fields
  const handleError = () => {
    setError(true);
  };

  const navigate = useNavigate();

  const handleLogin = async () => {
    const headers = {
      "Content-Type": "application/json",
    };
    try {
      if (email && password) {
        const loginData = {
          email,
          password,
        };
        const response = await toast.promise(axios.post(
          `${window.env.API_URL}/login`,
          loginData,
          { headers }
        ),
        {
          pending: 'Logging...'
        }
        )
        if (response.data.result) {
          // storing data in localStorage
          localStorage.setItem(
            "token",
            JSON.stringify(`bearer ${response.data.token}`)
          );
          localStorage.setItem("user", JSON.stringify(response.data.result));

          // redirecting user
            navigate("/dashboard");

          toast.success(`Welcome! ${response.data.result.name} `);
          // resetting the data
          setEmail("");
          setPassword("");
        } else {
          toast.error(response.data.msg);
        }
      } else {
        toast.warning("please provide full credentials");
      }
    } catch (error) {
      toast.error("something wrong please try again later! ");
      console.error(error);
    }
  };

  return (
    <Box
      width="100%"
      height="100%"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
        sx={{
          backgroundColor: colors.primary[400],
          height: "25rem",
          width: "25rem",
          borderRadius: "6px",
        }}
      >
        <Typography
          variant="h3"
          sx={{
            color: colors.greenAccent[400],
            mb: "24px",
            fontWeight: "bold",
          }}
        >
          Log in
        </Typography>

        {/* login form */}
        <Box sx={{ width: "20rem" }} id="login">
          <TextField
            fullWidth
            autoFocus
            id="email"
            label="Email"
            value={email}
            error={!email && error}
            onBlur={handleError}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            sx={{ mb: "24px" }}
            InputLabelProps={{ style: { color: colors.grey[100] } }}
          />
          <TextField
            fullWidth
            id="password"
            label="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            error={!password && error}
            onBlur={handleError}
            sx={{ mb: "24px" }}
            InputLabelProps={{ style: { color: colors.grey[100] } }}
          />
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <Button
              variant="text"
              sx={{
                color: colors.grey[100],
                fontWeight: "bold",
                "&:hover ": { opacity: 0.8 },
                marginLeft: "auto",
                mb: "10px",
              }}
              onClick={() => {
                navigate("/forgot-password");
              }}
            >
              Forgot password ?
            </Button>
            <Button
              variant="contained"
              sx={{
                color: colors.grey[100],
                backgroundColor: colors.greenAccent[600],
                width: "100%",
                fontWeight: "bold",
                "&:hover ": { backgroundColor: colors.greenAccent[400] },
              }}
              onClick={handleLogin}
            >
              Login
            </Button>
          </Box>
        </Box>
        <Box mt="10px">
          <Typography variant="h5" sx={{ color: colors.grey[100] }}>
            use email :
            <span style={{ color: colors.greenAccent[400] }}>
              dashboard@test.com
            </span>
          </Typography>
          <Typography variant="h5" sx={{ color: colors.grey[100], mb: "24px" }}>
            use password :
            <span style={{ color: colors.greenAccent[400] }}>Dashboard&07</span>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
