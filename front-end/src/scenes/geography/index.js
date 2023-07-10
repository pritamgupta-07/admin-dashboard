import { Box } from "@mui/material";
import Header from "../../components/Header";
import Geography from "../../components/GeographyChart";
import AutoSizer from "react-virtualized/dist/commonjs/AutoSizer";

const GeographyChart = () => {
  return (
        <Box m="20px">
          <Header title="Geography Charts" subtitle="Simple Geography Chart" />
          <Box height="65vh" border=" 1px solid white">
            <AutoSizer>
              {({ height, width }) => (
                <Box height={height} width={width}>
                  <Geography />
                </Box>
              )}
            </AutoSizer>
          </Box>
        </Box>
  );
};

export default GeographyChart;
