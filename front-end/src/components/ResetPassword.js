import { Box, TextField, Button, useTheme, Typography } from "@mui/material";
import { tokens } from "../theme";
import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const passwordRegex =
  /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[#@$!%*?&])[A-Za-z\d@#$!%*?&]{8,}$/;
const validateMessage =
  "Please enter strong password at least 8 characters long and contains at least one uppercase , one lowercase , one digit and one special character ";

const ResetPassword = ({ isChangePassword = false }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const { id, token } = useParams(["id", "token"]);
  const navigate = useNavigate();

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const validatePassword = passwordRegex.test(newPassword);

  const handleResetPassword = async () => {
    try {
      if (newPassword === confirmPassword) {
        const response = await toast.promise(
          axios.post(
            `${window.env.API_URL}/forgot-password/reset/${id}/${token}`,
            { newPassword }
          ),
          { pending: "Updating password..." }
        );

        if (response.data.status === "invalid") {
          toast.error(response.data.msg);
        } else {
          toast.success(response.data.msg);
          if(isChangePassword){
            navigate("/settings") 
          }else{
            navigate("/login") 
          }      
        }
      } else {
        toast.error("Confirm password did not match");
      }
    } catch (error) {
      console.error(error);
      toast.error("somehting wrong. Please try again later");
    }
  };

  return (
    <Box
      sx={isChangePassword ? { mt: "5rem" } : { width: "100%", height: "100%" }}
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
          height: "20rem",
          width: "25rem",
          borderRadius: "6px",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            color: colors.greenAccent[400],
            fontWeight: "bold",
            fontSize: "24px",
            mb: "2rem",
          }}
        >
          Reset Password
        </Typography>
        <Box sx={{ width: "20rem" }} id="login">
          <TextField
            fullWidth
            autoFocus
            id="password"
            label="New Password"
            value={newPassword}
            error={!validatePassword && newPassword.length > 0}
            helperText={
              !validatePassword && newPassword.length > 1 ? validateMessage : ""
            }
            onChange={(e) => {
              setNewPassword(e.target.value);
            }}
            sx={{ mb: "24px" }}
            InputLabelProps={{ style: { color: colors.grey[100] } }}
          />
          <TextField
            fullWidth
            type="password"
            id="confirm-password"
            label="Confirm Password"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
            }}
            sx={{ mb: "24px" }}
            InputLabelProps={{ style: { color: colors.grey[100] } }}
          />
        </Box>
        <Box>
          <Button
            variant="contained"
            sx={{
              backgroundColor: colors.greenAccent[600],
              color: colors.grey[100],
              ":hover": { backgroundColor: colors.greenAccent[400] },
            }}
            disabled={newPassword.length <= 8}
            onClick={handleResetPassword}
          >
            Reset Password
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default ResetPassword;
