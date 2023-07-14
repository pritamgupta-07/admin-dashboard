import {
  Box,
  Typography,
  useTheme,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Input,
  useMediaQuery,
} from "@mui/material";
import Header from "./Header";
import useAuthCredentials from "../auth/auth";
import { tokens } from "../theme";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useContext } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { toast } from "react-toastify";
import { globalContext } from "../context/GlobalContext";

const Profile = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const isTablet = useMediaQuery("(max-width: 960px)");
  const { name, email, age, access, token, id } = useAuthCredentials();

  const [selectedImage, setSelectedImage] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isUpload, setIsUpload] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const { avatarData, setAvatarData } = useContext(globalContext);

  const userDetailStyle = {
    color: colors.greenAccent[400],
  };

  const headers = {
    Authorization: token,
    "Content-Type": "multipart/form-data",
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
  };

  // handle Image Upload
  const handleImageUpload = async () => {
    // if image file not selected
    if (!selectedImage) {
      toast.warning("No image selected.");
      return;
    }

    const formData = new FormData();
    formData.append("image", selectedImage);

    try {
      const response = await toast.promise(
        axios.post(
          `${window.env.API_URL}/avatar/upload/${id}`,
          formData,
          {
            headers,
          }
        ),
        {
          pending: "Uploading...",
          success: "Uploaded successfully",
          error: "failed! please try again later",
        }
      );

      if (response.data.avatarUrl) {
        setAvatarData({
          url: response.data.avatarUrl,
          publicId: response.data.publicId,
        });
        // reset values
        setIsUpload(false);
        setIsDialogOpen(false);
      }
    } catch (error) {
      console.error(error);
      setIsDialogOpen(false);
    }
  };

  // handle Image Updation
  const handleImageUpdate = async () => {
    if (!selectedImage) {
      toast.warning("No image selected.");
      return;
    }

    const formData = new FormData();
    formData.append("image", selectedImage);
    try {
      const response = await toast.promise(
        axios.put(
          `${window.env.API_URL}/avatar/update/${avatarData.publicId}`,
          formData,
          {
            headers,
          }
        ),
        {
          pending: "Updating...",
          success: "Updated successfully",
          error: "failed! please try again later",
        }
      );

      // setting response values
      if (response.data.avatar) {
        setAvatarData({
          url: response.data.avatar.avatarUrl,
          publicId: response.data.avatar.publicId,
        });

        // reset values
        setIsDialogOpen(false);
      }
    } catch (error) {
      console.error(error);
      setIsDialogOpen(false);
    }
  };

  // handle image deletion
  const handleImageDelete = async () => {
    try {
      await toast.promise(
        axios.delete(
          `${window.env.API_URL}/avatar/delete/${avatarData.publicId}`,
          {
            headers,
          }
        ),
        {
          pending: "Deleting...",
          success: "Deleted Successfully",
          error: "failed! please try again later",
        }
      );

      setAvatarData({ url: "", publicId: "" });
      // reset values
      setIsDelete(false);
      setIsDialogOpen(false);
    } catch (error) {
      console.error(error);
      // reset values
      setIsDelete(false);
      setIsDialogOpen(false);
    }
  };

  // handle logout
  const handleLogout = () => {
    const keysToRemove = ["user", "token"];

    keysToRemove.forEach((key) => {
      localStorage.removeItem(key);
    });
    // navigating user to login page
    navigate("/login");
  };

  return (
    <Box m="20px">
      <Header title="Profile" subtitle="user profile" />

      <Box
        width="100%"
        display="flex"
        justifyContent="flex-start"
        alignItems="center"
        flexDirection={isTablet ? "column" : "row"}
      >
        {/* Profile Photo upload */}
        <Box
          justifyContent="center"
          alignItems="center"
          display="flex"
          flexDirection="column"
          width="40%"
          sx={{ mb: isTablet ? "4rem" : "", ml: isTablet ? "" : "4rem" }}
        >
          {avatarData.url ? (
            <img
              alt="avatar"
              src={avatarData.url}
              style={{
                borderRadius: "50%",
                height: isTablet ? "100px" : "15rem",
                width: isTablet ? "100px" : "15rem",
                border: `4px solid ${colors.greenAccent[400]}`,
                objectFit: "cover",
                marginBottom: "16px",
              }}
            />
          ) : (
            <AccountCircleIcon
              sx={{
                height: isTablet ? "100%" : "15rem",
                width: isTablet ? "100%" : "15rem",
                marginBottom: "16px",
              }}
            />
          )}

          {/* User Name && Access */}

          <Typography
            variant={isTablet ? "h6" : "h3"}
            sx={{ textTransform: "uppercase" }}
          >
            {" "}
            {name ? name : undefined}
          </Typography>

          <Typography
            variant={isTablet ? "h6" : "h4"}
            sx={{ textTransform: "capitalize", color: colors.greenAccent[400] }}
          >
            {" "}
            {access ? access : undefined}
          </Typography>

          {!avatarData.url ? (
            //  if Image does not exist
            <Button
              variant="outlined"
              sx={{
                color: colors.grey[100],
                borderColor: colors.greenAccent[400],
                ":hover": { backgroundColor: colors.greenAccent[600] },
                mt: "16px",
                fontSize: isTablet ? "8px" : "",
              }}
              onClick={() => {
                setIsUpload(true);
                setIsDialogOpen(true);
              }}
            >
              upload image
            </Button>
          ) : (
            //  if image exist
            <Box display="flex" justifyContent="center" alignItems="center">
              <Button
                variant="outlined"
                sx={{
                  color: colors.grey[100],
                  borderColor: "red",
                  ":hover": { color: "red" },
                  m: "16px 16px 0 0",
                }}
                onClick={() => {
                  setIsDelete(true);
                  setIsDialogOpen(true);
                }}
              >
                delete
              </Button>

              <Button
                variant="contained"
                sx={{
                  color: colors.grey[100],
                  backgroundColor: colors.greenAccent[600],
                  ":hover": { backgroundColor: colors.greenAccent[400] },
                  mt: "16px",
                }}
                onClick={() => {
                  setIsDialogOpen(true);
                }}
              >
                update
              </Button>
            </Box>
          )}
        </Box>

        {/* Image Upload Dialog */}
        <Dialog
          open={isDialogOpen}
          onClose={() => {
            setIsDialogOpen(false);
          }}
        >
          <DialogContent sx={{ backgroundColor: colors.primary[400] }}>
            <DialogTitle>
              {isDelete ? "Are you sure you want to delete?" : "Upload Image"}
            </DialogTitle>

            {isDelete ? (
              ""
            ) : (
              <Input
                type="file"
                accept="image/*"
                id="avatar"
                onChange={handleImageChange}
                sx={{
                  color: colors.grey[100],
                }}
              />
            )}

            <DialogActions>
              <Button
                variant="text"
                onClick={() => {
                  setIsDialogOpen(false);
                  setIsDelete(false);
                }}
                sx={{
                  color: colors.grey[100],
                  ":hover": { color: colors.greenAccent[600] },
                }}
              >
                Cancel
              </Button>

              {/* conditional button rendering */}

              {isUpload ? (
                // image upload button
                <Button
                  variant="contained"
                  onClick={handleImageUpload}
                  sx={{
                    color: colors.grey[100],
                    backgroundColor: colors.greenAccent[600],
                    ":hover": { backgroundColor: colors.greenAccent[400] },
                  }}
                >
                  Upload
                </Button>
              ) : isDelete ? (
                // image delete button
                <Button
                  variant="contained"
                  onClick={handleImageDelete}
                  sx={{
                    color: colors.grey[100],
                    backgroundColor: "#e11515",
                    ":hover": { backgroundColor: "#b70606" },
                  }}
                >
                  Delete
                </Button>
              ) : (
                // image update button
                <Button
                  variant="contained"
                  onClick={handleImageUpdate}
                  sx={{
                    color: colors.grey[100],
                    backgroundColor: colors.greenAccent[600],
                    ":hover": { backgroundColor: colors.greenAccent[400] },
                  }}
                >
                  Update
                </Button>
              )}
            </DialogActions>
          </DialogContent>
        </Dialog>

        {/* User Details */}

        <Box>
          <Typography variant="h4" sx={{ mb: "16px" }}>
            <span style={userDetailStyle}> Name </span> :{" "}
            {name ? name : undefined}
          </Typography>

          <Typography variant="h5" sx={{ mb: "16px" }}>
            <span style={userDetailStyle}> Email </span> :{" "}
            {email ? email : undefined}
          </Typography>

          <Typography variant="h5" sx={{ mb: "16px" }}>
            <span style={userDetailStyle}> Age </span> : {age ? age : undefined}
          </Typography>

          <Typography variant="h5" sx={{ mb: "16px" }}>
            <span style={userDetailStyle}> Access </span> :{" "}
            {access ? access : undefined}
          </Typography>

          {/* Logout && settings button */}

          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            mb="20px"
          >
            <Button
              onClick={handleLogout}
              variant="outlined"
              sx={{
                color: colors.grey[100],
                borderColor: "#e11515",
                ":hover": { backgroundColor: "#b70606" },
                mr: "16px",
              }}
            >
              logout
            </Button>
            <Link to="/settings" style={{ textDecoration: "none" }}>
              <Button
                variant="contained"
                sx={{
                  color: colors.grey[100],
                  backgroundColor: colors.greenAccent[600],
                  ":hover": { backgroundColor: colors.greenAccent[400] },
                }}
              >
                settings
              </Button>
            </Link>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Profile;
