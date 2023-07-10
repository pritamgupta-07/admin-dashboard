import { colorModeContext, tokens, useMode } from "./theme";
import { CssBaseline, ThemeProvider} from "@mui/material";
import ProtectedRoutes from "./components/ProtectedRoutes";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useSidebar } from "./context/SidebarContext";
import { globalContext } from "./context/GlobalContext";
import { useQuery } from "./context/SearchQuery";
import { useAvatar } from "./context/AvatarContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [theme, colorMode] = useMode();
  const colors = tokens(theme.palette.mode);
  const [toggleSidebar, setToggleSidebar] = useSidebar();
  const [query, setQuery] = useQuery();
  const [avatarData, setAvatarData] = useAvatar()
  const location = useLocation();

  const contextValues = {
    toggleSidebar,
    setToggleSidebar,
    query,
    setQuery,
    avatarData,
    setAvatarData,
  };


  useEffect(() => {}, [location]);

  return (
    <colorModeContext.Provider value={colorMode}>
      <globalContext.Provider value={contextValues}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={true}
            newestOnTop={true}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            toastStyle={{
              backgroundColor: colors.blueAccent[500],
              color: colors.grey[100],
            }}
          />
        
          <ProtectedRoutes />
        </ThemeProvider>
      </globalContext.Provider>
    </colorModeContext.Provider>
  );
}

export default App;
