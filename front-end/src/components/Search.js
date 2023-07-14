import { Box, Typography, useTheme, Button } from "@mui/material";
import { useCallback, useContext, useEffect, useState } from "react";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import Header from "./Header";
import { DataGrid } from "@mui/x-data-grid";
import { globalContext } from "../context/GlobalContext";
import axios from "axios";
import useAuthCredentials from "../auth/auth";
import { useMemo } from "react";
import { tokens } from "../theme";

const Search = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { query } = useContext(globalContext);
  const { token } = useAuthCredentials();

  const [teamResults, setTeamResults] = useState([]);
  const [invoicesResults, setInvoicesResults] = useState([]);
  const [contactResults, setContactResults] = useState([]);
  const [showTeamResults, setShowTeamResults] = useState(true);
  const [showInvoicesResults, setShowInvoicesResults] = useState(false);
  const [showContactResults, setShowContactResults] = useState(false);

  const teamResultsLength = teamResults.length;
  const invoicesResultsLength = invoicesResults.length;
  const contactResultsLength = contactResults.length;

  const headers = useMemo(
    () => ({ Authorization: token, "Content-Type": "application/json" }),
    [token]
  );

  const handleSearchResults = useCallback(async () => {
    try {
      const teamSearch = await axios.get(
        `${window.env.API_URL}/search/team/${query}`,
        { headers }
      );
      const invoiceSearch = await axios.get(
        `${window.env.API_URL}/search/invoice/${query}`,
        { headers }
      );
      const contactSearch = await axios.get(
        `${window.env.API_URL}/search/contact/${query}`,
        { headers }
      );

      const teamSearchResults = teamSearch.data.teamSearchResult;
      const invoiceSearchResults = invoiceSearch.data.invoiceSearchResult;
      const contactSearchResults = contactSearch.data.contactSearchResult;

      teamSearchResults
        ? setTeamResults(teamSearchResults)
        : setTeamResults([]);

      invoiceSearchResults
        ? setInvoicesResults(invoiceSearchResults)
        : setInvoicesResults([]);

      contactSearchResults
        ? setContactResults(contactSearchResults)
        : setContactResults([]);
    } catch (error) {
      console.error(error);
    }
  }, [headers, query]);

  useEffect(() => {
    let queryInterval = null;

    if (query.length > 0) {
      queryInterval = setInterval(() => {
        handleSearchResults();
      }, 500);
    }

    return () => {
      clearInterval(queryInterval);
    };
  }, [query, handleSearchResults]);

  // columns for team
  const teamColumns = [
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
    { field: "access", headerName: "Access", flex: 1 },
  ];

  // columns for invoices
  const invoiceColumns = [
    { field: "_id", headerName: "ID" },
    { field: "name", headerName: "Name", flex: 1 },
    { field: "phone", headerName: "Phone-Number", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    {
      field: "cost",
      headerName: "Cost",
      flex: 1,
    },
    { field: "date", headerName: "Date", flex: 1 },
  ];

  // columns for contact
  const contactColumns = [
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
    <Box m="20px">
      <Header title="Search" subtitle="your search results" />
      <Box sx={{ m: "0 16px 16px 0", display: "flex" }}>
        {/* buttons for specific results */}
        <Button
          variant="contained"
          onClick={() => {
            setShowContactResults(false);
            setShowInvoicesResults(false);
            setShowTeamResults(!showTeamResults);
          }}
          disabled={teamResultsLength === 0}
          endIcon={
            showTeamResults ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />
          }
          sx={{
            color: colors.grey[100],
            backgroundColor: showTeamResults
              ? colors.greenAccent[600]
              : colors.blueAccent[500],
            ":hover": {
              backgroundColor: showTeamResults
                ? colors.greenAccent[500]
                : colors.blueAccent[600],
            },
          }}
        >
          team results ({teamResultsLength})
        </Button>
        <Button
          variant="contained"
          onClick={() => {
            setShowContactResults(false);
            setShowTeamResults(false);
            setShowInvoicesResults(!showInvoicesResults);
          }}
          disabled={invoicesResultsLength === 0}
          endIcon={
            showInvoicesResults ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />
          }
          sx={{
            color: colors.grey[100],
            backgroundColor: showInvoicesResults
              ? colors.greenAccent[600]
              : colors.blueAccent[500],
            ":hover": {
              backgroundColor: showInvoicesResults
                ? colors.greenAccent[500]
                : colors.blueAccent[600],
            },
            m: "0 16px 0 16px",
          }}
        >
          invoice results ({invoicesResultsLength})
        </Button>
        <Button
          variant="contained"
          onClick={() => {
            setShowInvoicesResults(false);
            setShowTeamResults(false);
            setShowContactResults(!showContactResults);
          }}
          disabled={contactResultsLength === 0}
          endIcon={
            showContactResults ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />
          }
          sx={{
            color: colors.grey[100],
            backgroundColor: showContactResults
              ? colors.greenAccent[600]
              : colors.blueAccent[500],
            ":hover": {
              backgroundColor: showContactResults
                ? colors.greenAccent[500]
                : colors.blueAccent[600],
            },
          }}
        >
          contact results ({contactResultsLength})
        </Button>
      </Box>

      {/* showing results in datagrid */}

      <Box>
        {showTeamResults && teamResultsLength > 0 && (
          <Box
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
            <Typography
              variant="h5"
              sx={{ mb: "16px", color: colors.greenAccent[400] }}
            >
              Team Search Results
            </Typography>
            <DataGrid
              getRowId={(row) => row._id}
              rows={teamResults}
              columns={teamColumns}
            />
          </Box>
        )}

        {showInvoicesResults && invoicesResultsLength > 0 && (
          <Box
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
            <Typography
              variant="h5"
              sx={{ mb: "16px", color: colors.greenAccent[400] }}
            >
              Invoices Search Results
            </Typography>
            <DataGrid
              getRowId={(row) => row._id}
              rows={invoicesResults}
              columns={invoiceColumns}
            />
          </Box>
        )}

        {showContactResults && contactResultsLength > 0 && (
          <Box
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
            <Typography
              variant="h5"
              sx={{ mb: "16px", color: colors.greenAccent[400] }}
            >
              Contact Search Results
            </Typography>
            <DataGrid
              getRowId={(row) => row._id}
              rows={contactResults}
              columns={contactColumns}
            />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Search;
