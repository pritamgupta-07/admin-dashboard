import {
  Box,
  TextField,
  useTheme,
  Button,
  Typography,
  Icon,
} from "@mui/material";
import MarkEmailReadIcon from "@mui/icons-material/MarkEmailRead";
import { useState } from "react";
import { tokens } from "../theme";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const ForgotPassword = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [isEmailSent, setIsEmailSent] = useState(false);

  const handleForgotPassword = async () => {
    try {
      if (emailRegex.test(email)) {
        const response = await toast.promise(
          axios.post(`${window.env.API_URL}/forgot-password`, { email }),
          {
            pending: "Sending an Email...",
          }
        );

        if (response.data.status === "Incorrect email") {
          toast.error(response.data.msg);
        } else {
          toast.success(response.data.msg);
          setIsEmailSent(true);
        }
      } else {
        toast.error("Enter valid Email");
      }
    } catch (error) {
      toast.error("something wrong. Please try again later");
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
          height: "15rem",
          width: "25rem",
          borderRadius: "6px",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            color: colors.greenAccent[400],
            fontSize: "24px",
            fontWeight: "bold",
            mb: "2rem",
          }}
        >
          Forgot Password
        </Typography>

        {isEmailSent ? (
          <Box>
            <Box display="flex" alignItems="center" justifyContent="center">
              <Typography
                variant="h4"
                sx={{ color: colors.greenAccent[400], mr: "10px" }}
              >
                Check your Email Inbox
              </Typography>
              <Icon>
                <MarkEmailReadIcon sx={{ color: colors.greenAccent[400] }} />
              </Icon>
            </Box>

            <Button
              variant="contained"
              sx={{
                width: "100%",
                mt: "16px",
                backgroundColor: colors.blueAccent[600],
                color: colors.grey[100],
                ":hover": { backgroundColor: colors.blueAccent[400] },
              }}
              onClick={() => {
                navigate("/login");
              }}
            >
              go to login page
            </Button>
          </Box>
        ) : (
          <>
            <Box sx={{ width: "20rem" }} id="login">
              <TextField
                fullWidth
                autoFocus
                id="email"
                label="Enter your Email Address"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                sx={{ mb: "24px" }}
                InputLabelProps={{ style: { color: colors.grey[100] } }}
              />
            </Box>
            <Box>
              <Button
                variant="text"
                sx={{
                  color: colors.grey[100],
                  ":hover": { opacity: 0.8 },
                  fontWeight: "bold",
                  mr: "8rem",
                }}
                onClick={() => navigate("/login")}
              >
                back to login
              </Button>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: colors.blueAccent[600],
                  color: colors.grey[100],
                  ":hover": { backgroundColor: colors.blueAccent[400] },
                  fontWeight: "bold",
                }}
                onClick={handleForgotPassword}
                disabled={email.length < 6}
              >
                send email
              </Button>
            </Box>
          </>
        )}
      </Box>
    </Box>
  );
};

export default ForgotPassword;
