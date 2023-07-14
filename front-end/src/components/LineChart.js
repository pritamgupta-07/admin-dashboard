import { ResponsiveLine } from "@nivo/line";
import { useTheme, Box, useMediaQuery } from "@mui/material";
import { tokens } from "../theme";
import { useCallback, useEffect, useMemo, useState } from "react";
import axios from "axios";
import Loader from "./Loader";
import useAuthCredentials from "../auth/auth";

const Line = ({ isDashboard = false }) => {
  // theme setup
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isTablet = useMediaQuery("(max-width: 960px)");
  const { token } = useAuthCredentials();

  const [lineChartData, setLineChartData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const headers = useMemo(
    () => ({ "Content-Type": "application/json", Authorization: token }),
    [token]
  );

  // handling line chart request
  const handleGetLineChart = useCallback(async () => {
    try {
      const response = await axios.get(
        `${window.env.API_URL}/line-chart`,
        {
          headers,
        }
      );
      // updating data
      setLineChartData(response.data);
      setIsLoading(false);
    } catch (error) {
      // handling errors that occur during request
      console.error(error);
    }
  }, [headers]);

  // updating line chart component
  useEffect(() => {
    handleGetLineChart();
  }, [handleGetLineChart]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <ResponsiveLine
          data={lineChartData}
          theme={{
            axis: {
              domain: {
                line: {
                  stroke: colors.grey[100],
                },
              },
              legend: {
                text: {
                  fill: colors.grey[100],
                },
              },
              ticks: {
                line: {
                  stroke: colors.grey[100],
                  strokewidth: 1,
                },
                text: {
                  fill: colors.grey[100],
                },
              },
            },
            legend: {
              text: {
                fill: colors.grey[100],
              },
            },
          }}
          colors={["#2e9ba0", "#00FF00", "#00a1ff"]}
          margin={{
            top: 50,
            right: 30,
            bottom: isDashboard ? 70 : 90,
            left: 45,
          }}
          xScale={{ type: "point" }}
          yScale={{
            type: "linear",
            min: "auto",
            max: "auto",
            stacked: true,
            reverse: false,
          }}
          yFormat=" >-.2f"
          curve="catmullRom"
          axisTop={null}
          axisRight={null}
          axisBottom={{
            orient: "bottom",
            tickSize: 5,
            tickPadding: 5,
            tickRotation: isTablet ? 40 : 0,
            legend: isDashboard ? undefined : "transportation",
            legendOffset: (36, 55),
            legendPosition: "middle",
          }}
          axisLeft={{
            orient: "left",
            tickSize: 5,
            tickValues: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: isDashboard ? undefined : "count",
            legendOffset: -40,
            legendPosition: "middle",
          }}
          enableGridX={false}
          enableGridY={false}
          pointColor={{ theme: "background" }}
          pointBorderWidth={2}
          pointBorderColor={{ from: "serieColor" }}
          pointLabelYOffset={-12}
          areaOpacity={0.05}
          useMesh={true}
          tooltip={(item) => (
            <Box
              sx={{
                background: colors.greenAccent[600],
                color: colors.grey[100],
                display: "flex",
                justifyContent: "space-between",
                alighItems: "center",
                fontWeight: "600",
              }}
            >
              <Box
                sx={{
                  m: "6px",
                  height: "15px",
                  width: "15px",
                  borderRadius: "50%",
                }}
                backgroundColor={item.point.serieColor}
              />
              <Box m="4px">
                {item.point.data.xFormatted
                  ? item.point.data.xFormatted
                  : "N/A"}
              </Box>
              <Box m="4px">{item.point.data.yFormatted}</Box>
            </Box>
          )}
          legends={[
            {
              anchor: "bottom-left",
              direction: "row",
              justify: false,
              translateX: 0,
              translateY: isDashboard ? 70 : 90,
              itemsSpacing: 0,
              itemDirection: "left-to-right",
              itemWidth: 80,
              itemHeight: 20,
              itemOpacity: 0.75,
              symbolSize: 12,
              itemTextColor: colors.grey[100],
              symbolShape: "circle",
              symbolBorderColor: "rgba(0, 0, 0, .5)",
              effects: [
                {
                  on: "hover",
                  style: {
                    itemBackground: "rgba(0, 0, 0, .03)",
                    itemOpacity: 1,
                  },
                },
              ],
            },
          ]}
        />
      )}
    </>
  );
};

export default Line;
