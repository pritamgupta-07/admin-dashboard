import {
  Box,
  Button,
  Typography,
  useTheme,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "../../components/Header";
import { useCallback, useEffect, useMemo, useState } from "react";
import axios from "axios";
import Loader from "../../components/Loader";
import UserForm from "../../components/UserForm";
import useAuthCredentials from "../../auth/auth";
import { toast } from "react-toastify";

const Team = () => {
  // theme setup
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { token, access, id } = useAuthCredentials();

  const [teamData, setTeamData] = useState([]);
  const [selectedTeamProfile, setSelectedTeamProfile] = useState({});
  const [isOwnProfileSelected, setIsOwnProfileSelected] = useState(false);
  const [isTeamFormOpen, setIsTeamFormOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const headers = useMemo(
    () => ({
      Authorization: token,
      "Content-Type": "multipart/form-data",
    }),
    [token]
  );

  // handling team api
  const getTeamData = useCallback(async () => {
    try {
      const teamResult = await axios.get(
        `${window.env.API_URL}/team/${access}`,
        {
          headers,
        }
      );

      // updating data
      setTeamData(teamResult.data);
      setIsLoading(false);
    } catch (error) {
      // handling errors that occur during api request
      console.error(error);
    }
  }, [headers, access]);

  useEffect(() => {
    getTeamData();
  }, [getTeamData]);

  const handleDeleteTeamProfile = async () => {
    try {
      if (access === "admin") {
        await toast.promise(
          axios.delete(
            `${window.env.API_URL}/team/${access}/delete/${selectedTeamProfile._id}`,
            {
              headers,
            }
          ),
          {
            pending: "Deleting...",
            success: "Deleted successfully",
            error: "failed! please try again later",
          }
        );
        getTeamData();
        setIsDialogOpen(false);
      } else {
        toast.info("Access denied");
        setIsDialogOpen(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // creating columns for data grid
  const columns = [
    { field: "_id", headerName: "ID", flex: 1 },
    { field: "name", headerName: "Name", flex: 1 },
    {
      field: "age",
      headerName: "Age",
      type: "number",
      align: "left",
      headerAlign: "left",
    },
    { field: "contact", headerName: "Phone-Number", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    {
      field: "access",
      headerName: "Access-Level",
      flex: 1,
      renderCell: ({ row }) => {
        return (
          <Box
            m="0 auto"
            p="5px"
            sx={{
              backgroundColor:
                row.access === "admin"
                  ? colors.greenAccent[600]
                  : colors.greenAccent[700],
              width: "60%",
              justifyContent: "flex-start",
              display: "flex",
              color: colors.grey[100],
            }}
          >
            {row.access === "admin" && <AdminPanelSettingsOutlinedIcon />}
            {row.access === "manager" && <SecurityOutlinedIcon />}
            {row.access === "user" && <LockOpenOutlinedIcon />}
            <Typography ml="5px">{row.access}</Typography>
          </Box>
        );
      },
    },
  ];

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <Box m="20px">
          {/* header component */}
          <Header title="TEAM" subtitle="Managing the Team Members" />

          {/* update & delete options dialog */}
          <Dialog
            open={isDialogOpen}
            fullWidth
            onClose={() => {
              setIsDialogOpen(false);
            }}
            id="update-dialog"
          >
            <DialogTitle
              id="team"
              variant="h4"
              sx={{
                backgroundColor: colors.primary[400],
                color: colors.greenAccent[400],
                fontWeight: "bold",
              }}
            >
              MANAGE TEAM DETAILS
            </DialogTitle>

            <DialogContent sx={{ backgroundColor: colors.primary[400] }}>
              {isTeamFormOpen ? (
                <>
                  <Header
                    title="Update details"
                    subtitle="update user profile "
                  />
                  <UserForm
                    isTeamUpdate={true}
                    prevValue={selectedTeamProfile}
                    setIsDialogOpen={setIsDialogOpen}
                    setIsTeamFormOpen={setIsTeamFormOpen}
                    getTeamData={getTeamData}
                  />
                </>
              ) : (
                <DialogContentText
                  variant="h5"
                  sx={{ color: colors.grey[100], mb: "30px" }}
                >
                  please select one of the following options.
                </DialogContentText>
              )}
              {!isTeamFormOpen && (
                <DialogActions
                  sx={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Box>
                    <Button
                      variant="text"
                      onClick={handleDeleteTeamProfile}
                      sx={{
                        color: "#e11515",
                        border: "1px solid #e11515",
                        ":hover": {
                          color: colors.grey[100],
                          backgroundColor: "#e11515",
                        },
                      }}
                    >
                      Delete
                    </Button>
                  </Box>

                  <Box>
                    <Button
                      variant="text"
                      onClick={() => {
                        setIsDialogOpen(false);
                        setIsTeamFormOpen(false);
                      }}
                      sx={{
                        mr: "12px",
                        color: colors.grey[100],
                        ":hover": {
                          opacity: 0.8,
                        },
                      }}
                    >
                      cancel
                    </Button>
                    <Button
                      variant="contained"
                      onClick={() => {
                        setIsTeamFormOpen(true);
                      }}
                      sx={{
                        color: colors.grey[100],
                        backgroundColor: colors.greenAccent[600],
                        ":hover": { backgroundColor: colors.greenAccent[400] },
                      }}
                    >
                      Update
                    </Button>
                  </Box>
                </DialogActions>
              )}
            </DialogContent>
          </Dialog>

          {/* Own Profile selected Dialog */}

          <Dialog
            open={isOwnProfileSelected}
            onClose={() => {
              setIsOwnProfileSelected(false);
            }}
            id="own-profile-selected"
          >
            <DialogContent sx={{ backgroundColor: colors.primary[400] }}>
              <DialogTitle
                sx={{ color: colors.greenAccent[400], fontWeight: "bold" }}
              >
                Are you sure you want to customize your own profile ?
              </DialogTitle>

              <DialogActions>
                <Button
                  variant="text"
                  sx={{ color: colors.grey[100], ":hover": { opacity: 0.8 } }}
                  onClick={() => {
                    setIsOwnProfileSelected(false);
                  }}
                >
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  sx={{
                    color: colors.grey[100],
                    fontWeight: "bold",
                    backgroundColor: colors.greenAccent[600],
                    ":hover": { backgroundColor: colors.greenAccent[400] },
                  }}
                  onClick={() => {
                    setIsDialogOpen(true);
                    setIsOwnProfileSelected(false);
                  }}
                >
                  yes
                </Button>
              </DialogActions>
            </DialogContent>
          </Dialog>

          {/* team data grid component */}
          <Box
            m="40px 0 0 0"
            height="65vh"
            sx={{
              "& .MuiDataGrid-columnHeadersInner, .MuiDataGrid-footerContainer , .css-oplm4p .MuiDataGrid-columnSeparator , MuiDataGrid-columnSeparator":
                {
                  backgroundColor: colors.blueAccent[700],
                  color: colors.grey[100],
                },
              "& .MuiDataGrid-root": {
                border: "none",
              },
            }}
          >
            {/* data grid  */}
            <DataGrid
              getRowId={(row) => row._id}
              rows={teamData}
              columns={columns}
              onRowClick={
                access === "admin"
                  ? (data) => {
                      setSelectedTeamProfile(data.row);

                      if (data.row._id === id) {
                        setIsOwnProfileSelected(true);
                      } else {
                        setIsDialogOpen(true);
                      }
                    }
                  : undefined
              }
            />
          </Box>
        </Box>
      )}
    </>
  );
};

export default Team;
