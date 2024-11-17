import "./App.css";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { useState, useEffect } from "react";
import Contacts from "./pages/contacts/Contacts";
import Splash from "./components/Splash";

function App() {
  const theme = createTheme({
    palette: {
      background: {
        default: "#F6F6F9",
      },
    },
  });

  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div style={{ overflow: "hidden" }}>
      {showSplash ? (
        <Splash />
      ) : (
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Contacts />
        </ThemeProvider>
      )}
    </div>
  );
}

export default App;
