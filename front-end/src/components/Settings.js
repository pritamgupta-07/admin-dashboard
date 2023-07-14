import {
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  useTheme,
} from "@mui/material";
import Header from "./Header";
import EditIcon from "@mui/icons-material/Edit";
import { tokens } from "../theme";
import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import useAuthCredentials from "../auth/auth";

const Settings = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { email } = useAuthCredentials();

  const [isChangePassword, setIsChangePassword] = useState(false);

  const handleChangePasswordEmail = async () => {
    try {
      await toast.promise(
        axios.post(`${window.env.API_URL}/forgot-password`, { email: email }),
        {
          pending: "Sending an Email...",
          success: `An email has been sent to ${email}`,
        }
      );

      setIsChangePassword(false);
    } catch (error) {
      toast.error("something wrong! Please try again later");
      setIsChangePassword(false);
      console.error(error);
    }
  };

  return (
    <Box m="20px">
      <Header title="Settings" subtitle="profile settings" />
      <Box>
        <Box>
          <Button
            variant="outlined"
            onClick={() => {
              setIsChangePassword(true);
            }}
            endIcon={<EditIcon />}
            sx={{
              color: colors.grey[100],
              borderColor: colors.greenAccent[400],
            }}
          >
            Change Password
          </Button>
        </Box>

        {/* Change Password dialog box */}
        <Dialog
          open={isChangePassword}
          onClose={() => {
            setIsChangePassword(false);
          }}
        >
          <DialogContent sx={{ backgroundColor: colors.primary[400] }}>
            <DialogTitle variant="h5">
              Are you sure you want to change password ?
            </DialogTitle>
            <DialogActions>
              <Button
                variant="text"
                sx={{
                  color: colors.grey[100],
                  ":hover": { opacity: 0.8 },
                  mr: "16px",
                }}
                onClick={() => {
                  setIsChangePassword(false);
                }}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                onClick={handleChangePasswordEmail}
                sx={{
                  color: colors.grey[100],
                  backgroundColor: colors.greenAccent[600],
                  ":hover": { backgroundColor: colors.greenAccent[400] },
                }}
              >
                send email
              </Button>
            </DialogActions>
          </DialogContent>
        </Dialog>
      </Box>
      <Typography variant='h5' sx={{color: colors.grey[100], mt: '2rem'}}>Other settings can be implemented here.</Typography>
    </Box>
  );
};

export default Settings;
