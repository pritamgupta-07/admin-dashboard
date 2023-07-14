import { ResponsivePie } from "@nivo/pie";
import { useTheme, Box } from "@mui/material";
import { tokens } from "../theme";
import { useCallback, useEffect, useMemo, useState } from "react";
import axios from "axios";
import Loader from "./Loader";
import useAuthCredentials from "../auth/auth";

const Pie = () => {
  // theme setup
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { token } = useAuthCredentials();

  const [pieData, setPieData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const headers = useMemo(
    () => ({ "Content-Type": "application/json", Authorization: token }),
    [token]
  );

  // handling Pie chart Data request
  const handlePieData = useCallback(async () => {
    try {
      const response = await axios.get(`${window.env.API_URL}/pie-chart`, {
        headers,
      });
      // updating data
      setPieData(response.data);
      setIsLoading(false);
    } catch (error) {
      // handling errors that occur during request
      console.error(error);
    }
  }, [headers]);

  // updating component
  useEffect(() => {
    handlePieData();
  }, [handlePieData]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <ResponsivePie
          data={pieData}
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
          margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
          startAngle={-3}
          innerRadius={0.5}
          padAngle={0.7}
          cornerRadius={3}
          activeOuterRadiusOffset={8}
          borderWidth={1}
          borderColor={{
            from: "color",
            modifiers: [["darker", 0.2]],
          }}
          arcLinkLabelsSkipAngle={10}
          arcLinkLabelsTextColor={{ from: "color", modifiers: [] }}
          arcLinkLabelsDiagonalLength={25}
          arcLinkLabelsThickness={2}
          arcLinkLabelsColor={{ from: "color" }}
          arcLabelsSkipAngle={10}
          arcLabelsTextColor={{
            from: "color",
            modifiers: [["darker", 2]],
          }}
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
                backgroundColor={item.datum.color}
              />
              <Box m="4px">{item.datum.label} :</Box>
              <Box m="4px">{item.datum.value}</Box>
            </Box>
          )}
          legends={[
            {
              anchor: "bottom",
              direction: "row",
              justify: false,
              translateX: 0,
              translateY: 56,
              itemsSpacing: 0,
              itemWidth: 40,
              itemHeight: 18,
              itemTextColor: "#999",
              itemDirection: "top-to-bottom",
              itemOpacity: 1,
              symbolSize: 18,
              symbolShape: "circle",
              effects: [
                {
                  on: "hover",
                  style: {
                    itemTextColor: "#000",
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

export default Pie;
