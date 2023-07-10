import React, { useContext } from "react";
import {
  Box,
  IconButton,
  useTheme,
  InputBase,
  Tooltip,
  useMediaQuery,
} from "@mui/material";
import { colorModeContext, tokens } from "../../theme";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { Link, useNavigate } from "react-router-dom";
import { globalContext } from "../../context/GlobalContext";
import useAuthCredentials from "../../auth/auth";

const Topbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(colorModeContext);
  const { toggleSidebar, setToggleSidebar, query, setQuery } =
    useContext(globalContext);
  const isMobile = useMediaQuery("(max-width: 600px)");
  const { name } = useAuthCredentials();

  const navigate = useNavigate();

  return (
    <Box display="flex" justifyContent="space-between" p={2}>
      {/* search box */}
      <Box display="flex">
        {isMobile ? (
          <IconButton
            sx={{ margin: "0 8px 0 0" }}
            onClick={() => {
              setToggleSidebar(!toggleSidebar);
            }}
          >
            <MenuOutlinedIcon />
          </IconButton>
        ) : undefined}
        <Box
          display="flex"
          backgroundColor={colors.primary[400]}
          borderRadius="3px"
        >
          <InputBase
            sx={{ ml: 2, flex: 1 }}
            placeholder="Search"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
            }}
            onFocus={() => {
              navigate("/search");
            }}
          />
          <IconButton type="button" sx={{ p: 1 }}>
            <SearchOutlinedIcon />
          </IconButton>
        </Box>
      </Box>

      {/* Icons */}

      <Box display="flex">
        <Tooltip title="theme">
          <IconButton onClick={colorMode.toggleColorMode}>
            {theme.palette.mode === "dark" ? (
              <DarkModeOutlinedIcon />
            ) : (
              <LightModeOutlinedIcon />
            )}
          </IconButton>
        </Tooltip>

        <Link to="/settings">
          <Tooltip title="settings">
            <IconButton>
              <SettingsOutlinedIcon />
            </IconButton>
          </Tooltip>
        </Link>

        <Link to={`/profile/${name ? name : undefined}`}>
          <Tooltip title="profile">
            <IconButton>
              <PersonOutlineOutlinedIcon />
            </IconButton>
          </Tooltip>
        </Link>
      </Box>
    </Box>
  );
};

export default Topbar;
