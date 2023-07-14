import { ResponsiveChoropleth } from "@nivo/geo";
import { tokens } from "../theme";
import { useTheme, Box, useMediaQuery } from "@mui/material";
import { memo, useState, useEffect, useCallback, useMemo } from "react";
import axios from "axios";
import Loader from "./Loader";
import useAuthCredentials from "../auth/auth";

const Geography = ({ isDashboard = false }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { token } = useAuthCredentials();
  const isTablet = useMediaQuery("max-width: 960px");

  const [isLoading, setIsLoading] = useState(true);
  const [geoData, setGeoData] = useState([]);
  const [geoFeaturesData, setGeoFeaturesData] = useState([]);

  const headers = useMemo(
    () => ({ "Content-Type": "application/json", Authorization: token }),
    [token]
  );
  // handling Geography chart Data request
  const handleGetGeoData = useCallback(async () => {
    try {
      const response = await axios.get(
        `${window.env.API_URL}/geography-chart`,
        { headers }
      );
      // updating data
      setGeoData(response.data);
    } catch (error) {
      // handling errors that occur during request
      console.error(error);
    }
  }, [headers]);

  // handling Geography features Data request
  const handleGetGeoFeaturesData = useCallback(async () => {
    try {
      const response = await axios.get(
        `${window.env.API_URL}/geography-features`,
        { headers }
      );
      // updating data
      setGeoFeaturesData(response.data);
      setIsLoading(false);
    } catch (error) {
      // handling errors that occur during request
      console.error(error);
    }
  }, [headers]);

  // updating component
  useEffect(() => {
    handleGetGeoData();
    handleGetGeoFeaturesData();
  }, [handleGetGeoData, handleGetGeoFeaturesData]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <ResponsiveChoropleth
          data={geoData}
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
          features={geoFeaturesData}
          margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
          colors="nivo"
          domain={[0, 1000000]}
          unknownColor="#666666"
          label="properties.name"
          valueFormat=".2s"
          projectionScale={isDashboard ? 40 : isTablet ? 70 : 100}
          projectionTranslation={isDashboard ? [0.49, 0.6] : [0.5, 0.5]}
          projectionRotation={[0, 0, 0]}
          enableGraticule={false}
          borderWidth={0.5}
          borderColor="#152538"
          tooltip={(point) => (
            <Box
              sx={{
                background: colors.greenAccent[600],
                color: colors.grey[100],
                display: "flex",
                justifyContent: "space-between",
                alighItems: "center",
              }}
            >
              <Box m="4px">
                {point.feature.label ? point.feature.label : "N/A"}
              </Box>
              <Box m="4px">{point.feature.formattedValue}</Box>
            </Box>
          )}
          legends={
            !isDashboard
              ? [
                  {
                    anchor: "bottom-left",
                    direction: "column",
                    justify: true,
                    translateX: 20,
                    translateY: -10,
                    itemsSpacing: 0,
                    itemWidth: 84,
                    itemHeight: 16,
                    itemDirection: "left-to-right",
                    itemTextColor: colors.grey[100],
                    itemOpacity: 0.85,
                    symbolSize: 18,
                    effects: [
                      {
                        on: "hover",
                        style: {
                          itemTextColor: "#ffffff",
                          itemOpacity: 1,
                        },
                      },
                    ],
                  },
                ]
              : undefined
          }
        />
      )}
    </>
  );
};

export default memo(Geography);
