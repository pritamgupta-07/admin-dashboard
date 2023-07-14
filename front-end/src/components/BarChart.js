import { ResponsiveBar } from "@nivo/bar";
import { useTheme, Box } from "@mui/material";
import { tokens } from "../theme";
import { memo, useState, useEffect, useCallback, useMemo } from "react";
import axios from "axios";
import Loader from "./Loader";
import useAuthCredentials from "../auth/auth";

const Bar = ({ isDashboard = false }) => {
  // theme setup
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { token } = useAuthCredentials();

  const [isLoading, setIsLoading] = useState(true);
  const [barData, setBarData] = useState([]);

  const headers = useMemo(
    () => ({ "Content-Type": "application/json", Authorization: token }),
    [token]
  );

  // handling Bar Data request
  const handleGetBarData = useCallback(async () => {
    try {
      const response = await axios.get(`${window.env.API_URL}/bar-chart`, {
        headers,
      });
      // updating data
      setBarData(response.data);
      setIsLoading(false);
    } catch (error) {
      // handling errors that occur during request
      console.error(error);
    }
  }, [headers]);

  // updating component
  useEffect(() => {
    handleGetBarData();
  }, [handleGetBarData]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <ResponsiveBar
          data={barData}
          // theme setup
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
          keys={["hotdog", "burger", "sandwich", "kebab", "fries", "donut"]}
          indexBy="country"
          enableLabel={false}
          margin={{
            top: 50,
            right: 50,
            bottom: isDashboard ? 50 : 75,
            left: 60,
          }}
          padding={0.3}
          valueScale={{ type: "linear" }}
          indexScale={{ type: "band", round: true }}
          colors={{ scheme: "nivo" }}
          defs={[
            {
              id: "dots",
              type: "patternDots",
              background: "inherit",
              color: "#38bcb2",
              size: 4,
              padding: 1,
              stagger: true,
            },
            {
              id: "lines",
              type: "patternLines",
              background: "inherit",
              color: "#eed312",
              rotation: -45,
              lineWidth: 6,
              spacing: 10,
            },
          ]}
          fill={[
            {
              match: {
                id: "fries",
              },
              id: "dots",
            },
            {
              match: {
                id: "sandwich",
              },
              id: "lines",
            },
          ]}
          borderColor={{
            from: "color",
            modifiers: [["darker", 1.6]],
          }}
          // custom tooltip
          tooltip={(item) => (
            <Box
              sx={{
                background: colors.blueAccent[500],
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
                backgroundColor={item.color}
              />
              <Box m="4px">{item.label ? item.label : "N/A"}</Box>
              <Box m="4px">{item.value}</Box>
            </Box>
          )}
          axisTop={null}
          axisRight={null}
          axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: isDashboard ? undefined : "Country",
            legendPosition: "middle",
            legendOffset: 32,
          }}
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: isDashboard ? undefined : "food",
            legendPosition: "middle",
            legendOffset: -40,
          }}
          labelSkipWidth={12}
          labelSkipHeight={12}
          labelTextColor={{
            from: "color",
            modifiers: [["darker", 1.6]],
          }}
          legends={
            isDashboard
              ? undefined
              : [
                  {
                    dataFrom: "keys",
                    anchor: "bottom-left",
                    direction: "row",
                    justify: false,
                    translateX: 0,
                    translateY: 65,
                    itemsSpacing: 2,
                    itemWidth: 40,
                    itemHeight: 20,
                    itemDirection: "top-to-bottom",
                    itemOpacity: 0.85,
                    symbolSize: 10,
                    itemTextColor: colors.grey[100],
                    effects: [
                      {
                        on: "hover",
                        style: {
                          itemOpacity: 1,
                        },
                      },
                    ],
                  },
                ]
          }
          role="application"
          ariaLabel="Nivo bar chart demo"
          barAriaLabel={function (e) {
            return (
              e.id + ": " + e.formattedValue + " in country: " + e.indexValue
            );
          }}
        />
      )}
    </>
  );
};

export default memo(Bar);
