import { Box } from "@mui/material";
import { CircularProgress } from "@mui/material";

const Loader = () => {
  return (
    <Box
      height="100%"
      width="100%"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <CircularProgress color="secondary" variant="indeterminate" />
    </Box>
  );
};

export default Loader;
