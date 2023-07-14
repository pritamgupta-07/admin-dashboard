import Header from "../../components/Header";
import {
  Box,
  Button,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { tokens } from "../../theme";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import EmailIcon from "@mui/icons-material/Email";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import TrafficIcon from "@mui/icons-material/Traffic";
import BarChart from "../../components/BarChart";
import LineChart from "../../components/LineChart";
import GeographyChart from "../../components/GeographyChart";
import StatBox from "../../components/StatBox";
import ProgressCircle from "../../components/ProgressCirlcle";
import { useCallback, useEffect, useMemo, useState } from "react";
import axios from "axios";
import Loader from "../../components/Loader.js";
import useAuthCredentials from "../../auth/auth";
import { CSVLink } from "react-csv";

const Dashboard = () => {
  // theme setup
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isMobile = useMediaQuery("(max-width: 600px)");
  const isTablet = useMediaQuery("(max-width: 960px)");
  const { token } = useAuthCredentials();

  const [isLoading, setIsLoading] = useState(true);
  const [transactions, setTransactions] = useState([]);
  const [dashboardData, setDashboardData] = useState([
    {
      sendEmail: {},
      newClients: {},
      totalSales: {},
      totalTraffic: {},
      campaignCost: {},
      generatedRevenue: "",
    },
  ]);

  const {
    sendEmail,
    newClients,
    totalSales,
    totalTraffic,
    campaignCost,
    generatedRevenue,
  } = dashboardData[0];

  const csvHeaders = [
    { label: "Emails send", key: "sendEmail.title" },
    { label: "New Clients", key: "newClients.title" },
    { label: "Total sales", key: "totalSales.title" },
    { label: "Total Traffic", key: "totalTraffic.title" },
    { label: "Campaign Cost", key: "campaignCost.cost" },
    { label: "Generated Revenue", key: "generatedRevenue" },
  ];

  const headers = useMemo(
    () => ({
      Authorization: token,
      "Content-Type": "application/json",
    }),
    [token]
  );

  // handling dashboard data request
  const handleDashboardData = useCallback(async () => {
    try {
      const { data } = await axios.get(`${window.env.API_URL}/dashboard`, {
        headers,
      });

      // updating data
      setDashboardData([
        {
          sendEmail: data[0].sendEmail,
          newClients: data[0].newClients,
          totalSales: data[0].totalSales,
          totalTraffic: data[0].totalTraffic,
          campaignCost: data[0].campaignCost,
          generatedRevenue: data[0].generatedRevenue,
        },
      ]);
      // disabling loader
      setIsLoading(false);
    } catch (error) {
      // handling errors that occur during request
      console.error(error);
    }
  }, [headers]);

  // handling transaction data request
  const handleTransactionData = useCallback(async () => {
    try {
      const response = await axios.get(`${window.env.API_URL}/transactions`, {
        headers,
      });
      // updating data
      setTransactions(response.data);
    } catch (error) {
      // handling errors that occur during request
      console.error(error);
    }
  }, [headers]);

  // updating dashboard component
  useEffect(() => {
    handleDashboardData();

    handleTransactionData();
  }, [handleDashboardData, handleTransactionData]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <Box m="20px">
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />

            <Box>
              <CSVLink
                data={dashboardData}
                headers={csvHeaders}
                filename="dashboard-report.csv"
                style={{ textDecoration: "none" }}
              >
                <Button
                  sx={{
                    backgroundColor: colors.blueAccent[700],
                    color: colors.grey[100],
                    fontSize: "14px",
                    fontWeight: "bold",
                    padding: "10px 20px",
                  }}
                >
                  <DownloadOutlinedIcon sx={{ mr: "10px" }} />
                  Download Reports
                </Button>
              </CSVLink>
            </Box>
          </Box>

          {/* Grid Mapping  */}

          <Box
            display="grid"
            gridTemplateColumns="repeat(12,1fr)"
            gridAutoRows="7.5rem"
            gap="15px"
          >
            {/* /* Grid Row 1st  */}
            <Box
              gridColumn={isMobile ? "span 12" : isTablet ? "span 6" : "span 3"}
              backgroundColor={colors.primary[400]}
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              {/* Emails send Block */}
              <StatBox
                title={sendEmail.title}
                subtitle="Emails Send"
                progress={sendEmail.progress}
                increase={`+${sendEmail.increase}`}
                icon={
                  <EmailIcon
                    sx={{ color: colors.greenAccent[600], fontSize: "24px" }}
                  />
                }
              />
            </Box>
            <Box
              gridColumn={isMobile ? "span 12" : isTablet ? "span 6" : "span 3"}
              backgroundColor={colors.primary[400]}
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              {/* Total traffic block */}
              <StatBox
                title={totalSales.title}
                subtitle="Total Sales"
                progress={totalSales.progress}
                increase={`+${totalSales.increase}`}
                icon={
                  <PointOfSaleIcon
                    sx={{ color: colors.greenAccent[600], fontSize: "24px" }}
                  />
                }
              />
            </Box>
            <Box
              gridColumn={isMobile ? "span 12" : isTablet ? "span 6" : "span 3"}
              backgroundColor={colors.primary[400]}
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              {/* New clients block */}
              <StatBox
                title={newClients.title}
                subtitle="New Clients"
                progress={newClients.progress}
                increase={`+${newClients.increase}`}
                icon={
                  <PersonAddIcon
                    sx={{ color: colors.greenAccent[600], fontSize: "24px" }}
                  />
                }
              />
            </Box>
            <Box
              gridColumn={isMobile ? "span 12" : isTablet ? "span 6" : "span 3"}
              backgroundColor={colors.primary[400]}
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              {/* Total Traffic block */}
              <StatBox
                title={totalTraffic.title}
                subtitle="Total Traffic"
                progress={totalTraffic.progress}
                increase={`+${totalTraffic.increase}`}
                icon={
                  <TrafficIcon
                    sx={{ color: colors.greenAccent[600], fontSize: "24px" }}
                  />
                }
              />
            </Box>

            {/* Grid Row 2nd */}

            <Box
              gridColumn={
                isMobile ? "span 12" : isTablet ? "span 12" : "span 8"
              }
              gridRow="span 2"
              backgroundColor={colors.primary[400]}
            >
              {/* Revenue Line chart block */}
              <Box
                mt="25px"
                p="0 30px"
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Box>
                  <Typography
                    variant="h5"
                    fontWeight="600"
                    color={colors.grey[100]}
                  >
                    Revenue Generated
                  </Typography>
                  <Typography
                    variant="h3"
                    fontWeight="bold"
                    color={colors.greenAccent[500]}
                  >
                    ${generatedRevenue}
                  </Typography>
                </Box>
              </Box>
              <Box height="180px" mt="-20px">
                <LineChart isDashboard={true} />
              </Box>
            </Box>
            {/* Transaction */}

            <Box
              gridColumn={isMobile ? "span 12" : isTablet ? "span 6" : "span 4"}
              gridRow=" span 2"
              backgroundColor={colors.primary[400]}
              overflow="auto"
            >
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                borderBottom={`4px solid ${colors.primary[500]}`}
                color={colors.grey[100]}
                p="15px"
              >
                <Typography
                  color={colors.grey[100]}
                  variant="h5"
                  fontWeight="600"
                >
                  Recent Transactions
                </Typography>
              </Box>
              {/* transaction table */}
              {transactions &&
                transactions.map((transaction) => (
                  <Box
                    key={`${transaction._id}`}
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    borderBottom={`4px solid ${colors.primary[500]}`}
                    p="15px"
                  >
                    <Box>
                      <Typography
                        color={colors.greenAccent[500]}
                        variant="h5"
                        fontWeight="600"
                      >
                        {transaction.txId}
                      </Typography>
                      <Typography color={colors.grey[100]}>
                        {transaction.user}
                      </Typography>
                    </Box>
                    <Box color={colors.grey[100]}>{transaction.date}</Box>
                    <Box
                      backgroundColor={colors.greenAccent[500]}
                      p="5px 10px"
                      borderRadius="4px"
                    >
                      ${transaction.cost}
                    </Box>
                  </Box>
                ))}
            </Box>

            {/* Grid Row 3rd */}

            <Box
              gridColumn={isMobile ? "span 12" : isTablet ? "span 6" : "span 4"}
              gridRow="span 2"
              backgroundColor={colors.primary[400]}
              p="10px 30px"
            >
              {/* Campaign block */}
              <Typography variant="h5" fontWeight="600">
                Campaign
              </Typography>
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                mt="10px"
              >
                {/* Pie chart */}
                <ProgressCircle progress={campaignCost.progress} size="100" />
                <Typography
                  variant="h5"
                  color={colors.greenAccent[500]}
                  sx={{ mt: "15px" }}
                >
                  ${campaignCost.cost}revenue generated
                </Typography>
                <Typography>Includes extra expenditures and cost</Typography>
              </Box>
            </Box>

            {/* Bar chart Block */}

            <Box
              gridColumn={isMobile ? "span 12" : isTablet ? "span 6" : "span 4"}
              gridRow="span 2"
              backgroundColor={colors.primary[400]}
            >
              <Typography variant="h5" fontWeight="600" sx={{ p: "10px 30px" }}>
                Sales Quantity
              </Typography>
              <Box height="220px" mt="-25px">
                <BarChart isDashboard={true} />
              </Box>
            </Box>

            {/* Geography chart block */}

            <Box
              gridColumn={isMobile ? "span 12" : isTablet ? "span 6" : "span 4"}
              gridRow="span 2"
              backgroundColor={colors.primary[400]}
              p="10px 30px"
            >
              <Typography variant="h5" fontWeight="600" sx={{ mb: "15px" }}>
                Geography Based Traffic
              </Typography>
              <Box height="160px">
                <GeographyChart isDashboard={true} />
              </Box>
            </Box>

            {/* End of Grid */}
          </Box>
        </Box>
      )}
    </>
  );
};

export default Dashboard;
