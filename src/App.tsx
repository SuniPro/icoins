import "./App.css";
import { useEffect, useState } from "react";
import { useDarkMode } from "usehooks-ts";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "@emotion/react";
import { darkTheme, defaultTheme } from "./Styles/theme";
import { WindowContextProvider } from "./context/WindowContext";
import { UserContextProvider } from "./context/UserContext";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Main } from "./page/Main";
import { GlobalStyled } from "./components/layouts/Frames/FrameLayouts";
import { Toaster } from "react-hot-toast";

const QUERY_CLIENT = new QueryClient();

function App() {
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const { isDarkMode } = useDarkMode();

  useEffect(() => {
    setDarkMode(isDarkMode);
  }, [isDarkMode]);

  return (
    <ThemeProvider theme={darkMode ? darkTheme : defaultTheme}>
      <QueryClientProvider client={QUERY_CLIENT}>
        <WindowContextProvider>
          <UserContextProvider>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Main />} />
              </Routes>
            </BrowserRouter>
            <GlobalStyled />
            <Toaster />
          </UserContextProvider>
        </WindowContextProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}
export default App;
