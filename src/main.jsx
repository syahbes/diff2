import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import rtlPlugin from "stylis-plugin-rtl";
import { prefixer } from "stylis";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import DocxPage from "./DocxPage";


import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const theme = createTheme({
  direction: "rtl",
});

//rtl
const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [prefixer, rtlPlugin],
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <CacheProvider value={cacheRtl}>
    <ThemeProvider theme={theme}>
    <Router>
        <Routes>
          <Route path="/*" element={<App />} />
          <Route path="/docx" element={<DocxPage />} />
        </Routes>
      </Router>
      {/* <DocxPage/> */}
    </ThemeProvider>
  </CacheProvider>
);
