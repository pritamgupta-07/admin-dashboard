import { Box, useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useState, useEffect, useCallback, useMemo } from "react";
import axios from "axios";
import Loader from "../../components/Loader";
import useAuthCredentials from "../../auth/auth";

const Contacts = () => {
  // theme setup
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const {token} = useAuthCredentials()

  const [contacts, setContacts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const headers = useMemo(()=>({
    Authorization: token,
    "Content-Type": "application/json",
  }),[token])

  // handling contacts api
  const handleGetContacts = useCallback(async ()=> {
    try {
      const contactResult = await axios.get(`${window.env.API_URL}/contacts`,{headers});
      // updating data
      setContacts(contactResult.data);
      setIsLoading(false);
    } catch (error) {
      // handling errors that occur during api request
      console.error(error);
    }
  },[headers])
  
  // updating components
  useEffect(() => {
    handleGetContacts();
  }, [handleGetContacts]);

  // data-grid columns setup
  const columns = [
    { field: "_id", headerName: "ID", flex: 0.5 },
    { field: "registrarId", headerName: "Registrar ID" },
    { field: "name", headerName: "Name", flex: 1 },
    {
      field: "age",
      headerName: "Age",
      type: "number",
      align: "left",
      headerAlign: "left",
    },
    { field: "phone", headerName: "Phone-Number", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "address", headerName: "Address", flex: 1 },
    { field: "city", headerName: "City", flex: 1 },
    { field: "zipCode", headerName: "ZipCode", flex: 1 },
  ];

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <Box m="20px">
          {/* header component */}

          <Header
            title="CONTACTS"
            subtitle="List of Contacts for future Reference"
          />

          {/* contacts data-grid box */}
          <Box
            m="40px 0 0 0"
            height="65vh"
            sx={{
              "& .MuiDataGrid-columnHeadersInner, .MuiDataGrid-footerContainer , .css-oplm4p .MuiDataGrid-columnSeparator , MuiDataGrid-columnSeparator":
                {
                  backgroundColor: colors.blueAccent[700],
                  color: colors.grey[100],
                },
              "& .MuiDataGrid-toolbarContainer button": {
                color: colors.grey[100],
              },
              "& .MuiDataGrid-root": {
                border: "none",
              },
            }}
          >
            {/* data-grid */}
            <DataGrid
              rows={contacts}
              columns={columns}
              getRowId={(row) => row._id}
              components={{ Toolbar: GridToolbar }}
            />
          </Box>
        </Box>
      )}
    </>
  );
};

export default Contacts;
