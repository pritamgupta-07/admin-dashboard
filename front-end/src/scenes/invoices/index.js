import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useState, useEffect, useCallback, useMemo } from "react";
import axios from "axios";
import Loader from "../../components/Loader";
import useAuthCredentials from "../../auth/auth";

const Invoices = () => {
  // theme setup
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const {token} = useAuthCredentials()

  const [isLoading, setIsLoading] = useState(true);
  const [invoices, setInvoices] = useState([]);

  const headers = useMemo(()=>({
    Authorization: token,
    "Content-Type": "application/json",
  }),[token])

  
  // handling invoice api
  const handleGetInvoices = useCallback(async()=> {
    try {
      const invoiceData = await axios.get(`${window.env.API_URL}/invoices`,{headers});
      // updating data
      setInvoices(invoiceData.data);
      setIsLoading(false);
    } catch (error) {
      // handling error that occur during request
      console.error(error);
    }
  },[headers])

  // updating invoice component
  useEffect(() => {
    handleGetInvoices();
  }, [handleGetInvoices]);

  // invoice columns setup
  const columns = [
    { field: "_id", headerName: "ID" },
    { field: "name", headerName: "Name", flex: 1 },
    { field: "phone", headerName: "Phone-Number", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    {
      field: "cost",
      headerName: "Cost",
      flex: 1,
      renderCell: (params) => (
        <Typography color={colors.greenAccent[500]}>
          ${params.row.cost}
        </Typography>
      ),
    },
    { field: "date", headerName: "Date", flex: 1 },
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
          {/* invoice data-grid box */}
          <Box
            m="40px 0 0 0"
            height="65vh"
            sx={{
              "& .MuiDataGrid-columnHeadersInner, .MuiDataGrid-footerContainer , .css-oplm4p .MuiDataGrid-columnSeparator , MuiDataGrid-columnSeparator":
                {
                  backgroundColor: colors.blueAccent[700],
                  color: colors.grey[100],
                },
              "& .MuiCheckbox-root , .css-b4z7w1-MuiButtonBase-root-MuiCheckbox-root.Mui-checked":
                {
                  color: `${colors.greenAccent[500]} !important`,
                },
              "& .MuiDataGrid-root": {
                border: "none",
              },
            }}
          >
            {/* data grid  */}
            <DataGrid
              rows={invoices}
              columns={columns}
              getRowId={(row) => row._id}
            />
          </Box>
        </Box>
      )}
    </>
  );
};

export default Invoices;
