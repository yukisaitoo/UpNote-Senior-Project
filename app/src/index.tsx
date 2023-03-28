import "./_base.scss";

import React from "react";
import ReactDOM from "react-dom/client";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { BrowserRouter } from "react-router-dom";

import App from "./App";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <HelmetProvider>
        <Helmet>
          <title>UpNote</title>
        </Helmet>
        <App />
      </HelmetProvider>
    </BrowserRouter>
  </React.StrictMode>
);
