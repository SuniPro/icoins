import "./App.css";
import { useEffect, useState } from "react";
import { useDarkMode } from "usehooks-ts";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "@emotion/react";
import { WindowContextProvider } from "./context/WindowContext";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { GlobalStyled } from "./components/layouts/Frames/FrameLayouts";
import { Toaster } from "react-hot-toast";
import { Provider } from "./provider";
import { Main } from "./page/Main";
import { darkTheme, defaultTheme } from "./styles/theme";
import { UserContextProvider } from "./context/UserContext";

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
          <BrowserRouter>
            <Provider>
              <UserContextProvider>
                <Routes>
                  <Route path="/" element={<Main />} />
                </Routes>
              </UserContextProvider>
            </Provider>
          </BrowserRouter>
          <GlobalStyled />
          <Toaster />
        </WindowContextProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
