import { useContext, useEffect, useMemo, useCallback } from "react";
import { Sidebar, Menu, MenuItem, sidebarClasses } from "react-pro-sidebar";
import { NavLink } from "react-router-dom";
import {
  Box,
  Typography,
  IconButton,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { tokens } from "../../theme";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import dashboard, { data, pages, charts } from "../../utils/menuItems.js";
import axios from "axios";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import useAuthCredentials from "../../auth/auth";
import { globalContext } from "../../context/GlobalContext";

const SideBar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { toggleSidebar, setToggleSidebar, avatarData, setAvatarData } =
    useContext(globalContext);
  const isMobile = useMediaQuery("(max-width: 600px)");
  // user data
  const { name, access, id, token } = useAuthCredentials();

  const headers = useMemo(
    () => ({
      Authorization: token,
      "Content-Type": "application/json",
    }),
    [token]
  );

  const handleUserImage = useCallback(async () => {
    try {
      const response = await axios.get(
        `https://dashboard-cxq3.onrender.com/avatar/${id ? id : undefined}`,
        {
          headers,
        }
      );

      if (response.data.avatarUrl) {
        setAvatarData({
          url: response.data.avatarUrl,
          publicId: response.data.publicId,
        });
      }
    } catch (error) {
      console.error(error);
    }
  }, [id, headers, setAvatarData]);

  // loading user image
  useEffect(() => {
    handleUserImage();
  }, [handleUserImage]);
  
  return (
    <Box
      sx={{
        "& .ps-sidebar-root": {
          borderColor: "transparent",
        },
        transition: "all .2s",
        overflowY: isMobile ? "hidden" : "",
        width: isMobile ? "0px" : undefined,
      }}
    >
      <Sidebar
        rootStyles={{
          [`.${sidebarClasses.container}`]: {
            background: `${colors.primary[400]}`,
            color: `${colors.grey[100]}`,
            height: "100%",
            position: "fixed",
            top: "0",
            left: "0",
            bottom: "0",
            width: isMobile ? (toggleSidebar ? "100vw" : "0vw") : "250px",
            transition: "all .2s !important",
          },
        }}
      >
        <Menu
          menuItemStyles={{
            button: ({ active }) => {
              return {
                color: active ? "#6870fa" : undefined,
                ":hover": { backgroundColor: "transparent" },
                height: "40px",
              };
            },
          }}
        >
          {/* Nav Header */}

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: "10px",
            }}
          >
            <Typography
              variant="h3"
              color={colors.grey[100]}
              sx={{ padding: "5px 0px 0px 15px" }}
            >
              DASHBOARD
            </Typography>

            {isMobile && (
              <IconButton
                onClick={() => {
                  setToggleSidebar(false);
                }}
              >
                <MenuOutlinedIcon />
              </IconButton>
            )}
          </Box>

          {/* User Profile */}

          <Box sx={{ mb: "25px" }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alighItems: "center",
              }}
            >
              {avatarData.url ? (
                <img
                  alt="user-profile"
                  src={avatarData.url}
                  style={{
                    width: "6rem",
                    height: "6rem",
                    cursor: "pointer",
                    borderRadius: "50%",
                    border: `2px solid ${colors.greenAccent[400]}`,
                    objectFit: "cover",
                  }}
                />
              ) : (
                <AccountCircleIcon
                  sx={{
                    width: "80px",
                    height: "80px",
                    cursor: "pointer",
                    borderRadius: "50%",
                  }}
                />
              )}
            </Box>

            <Box textAlign="center">
              <Typography
                variant="h3"
                color={colors.grey[100]}
                fontWeight="bold"
                m="10px 0 0 0"
                sx={{ textTransform: "capitalize" }}
              >
                {name ? name : undefined}
              </Typography>
              <Typography
                variant="h5"
                color={colors.greenAccent[500]}
                sx={{ textTransform: "capitalize" }}
              >
                {access ? access : undefined}
              </Typography>
            </Box>
          </Box>

          {/* Nav Items */}

          {/* DASHBOARD */}

          {dashboard.map((category) => (
            <MenuItem
              key={category.name}
              rootStyles={{ ":hover": { color: "#868dfb", transition: ".3s" } }}
              icon={category.icon}
              component={
                <NavLink
                  style={({ isActive }) => {
                    return {
                      backgroundColor: isActive ? "#6870fa" : "",
                      color: isActive ? colors.grey[100] : "",
                    };
                  }}
                  to={category.route}
                />
              }
            >
              <Typography>{category.name}</Typography>
            </MenuItem>
          ))}

          {/* DATA ITEMS */}
          <Typography
            variant="h6"
            color={colors.grey[300]}
            sx={{ m: "15px 0 5px 18px" }}
          >
            Data
          </Typography>

          {data.map((category) => (
            <MenuItem
              key={category.name}
              rootStyles={{ ":hover": { color: "#868dfb", transition: ".3s" } }}
              icon={category.icon}
              component={
                <NavLink
                  style={({ isActive }) => {
                    return {
                      backgroundColor: isActive ? "#6870fa" : "",
                      color: isActive ? colors.grey[100] : "",
                    };
                  }}
                  to={category.route}
                />
              }
            >
              <Typography>{category.name}</Typography>
            </MenuItem>
          ))}

          {/* PAGES ITEMS */}

          <Typography
            variant="h6"
            color={colors.grey[300]}
            sx={{ m: "15px 0 5px 18px" }}
          >
            Pages
          </Typography>

          {pages.map((category) => (
            <MenuItem
              key={category.name}
              rootStyles={{ ":hover": { color: "#868dfb", transition: ".3s" } }}
              icon={category.icon}
              component={
                <NavLink
                  style={({ isActive }) => {
                    return {
                      backgroundColor: isActive ? "#6870fa" : "",
                      color: isActive ? colors.grey[100] : "",
                    };
                  }}
                  to={category.route}
                />
              }
            >
              <Typography>{category.name}</Typography>
            </MenuItem>
          ))}

          {/* CHARTS ITEMS */}

          <Typography
            variant="h6"
            color={colors.grey[300]}
            sx={{ m: "15px 0 5px 18px" }}
          >
            Charts
          </Typography>

          {charts.map((category) => (
            <MenuItem
              key={category.name}
              rootStyles={{ ":hover": { color: "#868dfb", transition: ".3s" } }}
              icon={category.icon}
              component={
                <NavLink
                  style={({ isActive }) => {
                    return {
                      backgroundColor: isActive ? "#6870fa" : "",
                      color: isActive ? colors.grey[100] : "",
                    };
                  }}
                  to={category.route}
                />
              }
            >
              <Typography>{category.name}</Typography>
            </MenuItem>
          ))}
          <Box sx={{ width: "100%", height: "20px" }} />
        </Menu>
      </Sidebar>
    </Box>
  );
};

export default SideBar;
